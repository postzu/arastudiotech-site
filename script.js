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
  if (sections.length) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Barra de notícia ---------- */
  var newsClose = document.getElementById("news-bar-close");
  if (newsClose) newsClose.addEventListener("click", function () {
    document.getElementById("news-bar").classList.add("hidden");
  });

  /* ---------- Showreel (cenas animadas, só na página inicial) ---------- */
  var hero = document.getElementById("hero");
  if (hero) (function reel() {
    var scenes = hero.querySelectorAll(".scene");
    if (!scenes.length) return;
    var dotsWrap = document.getElementById("reel-dots");
    var bar = document.getElementById("reel-bar");
    var toggle = document.getElementById("reel-toggle");
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var index = 0, timer = null, userPaused = reduced, visible = true;

    var dots = Array.prototype.map.call(scenes, function (s, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", (i + 1) + " / " + scenes.length);
      b.addEventListener("click", function () { go(i); });
      dotsWrap.appendChild(b);
      return b;
    });

    function duration(i) { return parseInt(scenes[i].dataset.duration, 10) || 4000; }

    function runBar(ms) {
      bar.style.transition = "none";
      bar.style.width = "0";
      void bar.offsetWidth;
      if (ms) {
        bar.style.transition = "width " + ms + "ms linear";
        bar.style.width = "100%";
      }
    }

    function show(i) {
      scenes[index].classList.remove("is-active");
      dots[index].removeAttribute("aria-current");
      index = (i + scenes.length) % scenes.length;
      scenes[index].classList.add("is-active");
      dots[index].setAttribute("aria-current", "true");
    }

    function schedule() {
      clearTimeout(timer);
      if (userPaused || !visible) { runBar(0); return; }
      var ms = duration(index);
      runBar(ms);
      timer = setTimeout(function () { show(index + 1); schedule(); }, ms);
    }

    function go(i) { show(i); schedule(); }

    function setPaused(p) {
      userPaused = p;
      hero.classList.toggle("is-paused", p);
      toggle.setAttribute("aria-label", p ? toggle.dataset.labelPlay : toggle.dataset.labelPause);
      schedule();
    }

    toggle.addEventListener("click", function () { setPaused(!userPaused); });

    // Pausa quando sai da tela ou a aba fica em segundo plano
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting && !document.hidden;
        schedule();
      }, { threshold: 0.25 }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () {
      visible = !document.hidden;
      schedule();
    });

    // Arrastar para o lado no celular
    var x0 = null;
    hero.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      x0 = null;
    });

    dots[0].setAttribute("aria-current", "true");
    hero.classList.toggle("is-paused", userPaused);
    schedule();
  })();

  /* ---------- Vídeo real (opcional) ---------- */
  if (hero) (function () {
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

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Página do jogo: telas passando como um vídeo ---------- */
  var slidesBox = document.getElementById("gp-slides");
  if (slidesBox) (function () {
    var slides = slidesBox.querySelectorAll("img");
    var dotsWrap = document.getElementById("gp-dots");
    var bar = document.getElementById("gp-bar");
    var MS = 3000, index = 0, timer = null, visible = true, paused = reduced;

    var dots = Array.prototype.map.call(slides, function (s, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", (i + 1) + " / " + slides.length);
      b.addEventListener("click", function () { paused = false; go(i); });
      dotsWrap.appendChild(b);
      return b;
    });

    function runBar(on) {
      bar.style.transition = "none";
      bar.style.width = "0";
      void bar.offsetWidth;
      if (on) { bar.style.transition = "width " + MS + "ms linear"; bar.style.width = "100%"; }
    }
    function show(i) {
      slides[index].classList.remove("is-active");
      dots[index].removeAttribute("aria-current");
      index = (i + slides.length) % slides.length;
      slides[index].classList.add("is-active");
      dots[index].setAttribute("aria-current", "true");
      // carrega a próxima tela antes de ela aparecer
      var next = slides[(index + 1) % slides.length];
      if (next.loading === "lazy") next.loading = "eager";
    }
    function schedule() {
      clearTimeout(timer);
      if (paused || !visible) { runBar(false); return; }
      runBar(true);
      timer = setTimeout(function () { show(index + 1); schedule(); }, MS);
    }
    function go(i) { show(i); schedule(); }

    // Tocar na tela pausa / continua
    slidesBox.addEventListener("click", function () { paused = !paused; schedule(); });

    // Arrastar para o lado no celular
    var x0 = null;
    slidesBox.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    slidesBox.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { paused = false; go(index + (dx < 0 ? 1 : -1)); }
      x0 = null;
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting && !document.hidden;
        schedule();
      }, { threshold: 0.3 }).observe(slidesBox);
    }
    document.addEventListener("visibilitychange", function () { visible = !document.hidden; schedule(); });

    dots[0].setAttribute("aria-current", "true");
    schedule();
  })();

  /* ---------- Cordinha: desce conforme a página rola ---------- */
  var rope = document.getElementById("rope");
  if (rope) (function () {
    var lastY = window.scrollY, ticking = false, settle = null;
    function update() {
      ticking = false;
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var p = Math.min(1, Math.max(0, window.scrollY / max));
      var minLen = 70, maxLen = Math.max(minLen, window.innerHeight * 0.62);
      rope.style.setProperty("--rope", Math.round(minLen + p * (maxLen - minLen)) + "px");
      if (!reduced) {
        // balança para o lado contrário da rolagem e volta ao centro
        var v = window.scrollY - lastY;
        var swing = Math.max(-14, Math.min(14, -v * 0.35));
        rope.style.setProperty("--swing", swing.toFixed(1) + "deg");
        clearTimeout(settle);
        settle = setTimeout(function () { rope.style.setProperty("--swing", "0deg"); }, 120);
      }
      lastY = window.scrollY;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    rope.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
    update();
  })();
})();
