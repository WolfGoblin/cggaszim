// Complete JS Application for CG Gas Portal
import_products_data_placeholder

document.addEventListener('DOMContentLoaded', () => {
  console.log("CG Gas Portal Loaded with Stitch Design", productsData);

  // Setup Fireplaces Catalog Page
  if (document.getElementById('fireplaces-grid') || window.location.pathname.includes('fireplaces.html')) {
    initFireplacesCatalog();
  }

  // Setup Geysers Catalog Page
  if (document.getElementById('geysers-grid') || window.location.pathname.includes('geysers.html')) {
    initGeysersCatalog();
  }
});

// Fireplaces Catalog Logic
function initFireplacesCatalog() {
  const fireplaces = productsData.Fireplaces || [];
  let currentCategory = 'All';

  // Inject filter bar if needed or bind existing buttons
  setupFireplaceFilters(fireplaces);
  renderFireplacesGrid(fireplaces, currentCategory);
}

function setupFireplaceFilters(fireplaces) {
  const container = document.querySelector('main .mb-stack-lg.flex');
  if (!container) return;

  const categories = ['All', 'Drop-In', 'Built-In', 'Wall Mounted', 'Freestanding', 'Outdoor Firepit', 'Gas BBQ/Oven'];
  
  container.innerHTML = categories.map(cat => `
    <button onclick="filterFireplaces('${cat}')" id="fp-tab-${cat.replace(/[^a-zA-Z0-9]/g, '')}" class="fp-tab-btn font-label-bold text-label-bold px-4 py-2 rounded transition-colors ${cat === 'All' ? 'bg-industrial-charcoal text-on-primary' : 'text-secondary hover:text-primary bg-surface-container/50'}">
      ${cat}
    </button>
  `).join('');
}

window.filterFireplaces = function(category) {
  document.querySelectorAll('.fp-tab-btn').forEach(btn => {
    btn.className = "fp-tab-btn font-label-bold text-label-bold px-4 py-2 rounded transition-colors text-secondary hover:text-primary bg-surface-container/50";
  });
  const activeBtn = document.getElementById(`fp-tab-${category.replace(/[^a-zA-Z0-9]/g, '')}`);
  if (activeBtn) {
    activeBtn.className = "fp-tab-btn font-label-bold text-label-bold px-4 py-2 rounded transition-colors bg-industrial-charcoal text-on-primary";
  }
  renderFireplacesGrid(productsData.Fireplaces || [], category);
};

function renderFireplacesGrid(fireplaces, category) {
  const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3') || document.getElementById('fireplaces-grid');
  if (!grid) return;

  const filtered = fireplaces.filter(item => {
    if (!item['Product Name']) return false;
    if (category === 'All') return true;
    return (item.Category || '').toLowerCase().includes(category.toLowerCase());
  });

  grid.innerHTML = filtered.map((item, index) => {
    const defaultImg = '../Pics Homepage Etc/fire [lace home.jpg';
    const imgSrc = item.Image || defaultImg;
    const itemJson = JSON.stringify(item).replace(/'/g, "&apos;").replace(/"/g, "&quot;");

    return `
      <div class="bg-surface-white dark:bg-surface-container-low border border-border-subtle rounded-lg overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
        <div class="relative h-64 overflow-hidden bg-surface-variant">
          <img alt="${item['Product Name']}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${imgSrc}" onerror="this.src='${defaultImg}'" />
          <span class="absolute top-4 left-4 bg-industrial-charcoal text-on-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow">
            ${item.Category || 'Gas Fireplace'}
          </span>
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <h3 class="font-headline-md text-xl font-bold text-on-surface mb-2 line-clamp-1">${item['Product Name']}</h3>
          <p class="font-body-md text-sm text-secondary mb-4 flex-grow line-clamp-3">${item.Description || 'High-performance gas fireplace engineered for modern living.'}</p>
          <button onclick='openProductModal(${itemJson})' class="w-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface py-2.5 rounded font-label-bold text-sm transition-colors border border-border-subtle flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-[18px]">visibility</span>
            View Details
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Geysers Catalog Logic
function initGeysersCatalog() {
  const geysers = productsData.Geysers || [];
  setupGeyserFilters(geysers);
  renderGeysersGrid(geysers, 'All');
}

function setupGeyserFilters(geysers) {
  const container = document.querySelector('main .mb-stack-lg.flex');
  if (!container) return;

  const brands = ['All', 'Paloma', 'Dewhot', 'Fan Forced', 'Constant Temperature', 'Eco-Flow', 'Stainless Steel'];
  
  container.innerHTML = brands.map(b => `
    <button onclick="filterGeysers('${b}')" id="g-tab-${b.replace(/[^a-zA-Z0-9]/g, '')}" class="g-tab-btn font-label-bold text-label-bold px-4 py-2 rounded transition-colors ${b === 'All' ? 'bg-industrial-charcoal text-on-primary' : 'text-secondary hover:text-primary bg-surface-container/50'}">
      ${b}
    </button>
  `).join('');
}

window.filterGeysers = function(filter) {
  document.querySelectorAll('.g-tab-btn').forEach(btn => {
    btn.className = "g-tab-btn font-label-bold text-label-bold px-4 py-2 rounded transition-colors text-secondary hover:text-primary bg-surface-container/50";
  });
  const activeBtn = document.getElementById(`g-tab-${filter.replace(/[^a-zA-Z0-9]/g, '')}`);
  if (activeBtn) {
    activeBtn.className = "g-tab-btn font-label-bold text-label-bold px-4 py-2 rounded transition-colors bg-industrial-charcoal text-on-primary";
  }
  renderGeysersGrid(productsData.Geysers || [], filter);
};

function renderGeysersGrid(geysers, filter) {
  const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3') || document.getElementById('geysers-grid');
  if (!grid) return;

  const filtered = geysers.filter(item => {
    if (!item['Product Name']) return false;
    if (filter === 'All') return true;
    const text = `${item.Brand || ''} ${item.Range || ''} ${item['Product Name'] || ''}`.toLowerCase();
    return text.includes(filter.toLowerCase());
  });

  grid.innerHTML = filtered.map((item) => {
    const defaultImg = '../Pics Homepage Etc/man bathing hot water.jpg';
    const imgSrc = item.Image || defaultImg;
    const itemJson = JSON.stringify(item).replace(/'/g, "&apos;").replace(/"/g, "&quot;");

    return `
      <div class="bg-surface-white dark:bg-surface-container-low border border-border-subtle rounded-lg overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
        <div class="relative h-64 overflow-hidden bg-surface-variant">
          <img alt="${item['Product Name']}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${imgSrc}" onerror="this.src='${defaultImg}'" />
          <span class="absolute top-4 left-4 bg-safety-red text-on-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow">
            ${item.Brand || 'Gas Geyser'} ${item.Range ? '• ' + item.Range : ''}
          </span>
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <h3 class="font-headline-md text-xl font-bold text-on-surface mb-2 line-clamp-1">${item['Product Name']}</h3>
          ${item['Model No.'] ? `<p class="text-xs font-bold text-primary mb-2">Model: ${item['Model No.']}</p>` : ''}
          <p class="font-body-md text-sm text-secondary mb-4 flex-grow line-clamp-3">${item.Description || 'Instant hot water gas geyser with high energy efficiency.'}</p>
          <button onclick='openProductModal(${itemJson})' class="w-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface py-2.5 rounded font-label-bold text-sm transition-colors border border-border-subtle flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-[18px]">visibility</span>
            View Specifications
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Modal popup handler
window.openProductModal = function(product) {
  const modal = document.getElementById('product-modal');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  const title = product['Product Name'] || product.Model;
  const imgSrc = product.Image || '../Pics Homepage Etc/fire [lace home.jpg';

  let specsHtml = '';
  if (product['Key Specs']) {
    specsHtml = `
      <div class="mt-4 p-4 bg-surface-container rounded-lg border border-border-subtle">
        <h4 class="font-bold text-sm text-primary mb-2 flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px]">tune</span> Key Specifications
        </h4>
        <p class="text-xs text-on-surface leading-relaxed">${product['Key Specs']}</p>
      </div>
    `;
  }

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div class="rounded-lg overflow-hidden border border-border-subtle bg-surface-variant max-h-72">
        <img src="${imgSrc}" alt="${title}" class="w-full h-full object-cover" />
      </div>
      <div class="flex flex-col">
        <span class="inline-block bg-industrial-charcoal text-on-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max mb-3">
          ${product.Category || product.Brand || 'CG Gas Product'}
        </span>
        <h2 class="text-2xl font-bold text-on-surface mb-3 leading-snug">${title}</h2>
        ${product['Model No.'] ? `<p class="text-sm font-semibold text-safety-red mb-3">Model No: ${product['Model No.']}</p>` : ''}
        <p class="text-sm text-secondary leading-relaxed mb-4">${product.Description || ''}</p>
        ${specsHtml}
        <div class="mt-6 flex gap-3">
          <a href="https://wa.me/263777489583?text=Hi%20CG%20Gas,%20I%20am%20interested%20in%20${encodeURIComponent(title)}" target="_blank" class="flex-1 bg-safety-red hover:bg-primary text-on-primary text-center font-bold py-3 rounded flex items-center justify-center gap-2 transition-colors shadow">
            <span class="material-symbols-outlined text-[20px]">chat</span>
            Inquire via WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
};

window.closeProductModal = function() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.add('hidden');
};
