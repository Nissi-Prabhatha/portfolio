# Prabhatha Nissi Guntur — Nissi OS Portfolio

Interactive recruiter operating system. Multi-file static site, ready for GitHub Pages.

## Deploy (3 steps)

```bash
# 1. Replace your existing MyPortfolio repo contents with these files
git add .
git commit -m "Nissi OS: fusion portfolio redesign"
git push origin main
```

Go to **Settings → Pages → Source: main branch / root**.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main portfolio structure |
| `styles.css` | Full responsive styling + dark/light themes |
| `script.js` | All interactivity: particles, cursor, role switcher, terminal, counters, AI chatbot |
| `assets/Prabhatha_Nissi_Guntur_Resume.pdf` | Your resume (add this file manually) |

## Customize

### Google Analytics
In `index.html`, replace both instances of `G-XXXXXXXXXX` with your GA4 Measurement ID:
- Get it at: analytics.google.com → Admin → Data Streams → Web Stream

### Contact Form (optional)
The email link goes to mailto directly. For a form, sign up at formspree.io.

### Resume PDF
Create an `assets/` folder and place your resume as `Prabhatha_Nissi_Guntur_Resume.pdf`.

### Updating project GitHub links
In `script.js`, find the `projects` array and update each `<a href="https://github.com/Nissi-Prabhatha">` with your actual repo URLs once created.

## Features

- 🎨 Dark/light mode toggle
- ✨ Particle constellation background (mouse-reactive)
- 🖱️ Custom cursor with ring
- 💻 Animated code terminal in hero (types line by line)
- 📊 Animated impact counters
- 🎯 Recruiter Mode role switcher (DE / DS / AI / SWE / DA)
- 🔬 Three interactive labs: ATS Matcher · Command Center · System Blueprint
- 🤖 AI chatbot (knows full background, skills, visa status)
- 📱 Fully mobile responsive
- 🔒 No external APIs needed — everything works offline
