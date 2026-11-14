# AraStudioTech — site

Site estático de **https://arastudiotech.com**, hospedado no GitHub Pages.
Uma página por idioma (melhor para o Google), gerada por um script Node sem dependências.

## Como editar

1. Edite os textos em `src/i18n.js` (8 idiomas) ou o layout em `src/template.html`.
2. Edite links, e-mail, vídeo e redes sociais no bloco **CONFIG** no topo de `build.js`.
3. Rode:
   ```bash
   node build.js
   ```
4. Faça commit de tudo (incluindo os arquivos gerados) e envie para o GitHub.

> Não edite `index.html`, `pt/index.html` etc. à mão: eles são sobrescritos pelo build.

## Estrutura

```
src/template.html   layout da página (com {{chaves}} de tradução)
src/i18n.js         textos nos 8 idiomas: en, pt, es, fr, de, ru, ja, zh
build.js            gerador + CONFIG (links da Play Store, vídeo, redes)
styles.css          visual (cores da marca em :root)
script.js           menu, idioma, vídeo
assets/             logo, ícones, capas dos jogos, imagem de compartilhamento
src/legal/<idioma>.js  Política de Privacidade e de Conteúdo, um arquivo por idioma (8)
src/legal.html      layout das páginas de política
faisca/jogar/       link de compartilhamento do Faísca → Google Play (arquivo fixo, não é gerado)

# gerados pelo build:
index.html          inglês (padrão)
pt/ es/ fr/ de/ ru/ ja/ zh/
privacy/ content-policy/   políticas em inglês
<idioma>/<slug>/           políticas nos outros idiomas (ex.: pt/privacidade/, ja/privacy/)
sitemap.xml  robots.txt  site.webmanifest  404.html
```

## Políticas
- Texto em `src/legal/<idioma>.js` (8 idiomas). Ao mudar uma política, mude nos 8 arquivos, atualize a data em `updated` e rode `node build.js`.
- O inglês é a versão de referência. Qualquer página de política troca sozinha para o idioma escolhido no menu 🌐 ou, se não houver escolha, para o idioma do navegador.
- Se um jogo ganhar compras no app, login, analytics ou outro SDK que colete dados, atualize a Política de Privacidade.

## Idiomas
- Inglês fica em `/`. Os outros ficam em `/pt/`, `/es/`, `/fr/`, `/de/`, `/ru/`, `/ja/` e `/zh/`.
- Na primeira visita, quem chega na página em inglês com o navegador em outro idioma suportado é levado para a versão dele. Depois disso, vale a escolha feita no menu 🌐.

## SEO incluído
- Título, descrição e H1 com palavras-chave em cada idioma
- `hreflang` + `canonical` em todas as páginas, e o `sitemap.xml` com as alternativas de idioma
- Dados estruturados (JSON-LD): Organization, WebSite, WebPage, MobileApplication (FameUp e Faísca) e FAQPage
- Open Graph e Twitter Card para a prévia de links
- Seções "Trabalhe com a gente" (criação de jogos, investidores, criadores/afiliados) e Perguntas frequentes
- Ícones PNG, manifest, página 404, `robots.txt`

## Depois de publicar (importante)
1. **Google Search Console** (search.google.com/search-console): adicione `arastudiotech.com` como propriedade de **domínio**, valide pelo DNS e envie `https://arastudiotech.com/sitemap.xml`.
2. **Bing Webmaster Tools**: importe do Search Console.
3. Em `build.js`, troque os links da Play Store pelos links reais (`details?id=...`) e preencha as redes sociais.
4. Na Play Store, coloque `https://arastudiotech.com` como site do desenvolvedor nos dois apps (gera link de volta para o site).

## Publicar no GitHub Pages
```bash
git init
git add .
git commit -m "Site AraStudioTech"
git branch -M main
git remote add origin https://github.com/postzu/arastudiotech-site.git
git push -u origin main
```
No repositório: **Settings → Pages → Deploy from a branch → main / (root)**. Em **Custom domain** coloque `arastudiotech.com` e marque **Enforce HTTPS**.

### DNS
| Tipo | Nome | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | postzu.github.io |

## Páginas dos jogos
- `faisca/` e `fameup/` (e `pt/faisca/`, `es/fameup/`...) são geradas pelo build a partir de `src/game.html`.
- **Vídeo do jogo:** em `build.js` → `CONFIG.gameVideo`, coloque o ID do YouTube (ou o caminho de um `.mp4` vertical 9:16) e rode `node build.js`. Sem vídeo, as telas do jogo passam sozinhas.
- **QR code:** gerado no build (`src/qr.js`, sem dependências) e aponta para `/<jogo>/jogar/?c=qr`, que leva direto ao Google Play (no Android) e marca a origem "qr" nas instalações.
- **Cordinha:** o ícone do jogo pendurado à direita desce com a rolagem; clicar volta ao topo.
