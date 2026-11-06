(function () {
  "use strict";

  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  /* ---------- Idioma ----------
     Cada idioma tem a própria página (/pt/, /es/...), boa para o Google.
     Na primeira visita à página em inglês, se o navegador estiver em outro
     idioma suportado, leva a pessoa para a versão dela (só uma vez). */
  var langLinks = document.querySelectorAll("#lang-menu a[data-lang]");
  var supported = {};
  langLinks.forEach(function (a) {
    supported[a.dataset.lang] = a.getAttribute("href");
    a.addEventListener("click", function () { store("lang", a.dataset.lang); });
  });

  var isDefaultPage = document.documentElement.lang === "en";
  if (isDefaultPage && !store("lang") && !/bot|crawl|spider|lighthouse/i.test(navigator.userAgent)) {
    var prefs = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < prefs.length; i++) {
      var code = String(prefs[i]).toLowerCase().split("-")[0];
      if (code === "en") break;
      if (supported[code]) {
        store("lang", code);
        location.replace(supported[code] + location.hash);
        return;
      }
    }
    store("lang", "en");
  }

  /* ---------- Menu de idiomas ---------- */
  var langWrap = document.getElementById("lang");
  var langBtn = document.getElementById("lang-btn");
  function toggleLang(open) {
    langWrap.classList.toggle("open", open);
    langBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  langBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleLang(!langWrap.classList.contains("open"));
  });
  document.addEventListener("click", function (e) { if (!langWrap.contains(e.target)) toggleLang(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggleLang(false); });

  /* ---------- Menu mobile ---------- */
  var nav = document.getElementById("main-nav");
  var navToggle = document.getElementById("nav-toggle");
  navToggle.addEventListener("click", function () {
    var open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Item ativo do menu conforme a rolagem ---------- */
  var links = nav.querySelectorAll("a");
  var sections = ["games", "about", "partners", "news", "faq", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  function onScroll() {
    var y = window.scrollY + 140;
    var current = "#top";
    sections.forEach(function (s) { if (s.offsetTop <= y) current = "#" + s.id; });
    links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === current); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Barra de notícia ---------- */
  document.getElementById("news-bar-close").addEventListener("click", function () {
    document.getElementById("news-bar").classList.add("hidden");
  });

  /* ---------- Vídeo do topo ---------- */
  var hero = document.getElementById("hero");
  var yt = (hero.dataset.youtube || "").trim();
  var mp4 = (hero.dataset.mp4 || "").trim();
  if (!yt && !mp4) hero.classList.add("no-video");

  document.getElementById("play-btn").addEventListener("click", function () {
    if (hero.querySelector("iframe, video")) return;
    if (yt) {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(yt) + "?autoplay=1&rel=0";
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      f.title = "AraStudioTech showreel";
      hero.appendChild(f);
    } else if (mp4) {
      var v = document.createElement("video");
      v.src = mp4; v.controls = true; v.autoplay = true; v.playsInline = true;
      hero.appendChild(v);
    }
  });
})();
