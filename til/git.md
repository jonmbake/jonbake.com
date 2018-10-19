---
layout: default
title: TIL - Git
---

## Tag commit and push
```
git tag -a <tag_name> -m "<tag_message>"
git push origin --tags
```

## Strip commits from remote branch
Note: Not to be done if others have already pulled
```
git reset --hard
git push origin --force
```

## Delete remote branch
```
git push --delete origin <branch_name>
git branch -d <branch_name>
```
