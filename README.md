# M. Sadhasivam — Personal Portfolio Website

A modern, single-page, fully responsive portfolio built with **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build tools, no dependencies to install. Just open and go.

---

## 📁 File Structure

```
portfolio/
├── index.html          # Complete website (HTML + CSS + JS in one file)
├── resume.pdf          # Downloadable resume (linked to "Download Resume" button)
├── vercel.json          # Vercel deployment configuration (static site)
├── package.json         # Project metadata for Vercel auto-detection
├── assets/              # (optional) place future images, profile photo, favicon here
└── README.md            # This file
```

> The entire site is intentionally kept in **one HTML file** for simplicity, fast loading, and easy hosting on any static platform. If your project grows, you can later split `<style>` → `style.css` and `<script>` → `script.js`.

---

## 🎨 Design Overview

- **Theme**: Dark "deep space navy" with a teal/cyan accent (`#00e5c3`) and warm amber highlight (`#f59e0b`) — a confident, technical, data-science aesthetic. A full light mode is included via the toggle in the navbar.
- **Typography**: `Syne` (display/headings) + `DM Sans` (body) + `JetBrains Mono` (labels/code accents) — distinctive, modern, highly readable.
- **Layout**: Sticky glass-morphism navbar, animated hero with grid background and floating info cards, scroll-reveal animations throughout, animated skill progress bars, card-based projects/certifications, timeline-style education section, and a two-column contact section with a working front-end form.

---

## 🧩 Sections Included

1. **Hero** — Name, title, tagline, CTA buttons (View Projects, Download Resume, Contact Me), key stats, floating info cards.
2. **About** — Rewritten professional summary + 4 highlight cards (AI/ML, Data Analytics, Digital Marketing, Project Leadership).
3. **Skills** — Categorized into Programming Languages, Tools & Analytics (animated progress bars), Digital Marketing, and Professional/Soft Skills (tag-based).
4. **Projects** — Both resume projects fully expanded:
   - AI Animated Education Technology (LearnSpark)
   - Autism Prediction Using Thermal Imaging & Image Processing
   Each includes problem statement, tech stack badges, and key achievements.
5. **Education** — Timeline view of MSc Data Science (Bharathiar University) and BSc Mathematics (Erode Arts and Science College).
6. **Certifications & Courses** — Card grid covering Data Analyst, BI, Digital Marketing, Accounts & Office Skills, Python, and SEO.
7. **Contact** — Email, phone, location, social icons, and a validated contact form with toast notifications.

> **Note on Experience section**: Your resume doesn't list formal work experience/internships yet, so this version focuses on Projects, Education, and Certifications (which is standard and recruiter-friendly for students/early-career profiles). Once you have internships or freelance work, I can add a dedicated "Experience" timeline — the design already supports it (same style as Education).

---

## ⚙️ Setup Instructions

### Option 1: Open directly
Simply double-click `index.html` — it works offline in any modern browser (Chrome, Firefox, Edge, Safari).

### Option 2: Local server (recommended for testing)
```bash
# Using Python
cd portfolio
python3 -m http.server 8000
# Visit http://localhost:8000

# Or using Node
npx serve .
```

---

## 🚀 Deployment Steps

### Netlify (easiest — drag & drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `portfolio` folder onto the page
3. Your site goes live instantly with a free `.netlify.app` URL
4. (Optional) Add a custom domain under **Site settings → Domain management**

### Vercel (Recommended — 2 included config files)

This project now includes **`vercel.json`** and **`package.json`** so Vercel auto-detects it correctly as a static site (no build step needed).

**Option A — Vercel CLI (fastest)**
```bash
# 1. Install Vercel CLI globally (one-time)
npm i -g vercel

# 2. Navigate to the portfolio folder
cd portfolio

# 3. Login (opens browser for auth)
vercel login

# 4. Deploy (preview URL)
vercel

# 5. Deploy to production
vercel --prod
```
After running `vercel`, follow the prompts:
- Set up and deploy → **Y**
- Which scope → select your account
- Link to existing project → **N** (first time)
- Project name → press Enter to accept default or type your own (e.g. `sadhasivam-portfolio`)
- In which directory is your code located → **./** (press Enter)
- Vercel will detect `vercel.json` automatically and deploy as a static site

You'll get a live URL like `https://sadhasivam-portfolio.vercel.app` instantly.

**Option B — Vercel Dashboard (no CLI)**
1. Push this `portfolio` folder to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Click **"Import Git Repository"** and select your repo
4. Framework Preset: Vercel will auto-detect **"Other"** (static) thanks to `vercel.json`
5. Leave Build Command and Output Directory blank (not needed for static HTML)
6. Click **Deploy**

**Custom Domain on Vercel**
1. Go to your project → **Settings → Domains**
2. Add your domain (e.g. `sadhasivam.dev`)
3. Update your DNS records as instructed by Vercel (A record or CNAME)
4. SSL certificate is issued automatically — your site will be live on `https://`

**Redeploying after edits**
```bash
vercel --prod
```
Every push to your linked GitHub branch (if using Option B) also triggers an automatic redeploy.

### GitHub Pages
1. Create a new GitHub repo (e.g., `sadhasivam-portfolio`)
2. Push the `portfolio` folder contents to the `main` branch
3. Go to **Settings → Pages → Source** → select `main` branch, root folder
4. Your site will be live at `https://<username>.github.io/sadhasivam-portfolio/`

---

## 🛠️ Customization Checklist

- [ ] Replace `resume.pdf` with your latest resume (keep the same filename, or update the `href` in the "Download Resume" button)
- [ ] Add your real LinkedIn/GitHub URLs in the Contact section social icons (`#` placeholders)
- [ ] Replace the "MS" avatar initials with a real profile photo (add to `assets/` and swap the `.about-avatar` div for an `<img>`)
- [ ] Connect the contact form to a real backend (Formspree, EmailJS, or Netlify Forms — see below)
- [ ] Add a favicon (suggestion below)

### Favicon Suggestion
Use a minimal monogram favicon — a teal "MS" on a dark navy rounded square (matches the brand colors `#00e5c3` on `#060b18`). You can generate one quickly at [favicon.io/favicon-generator](https://favicon.io/favicon-generator/) using "MS" with the Syne/Poppins font and these exact colors, then add:
```html
<link rel="icon" type="image/png" href="assets/favicon.png" />
```

### Making the Contact Form Functional
The form currently validates and shows a success toast but doesn't send emails. To make it functional with zero backend code:

**Formspree** (recommended, free tier available):
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  ...
</form>
```

**Netlify Forms** (if hosting on Netlify): add `netlify` and `name="contact"` attributes to a `<form>` tag and Netlify handles submissions automatically.

---

## 💡 Future Enhancement Suggestions

1. **Professional photo** — Replace the initials avatar with a real headshot for stronger personal branding.
2. **Live project demos** — Deploy the LearnSpark prototype and Autism Prediction notebook/demo, then link them via the project card icons.
3. **Blog/Articles section** — Showcase data science write-ups (Medium/Dev.to embeds) to demonstrate communication skills.
4. **GitHub activity widget** — Embed a GitHub contribution graph or pinned repos via the GitHub API.
5. **Testimonials section** — Add quotes from professors, mentors, or collaborators once available.
6. **Experience timeline** — Add once internships/freelance work are secured (structure mirrors the Education timeline).
7. **Animated hero illustration** — Replace floating cards with a subtle Lottie/SVG data-visualization animation.
8. **Multi-language toggle** — Given fluency in English and Tamil, a language switcher could broaden reach for local opportunities.
9. **Analytics** — Add Google Analytics or Plausible to track visitor engagement.
10. **PWA support** — Add a manifest + service worker so the portfolio is installable and works offline.

---

## ✅ Accessibility & SEO Notes

- Semantic HTML5 sections (`<nav>`, `<section>`, `<footer>`)
- Descriptive meta tags (`description`, `keywords`, Open Graph) already included in `<head>`
- Color contrast tuned for WCAG AA in both dark and light themes
- All interactive elements are keyboard-focusable (links, buttons, form fields)
- `alt`/`aria-label` attributes included where applicable — add more if you embed images

---

Built with care for **M. Sadhasivam** — Data Science & AI Developer, Erode, Tamil Nadu. 🚀
