# My writeups site

A small Jekyll site with no external theme. GitHub Pages builds it for you, so there is nothing to install.

## Set up (5 minutes)
1. Create a repo named `YOUR-USERNAME.github.io` and upload everything in this folder.
2. In the repo, go to **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Open `_config.yml` and set `url` (and `baseurl` if needed). Your site appears at `https://YOUR-USERNAME.github.io` after a minute or two.
4. Your profile and look are in `_data/profile.yml` and `_data/appearance.yml`.

If your repo has a different name, set `baseurl: "/repo-name"` in `_config.yml`.

## Easiest way: edit from a web UI (Pages CMS)
1. Go to https://app.pagescms.org and sign in with GitHub.
2. Install the GitHub App on your account and pick your repo. It reads the `.pages.yml` file already in this folder.
3. You get three sections: **Writeups** (write posts in a rich-text editor, add tags, upload images and a cover), **Profile** (name, photo, links, skills, projects) and **Look and feel** (default font and text size).

Every save is a commit, and the site updates a minute later. Raw HTML such as a YouTube embed goes in through the editor's code view.

## Add a post by hand (alternative)
Create a file in `_posts/` named `YYYY-MM-DD-title-with-dashes.md`:

```markdown
---
title: "My writeup title"
subtitle: One line shown under the title and on the home page
tags: [web, ctf, linux]
image: /assets/images/cover.jpg   # optional
---

Your writing in Markdown...
```

Commit it, and it goes live. You can also do this on github.com with **Add file → Create new file**.

## Media
- Upload images to `assets/images/` and use `![Description](/assets/images/name.png)`.
- Videos: paste the YouTube embed inside `<div class="video"> ... </div>` (example in the sample post).
- Links are plain Markdown: `[text](https://...)`.

## Tags
Just list them in each post's `tags`. The Tags page and the topics list on the home page update by themselves.

## Look and feel
- Readers change text size with the **A** buttons and switch light or dark with the half-circle button. Both choices are remembered.
- Default font and text size: **Look and feel** in the CMS, or `_data/appearance.yml`. Accent colour: `--accent` in `assets/css/style.css`.
- Fonts are Newsreader (reading) and Figtree (interface), loaded from Google Fonts.

## Preview on your computer (optional)
Install Ruby, then `gem install bundler jekyll jekyll-feed` and run `jekyll serve`.
