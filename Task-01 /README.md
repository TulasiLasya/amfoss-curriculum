## The Commands that i have learnt through these GIT EXERCISES:
* ```git add <filename>``` :
  
* ```git commit -m "<commit message>"``` :
  
* ```git commit -am "<commit message>"``` :
  
* ```git reset <filename>``` :
  
* If we want to add the some extention files (like .o, .exe, .jar ) and directory into .gitignore file then we should write the ```*.o```, ```*.exe```, ```*.jar``` to ignore them from the repo. so that it willnot be visible in the repo but it is there.
* If we want to include a directory into a .gitignore then we should write ```<dirname>/``` in it, so that the files in it will also be ignored.
    * for these we can also use commands like``` echo *.o > .gitignore```, ```echo *.exe >> .gitignore```, ```echo *.jar >> .gitignore``` and, ```echo libraries/ >> .gitignore```.
    
* ```git merge```: It is usefull to merge the feature branch to the main branch or the branch we want it to be in. Merging happens locally, and it creates a new commit that combines histories from both branches. It leads to merge conflicts sometimes, we need to resolve it manually carefully.
  
* ```git push <remote> <source>:<destination>``` : It updates a branch on the remote. i.e it pushes the commits from local ( our PC)to remote branch (GitHub).

* In merge conflict we ussually make the both changes into one, so that it cant lose any changes.

* ```git stash``` :

* ```git stash pop``` :

* ```git rebase```: Reapplying our commits on top of another branch (or commit), as if they were made from there. It looks linear, and the history of the branch changes.
   * <b>Difference between merge and rebase :</b> merge is for combining work without changing old history, but for rebase Updates the total branch into a linear one clear branch.

* ```git rebase -i HEAD~(no of commits)``` :  this is useful for going to the previous commits The no of commits can be 1 or 2 or 3 ..etc.

* ```git commit --amend``` : it can be used to edit the previous commits and commit messages in git.

* ```git rebase --continue``` : it continues to rebase after editing the previous commit and amending or comitting it.

* ```git commit --amend --no-edit``` :

* ```git commit --amend --no-edit --DATE=YYYY-MM-DD``` :

* ```git reset --mixed HEAD~(commit no)``` : soft , hard kuda

* ```git update-index --chmod=+x <filename>

* ```git cherry-pick```

* ```git add -p ``` :

* 
