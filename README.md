# Shirt Shack Screen Printing & Embroidery — Website

Biloxi, MS · (228) 861-6587 · [shirtshackscreenprinting.com](https://shirtshackscreenprinting.com)

---

## File Structure

```
shirtshack/
├── index.html        ← Main page (single-page site)
├── style.css         ← All styles
├── script.js         ← Nav, scroll reveal, contact form
├── logo-shirtshack.png   ← ⚠️ Add your logo image here
└── README.md
```

---

## Setup

### 1. Add the Logo

Place the Shirt Shack logo image (square PNG works best) in the project root and name it:

```
logo-shirtshack.png
```

The logo is used in three places: navbar, hero circle, and footer.

### 2. Connect the Contact Form (Formspree)

1. Go to [formspree.io](https://formspree.io) and sign up / log in
2. Create a new form and copy your endpoint URL (looks like `https://formspree.io/f/abcdefgh`)
3. Open `script.js` and replace this line:
   ```js
   const ACTION_URL = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
   with your actual URL.

Until you do this, the form runs in **demo mode** (simulates success without sending).

### 3. Deploy to GitHub Pages

```powershell
cd C:\Users\aalbe\Documents\Dev\shirtshack
git add .
git commit -m "Initial Shirt Shack website"
git push origin main
```

Then in GitHub → **Settings → Pages**, set source to `main` branch, root folder.

Your site will be live at:
`https://aalbertsberg-dotcom.github.io/shirtshack/`

---

## Color Reference

| Token      | Hex       | Usage              |
|------------|-----------|--------------------|
| `--teal`   | `#10C49A` | Primary accent     |
| `--brown`  | `#5C2D0A` | Headings, about bg |
| `--amber`  | `#E8A020` | CTA buttons, stars |
| `--cream`  | `#FFFDF5` | Page background    |

---

## Built by

[Double-A Solutions](https://aalbertsberg.us) — IT Consulting & Web Development
