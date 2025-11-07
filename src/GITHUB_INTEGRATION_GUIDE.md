# 🔗 GitHub Integration Guide for Figma Make

This guide explains how to connect your Figma Make project to GitHub and upload your code.

---

## 🎯 What is GitHub?

GitHub is a platform where developers:
- Store their code
- Track changes (version control)
- Collaborate with others
- Deploy to hosting platforms like Vercel

---

## 📋 Prerequisites

- [ ] GitHub account (free)
- [ ] Git installed on your computer
- [ ] Your Rima Cosmetics project files

---

## Part 1: Set Up GitHub Account (5 minutes)

### Step 1: Create GitHub Account

If you don't have a GitHub account:

1. Go to: **https://github.com**
2. Click **"Sign up"** (top right)
3. Fill in the form:
   - **Email address**: Your email
   - **Password**: Create a strong password
   - **Username**: Choose a username (e.g., `mounica-mk` or `rimacosmetics`)
4. Verify your email address
5. Complete the welcome survey (optional)

### Step 2: Verify Your Email

1. Check your email inbox
2. Find email from GitHub
3. Click the verification link
4. Your account is now active! ✅

---

## Part 2: Install Git (5 minutes)

Git is the tool that uploads code to GitHub.

### For Windows:

1. Download Git from: **https://git-scm.com/download/windows**
2. Run the installer
3. Accept all default settings
4. Click "Next" until installation completes
5. Restart your computer

### For macOS:

1. Open Terminal
2. Run: `git --version`
3. If not installed, macOS will prompt you to install
4. Click "Install" and follow prompts

OR download from: **https://git-scm.com/download/mac**

### For Linux:

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install git

# Fedora
sudo dnf install git
```

### Verify Installation

Open Terminal/Command Prompt and run:
```bash
git --version
```

You should see something like: `git version 2.x.x` ✅

---

## Part 3: Configure Git (2 minutes)

Open Terminal/Command Prompt and run these commands:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email (same as GitHub email)
git config --global user.email "youremail@example.com"
```

Example:
```bash
git config --global user.name "Mounica MK"
git config --global user.email "rimacosmetics@gmail.com"
```

---

## Part 4: Create GitHub Repository (3 minutes)

### Step 1: Create New Repository

1. Login to GitHub: **https://github.com**
2. Click the **"+"** icon (top right corner)
3. Select **"New repository"**

### Step 2: Fill Repository Details

```
Repository name: rima-cosmetics-ecommerce
```
(or any name you prefer, use lowercase and hyphens)

```
Description: 100% Organic Handmade Cosmetics E-Commerce Platform - Built with React, Vite, Tailwind CSS, and Supabase
```

**Visibility**:
- ✅ **Public** - Anyone can see (recommended for portfolio)
- OR **Private** - Only you can see (costs money for private repos on free plan)

**Initialize repository**:
- ❌ **DO NOT** check "Add a README file"
- ❌ **DO NOT** check "Add .gitignore"
- ❌ **DO NOT** check "Choose a license"

Leave all checkboxes UNCHECKED!

### Step 3: Create Repository

Click **"Create repository"** button

---

## Part 5: Upload Your Project to GitHub (5 minutes)

After creating the repository, GitHub shows you a page with commands. Follow these steps:

### Step 1: Open Terminal in Your Project

**Option A - VS Code** (if using VS Code):
1. Open your project in VS Code
2. Go to Terminal → New Terminal

**Option B - Command Prompt/Terminal**:
1. Navigate to your project folder
2. Right-click in the folder → "Open in Terminal" (Windows)
3. Or navigate using `cd` command

Your terminal should be in the folder that contains `App.tsx`, `package.json`, etc.

### Step 2: Initialize Git Repository

Run these commands **one by one**:

```bash
# Initialize Git in this folder
git init
```

You should see: `Initialized empty Git repository`

### Step 3: Add All Files

```bash
# Add all files to Git
git add .
```

The `.` means "all files in this folder"

### Step 4: Create First Commit

```bash
# Create a commit (snapshot of your code)
git commit -m "Initial commit: Rima Cosmetics E-Commerce Platform"
```

You should see a summary of files added.

### Step 5: Set Main Branch

```bash
# Rename branch to 'main'
git branch -M main
```

### Step 6: Connect to GitHub

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Connect to your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/rima-cosmetics-ecommerce.git
```

Example:
```bash
git remote add origin https://github.com/mounica-mk/rima-cosmetics-ecommerce.git
```

### Step 7: Push Code to GitHub

```bash
# Upload your code to GitHub
git push -u origin main
```

**If prompted for credentials:**
- Username: Your GitHub username
- Password: Your GitHub password (or Personal Access Token)

> **Note**: GitHub may require a Personal Access Token instead of password. If you get an error, see "Troubleshooting" section below.

### Step 8: Verify Upload

1. Go to your GitHub repository URL:
   ```
   https://github.com/YOUR_USERNAME/rima-cosmetics-ecommerce
   ```
2. You should see all your project files! 🎉

---

## 🔐 Personal Access Token (If Needed)

GitHub now requires Personal Access Tokens instead of passwords for command-line access.

### Create Personal Access Token:

1. Go to GitHub → Click your profile picture → **Settings**
2. Scroll down left sidebar → Click **Developer settings**
3. Click **Personal access tokens** → **Tokens (classic)**
4. Click **Generate new token** → **Generate new token (classic)**
5. Fill in:
   ```
   Note: Rima Cosmetics GitHub Access
   Expiration: 90 days (or your preference)
   ```
6. Check these scopes:
   - ✅ `repo` (Full control of private repositories)
7. Click **Generate token**
8. **IMPORTANT**: Copy the token NOW (you won't see it again!)
   - Looks like: `ghp_xxxxxxxxxxxxxxxxxxxx`
9. Save it somewhere safe (password manager)

### Use Token for Push:

When running `git push`, use:
- **Username**: Your GitHub username
- **Password**: Paste your Personal Access Token (NOT your GitHub password)

---

## 📦 .gitignore File

Before pushing, it's good practice to create a `.gitignore` file to exclude unnecessary files.

### Create .gitignore:

In your project root, create a file named `.gitignore` (note the dot at the start):

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
dist/
build/

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor
.vscode/
.idea/
*.swp
*.swo
*~

# OS
Thumbs.db
```

Then add and commit:
```bash
git add .gitignore
git commit -m "Add .gitignore"
git push
```

---

## 🔄 Making Updates to Your Code

After initial upload, whenever you make changes:

### Step 1: Make Changes
Edit your code files as needed.

### Step 2: Check What Changed
```bash
# See what files changed
git status
```

### Step 3: Add Changes
```bash
# Add all changed files
git add .

# OR add specific files
git add App.tsx components/Footer.tsx
```

### Step 4: Commit Changes
```bash
# Create commit with descriptive message
git commit -m "Fix footer navigation links"
```

Good commit messages:
- ✅ "Fix footer navigation links"
- ✅ "Add new product images"
- ✅ "Update WhatsApp phone number"
- ❌ "Update" (too vague)
- ❌ "Changes" (not descriptive)

### Step 5: Push to GitHub
```bash
# Upload to GitHub
git push
```

Your changes are now on GitHub! 🎉

---

## 🌿 Understanding Git Branches

Branches let you work on features without affecting the main code.

### Create New Branch:
```bash
# Create and switch to new branch
git checkout -b add-new-feature
```

### Make Changes and Commit:
```bash
git add .
git commit -m "Add new feature"
git push -u origin add-new-feature
```

### Merge Back to Main:
```bash
git checkout main
git merge add-new-feature
git push
```

---

## 🔗 Connect GitHub to Vercel

Once your code is on GitHub, deploying to Vercel is super easy!

See **`DEPLOY_TO_VERCEL.md`** for complete instructions.

Quick summary:
1. Go to vercel.com
2. Sign up with GitHub
3. Import your repository
4. Deploy! ✅

Vercel will automatically redeploy whenever you push to GitHub.

---

## 🚨 Troubleshooting

### Error: "Permission denied (publickey)"

**Solution**:
Use HTTPS instead of SSH:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/rima-cosmetics-ecommerce.git
```

---

### Error: "fatal: not a git repository"

**Solution**:
Make sure you're in the correct folder and ran `git init`:
```bash
pwd  # Check current directory
cd /path/to/your/project
git init
```

---

### Error: "failed to push some refs"

**Solution**:
Pull changes first, then push:
```bash
git pull origin main --rebase
git push
```

---

### Can't Remember GitHub Password

**Solution**:
Use Personal Access Token instead (see section above)

---

### Files Not Showing on GitHub

**Solution**:
Check if files were added:
```bash
git status
git add .
git commit -m "Add missing files"
git push
```

---

## 📚 Useful Git Commands

### Check Status
```bash
git status  # See what's changed
```

### View Commit History
```bash
git log  # See all commits
git log --oneline  # Compact view
```

### Undo Changes
```bash
git restore filename.tsx  # Undo changes to a file
git reset HEAD~1  # Undo last commit (keeps changes)
```

### View Remote
```bash
git remote -v  # See connected GitHub repository
```

### Pull Latest Changes
```bash
git pull  # Download latest from GitHub
```

---

## 🎓 Learning Resources

### Git Tutorials
- Interactive Tutorial: https://learngitbranching.js.org
- GitHub Docs: https://docs.github.com/en/get-started
- Git Handbook: https://guides.github.com/introduction/git-handbook/

### Videos
- Git & GitHub Crash Course: Search YouTube for "Git GitHub tutorial"
- GitHub Learning Lab: https://lab.github.com

---

## 💡 Best Practices

### 1. Commit Often
Make small, frequent commits rather than huge ones.

### 2. Write Good Commit Messages
- Start with a verb: "Add", "Fix", "Update", "Remove"
- Be specific: "Fix footer navigation links" not "Fix bug"
- Keep under 50 characters for the title

### 3. Pull Before Push
Always pull latest changes before pushing:
```bash
git pull
git push
```

### 4. Don't Commit Secrets
Never commit:
- API keys
- Passwords
- Database credentials
- `.env` files with secrets

### 5. Use Branches for Features
Work on new features in separate branches.

---

## 🎯 Quick Reference

### First Time Setup:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### Regular Updates:
```bash
git add .
git commit -m "Description of changes"
git push
```

### Check Everything:
```bash
git status
git log
git remote -v
```

---

## ✅ Checklist

- [ ] GitHub account created
- [ ] Git installed on computer
- [ ] Git configured with name and email
- [ ] Repository created on GitHub
- [ ] Code uploaded to GitHub
- [ ] Can see files on GitHub website
- [ ] Know how to make updates
- [ ] Know how to check status

---

## 🎉 Success!

Your code is now on GitHub! This means:

✅ Your code is backed up in the cloud
✅ You can access it from anywhere
✅ You can collaborate with others
✅ You can easily deploy to Vercel
✅ You have version history of all changes

---

## 🚀 Next Steps

1. ✅ Code is on GitHub
2. ➡️ Deploy to Vercel (see `DEPLOY_TO_VERCEL.md`)
3. ➡️ Share your live site with customers!

---

**Your Project is Now Version-Controlled! 🎊**

*GitHub Integration Guide v1.0 - Rima Cosmetics*
