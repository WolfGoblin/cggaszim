import json
import os
import re

portal_dir = "/Users/yako/Documents/CG GAS/CG GAS Website/portal"
stitch_dir = os.path.join(portal_dir, "stitch_screens")
products_file = os.path.join(portal_dir, "products.json")

with open(products_file, "r") as f:
    products_data = json.load(f)

# Common Navbar HTML
def get_navbar(active_page):
    def active_cls(page):
        if page == active_page:
            return "text-primary dark:text-safety-red font-bold border-b-2 border-primary dark:border-safety-red pb-1"
        return "text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-safety-red transition-colors"

    is_products_active = active_page in ["fireplaces", "geysers"]
    products_btn_cls = "text-primary dark:text-safety-red font-bold pb-1" if is_products_active else "text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-safety-red transition-colors"

    return f'''<!-- Top Navigation Bar -->
<nav class="bg-surface-white dark:bg-industrial-charcoal fixed top-0 w-full z-50 border-b border-border-subtle dark:border-on-surface-variant shadow-sm transition-all duration-300 ease-in-out">
  <div class="flex justify-between items-center px-margin-desktop py-3 max-w-container-max mx-auto px-4 md:px-margin-desktop">
    <a href="index.html" class="flex items-center gap-3">
      <img alt="CG Gas Logo" class="h-10 w-auto" src="../Logos/CG GAS Logo.png" />
    </a>
    
    <div class="hidden md:flex gap-8 items-center">
      <a class="{active_cls('home')}" href="index.html">Home</a>
      <a class="{active_cls('about')}" href="about.html">About</a>
      <a class="{active_cls('services')}" href="services.html">Services</a>
      
      <!-- Products Dropdown Menu -->
      <div class="relative group">
        <button class="{products_btn_cls} flex items-center gap-1 py-2 focus:outline-none">
          Products
          <span class="material-symbols-outlined text-[18px]">expand_more</span>
        </button>
        <div class="absolute left-0 top-full hidden group-hover:block w-52 bg-surface-white dark:bg-industrial-charcoal border border-border-subtle shadow-xl rounded-md py-2 z-50 transition-all duration-200">
          <a href="fireplaces.html" class="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface dark:text-surface-white hover:bg-surface-container hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-[20px] text-safety-red">fireplace</span>
            Gas Fireplaces
          </a>
          <a href="geysers.html" class="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface dark:text-surface-white hover:bg-surface-container hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-[20px] text-safety-red">water_heater</span>
            Gas Geysers
          </a>
        </div>
      </div>

      <a class="{active_cls('contact')}" href="contact.html">Contact</a>
    </div>
    
    <a href="https://wa.me/263777489583" target="_blank" class="hidden md:flex items-center gap-2 bg-primary hover:bg-safety-red text-on-primary font-label-bold px-5 py-2.5 rounded transition-all shadow-sm">
      <span class="material-symbols-outlined text-[20px]">chat</span>
      WhatsApp Us
    </a>

    <!-- Mobile Menu Button -->
    <button id="mobile-menu-btn" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')" class="md:hidden text-primary p-2">
      <span class="material-symbols-outlined text-3xl">menu</span>
    </button>
  </div>
  
  <!-- Mobile Navigation Drawer -->
  <div id="mobile-menu" class="hidden md:hidden border-t border-border-subtle bg-surface-white dark:bg-industrial-charcoal px-6 py-4 space-y-3">
    <a href="index.html" class="block font-body-md text-on-surface hover:text-primary py-1">Home</a>
    <a href="about.html" class="block font-body-md text-on-surface hover:text-primary py-1">About Us</a>
    <a href="services.html" class="block font-body-md text-on-surface hover:text-primary py-1">Services</a>
    <div class="pl-3 border-l-2 border-primary space-y-2 py-1">
      <span class="block text-xs font-bold text-secondary uppercase tracking-wider">Products Catalog</span>
      <a href="fireplaces.html" class="block font-body-md text-primary font-semibold py-1">Gas Fireplaces</a>
      <a href="geysers.html" class="block font-body-md text-primary font-semibold py-1">Gas Geysers</a>
    </div>
    <a href="contact.html" class="block font-body-md text-on-surface hover:text-primary py-1">Contact Us</a>
    <a href="https://wa.me/263777489583" target="_blank" class="flex items-center justify-center gap-2 w-full bg-primary text-on-primary font-label-bold py-2.5 rounded mt-2">
      <span class="material-symbols-outlined text-[20px]">chat</span>
      WhatsApp Us
    </a>
  </div>
</nav>'''

# Modal HTML for product details
modal_html = '''
<!-- Product Details Modal -->
<div id="product-modal" class="fixed inset-0 z-50 hidden bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
  <div class="bg-surface-white dark:bg-industrial-charcoal border border-border-subtle max-w-2xl w-full rounded-xl shadow-2xl overflow-hidden relative my-8">
    <button onclick="closeProductModal()" class="absolute top-4 right-4 bg-surface-container dark:bg-surface-container-high text-on-surface rounded-full p-2 hover:bg-primary hover:text-on-primary transition-colors z-10">
      <span class="material-symbols-outlined">close</span>
    </button>
    <div id="modal-content" class="p-6 md:p-8">
      <!-- Injected via JS -->
    </div>
  </div>
</div>
'''

# Process each screen
pages = {
    "home": ("home.html", "index.html"),
    "about": ("about.html", "about.html"),
    "services": ("services.html", "services.html"),
    "fireplaces": ("fireplaces.html", "fireplaces.html"),
    "geysers": ("geysers.html", "geysers.html"),
    "contact": ("contact.html", "contact.html")
}

for page_key, (source_name, target_name) in pages.items():
    source_path = os.path.join(stitch_dir, source_name)
    with open(source_path, "r") as f:
        html = f.read()

    # Replace Nav
    html = re.sub(r'<nav.*?</nav>', get_navbar(page_key), html, flags=re.DOTALL)

    # Replace image placeholders with local images
    html = html.replace('src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtSLaDTfVOxa1KacHYvQfvA3xIeazRRKJeX6Oc8nLmmlGSfJ-gpF6PDBzAcmRClCed-gN_qABpMyTd_zss7cQefRpuJvRv6n8LWoEW86DjCA77r7aq0MwZ7uMQgHgBJVVy3LR4Rueok4Y8KRqVA-c_VwpUP4cBf2KMfpTkUCqx4ZBs0OwubhKzqTJRGujZ5SA_r9rWuOqFCmz3jCpKD0GnBR61FrTdBlS-2fSUUWlDD6ZT7wpJRHnAetPduR-r5BjUr8M"', 'src="../Logos/CG GAS Logo.png"')

    # Inject modal before </body>
    if modal_html not in html:
        html = html.replace('</body>', f'{modal_html}\n<script src="app.js"></script>\n</body>')

    target_path = os.path.join(portal_dir, target_name)
    with open(target_path, "w") as f:
        f.write(html)

print("HTML pages updated successfully!")
