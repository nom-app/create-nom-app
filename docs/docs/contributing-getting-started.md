---
id: contributing-getting-started
title: How to Contribute
---

## Fork the Repo

To begin contributing, [fork](https://help.github.com/en/articles/fork-a-repo)
the official [Create Nom App](https://github.com/MaximDevoir/create-nom-app)
repository.

## Clone the Repo

Once you have forked the repository, paste the commands below into your
terminal. Remember to replace `USERNAME` with your GitHub username.

```bash
git clone https://github.com/USERNAME/create-nom-app

cd create-nom-app
```

## Create the Branch

Within the project directory, create a branch based off the `master` branch.

```bash
git checkout -b feature/<feature-name>
```

Examples:

```bash
git checkout -b feature/backend-engine-rewrite

git checkout -b docs/pagination master
```

> **Note:** `<feature-name>` should be a two to three word title about
> describing change.

## Keep in Sync

As commits are added into the official repository, your local clone will fall
behind. It is best to periodically sync the official repository with your
branch.

We recommend adding an `upstream` remote.

```bash
git remote add upstream https://github.com/MaximDevoir/create-nom-app.git

git fetch upstream
```

Then

```bash
git pull upstream master
```

Finally, handle any merge conflicts and push to your fork.

<!-- TODO: This looks like a promising
  https://gist.github.com/CristinaSolana/1885435 which appears have been merged
  with https://help.github.com/en/articles/syncing-a-fork and
  https://help.github.com/en/articles/configuring-a-remote-for-a-fork
-->

## Submit the Pull Request

When you are ready to submit your changes, push your local branch to your fork
and create a pull request via GitHub's interface.
