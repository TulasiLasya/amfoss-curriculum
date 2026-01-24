#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <signal.h>
#include <errno.h>

// define --> Compile-time constant-(human-readable code is translated to machine code.)

#define MAX_INPUT 1024 
#define MAX_ARGS 64
#define MAX_BG_PROCESSES 100

// Structure to track background processes
typedef struct {  //  define and create alias
    pid_t pid;
    char command[MAX_INPUT];
    int is_running;
} bg_process; // This is Alias name

bg_process bg_processes[MAX_BG_PROCESSES];
int bg_count = 0;

// Function prototypes
void print_prompt();
void read_input(char *input);
void parse_input(char *input, char **args); // **args = array of argument strings
int execute_command(char **args); // returns 1 for success
int is_builtin_command(char **args);
int execute_builtin(char **args);
void cleanup_background_processes();
void add_background_process(pid_t pid, char *command);
void remove_background_process(pid_t pid);
void list_background_processes();
void handle_sigint(int sig);
void handle_sigchld(int sig);
void handle_sigtstp(int sig); // (20 for SIGTSTP)

int main() {
    char input[MAX_INPUT]; 
    char *args[MAX_ARGS];
    
    // Set up signal handlers
    signal(SIGINT, handle_sigint); // Ctrl+C - Signal Intrupt
    signal(SIGCHLD, handle_sigchld);// Child process died - signal when child process has terminated.
    signal(SIGTSTP, handle_sigtstp); // Ctrl+Z - signal suspend the current running process. The paused process remains in backend, we can resume it by fg (foreground) or bg(background) commands.

    
    printf("Welcome to MyShell! Type 'exit' to quit.\n");
    
    // Infinite Loop:

    while (1) { 
        // Clean up completed background processes
        cleanup_background_processes();
        
        // Print prompt and read input
        print_prompt();
        read_input(input);
        
        // Skip empty input
        if (strlen(input) == 0) {
            continue;
        }
        
        // Parse input into arguments
        parse_input(input, args);
        
        // Check if it's an exit command
        if (strcmp(args[0], "exit") == 0) {
            printf("Exiting shell...\n");
            
            // Kill all background processes before exiting
            for (int i = 0; i < bg_count; i++) {
                if (bg_processes[i].is_running) {
                    kill(bg_processes[i].pid, SIGTERM);
                }
            }
            break;
        }
        
        // Execute the command
        execute_command(args);
    }
    
    return 0;
}

// Print the shell prompt
void print_prompt() {
    char cwd[1024]; // current working directory
    if (getcwd(cwd, sizeof(cwd)) != NULL) {
        printf("\033[1;32m%s\033[0m$ ", cwd);  // Green color for path
    } else {
        printf("\033[1;32mmyShell\033[0m$ ");  // Default prompt if getcwd fails
    }
    fflush(stdout);
}

// Read input from user
void read_input(char *input) { //    the input is stored in input array pointer to charcter
    if (fgets(input, MAX_INPUT, stdin) == NULL) {
        if (feof(stdin)) { // file end of the file ( standard input)
            printf("\nExiting shell...\n");
            exit(0);
        } else {
            perror("fgets error"); // print error (perror)
            exit(1); // status = 1 or non zero means --> ERROR  
        }
    }
    
    // Remove trailing newline
    input[strcspn(input, "\n")] = 0; // this replaces the "/n" to '/0' (adds the null char again to input)
} // string Character span returns the index of the new line char so that we replace with null char

// Parse input into arguments
void parse_input(char *input, char **args) {
    int i = 0;
    char *token;
    
    // Tokenize the input string
    token = strtok(input, " \t\n\r"); // divide the input by considering the space, comma, ..etc.(delimiters).
    
    while (token != NULL && i < MAX_ARGS - 1) {
        args[i] = token;
        i++;
        token = strtok(NULL, " \t\n\r");
    }
    
    args[i] = NULL;  // Null-terminate the argument list (adding 0 to the argument finally)
}

// Execute a command
int execute_command(char **args) { // this function gives either 1 or 0 ( continue or exit)
    if (args[0] == NULL) {
        return 1;  // Empty command 
    }
    
    // Check if it's a built-in command
    if (is_builtin_command(args)) {
        return execute_builtin(args);
    }
    
    // Check if it's a background process (ends with &)
    int background = 0; // 0 =  false (fg), 1 = true (bg)
    int arg_count = 0;
    
    // Count arguments and check for &
    while (args[arg_count] != NULL) {
        arg_count++;
    }
    
    if (arg_count > 0 && strcmp(args[arg_count - 1], "&") == 0) { // strcmp returns 0 if the strings are equal
        background = 1; // marking it as True (we found &)
        args[arg_count - 1] = NULL;  // Remove & from arguments
    }
    
    pid_t pid = fork(); 
    
    if (pid < 0) {
        // Fork failed
        perror("fork error");
        return 1;
    } else if (pid == 0) {
        // Child process
        
        // If it's a background process in child, ignore some signals
        if (background) {
            signal(SIGINT, SIG_IGN); // ignores ctrl+c in bg child
            signal(SIGTSTP, SIG_IGN); // ignores ctrl+z in bg child
        }
        
        // Execute the command
        if (execvp(args[0], args) == -1) {
            perror("execvp error");
            exit(EXIT_FAILURE);
        }
    } else {
        // Parent process
        if (!background) {
            // Foreground process - wait for it to complete
            int status;
            waitpid(pid, &status, 0); // waiting for child to finish
            
            // Check if child terminated normally
            if (WIFEXITED(status)) { // "Was IF EXIT normal?"
                // printf("Child exited with status %d\n", WEXITSTATUS(status));
            } else if (WIFSIGNALED(status)) { // "Was IF SIGNAL killed?"
                printf("Child terminated by signal %d\n", WTERMSIG(status)); // Which TERMinal SIGnal?
            }
        } else { // this is bg process
            // Background process - don't wait
            printf("[%d] %d\n", bg_count + 1, pid);
            
            // Store background process info
            char cmd_str[MAX_INPUT] = ""; // declaring a string to build a command
            for (int i = 0; args[i] != NULL; i++) { // continue untill null
                strcat(cmd_str, args[i]); // string concatenate
                strcat(cmd_str, " "); // add space to the arg
            }
            add_background_process(pid, cmd_str); // finally adding the command info in bg
        }
    }
    
    return 1; // shell will continue running (success) ; will returned to main which continues while(1) loop.
}

// Check if command is a built-in
int is_builtin_command(char **args) { // declaring the built in functions in the shell
    if (strcmp(args[0], "cd") == 0 ||
        strcmp(args[0], "pwd") == 0 ||
        strcmp(args[0], "exit") == 0 ||
        strcmp(args[0], "bglist") == 0 ||
        strcmp(args[0], "help") == 0) {
        return 1;
    }
    return 0;
}

// Execute built-in commands
int execute_builtin(char **args) {
    if (strcmp(args[0], "cd") == 0) {
        if (args[1] == NULL) {
            // cd to home directory
            char *home = getenv("HOME"); //  get home dir from env and char *home = Pointer to string
            if (home) {
                if (chdir(home) != 0) { 
                    perror("cd error");
                }
            } else {
                fprintf(stderr, "cd: HOME environment variable not set\n"); // fprintf =  format print to file ; stdrr = standard error
            }
        } else {
            if (chdir(args[1]) != 0) { // not succesful
                perror("cd error");
            }
        }
        return 1; // return continue shell (1- shell should continue running)
    }
    
    if (strcmp(args[0], "pwd") == 0) {
        char cwd[1024];
        if (getcwd(cwd, sizeof(cwd)) != NULL) { // gets current working dir
            printf("%s\n", cwd); // %s formating string
        } else {
            perror("pwd error");
        }
        return 1;
    }
    
    if (strcmp(args[0], "bglist") == 0) {
        list_background_processes();
        return 1;
    }
    
    if (strcmp(args[0], "help") == 0) {
        printf("MyShell - A simple Unix shell implementation\n");
        printf("Built-in commands:\n");
        printf("  cd [dir]      - Change directory\n");
        printf("  pwd           - Print working directory\n");
        printf("  bglist        - List background processes\n");
        printf("  help          - Show this help message\n");
        printf("  exit          - Exit the shell\n");
        printf("\nFeatures:\n"); // prints Blank line + features header

        printf("  - Background execution with & (e.g., 'sleep 10 &')\n");
        printf("  - Ctrl+C shows background processes\n");
        printf("  - Ctrl+Z suspends foreground processes\n");
        return 1;
    }
    
    return 0; 
}

// We are defining the functions here:

// Add a background process to the list : where it stores the all data
void add_background_process(pid_t pid, char *command) {
    if (bg_count < MAX_BG_PROCESSES) {
        bg_processes[bg_count].pid = pid;  //Stores PID 
        strncpy(bg_processes[bg_count].command, command, MAX_INPUT - 1); // Stores command
        bg_processes[bg_count].command[MAX_INPUT - 1] = '\0'; // "\0" is the null character used for string termination
        bg_processes[bg_count].is_running = 1; // storing the info that process is running(1)
        bg_count++; // increase the count by 1 for every next bg
    } else {
        printf("Maximum background processes reached!\n");
    }
}

// Remove a background process from the list
void remove_background_process(pid_t pid) {
    for (int i = 0; i < bg_count; i++) {
        if (bg_processes[i].pid == pid) {
            bg_processes[i].is_running = 0; // marking it as not running (removed)
            
            // Shift all subsequent processes down
            for (int j = i; j < bg_count - 1; j++) {// we are shifting the bg slots as we removed one.
                bg_processes[j] = bg_processes[j + 1];
            }
            bg_count--;
            break;
        }
    }
}

// List all background processes
void list_background_processes() {
    if (bg_count == 0) {
        printf("No background processes running.\n");
        return;
    }
    
    printf("Background processes:\n");
    printf("ID\tPID\tStatus\tCommand\n");
    printf("--\t---\t------\t-------\n");
    
    for (int i = 0; i < bg_count; i++) { // notes each process whether running or exited
        // Check if process is still running
        if (kill(bg_processes[i].pid, 0) == 0) { 
            bg_processes[i].is_running = 1;
            printf("%d\t%d\tRunning\t%s\n", i + 1, bg_processes[i].pid, bg_processes[i].command);
        } else {
            bg_processes[i].is_running = 0;
            printf("%d\t%d\tExited\t%s\n", i + 1, bg_processes[i].pid, bg_processes[i].command);
        }
    }
}

// Clean up completed background processes
void cleanup_background_processes() {
    pid_t pid; // declaring variable to store PID
    int status; // declaring var to store child exit status
    
    // Non-blocking wait for any child process
    while ((pid = waitpid(-1, &status, WNOHANG)) > 0) { // checks for terminated child processes
        // Remove from background processes list
        remove_background_process(pid);
        
        // Optional: Print notification
        printf("[Background process %d completed]\n", pid);
    }
}

// Signal handler for SIGINT (Ctrl+C) -  Shows the total BG processes when we click Ctrl+C
void handle_sigint(int sig) { // parameter sig - that automaticaly passed by OS
    printf("\n\n=== Background Processes List (Ctrl+C) ===\n"); 
    list_background_processes();
    printf("\n");
    print_prompt(); // shows the shell promp again immediately
    fflush(stdout); // this command is shows the entire text at once - like Immediate display
}

// Signal handler for SIGCHLD (child process terminated)
void handle_sigchld(int sig) { // Signal Number is 17 for SIGCHID automaticaly
    // Clean up zombie processes
    pid_t pid;
    int status; // to store exit details
    
    while ((pid = waitpid(-1, &status, WNOHANG)) > 0) { // WNOHANG =  dont wait, just return when it is checked
	// >0 (dead child); 0 (no dead child); -1 (error)


        // Check if this was a background process
        for (int i = 0; i < bg_count; i++) {
            if (bg_processes[i].pid == pid && bg_processes[i].is_running) { // this is possible when we killed the child process using kill() by parent
                bg_processes[i].is_running = 0; // updating that job is not running (process is terminated)
                printf("\n[Background process %d completed: %s]\n", pid, bg_processes[i].command);
                print_prompt();
                fflush(stdout);
                break;
            }
        }
    }
}

// Signal handler for SIGTSTP (Ctrl+Z)
void handle_sigtstp(int sig) { // this function just shows the functionality of Ctrl + Z, so that those fg, and bg are not functionable commands after.
    printf("\n[Ctrl+Z pressed - Use 'fg' to bring to foreground or 'bg' to continue in background]\n");
    print_prompt();
    fflush(stdout);
}
