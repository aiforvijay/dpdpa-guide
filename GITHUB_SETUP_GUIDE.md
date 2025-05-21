# GitHub Repository Setup Guide

This guide will walk you through the process of creating a GitHub repository and uploading your DPDPA Guide web application.

## Prerequisites

1. A GitHub account - [Sign up here](https://github.com/join) if you don't have one
2. Git installed on your computer - [Download Git](https://git-scm.com/downloads)

## Step 1: Create a New Repository on GitHub

1. Log in to your GitHub account
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Fill in the repository details:
   - Repository name: `dpdpa-guide` (or any name you prefer)
   - Description: "A comprehensive guide to the Digital Personal Data Protection Act for Chartered Accountants"
   - Choose "Public" or "Private" visibility based on your preference
   - Do NOT initialize the repository with a README, .gitignore, or license (we'll add these ourselves)
4. Click "Create repository"

## Step 2: Initialize Your Local Repository

1. Extract the zip file containing the source code to a folder on your computer
2. Open a terminal or command prompt
3. Navigate to the extracted folder:
   ```bash
   cd path/to/extracted/folder
   ```
4. Initialize a new Git repository:
   ```bash
   git init
   ```

## Step 3: Add and Commit Your Files

1. Add all files to the staging area:
   ```bash
   git add .
   ```
2. Commit the files with an initial commit message:
   ```bash
   git commit -m "Initial commit: DPDPA Guide web application"
   ```

## Step 4: Connect to GitHub and Push Your Code

1. Connect your local repository to the GitHub repository you created:
   ```bash
   git remote add origin https://github.com/yourusername/dpdpa-guide.git
   ```
   (Replace `yourusername` with your GitHub username and `dpdpa-guide` with your repository name)

2. Push your code to GitHub:
   ```bash
   git push -u origin main
   ```
   
   Note: If you're using an older version of Git, you might need to use `master` instead of `main`:
   ```bash
   git push -u origin master
   ```

3. If prompted, enter your GitHub credentials

## Step 5: Verify Your Repository

1. Go to `https://github.com/yourusername/dpdpa-guide` in your browser
2. Confirm that all your files have been uploaded successfully

## Step 6 (Optional): Set Up GitHub Pages

If you want to host your application directly from GitHub:

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch and "/docs" folder (you'll need to move your build files to a docs folder)
5. Click "Save"
6. Your site will be published at `https://yourusername.github.io/dpdpa-guide/`

## Additional Tips

- **Branches**: Create new branches for features or fixes:
  ```bash
  git checkout -b feature-name
  ```

- **Updates**: After making changes, commit and push them:
  ```bash
  git add .
  git commit -m "Description of changes"
  git push
  ```

- **Pull Changes**: If you make changes directly on GitHub or from another computer:
  ```bash
  git pull
  ```

- **GitHub Desktop**: If you prefer a GUI over command line, consider using [GitHub Desktop](https://desktop.github.com/)

## Troubleshooting

- **Authentication Issues**: If you have trouble authenticating, consider using a personal access token or SSH key
- **Large Files**: GitHub has a file size limit of 100MB. If you have larger files, consider using Git LFS
- **Merge Conflicts**: If you encounter merge conflicts, resolve them by editing the conflicted files

For more help, refer to [GitHub's documentation](https://docs.github.com/en)
