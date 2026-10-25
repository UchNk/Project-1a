'use strict';

/* ===== Healthy Recipe Finder — recipes page logic =====
   Runs only on recipes.html (the grid element must exist). */

const RECIPES = [
  { name: 'Rainbow Chickpea Salad Bowl', img: 'chickpea-salad', servings: 2, prep: 15, cook: 15,
    desc: 'Chickpeas, roasted sweet potato, avocado and crunchy veggies with a creamy tahini drizzle.',
    ingredients: ['chickpeas', 'sweet potato', 'avocado', 'cherry tomatoes', 'red cabbage', 'watermelon radish', 'lettuce', 'microgreens', 'tahini'],
    method: 'Roast the sweet potato, arrange the vegetables and chickpeas in a bowl, and drizzle with tahini.' },
  { name: 'Avocado & Egg Wholegrain Toast', img: 'avocado-toast', servings: 1, prep: 5, cook: 10,
    desc: 'Wholegrain toast layered with spinach, creamy avocado and soft boiled egg.',
    ingredients: ['wholegrain bread', 'eggs', 'avocado', 'spinach', 'black pepper'],
    method: 'Boil the eggs, toast the bread, then stack spinach, avocado and sliced egg on top.' },
  { name: 'One-Pan Creamy Pepper Salmon', img: 'lemon-salmon', servings: 2, prep: 10, cook: 15,
    desc: 'Seared salmon simmered in a silky roasted red pepper sauce with lemon and oregano.',
    ingredients: ['salmon fillets', 'roasted red peppers', 'cream', 'garlic', 'oregano', 'lemon', 'black pepper'],
    method: 'Sear the salmon, blend the peppers with cream and garlic, and simmer the fish in the sauce.' },
  { name: 'Quinoa Veggie Power Bowl', img: 'quinoa-bowl', servings: 1, prep: 10, cook: 10,
    desc: 'A bright bowl of quinoa, avocado, broccoli, edamame and crunchy seeds.',
    ingredients: ['quinoa', 'avocado', 'broccoli', 'cucumber', 'edamame', 'spinach', 'pumpkin seeds', 'squash'],
    method: 'Cook the quinoa, steam the broccoli and edamame, then arrange everything in a bowl with seeds.' },
  { name: 'BBQ Chicken & Pineapple Flatbread', img: 'black-bean-tacos', servings: 3, prep: 10, cook: 15,
    desc: 'Shredded chicken, sweet pineapple and red onion on a crisp flatbread.',
    ingredients: ['flatbread', 'shredded chicken', 'pineapple', 'red onion', 'mozzarella', 'tomato sauce', 'cilantro'],
    method: 'Top the flatbread with sauce, chicken, pineapple and cheese, bake until bubbly and add cilantro.' },
  { name: 'Citrus Walnut Garden Salad', img: 'berry-parfait', servings: 2, prep: 10, cook: 0,
    desc: 'Crisp lettuce with carrot, olives, feta and walnuts in an orange dressing.',
    ingredients: ['lettuce', 'carrot', 'red onion', 'olives', 'feta', 'walnuts', 'grapes', 'orange'],
    method: 'Toss the salad ingredients together and dress with fresh orange juice and olive oil.' },
  { name: 'Shrimp & Soft-Egg Ramen Bowl', img: 'lentil-soup', servings: 2, prep: 10, cook: 10,
    desc: 'Savory broth with noodles, snap peas, shrimp and a jammy egg.',
    ingredients: ['ramen noodles', 'shrimp', 'snap peas', 'eggs', 'vegetable broth', 'black sesame', 'chives'],
    method: 'Simmer the broth, cook the noodles and shrimp, then top with snap peas, halved eggs and sesame.' },
  { name: 'Garlic Butter Shrimp Spaghetti', img: 'banana-pancakes', servings: 4, prep: 10, cook: 15,
    desc: 'Juicy shrimp tossed with spaghetti, cherry tomatoes and fresh chives.',
    ingredients: ['spaghetti', 'shrimp', 'cherry tomatoes', 'garlic', 'chives', 'butter', 'olive oil'],
    method: 'Boil the spaghetti, sear the shrimp with garlic, toss everything with tomatoes and finish with chives.' }
];

const grid = document.getElementById('grid');

if (grid) {
  const prepSel = document.getElementById('prepFilter');
  const cookSel = document.getElementById('cookFilter');
  const searchIn = document.getElementById('searchInput');
  const modal = document.getElementById('modal');
  const mins = n => (n === 0 ? '0 min' : `${n} mins`);
  const icon = id => `<svg class="icon"><use href="#${id}"/></svg>`;
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function card(r, i) {
    return `<article class="card">
      <img src="images/${r.img}.jpg" alt="${esc(r.name)}" loading="lazy">
      <div class="body">
        <h3 title="${esc(r.name)}">${esc(r.name)}</h3>
        <p class="desc">${esc(r.desc)}</p>
        <div class="meta">
          <span>${icon('i-person')}Servings: ${r.servings}</span>
          <span>${icon('i-clock')}Prep: ${mins(r.prep)}</span>
          <span>${icon('i-cloche')}Cook: ${mins(r.cook)}</span>
        </div>
      </div>
      <button class="btn btn--pill" data-i="${i}">View Recipe</button>
    </article>`;
  }

  function render() {
    const q = searchIn.value.trim().toLowerCase();
    const maxPrep = prepSel.value === '' ? Infinity : Number(prepSel.value);
    const maxCook = cookSel.value === '' ? Infinity : Number(cookSel.value);

    const list = RECIPES.map((r, i) => ({ r, i })).filter(({ r }) =>
      r.prep <= maxPrep && r.cook <= maxCook &&
      (!q || r.name.toLowerCase().includes(q) || r.ingredients.some(x => x.includes(q))));

    grid.innerHTML = list.length
      ? list.map(({ r, i }) => card(r, i)).join('')
      : '<p class="empty">No recipes match your search. Try a different name, ingredient or time.</p>';
  }

  function openModal(i) {
    const r = RECIPES[i];
    modal.innerHTML = `
      <img src="images/${r.img}.jpg" alt="${esc(r.name)}">
      <div class="dlg">
        <h2>${esc(r.name)}</h2>
        <p>${esc(r.desc)}</p>
        <h4>Ingredients</h4>
        <ul>${r.ingredients.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <h4>Method</h4>
        <p>${esc(r.method)}</p>
        <button class="btn btn--pill" id="closeModal">Close</button>
      </div>`;
    modal.showModal();
  }

  [prepSel, cookSel].forEach(el => el.addEventListener('change', render));
  searchIn.addEventListener('input', render);
  grid.addEventListener('click', e => {
    const b = e.target.closest('button[data-i]');
    if (b) openModal(Number(b.dataset.i));
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.id === 'closeModal') modal.close();
  });

  render();
}
