/* =========================================================
   AraStudioTech: gerador do site (sem dependências)
   Uso:  node build.js
   Lê src/template.html + src/i18n.js e gera:
     index.html (inglês)  +  pt/ es/ fr/ de/ ru/ ja/ zh/
     sitemap.xml, robots.txt, site.webmanifest, 404.html
   ========================================================= */
const fs = require("fs");
const path = require("path");

/* ---------------- EDITE AQUI ---------------- */
const CONFIG = {
  site: "https://arastudiotech.com",
  email: "contato@arastudiotech.com",
  founded: "2026",
  // Links reais das páginas na Play Store (troque pelos "details?id=...")
  play: {
    fameup: "https://play.google.com/store/search?q=FameUp%20Influencer%20Life&c=apps",
    messzero: "https://play.google.com/store/search?q=Mess%20Zero%20Tidy%20Triple%20Match&c=apps",
    faisca: "https://play.google.com/store/search?q=Fa%C3%ADsca&c=apps"
  },
  // Vídeo do topo: preencha UM dos dois
  video: { youtube: "", mp4: "" },
  // Vídeo de cada jogo (página do jogo). Vazio = as telas passam sozinhas como um vídeo.
  //   youtube: ID de um vídeo/Short (ex.: "abc123XYZ")   mp4: caminho, ex.: "assets/video/faisca.mp4" (vertical 9:16)
  gameVideo: {
    faisca: { youtube: "", mp4: "" },
    fameup: { youtube: "", mp4: "" },
    messzero: { youtube: "", mp4: "" }
  },
  // Redes sociais: deixe "" para esconder. Também viram "sameAs" para o Google.
  socials: {
    instagram: "",
    tiktok: "",
    youtube: "",
    x: "",
    linkedin: "",
    googleplay: "" // página de desenvolvedor: https://play.google.com/store/apps/dev?id=...
  }
};
/* -------------------------------------------- */

const ROOT = __dirname;
const DEFAULT = "en";
const OG_LOCALE = { en: "en_US", pt: "pt_BR", es: "es_ES", fr: "fr_FR", de: "de_DE", ru: "ru_RU", ja: "ja_JP", zh: "zh_CN" };

global.window = {};
eval(fs.readFileSync(path.join(ROOT, "src/i18n.js"), "utf8"));
const I18N = window.I18N;
const LANGS = Object.keys(I18N);
const tpl = fs.readFileSync(path.join(ROOT, "src/template.html"), "utf8");

/* Políticas (privacidade e conteúdo): um arquivo por idioma em src/legal/<idioma>.js. */
for (const l of LANGS) eval(fs.readFileSync(path.join(ROOT, "src/legal", l + ".js"), "utf8"));
const LEGAL = window.LEGAL_I18N;
const LEGAL_KINDS = ["privacy", "content"];
const LEGAL_LANGS = LANGS.filter((l) => LEGAL[l]);
const legalLang = (l) => (LEGAL_LANGS.includes(l) ? l : DEFAULT);
const legalSlug = (kind, l) => LEGAL[legalLang(l)].slug[kind];
const legalTpl = fs.readFileSync(path.join(ROOT, "src/legal.html"), "utf8");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const urlFor = (l) => CONFIG.site + "/" + (l === DEFAULT ? "" : l + "/");

/* "Versão" no link do CSS/JS (ex.: styles.css?v=a1b2c3d4): quando o arquivo muda, o navegador baixa de novo
   na hora, em vez de usar a cópia antiga guardada (o GitHub Pages deixa guardar por 10 min). */
const crypto = require("crypto");
const fileVer = (f) => crypto.createHash("sha1").update(fs.readFileSync(path.join(ROOT, f))).digest("hex").slice(0, 8);
const VER = { css: fileVer("styles.css"), js: fileVer("script.js") };
const bust = (html) => html
  .replace(/(href="[^"]*styles\.css)(")/g, `$1?v=${VER.css}$2`)
  .replace(/(src="[^"]*script\.js)(")/g, `$1?v=${VER.js}$2`);

const ICONS = {
  instagram: '<path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM16.1 2H7.9A5.9 5.9 0 0 0 2 7.9v8.2A5.9 5.9 0 0 0 7.9 22h8.2a5.9 5.9 0 0 0 5.9-5.9V7.9A5.9 5.9 0 0 0 16.1 2Zm4.1 14.1a4.1 4.1 0 0 1-4.1 4.1H7.9a4.1 4.1 0 0 1-4.1-4.1V7.9a4.1 4.1 0 0 1 4.1-4.1h8.2a4.1 4.1 0 0 1 4.1 4.1v8.2Z"/>',
  tiktok: '<path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.330 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z"/>',
  youtube: '<path d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"/>',
  x: '<path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.36 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.57l11.1 14.44Z"/>',
  linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5c0-1.2-.02-2.73-1.66-2.73-1.67 0-1.92 1.3-1.92 2.64V21h-4V9.75Z"/>',
  googleplay: '<path d="M4 2.8v18.4c0 .5.5.8.9.6L21 12.6c.5-.3.5-.9 0-1.2L4.9 2.2c-.4-.2-.9.1-.9.6Z"/>'
};
const LABELS = { instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube", x: "X", linkedin: "LinkedIn", googleplay: "Google Play" };
const socialEntries = Object.entries(CONFIG.socials).filter(([, u]) => u);

function jsonld(l, t) {
  const url = urlFor(l);
  const org = {
    "@type": "Organization",
    "@id": CONFIG.site + "/#org",
    name: "AraStudioTech",
    url: CONFIG.site + "/",
    logo: CONFIG.site + "/assets/icon-512.png",
    image: CONFIG.site + "/assets/og-image.png",
    email: CONFIG.email,
    description: t["meta.description"],
    foundingDate: CONFIG.founded,
    address: { "@type": "PostalAddress", addressCountry: "BR" },
    areaServed: "Worldwide",
    knowsAbout: ["Mobile game development", "Android games", "Puzzle games", "Match-3 games", "Brain training games", "App development"],
    contactPoint: { "@type": "ContactPoint", email: CONFIG.email, contactType: "customer support", availableLanguage: LANGS.map((x) => I18N[x]._html) }
  };
  if (socialEntries.length) org.sameAs = socialEntries.map(([, u]) => u);
  const app = (id, name, alt, desc, genre, play) => ({
    "@type": "MobileApplication",
    "@id": CONFIG.site + "/#" + id,
    name, alternateName: alt,
    description: desc,
    operatingSystem: "Android",
    applicationCategory: "GameApplication",
    genre,
    image: CONFIG.site + "/assets/games/" + id + ".jpg",
    url: play,
    inLanguage: t._html,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@id": CONFIG.site + "/#org" },
    publisher: { "@id": CONFIG.site + "/#org" }
  });
  const faq = {
    "@type": "FAQPage",
    "@id": url + "#faq",
    mainEntity: [1, 2, 3, 4, 5, 6].map((i) => ({
      "@type": "Question", name: t["faq.q" + i],
      acceptedAnswer: { "@type": "Answer", text: t["faq.a" + i] }
    }))
  };
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      org,
      { "@type": "WebSite", "@id": CONFIG.site + "/#website", url: CONFIG.site + "/", name: "AraStudioTech", publisher: { "@id": CONFIG.site + "/#org" }, inLanguage: LANGS.map((x) => I18N[x]._html) },
      { "@type": "WebPage", "@id": url + "#page", url, name: t["meta.title"], description: t["meta.description"], inLanguage: t._html, isPartOf: { "@id": CONFIG.site + "/#website" }, about: { "@id": CONFIG.site + "/#org" } },
      app("fameup", "FameUp: Influencer Life", "FameUp", t["games.fameup"], ["Puzzle", "Match-3", "Casual"], CONFIG.play.fameup),
      app("faisca", "Faísca", "Faisca", t["games.faisca"], ["Puzzle", "Brain training", "Logic"], CONFIG.play.faisca),
      app("messzero", t["game.messzero.full"] || "Mess Zero: Tidy Triple Match", t["game.messzero.name"] || "Mess Zero", t["games.messzero"], ["Puzzle", "Triple match", "Casual"], CONFIG.play.messzero),
      faq
    ]
  }, null, 2).replace(/</g, "\\u003c").split("\n").map((s) => "  " + s).join("\n");
}

function render(l) {
  const t = I18N[l];
  const root = l === DEFAULT ? "" : "../";
  const missing = [];
  const hreflang = LANGS.map((x) => `  <link rel="alternate" hreflang="${I18N[x]._html}" href="${urlFor(x)}">`)
    .concat(`  <link rel="alternate" hreflang="x-default" href="${urlFor(DEFAULT)}">`).join("\n");
  const langmenu = LANGS.map((x) =>
    `            <li><a href="${root}${x === DEFAULT ? "" : x + "/"}" hreflang="${I18N[x]._html}" lang="${I18N[x]._html}" data-lang="${x}"${x === l ? ' aria-current="true"' : ""}><span>${esc(I18N[x]._name)}</span><small>${x.toUpperCase()}</small></a></li>`
  ).join("\n");
  const faq = [1, 2, 3, 4, 5, 6].map((i) =>
    `          <details class="faq-item"${i === 1 ? " open" : ""}>\n            <summary><h3>${esc(t["faq.q" + i])}</h3></summary>\n            <p>${esc(t["faq.a" + i])}</p>\n          </details>`
  ).join("\n");
  const socials = socialEntries.length
    ? `        <div class="socials">\n          <span>${esc(t["footer.follow"])}</span>\n` +
      socialEntries.map(([k, u]) =>
        `          <a href="${esc(u)}" target="_blank" rel="noopener me" aria-label="${LABELS[k]}"><svg viewBox="0 0 24 24">${ICONS[k]}</svg></a>`
      ).join("\n") + "\n        </div>"
    : "";

  const vars = {
    html: t._html, code: t._code, lang: l, root, home: root || "./",
    reel: root + "assets/reel/" + l + "/",
    site: CONFIG.site, canonical: urlFor(l), email: CONFIG.email,
    hreflang, langmenu, faq, socials,
    oglocale: OG_LOCALE[l],
    oglocalealt: LANGS.filter((x) => x !== l).map((x) => `  <meta property="og:locale:alternate" content="${OG_LOCALE[x]}">`).join("\n"),
    jsonld: jsonld(l, t),
    year: String(new Date().getFullYear()),
    privacyurl: root + legalSlug("privacy", l), contenturl: root + legalSlug("content", l),
    "play.fameup": esc(CONFIG.play.fameup), "play.faisca": esc(CONFIG.play.faisca), "play.messzero": esc(CONFIG.play.messzero),
    "video.youtube": esc(CONFIG.video.youtube), "video.mp4": esc(CONFIG.video.mp4 ? root + CONFIG.video.mp4 : "")
  };

  const out = tpl.replace(/\{\{(@?)([\w.]+)\}\}/g, (m, at, key) => {
    if (at) { if (key in vars) return vars[key]; missing.push("@" + key); return m; }
    const v = t[key] != null ? t[key] : I18N[DEFAULT][key];
    if (v == null) { missing.push(key); return m; }
    return esc(v);
  });
  if (missing.length) throw new Error(`[${l}] chaves faltando: ${[...new Set(missing)].join(", ")}`);
  return bust(out);
}

/* -------- páginas -------- */
for (const l of LANGS) {
  const dir = l === DEFAULT ? ROOT : path.join(ROOT, l);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), render(l));
  console.log("ok", l === DEFAULT ? "index.html" : l + "/index.html");
}

/* -------- páginas dos jogos: faisca/, fameup/ e pt/faisca/, es/faisca/... -------- */
const { qrSvg } = require("./src/qr.js");
const gameTpl = fs.readFileSync(path.join(ROOT, "src/game.html"), "utf8");
const GAMES = [
  { id: "faisca", name: "Faísca", full: "Faísca", screens: 6, genre: ["Puzzle", "Brain training", "Logic"] },
  { id: "fameup", name: "FameUp", full: "FameUp: Influencer Life", screens: 8, genre: ["Puzzle", "Match-3", "Casual"] },
  { id: "messzero", name: "Mess Zero", full: "Mess Zero: Tidy Triple Match", screens: 8, genre: ["Puzzle", "Triple match", "Casual"] }
];
// Nome do jogo no idioma (ex.: Bagunça Zero em pt); sem tradução usa o nome padrão
const gameName = (g, t) => t["game." + g.id + ".name"] || g.name;
const gameFull = (g, t) => t["game." + g.id + ".full"] || g.full;
const gamePath = (id, l) => (l === DEFAULT ? "" : l + "/") + id + "/";
const gameUrl = (id, l) => CONFIG.site + "/" + gamePath(id, l);
// QR code: página curta que leva direto ao jogo no Google Play (funciona antes e depois do lançamento)
const QR = Object.fromEntries(GAMES.map((g) => [g.id, qrSvg(CONFIG.site + "/" + g.id + "/jogar/?c=qr")]));

function gameMedia(g, l, t, root) {
  const v = (CONFIG.gameVideo || {})[g.id] || {};
  if (v.youtube) {
    return `        <iframe class="gp-video" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.youtube)}?rel=0&amp;playsinline=1" title="${esc(gameFull(g, t))}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  }
  if (v.mp4) {
    return `        <video class="gp-video" src="${esc(root + v.mp4)}" poster="${root}assets/reel/${l}/${g.id}-1.webp" autoplay muted loop playsinline controls></video>`;
  }
  const imgs = [];
  for (let i = 1; i <= g.screens; i++) {
    imgs.push(`          <img${i === 1 ? ' class="is-active"' : ""} src="${root}assets/reel/${l}/${g.id}-${i}.webp" alt="${i === 1 ? esc(t["img." + g.id]) : ""}" width="506" height="900"${i > 2 ? ' loading="lazy"' : ""}>`);
  }
  return `        <div class="gp-slides" id="gp-slides">\n${imgs.join("\n")}\n        </div>\n` +
    `        <div class="reel-progress" aria-hidden="true"><i id="gp-bar"></i></div>\n` +
    `        <div class="gp-dots" id="gp-dots"></div>`;
}

function gameJsonld(g, l, t) {
  const url = gameUrl(g.id, l);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication", "@id": CONFIG.site + "/#" + g.id,
        name: gameFull(g, t), alternateName: gameName(g, t) === gameFull(g, t) ? undefined : gameName(g, t),
        description: t["games." + g.id], operatingSystem: "Android", applicationCategory: "GameApplication",
        genre: g.genre, image: CONFIG.site + "/assets/games/" + g.id + ".jpg", url: CONFIG.play[g.id],
        screenshot: Array.from({ length: g.screens }, (_, i) => `${CONFIG.site}/assets/reel/${l}/${g.id}-${i + 1}.webp`),
        inLanguage: t._html,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        author: { "@type": "Organization", "@id": CONFIG.site + "/#org", name: "AraStudioTech", url: CONFIG.site + "/" }
      },
      { "@type": "WebPage", "@id": url + "#page", url, name: t["gp." + g.id + ".title"], description: t["games." + g.id], inLanguage: t._html, about: { "@id": CONFIG.site + "/#" + g.id } },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "AraStudioTech", item: urlFor(l) },
          { "@type": "ListItem", position: 2, name: t["nav.games"], item: urlFor(l) + "#games" },
          { "@type": "ListItem", position: 3, name: gameFull(g, t), item: url }
        ]
      }
    ]
  }, null, 2).replace(/</g, "\\u003c").split("\n").map((s) => "  " + s).join("\n");
}

function renderGame(g, l) {
  const t = I18N[l];
  const root = l === DEFAULT ? "../" : "../../";
  const others = GAMES.filter((x) => x.id !== g.id).map((o) =>
    `      <a class="gp-other" href="../${o.id}/">\n` +
    `        <img src="${root}assets/reel/${o.id}-icon.webp" alt="" width="360" height="360" loading="lazy">\n` +
    `        <span>\n          <strong>${esc(gameFull(o, t))}</strong>\n          <small>${esc(t["reel." + o.id + ".tag"])}</small>\n        </span>\n` +
    `        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n` +
    `      </a>`
  ).join("\n");
  const hreflang = LANGS.map((x) => `  <link rel="alternate" hreflang="${I18N[x]._html}" href="${gameUrl(g.id, x)}">`)
    .concat(`  <link rel="alternate" hreflang="x-default" href="${gameUrl(g.id, DEFAULT)}">`).join("\n");
  const langmenu = LANGS.map((x) =>
    `            <li><a href="${root}${gamePath(g.id, x)}" hreflang="${I18N[x]._html}" lang="${I18N[x]._html}" data-lang="${x}"${x === l ? ' aria-current="true"' : ""}><span>${esc(I18N[x]._name)}</span><small>${x.toUpperCase()}</small></a></li>`
  ).join("\n");
  const socials = socialEntries.length
    ? `        <div class="socials">\n          <span>${esc(t["footer.follow"])}</span>\n` +
      socialEntries.map(([k, u]) =>
        `          <a href="${esc(u)}" target="_blank" rel="noopener me" aria-label="${LABELS[k]}"><svg viewBox="0 0 24 24">${ICONS[k]}</svg></a>`
      ).join("\n") + "\n        </div>"
    : "";
  const vars = {
    html: t._html, code: t._code, lang: l, root, home: "../", site: CONFIG.site,
    id: g.id, name: esc(gameFull(g, t)), others,
    metatitle: esc(t["gp." + g.id + ".title"]),
    desc: esc(t["games." + g.id]), tags: esc(t["games." + g.id + ".tags"]), tagline: esc(t["reel." + g.id + ".tag"]),
    canonical: gameUrl(g.id, l), hreflang, langmenu, socials,
    oglocale: OG_LOCALE[l], jsonld: gameJsonld(g, l, t),
    media: gameMedia(g, l, t, root),
    qr: "          " + QR[g.id],
    play: esc(CONFIG.play[g.id]),
    privacyurl: root + legalSlug("privacy", l), contenturl: root + legalSlug("content", l),
    year: String(new Date().getFullYear())
  };
  const missing = [];
  const out = gameTpl.replace(/\{\{(@?)([\w.]+)\}\}/g, (m, at, key) => {
    if (at) { if (key in vars) return vars[key]; missing.push("@" + key); return m; }
    const v = t[key] != null ? t[key] : I18N[DEFAULT][key];
    if (v == null) { missing.push(key); return m; }
    return esc(v);
  });
  if (missing.length) throw new Error(`[${g.id}/${l}] chaves faltando: ${[...new Set(missing)].join(", ")}`);
  return bust(out);
}

for (const g of GAMES) {
  for (const l of LANGS) {
    const dir = path.join(ROOT, gamePath(g.id, l));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), renderGame(g, l));
  }
  console.log("ok", g.id + "/ (" + LANGS.length + " idiomas)");
}

/* -------- políticas: privacy/, content-policy/ e as versões de cada idioma (ex.: pt/privacidade/) -------- */
const slugOf = (kind, l) => LEGAL[l].slug[kind];
function renderLegal(kind, l) {
  const t = I18N[l], doc = LEGAL[l][kind], ui = LEGAL[l].ui;
  const slug = slugOf(kind, l);
  const root = "../".repeat(slug.split("/").filter(Boolean).length);
  const rel = (s) => root + s;
  const hreflang = LEGAL_LANGS.map((x) => `  <link rel="alternate" hreflang="${I18N[x]._html}" href="${CONFIG.site}/${slugOf(kind, x)}">`)
    .concat(`  <link rel="alternate" hreflang="x-default" href="${CONFIG.site}/${slugOf(kind, DEFAULT)}">`).join("\n");
  const langmenu = LEGAL_LANGS.map((x) =>
    `            <li><a href="${rel(slugOf(kind, x))}" hreflang="${I18N[x]._html}" lang="${I18N[x]._html}" data-lang="${x}"${x === l ? ' aria-current="true"' : ""}><span>${esc(I18N[x]._name)}</span><small>${x.toUpperCase()}</small></a></li>`
  ).join("\n");
  const sw = LEGAL_KINDS.map((k) =>
    `      <a href="${rel(slugOf(k, l))}"${k === kind ? ' aria-current="page"' : ""}>${esc(LEGAL[l][k].title)}</a>`
  ).join("\n");
  const raw = {
    hreflang, langmenu, switch: sw,
    body: doc.body.trim().replace(/\{\{email\}\}/g, esc(CONFIG.email)).split("\n").map((s) => "      " + s).join("\n")
  };
  const text = {
    html: t._html, code: t._code, pagelang: l, title: doc.title, description: doc.description, updated: doc.updated,
    updatedlabel: ui.updated, back: ui.back, langnote: ui.langnote,
    canonical: CONFIG.site + "/" + slug, site: CONFIG.site, root,
    home: rel(l === DEFAULT ? "" : l + "/") || "./",
    privacyurl: rel(slugOf("privacy", l)), contenturl: rel(slugOf("content", l)),
    year: String(new Date().getFullYear())
  };
  const missing = [];
  const out = legalTpl.replace(/\{\{([\w.]+)\}\}/g, (m, key) => {
    if (key in raw) return raw[key];
    const v = key in text ? text[key] : t[key];
    if (v == null) { missing.push(key); return m; }
    return esc(v);
  });
  if (missing.length) throw new Error(`[${kind}/${l}] chaves faltando: ${[...new Set(missing)].join(", ")}`);
  return bust(out);
}

for (const kind of LEGAL_KINDS) {
  for (const l of LEGAL_LANGS) {
    const dir = path.join(ROOT, slugOf(kind, l));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), renderLegal(kind, l));
    console.log("ok", slugOf(kind, l) + "index.html");
  }
}

/* -------- sitemap.xml -------- */
const today = new Date().toISOString().slice(0, 10);
const alts = LANGS.map((x) => `    <xhtml:link rel="alternate" hreflang="${I18N[x]._html}" href="${urlFor(x)}"/>`)
  .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(DEFAULT)}"/>`).join("\n");
const legalEntries = LEGAL_KINDS.flatMap((kind) => {
  const la = LEGAL_LANGS.map((x) => `    <xhtml:link rel="alternate" hreflang="${I18N[x]._html}" href="${CONFIG.site}/${slugOf(kind, x)}"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${CONFIG.site}/${slugOf(kind, DEFAULT)}"/>`).join("\n");
  return LEGAL_LANGS.map((l) => `  <url>\n    <loc>${CONFIG.site}/${slugOf(kind, l)}</loc>\n    <lastmod>${today}</lastmod>\n${la}\n  </url>`);
});
const gameEntries = GAMES.flatMap((g) => {
  const ga = LANGS.map((x) => `    <xhtml:link rel="alternate" hreflang="${I18N[x]._html}" href="${gameUrl(g.id, x)}"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${gameUrl(g.id, DEFAULT)}"/>`).join("\n");
  return LANGS.map((l) => `  <url>\n    <loc>${gameUrl(g.id, l)}</loc>\n    <lastmod>${today}</lastmod>\n${ga}\n  </url>`);
});
fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map((l) => `  <url>\n    <loc>${urlFor(l)}</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n  </url>`).concat(gameEntries, legalEntries).join("\n")}
</urlset>
`);

/* -------- robots.txt -------- */
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /src/\n\nSitemap: ${CONFIG.site}/sitemap.xml\n`);

/* -------- manifest -------- */
fs.writeFileSync(path.join(ROOT, "site.webmanifest"), JSON.stringify({
  name: "AraStudioTech", short_name: "AraStudioTech", start_url: "/", display: "browser",
  background_color: "#05060a", theme_color: "#05060a",
  icons: [
    { src: "/assets/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/assets/icon-512.png", sizes: "512x512", type: "image/png" }
  ]
}, null, 2) + "\n");

/* -------- 404 -------- */
fs.writeFileSync(path.join(ROOT, "404.html"), `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>404 | AraStudioTech</title>
  <meta name="robots" content="noindex">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <style>
    :root { color-scheme: dark; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #05060a; color: #f2f4fa; font: 16px/1.6 system-ui, sans-serif; text-align: center; padding: 16px; }
    h1 { font-size: 72px; margin: 0; background: linear-gradient(90deg, #19e3e3, #5b7cff, #d946ef); -webkit-background-clip: text; background-clip: text; color: transparent; }
    a { color: #19e3e3; }
  </style>
</head>
<body>
  <main>
    <h1>404</h1>
    <p>This page doesn't exist. Esta página não existe.</p>
    <p><a href="/">arastudiotech.com</a></p>
  </main>
</body>
</html>
`);

console.log("ok sitemap.xml, robots.txt, site.webmanifest, 404.html");
