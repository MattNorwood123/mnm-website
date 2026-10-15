# MJ Maintenance Website — Claude Instructions

## Your main job here

When Matt pastes blog content and asks you to publish it, your job is to:

1. Format it as a properly structured markdown post
2. Save it to the `posts/` folder with the correct filename
3. Commit and push it — Netlify will deploy automatically within about 60 seconds

---

## Publishing a blog post

### File location
All posts go in `/posts/` as `.md` files.

### Filename format
```
YYYY-MM-DD-short-descriptive-slug.md
```
Example: `2026-10-15-how-to-fix-a-dripping-tap.md`

Use today's date. Keep the slug short, lowercase, hyphens only, no special characters.

### Required frontmatter
Every post must start with this frontmatter block:

```yaml
---
title: "Full title of the post"
date: YYYY-MM-DD
category: Guides
description: "One or two sentences summarising the post. Shown on the blog listing page and used as the meta description."
image: /images/gallery/project-3.jpg
---
```

**Category options** (pick the closest fit):
- `Guides` — how-to content, planning guides, step-by-step advice
- `Tips & Tricks` — quick tips, maintenance advice, small fixes
- `Case Studies` — specific project write-ups
- `News` — company news, offers, announcements

**Image:** Use one of the existing gallery images unless Matt specifies otherwise:
- `/images/gallery/project-1.jpg`
- `/images/gallery/project-2.jpg`
- `/images/gallery/project-3.jpg`
- `/images/gallery/project-4.jpg`
- `/images/gallery/project-5.jpg`

Pick whichever looks most relevant to the post topic.

### Body formatting
- Use `##` for main section headings, `###` for sub-headings
- Use bullet points and bold text to break up longer sections
- Keep paragraphs short — this is a trades website, not a magazine
- End with a short call to action paragraph mentioning the relevant service and encouraging the reader to get in touch on **07969 359683** or via the website

---

## After creating the post file

Run these commands to publish it:

```bash
git add posts/YYYY-MM-DD-your-slug.md
git commit -m "Add blog post: [title of the post]"
git push
```

Netlify will pick up the push and rebuild the site. The post will be live at `https://mjmaintenance.co.uk/blog/` within about 60 seconds.

---

## Important — keep these consistent

- **Brand name:** MJ Maintenance (never "MNM", "Matt Norwood Maintenance" or anything else)
- **Phone number:** 07969 359683
- **WhatsApp:** 447969359683

Matt is free to update any page on the site — landing pages, homepage, service descriptions, anything. Just keep the phone number, WhatsApp number and brand name consistent throughout.

---

## Site overview (so you know what you're working with)

- Static site built with **Eleventy**, hosted on **Netlify**
- Blog posts are markdown files in `/posts/` — Eleventy turns them into pages automatically
- The blog listing page is at `/blog/`
- Images live in `/images/` and `/images/gallery/`
- Shared CSS is in `/css/`
- The site deploys automatically whenever changes are pushed to the `main` branch on GitHub
