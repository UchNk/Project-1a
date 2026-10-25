# Healthy Recipe Finder

A two-page, responsive website for browsing quick, whole-food recipes, built with plain HTML, CSS and JavaScript. There are no frameworks and no build step.

## Pages

| Page | File | What it has |
|---|---|---|
| Home | `index.html` | Hero with call to action, "What you'll get" features, "Built for real life" section, "Ready to cook smarter?" banner |
| Recipes | `recipes.html` | Search box, prep-time and cook-time filters, a grid of 8 recipe cards, and a "View Recipe" pop-up |

## Project structure

```
healthy-recipe-finder/
├── index.html
├── recipes.html
├── styles.css        Shared styles for both pages
├── script.js         Recipe data, search, filters and pop-up (runs on recipes.html)
├── README.md
└── images/
    ├── hero.jpg           Home page chef photo (top)
    ├── real-life.jpg      Home page chef photo ("Built for real life")
    ├── chickpea-salad.jpg
    ├── avocado-toast.jpg
    ├── lemon-salmon.jpg
    ├── quinoa-bowl.jpg
    ├── black-bean-tacos.jpg
    ├── berry-parfait.jpg
    ├── lentil-soup.jpg
    └── banana-pancakes.jpg
```

Keep the files and the `images/` folder together. Paths are relative.

## How to run

1. Open the `healthy-recipe-finder` folder.
2. Double-click `index.html`, or serve the folder:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`.
3. An internet connection loads the Google Fonts (Nunito and Fraunces). Without it the site falls back to Segoe UI, Arial and Georgia.

## Features

- **Search:** type a recipe name or an ingredient (for example `lentil` or `avocado`). Results update as you type.
- **Filters:** "Max Prep Time" and "Max Cook Time" show only recipes at or under the chosen time. Search and both filters work together.
- **Empty state:** a message appears when nothing matches.
- **View Recipe:** opens a pop-up with the photo, ingredients and a short method. Close it with the Close button, by clicking outside it, or with the Esc key.
- **Responsive:** 3 recipe columns on desktop, 2 on tablets, 1 on phones. The header navigation wraps below the logo on small screens.

## Where to change things

### Recipes (`script.js`, the `RECIPES` array at the top)
Each recipe looks like this:
```js
{ name: 'Lentil & Spinach Soup', img: 'lentil-soup', servings: 4, prep: 10, cook: 20,
  desc: 'A hearty 30-minute soup rich in plant protein and iron.',
  ingredients: ['red lentils', 'spinach', ...],
  method: 'Soften the onion, ...' }
```
- `img` is the file name inside `images/`, without `.jpg`. Recipe photos display at a 6:5 ratio. The file names are kept from the original design, so a file name does not always describe the dish (for example, `lentil-soup.jpg` shows the ramen bowl). Rename a file and its `img` value together if you want them to match.
- `prep` and `cook` are in minutes. Use `0` for no cooking.
- To add a recipe, add an object, add its photo to `images/`, and the grid updates automatically.
- If you add recipes with new time values, add matching `<option>` entries to the two filters in `recipes.html` (prep goes up to 15 minutes and cook up to 30 minutes at the moment).

### Colors and fonts (`styles.css`, `:root` at the top)
```css
--ink:#17362e;     /* dark green: headings, buttons */
--orange:#f59a68;  /* active nav underline, accents */
--peach:#fbd6c0;   /* highlight behind "Healthy" */
--lav:#c3c7ee;     /* decorative arcs */
--teal:#4db39b;
```

### Text and photos
- Headings, paragraphs and links are plain HTML in `index.html` and `recipes.html`.
- Replace any file in `images/` with your own photo using the same name. Recipe photos display at a 6:5 ratio and are cropped to fit.
- The "About" link in the header scrolls to the "Built for real life" section on the home page.
- Social icons in the footer link to `#`. Replace them with your real profile URLs.

### Logo
The logo is an inline SVG (a leaf and flame) in the `.brand` link at the top of both HTML files. Edit it in both files to change it.

## Notes

- All photos are the images you provided: the two chef photos on the home page and the 8 food photos on the recipes page. Recipe photos were cropped to a 6:5 shape.
- The recipe ingredients and methods are short sample text. Edit them to match your real recipes.
