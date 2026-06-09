const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function initChrome() {
  const header = qs(".site-header");
  const menuBtn = qs(".menu-btn");
  const nav = qs(".nav-links");
  const logo = qs(".brand-logo");
  const mark = qs(".brand-mark");
  const year = qs("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
  if (logo) {
    logo.addEventListener("load", () => {
      logo.style.display = "block";
      if (mark) mark.style.display = "none";
    });
    logo.addEventListener("error", () => {
      logo.style.display = "none";
      if (mark) mark.style.display = "grid";
    });
  }
  const updateHeader = () => header && header.classList.toggle("scrolled", window.scrollY > 28);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  }
  qsa("[data-whatsapp]").forEach((link) => { link.href = siteConfig.whatsapp; });
  qsa("[data-phone]").forEach((link) => { link.textContent = siteConfig.phone; link.href = siteConfig.phoneHref; });
  qsa("[data-email]").forEach((link) => { link.textContent = siteConfig.email; link.href = `mailto:${siteConfig.email}`; });
  qsa("[data-map]").forEach((frame) => { frame.src = siteConfig.mapEmbed; });
}

function initReveal() {
  const items = qsa(".reveal");
  if (!items.length || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

function imageWithFallback(src, alt) {
  return `
    <div class="category-visual">
      <img src="${src}" alt="${alt}" loading="lazy">
    </div>
  `;
}
function renderCategoryCards(limit) {
  const grid = qs("[data-category-grid]");
  if (!grid) return;
  const items = limit ? categories.slice(0, limit) : categories;
  grid.innerHTML = items.map((category) => `
    <a class="category-card reveal" href="categories/${category.slug}.html">
      ${imageWithFallback(categoryImage(category.slug), category.name)}
      <div class="category-body">
        <h3>${category.name}</h3>
        <p>${category.intro}</p>
        <span class="link-more">View sample designs</span>
      </div>
    </a>
  `).join("");
  initReveal();
}

function renderFooterCategories() {
  const list = qs("[data-footer-categories]");
  if (!list) return;
  list.innerHTML = categories.slice(0, 8).map((category) => `<li><a href="${pathPrefix()}categories/${category.slug}.html">${category.name}</a></li>`).join("");
}

function pathPrefix() {
  return location.pathname.includes("/categories/") ? "../" : "";
}

function renderCategoryPage() {
  const page = qs("[data-category-page]");
  if (!page) return;
  const slug = location.pathname.split("/").pop().replace(".html", "") || "pens";
  const category = getCategory(slug);
  document.title = `${category.name} | Capital Marketing & Trading Pvt. Ltd.`;
  qs("[data-category-title]").textContent = category.name;
  qs("[data-category-intro]").textContent = category.intro;
  qs("[data-category-breadcrumb]").textContent = category.name;
  const gallery = qs("[data-product-gallery]");
  gallery.innerHTML = sampleNames.map((name, index) => `
    <article class="product-card reveal">
      <div class="product-visual">
  <img src="../assets/images/products/${category.slug}-${index + 1}.jpg"
       alt="${name}"
       loading="lazy">
</div>
      <div class="product-body">
        <h3>${name}</h3>
        <p>Sample design for corporate branding, institutional distribution, and bulk gifting programs.</p>
      </div>
    </article>
  `).join("");
  qs("[data-spec-category]").textContent = category.name;
  qs("[data-category-cta]").textContent = `Need more ${category.name} designs? Contact us for the full catalogue.`;
  initReveal();
}

function initProductFilters() {
  const toolbar = qs("[data-product-filter]");
  const grid = qs("[data-category-grid]");
  if (!toolbar || !grid) return;
  toolbar.innerHTML = `<button class="filter-btn active" data-filter="all">All Categories</button>` +
    categories.map((category) => `<button class="filter-btn" data-filter="${category.slug}">${category.name}</button>`).join("");
  toolbar.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    qsa(".filter-btn", toolbar).forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    const items = filter === "all" ? categories : categories.filter((category) => category.slug === filter);
    grid.innerHTML = items.map((category) => `
      <a class="category-card reveal visible" href="categories/${category.slug}.html">
        ${imageWithFallback(categoryImage(category.slug), category.name)}
        <div class="category-body">
          <h3>${category.name}</h3>
          <p>${category.intro}</p>
          <span class="link-more">Open category</span>
        </div>
      </a>
    `).join("");
  });
}



document.addEventListener("DOMContentLoaded", () => {
  initChrome();
  renderCategoryCards(Number(qs("[data-category-grid]")?.dataset.limit || 0));
  renderFooterCategories();
  renderCategoryPage();
  initProductFilters();
  initReveal();
});

