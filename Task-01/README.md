## The Commands that I have learnt through these GIT EXERCISES:
### Exercise-1: Push a commit you have made
Commands Used:

<img width="680" height="109" alt="image" src="https://github.com/user-attachments/assets/15cb4da8-729a-44cb-b79b-b3402e7d68bf" />


  
### Exercise-2: Commit one file
Commands Used:
<img width="922" height="115" alt="image" src="https://github.com/user-attachments/assets/05e9294a-4da8-49a2-86dc-e2e48e9f6803" />

* ```git add <filename>``` : It is used to stage the changes that we want to include into the commit.
* ```git commit -m "<commit message>"``` : it is used to save the staged changes and premanently records them with the commit message in the repo history.
  
### Exercise-3: Commit one file of two currently staged
Commands Used:
<img width="945" height="129" alt="image" src="https://github.com/user-attachments/assets/7cb5025d-f589-44af-907e-059df978836f" />
* ```git reset <filename>``` : This is used to unstage the file.

### Exercise-4: Ignore unwanted files
Commands Used:
<img width="963" height="200" alt="image" src="https://github.com/user-attachments/assets/29d3c17c-009b-4568-bb11-30c93b71ce42" />
* If we want to add the some extention files (like .o, .exe, .jar ) and directory into .gitignore file then we should write the ```*.o```, ```*.exe```, ```*.jar``` to ignore them from the repo. so that it will not be visible in the repo but it is there.
* If we want to include a directory into a .gitignore then we should write ```<dirname>/``` in it, so that the files in it will also be ignored.
    * for these we can also use commands like``` echo *.o > .gitignore```, ```echo *.exe >> .gitignore```, ```echo *.jar >> .gitignore``` and, ```echo libraries/ >> .gitignore```.

### Exercise-5: Chase branch that escaped
Commands Used:
<img width="931" height="105" alt="image" src="https://github.com/user-attachments/assets/51bb3f39-2e21-4780-9a96-b5d1a8b250a1" />
* ```git merge <branch name>```: It is usefull to merge the feature branch to the main branch or the branch we want it to be in.

### Exercise-6: Resolve a merge conflict
Commands Used:
<img width="945" height="152" alt="image" src="https://github.com/user-attachments/assets/3941060e-bb0c-4a68-a954-8e5e7cb0e3f0" />
*  Merging happens locally, and it creates a new commit that combines histories from both branches. It leads to merge conflicts sometimes, we need to resolve it manually carefully.
* In merge conflict we ussually make the both changes into one, so that it cant lose any changes.

### Exercise-7: Saving your work
Commands Used:
<img width="969" height="201" alt="image" src="https://github.com/user-attachments/assets/942eb858-9764-4191-b951-74ed28c0971e" />
* ```git stash``` : It can be used for saving the work temporly to avoid clutter in work space.

* ```git stash pop``` : This is used after git stash, as this command will return the saved work for us and it removes from the stash memory.
* ```git commit -am "<commit message>"``` : It is like combination 'git add' and 'git commit -m "commit message"'of two commands into one. i.e this command simultaneously adds and commits the file with the commit message.
  
### Exercise-8: Change branch history
Commands Used:
<img width="961" height="115" alt="image" src="https://github.com/user-attachments/assets/ad29332d-5748-4f08-9eb6-1fc5028f1dce" />
* ```git rebase```: Reapplying our commits on top of another branch (or commit), as if they were made from there. It looks linear, and the history of the branch changes. It will open a editor so that if we want to edit a specific commit we have to write edit in place of pick. 
   * <b>Difference between merge and rebase :</b> merge is for combining work without changing old history, but for rebase Updates the total branch into a linear one clear branch.
 
  
### Exercise-9: Remove ignored file
Commands Used:
<img width="961" height="115" alt="image" src="https://github.com/user-attachments/assets/8b3d8dda-f0a6-4e63-a51d-dee64493bef1" />
* When file should be ignored but is tracked for whatever reason, we can always execute ```git rm <file>``` to remove the file from both repository and working area.
  
### Exercise-10: Change a letter case in the filename of an already tracked file
Commands Used:
<img width="961" height="115" alt="image" src="https://github.com/user-attachments/assets/609c6fe0-2545-42b2-824c-53edae17e64a" />
* This command ```git mv (file name) (new file name)``` is used to rename the file name.
  
### Exercise-11: Fix typographic mistake in the last commit
Commands Used:
<img width="961" height="115" alt="image" src="https://github.com/user-attachments/assets/037c4dcf-9a61-476e-9748-45b5f9e239f3" />
* ```git commit --amend``` : It can be used to edit the previous commits and commit messages in git.

### Exercise-12: Forge the commit's date
Commands Used:
<img width="961" height="115" alt="image" src="https://github.com/user-attachments/assets/84606e81-11ef-4d1b-8175-7befb97b628b" />
* ```git commit --amend --no-edit --DATE=YYYY-MM-DD``` : This is used to just change the committed date for a particular commit with no change in commit message.
* ```git commit --amend --no-edit``` : It is used to commit the previous commit message with no edits in it. 

### Exercise-13: Fix typographic mistake in old commit
Commands Used:
<img width="961" height="191" alt="image" src="https://github.com/user-attachments/assets/28c1a9d2-f8e4-4e6f-b6b3-eae975e359a4" />
* ```git rebase -i HEAD~(no of commits)``` :  this is useful for going to the previous commits The no of commits can be 1 or 2 or 3 ..etc.
* ```git rebase --continue``` : It continues to rebase after editing the previous commit and amending or comitting it.

### Exercise-14: Find a commit that has been lost
Commands Used:
<img width="937" height="100" alt="image" src="https://github.com/user-attachments/assets/75c6099d-983f-4100-8d68-cd417f45e302" />
* ```git reset --hard HEAD~(commit)``` : It moves the HEAD to the given commit and deletes all uncommited changes. so that we can do freshly from starting.
* ```git reflog``` : It records where we have been previously. we can find any commit that we have been on with this tool and find commits that we have lost accidentally This includes commits, checkouts, resets, merges, and rebases.
  
### Exercise-15: Split the last commit
Commands Used:
<img width="961" height="174" alt="image" src="https://github.com/user-attachments/assets/26b0248d-c01d-4c0d-8433-b8ab2ca9f290" />
* ```git reset <filename>``` : This is used to unstage the file.
* ```git reset --mixed HEAD~(commit no)``` : This moves the HEAD to the given commit and it keeps the changes in the working directory (they are not staged or added automatically , it is the default)

* ```git reset --soft HEAD~(commit)``` : It moves the HEAD to the given commit and keeps the all changes staged.

### Exercise-16: Too many commits
Commands Used:
<img width="937" height="121" alt="image" src="https://github.com/user-attachments/assets/83054c5a-9ceb-4923-b072-4d3a14755e48" />
* ```git rebase --onto <new-base> <upstream> <branch>```: this is useful when you want to move only a part of a branch to a new base. here new base is the branch or commit you want to move your commits onto, upstream is is where the commits after this will be rebased and branch is the branch that contains the commits you want to move.
  
### Exercise-17: Make the file executable by default
Commands Used:
<img width="937" height="121" alt="image" src="https://github.com/user-attachments/assets/4ce47f4b-0551-4449-b4bc-54c9e5bf32fb" />
* ```git update-index --chmod=+x <filename>``` : This command tells the git to make the particular file to executable as a script or a program. here git update-index updates the changes in the staging area. here x means execute and + means add, - means remove.
  
### Exercise-18: Commit part of work
Commands Used:
<img width="963" height="144" alt="image" src="https://github.com/user-attachments/assets/377eaf98-09e1-421d-8db5-720cdc254e43" />
* ```git add -p ``` : It let us review our changes piece by piece (called as hunks) before adding them to the staging area. This helps us to commit the multiple changes in our file in parts so that all the commits won't be mixed.

  
### Exercise-19: Pick your features
Commands Used:
<img width="963" height="192" alt="image" src="https://github.com/user-attachments/assets/35f877cc-0a91-4f4a-ab45-b06b39941fd6" />
* ```git cherry-pick``` : It copies a specific commit or commits from one branch and applies it to our current branch. This is like picking what we want into our main branch.

### Exercise-20: Rebase complex
Commands Used:
<img width="945" height="87" alt="image" src="https://github.com/user-attachments/assets/c74ff8ae-eadd-4f5a-b41a-6690ca4b5549" />
* ```git rebase --onto <new-base> <upstream> <branch>```: this is useful when you want to move only a part of a branch to a new base. here new base is the branch or commit you want to move your commits onto, upstream is is where the commits after this will be rebased and branch is the branch that contains the commits you want to move.
  
### Exercise-21: Change order of commits
Commands Used:
<img width="945" height="87" alt="image" src="https://github.com/user-attachments/assets/70802d7c-b9de-45cc-9233-937b99e218fd" />

### Exercise-22: Find commits that introduced swearwords
Commands Used:
<img width="945" height="152" alt="image" src="https://github.com/user-attachments/assets/6b772828-f16d-4db9-9972-c8c8c6d34d51" />
* ```gitlog``` : This will show the previous commits that we have done in our repo with time, date, and commit message.

* ```git log -(commit)``` : This will show the last commits that are specified with number of the commit that we have done in our repo with time, date, and commit message.

* ```git log -S <string>``` : This finds commits which are add or remove a specific string in our repo. Here -S stands for “pickaxe search” means it looks for changes that are introduced or removed a specific text in any commit.

  
### Exercise-23: Find commit that has introduced bug
Commands Used:
<img width="1362" height="150" alt="image" src="https://github.com/user-attachments/assets/65671708-0601-408f-9b85-db944e40e8f5" />
* ```git bisect``` : it used to find the exact commit that introduced a bug into the code. This uses binary search to find the bug efficiently. Instead of checking every commit linearly, it cuts the search space in half each time.
   *  If the middle commit is bad, it will only look at the earlier half (between good and middle).
   * If the middle commit is good, it will only look at the later half (between middle and bad).
   * ```git bisect bad ``` ,  This will lets us know about the commit which is bad. simillarly ```git bisect good```for good, we are asking or telling git to find out which is good commit.
   * ```git bisect bad HEAD``` : we are marking the latest commit as "bad" to start the bisect process.
   * ```git bisect good 1.0 ```: we are telling git that the commit tagged 1.0 is good. so that it will check the commits and tells us the first bad commit effeciently.
   * ```git bisect run sh -c "<command>"``` : It is used to automate the bug test with the given comand while bisect.
* ```grep -v <word>``` : it shows all lines that do not match the pattern. usually grep shows lines that match the pattern.
