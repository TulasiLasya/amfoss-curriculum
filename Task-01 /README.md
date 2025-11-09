## The Commands that i have learnt through these GIT EXERCISES:
* ```git add <filename>``` : it is used to stage the changes that we want to include into the commit.
  
* ```git commit -m "<commit message>"``` : it is used to save the staged changes and premanently records them with the commit message in the repo history.
  
* ```git commit -am "<commit message>"``` : It is the combination of above two commands into one. i.e this command simultaneously adds and commits the file with the commit message.
  
* If we want to add the some extention files (like .o, .exe, .jar ) and directory into .gitignore file then we should write the ```*.o```, ```*.exe```, ```*.jar``` to ignore them from the repo. so that it willnot be visible in the repo but it is there.
* If we want to include a directory into a .gitignore then we should write ```<dirname>/``` in it, so that the files in it will also be ignored.
    * for these we can also use commands like``` echo *.o > .gitignore```, ```echo *.exe >> .gitignore```, ```echo *.jar >> .gitignore``` and, ```echo libraries/ >> .gitignore```.
    
* ```git merge```: It is usefull to merge the feature branch to the main branch or the branch we want it to be in. Merging happens locally, and it creates a new commit that combines histories from both branches. It leads to merge conflicts sometimes, we need to resolve it manually carefully.
  
* ```git push <remote> <source>:<destination>``` : It updates a branch on the remote. i.e it pushes the commits from local ( our PC)to remote branch (GitHub).

* In merge conflict we ussually make the both changes into one, so that it cant lose any changes.

* ```git stash``` : It can be used for saving the work temporly to avoid clutter in work space.

* ```git stash pop``` : This is used after git stash, as this command will return the saved work for us and it removes from the stash memory.

* ```git rebase```: Reapplying our commits on top of another branch (or commit), as if they were made from there. It looks linear, and the history of the branch changes. It will open a editor so that if we want to edit a specific commit we have to write edit in place of pick. 
   * <b>Difference between merge and rebase :</b> merge is for combining work without changing old history, but for rebase Updates the total branch into a linear one clear branch.

* ```git rebase -i HEAD~(no of commits)``` :  this is useful for going to the previous commits The no of commits can be 1 or 2 or 3 ..etc.

* ```git commit --amend``` : It can be used to edit the previous commits and commit messages in git.

* ```git rebase --continue``` : It continues to rebase after editing the previous commit and amending or comitting it.

* ```git commit --amend --no-edit``` : It is used to commit the previous commit message with no edits in it. 

* ```git commit --amend --no-edit --DATE=YYYY-MM-DD``` : This is used to just change the committed date for a particular commit with no change in commit message.

* ```git reset <filename>``` : This is used to cahnge the HEAD from one point to another.

* ```git reset --mixed HEAD~(commit no)``` : This moves the HEAD to the given commit and it keeps the changes in the working directory (they are not staged or added automatically , it is the default)

* ```git reset --soft HEAD~(commit)``` : It moves the HEAD to the given commit and keeps the all changes staged.

* ```git reset --hard HEAD~(commit)``` : It moves the HEAD to the given commit and deletes all uncommited changes. so that we can do freshly from starting.

* ```git update-index --chmod=+x <filename>``` : This command tells the git to make the particular file to executable as a script or a program. here git update-index updates the changes in the staging area. here x means execute and + means add, - means remove.

* ```git rebase --onto <new-base> <upstream> <branch>```: this is useful when you want to move only a part of a branch to a new base. here new base is the branch or commit you want to move your commits onto, upstream is is where the commits after this will be rebased and branch is the branch that contains the commits you want to move.

* ```git cherry-pick``` : It copies a specific commit or commits from one branch and applies it to our current branch. This is like picking what we want into our main branch.

* ```git add -p ``` : It let us review our changes piece by piece (called as hunks) before adding them to the staging area. This helps us to commit the multiple changes in our file in parts so that all the commits won't be mixed.

* ```gitlog``` : This will show the previous commits that we have done in our repo with time, date, and commit message.

* ```git log -(commit)``` : This will show the last commits that are specified with number of the commit that we have done in our repo with time, date, and commit message.

* ```git log -S <string>``` : This finds commits which are add or remove a specific string in our repo. Here -S stands for “pickaxe search” means it looks for changes that are introduced or removed a specific text in any commit.
