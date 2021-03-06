---
layout: default
title: Basic Git Contribution Workflow
tags:
  - front-page
---

[Git](https://git-scm.com/) can be complicated. There are forks, branches, commits, rebases (oh, my!). Git is also the language necessary to contribute to open source, so learning the basics is well worth the effort. The following is a basic git workflow to contribute to any open source project using git version control. The examples throughout this post demonstrate making a contribution to the [n8n project](https://github.com/n8n-io/n8n).

## 1 - Fork the Repository

The first step is to fork the project that you want to contribute to. A fork basically makes a copy of the repository that you can then modify. In _Github_, you simply click the fork button on the main repository page:

![](/assets/images/2021-02-23-basic-git-contribution-workflow-0e21c6c7.png)

After the forking process is complete, you'll have your own forked repository to work off of:

![](/assets/images/2021-02-23-basic-git-contribution-workflow-7d30eac5.png)

Click the button to copy the _Clone HTTPS URL_. We'll use it in the next step.

## 2 - Clone the Fork

Now that you have forked the repository, the next step is to clone the fork onto your development machine. Cloning will copy the code onto your computer so you can modify it locally. To clone, we'll run the `git clone` command in the terminal:

```
git clone https://github.com/jonmbake/n8n.git
```

## 3 - Add Upstream Remote

Remotes are used to reference your fork and the main repository (living on github.com) from your local clone. The remote that the repository was cloned from automatically gets set to `origin`. To make it easier to `git fetch` or `git pull` changes from the main repository, it's useful to set a remote to the main repository URL, which will call `upstream` by convention. To do this run `git remote add upstream`:

```
git remote add upstream https://github.com/n8n-io/n8n.git
```

## 4 - Check Out the Development Branch

You'll be submitting a pull request to a development branch. Checkout the branch you're going to be submitting a pull request to. Usually, `main` or `master` is the branch under current development:

```
git checkout master
```

It's also a good idea to `git pull` to ensure you are working off of the most recent changes:

```
git pull upstream master
```

## 5 - Create a Feature Branch Off of the Development Branch

The next step is to create a branch where you will do your work. This can be done via `git checkout -b`:

```
git checkout -b fix-1364-mouse-selection-zoom
```

It's a good idea to name your feature branch as a short description of the change you intend to make. In this case, I am fixing a bug with mouse selection when zoomed.

## 6 - Make Some Code Changes, Add and Commit

Now you're all set to start coding! Make some changes, stage the code changes by running `git add` and then commit:

```
git add .
git commit -m 'Fixes #1364 - Incorrect mouse selection when zoomed in or out'
```

*Pro tip:* Make sure to break up larger changes into smaller commits with [good commit messages](https://chris.beams.io/posts/git-commit/).

*Pro tip 2:* In Github, by prefacing your commits with “Fixes”, “Fixed”, “Fix”, “Closes”, “Closed”, or “Close” when the commit is merged, it will automatically link to the issue from the commit and close the issue when merged.

## 7 - Push Your Changes

Once your code changes are committed, you can push your commits up to your fork, i.e. `origin`:

```
git push origin fix-1364-mouse-selection-zoom
```

Which will output the URL to create the pull request:

```
Projects/n8n - (fix-1364-mouse-selection-zoom) > git push origin fix-1364-mouse-selection-zoom
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 326 bytes | 326.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0)
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
remote:
remote: Create a pull request for 'fix-1364-mouse-selection-zoom' on GitHub by visiting:
remote:      https://github.com/jonmbake/n8n/pull/new/fix-1364-mouse-selection-zoom
remote:
To https://github.com/jonmbake/n8n.git
 * [new branch]        fix-1364-mouse-selection-zoom -> fix-1364-mouse-selection-zoom
 ```

 At this step, we can navigate to the pull request URL.

## 8 - Submit the Pull Request

The final step in this journey is to submit a pull request. As with commit messages, provide a detailed explanation of the change to the code reviewer:

![](/assets/images/2021-02-23-basic-git-contribution-workflow-d8568084.png)

## 9 -  Making Further Changes Based on Code Review

Code reviewers may request additional changes. No problem! Just push further commits up to the `origin` feature branch and they will automatically get added to the existing pull request.

If changes are made on the main development branch while you are working on your feature, it will get behind. In which case, you can fetch/pull from upstream and rebase onto your feature branch to "sync up the branches":

```
git checkout master
git pull upstream master
git checkout fix-1364-mouse-selection-zoom
git rebase master
git push origin fix-1364-mouse-selection-zoom -f
```
