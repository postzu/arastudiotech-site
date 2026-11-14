/* Políticas: de. Corpo em HTML; {{email}} vira o e-mail do CONFIG. */
window.LEGAL_I18N = window.LEGAL_I18N || {};
window.LEGAL_I18N.de = {
  slug: {"privacy":"de/datenschutz/","content":"de/inhaltsrichtlinie/"},
  ui: {
    "updated": "Zuletzt aktualisiert",
    "back": "Zurück zur Website",
    "langnote": "Diese Seite ist in 8 Sprachen verfügbar. Übersetzungen dienen nur der Information; bei Abweichungen zwischen den Fassungen gilt die englische Version."
  },
  privacy: {
    title: "Datenschutzerklärung",
    description: "Wie AraStudioTech Daten auf arastudiotech.com und in den Spielen FameUp, Faísca und Mess Zero verarbeitet: was erhoben wird, warum, an wen es weitergegeben wird und welche Rechte du hast.",
    updated: "14. November 2026",
    body: `
<p class="lead">Diese Erklärung beschreibt, welche personenbezogenen Daten anfallen, wenn du <strong>arastudiotech.com</strong> besuchst, unsere Spiele (<strong>FameUp: Influencer Life</strong>, <strong>Faísca</strong> und <strong>Mess Zero</strong> für Android) spielst oder uns kontaktierst. AraStudioTech ist ein unabhängiges Spielestudio mit Sitz in Brasilien („AraStudioTech“, „wir“). Wir sind der Verantwortliche für die hier beschriebenen personenbezogenen Daten.</p>

<div class="callout">
  <h2>Kurz gesagt</h2>
  <ul>
    <li>Wir versuchen, gar keine personenbezogenen Daten zu erheben. Es gibt keine Konten, keinen Login und keine eigenen Server, die Spielerdaten speichern.</li>
    <li>Diese Website verwendet keine Cookies und keine Analyse- oder Tracking-Tools.</li>
    <li>Dein Spielfortschritt wird nur auf deinem Gerät gespeichert. Wir erhalten ihn nie.</li>
    <li>Unsere Spiele sind kostenlos und zeigen Werbung von <strong>Google AdMob</strong>. Google erhebt einige Gerätedaten, um diese Werbung auszuliefern und zu messen. Wo das Gesetz es verlangt, wird personalisierte Werbung nur mit deiner Einwilligung angezeigt.</li>
    <li>Unsere Spiele senden <strong>anonyme Nutzungsstatistiken und Absturzberichte</strong> an Google Firebase (zum Beispiel welche Level gespielt wurden und wo die App abgestürzt ist), damit wir sie verbessern können. Kein Name, keine E-Mail, keine Kontaktdaten.</li>
    <li>Wir verkaufen deine personenbezogenen Daten nicht.</li>
  </ul>
</div>

<h2 id="collect">1. Welche Daten wir erheben</h2>
<h3>Wenn du diese Website besuchst</h3>
<ul>
  <li><strong>Keine Cookies, keine Analyse.</strong> Die Website verwendet keine Cookies, Tracking-Pixel oder Analysedienste und hat keine Formulare oder Registrierung.</li>
  <li><strong>Hosting.</strong> Die Website wird bei GitHub Pages gehostet. Wie jeder Webserver erhält GitHub deine IP-Adresse und grundlegende technische Daten (Browser, Zeitpunkt des Abrufs), um die Seite auszuliefern und den Dienst sicher zu halten. Siehe die <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">Datenschutzerklärung von GitHub</a>.</li>
  <li><strong>Schriftarten.</strong> Wir laden Schriftarten von Google Fonts. Dein Browser verbindet sich dafür mit Servern von Google, die deine IP-Adresse erhalten. Siehe die <a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener">Datenschutz-FAQ von Google Fonts</a>.</li>
  <li><strong>Spracheinstellung.</strong> Wenn du eine Sprache auswählst, speichert dein Browser diese Wahl lokal (Local Storage), damit sie erhalten bleibt. Sie bleibt auf deinem Gerät und wird nie an uns gesendet.</li>
  <li><strong>Videos.</strong> Wenn wir ein Video einbinden, nutzt es den erweiterten Datenschutzmodus von YouTube und lädt erst, wenn du auf Play drückst. Ab dann gilt die Datenschutzerklärung von Google/YouTube.</li>
</ul>

<h3>Wenn du unsere Spiele spielst</h3>
<ul>
  <li><strong>Fortschritt auf deinem Gerät.</strong> Level, Sterne, Punktzahlen, Gegenstände, Einstellungen und ähnliche Spieldaten werden nur im lokalen App-Speicher auf deinem Handy gespeichert. Dazu gehören der Künstlername, den du in FameUp eingibst, und in Faísca die Altersgruppe, die du für den IQ-Test wählst, sowie deine Ergebnisse. Wir erhalten diese Daten nicht. Wenn die Android-Sicherung aktiviert ist, kann Android sie selbst in die Sicherung deines Google-Kontos aufnehmen, auf die wir keinen Zugriff haben. Durch Deinstallieren des Spiels oder Löschen seiner Daten wird alles gelöscht.</li>
  <li><strong>Werbung (Google AdMob).</strong> Um Werbung auszuliefern, zu messen und Betrug zu verhindern, kann das Google Mobile Ads SDK in unseren Spielen Folgendes erheben und verarbeiten: die Werbe-ID deines Geräts (und die App-Set-ID), deine IP-Adresse (aus der ein ungefährer Standort geschätzt werden kann), Geräte- und Systeminformationen, Interaktionen mit Anzeigen und der App sowie Diagnosedaten wie Abstürze und Leistung. Diese Daten gehen direkt und verschlüsselt an Google. Wir sehen nur zusammengefasste Berichte (zum Beispiel, wie viele Anzeigen ausgeliefert wurden). Mehr dazu, <a href="https://policies.google.com/technologies/partner-sites?hl=de" target="_blank" rel="noopener">wie Google Daten von Apps verwendet, die seine Dienste nutzen</a>.</li>
  <li><strong>Nutzungsstatistiken und Absturzberichte (Google Firebase).</strong> Unsere Spiele nutzen Google Analytics for Firebase und Firebase Crashlytics. Erfasst werden eine zufällige Kennung der App-Installation, Spielereignisse (Level gestartet, gewonnen oder verloren, Zeit im Level, genutzte Tipps und Belohnungsvideos, geöffnete Bildschirme, Ergebnis des IQ-Tests), Sitzungsdauer, Gerätemodell, Systemversion, Sprache und ungefähres Land (aus der IP-Adresse geschätzt) sowie bei einem Absturz ein technischer Absturzbericht. Name, E-Mail-Adresse und der von dir eingegebene Künstlername sind nicht enthalten. Wir sehen diese Daten als Berichte in der Firebase-Konsole. Google speichert Analytics-Daten bis zu 14 Monate und Absturzberichte 90 Tage. Siehe <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener">Datenschutz und Sicherheit in Firebase</a>.</li>
  <li><strong>Benachrichtigungen.</strong> Wenn du es erlaubst, planen unsere Spiele lokale Erinnerungen (zum Beispiel an eine tägliche Herausforderung). Sie werden auf deinem Gerät erstellt; nichts wird an uns gesendet.</li>
  <li><strong>Teilen und Bewerten.</strong> Die Schaltfläche „Teilen“ öffnet das Teilen-Menü von Android mit einem kurzen Text, den die von dir gewählte App versendet. Wenn ein Spiel dich um eine Bewertung bittet, wird diese über Google Play abgewickelt. In beiden Fällen erhalten wir nichts Persönliches.</li>
  <li><strong>In-App-Kauf (Google Play Billing).</strong> Mess Zero bietet einen einmaligen, freiwilligen Kauf an: „Werbung entfernen“. Die Zahlung wird vollständig von Google Play abgewickelt: Wir erhalten und speichern keine Zahlungsdaten (Karte, Konto, Rechnungsadresse). Das Spiel erhält von Google Play nur die Bestätigung, dass der Kauf mit diesem Google-Konto getätigt wurde; sie wird auf deinem Gerät gespeichert, damit die Werbung ausgeschaltet bleibt und der Kauf auf einem anderen Handy wiederhergestellt werden kann. Firebase Analytics erfasst lediglich, dass der Kauf stattgefunden hat. FameUp und Faísca haben keine In-App-Käufe.</li>
  <li><strong>Kein Chat, keine Konten.</strong> Unsere aktuellen Spiele haben keinen Chat und keine Benutzerkonten.</li>
</ul>

<h3>Wenn du uns kontaktierst</h3>
<p>Wenn du uns eine E-Mail schreibst (Support, Presse, Partnerschaften oder etwas anderes), erhalten wir deine E-Mail-Adresse, deinen Namen, falls du ihn angibst, deine Nachricht und eventuelle Anhänge. Wir nutzen das nur, um dir zu antworten und dein Anliegen zu bearbeiten.</p>

<h2 id="use">2. Wofür wir die Daten verwenden</h2>
<ul>
  <li>Um zu verstehen, wie unsere Spiele gespielt werden (zum Beispiel, bei welchen Leveln Spieler hängen bleiben oder aufhören), Abstürze zu beheben und die Ergebnisse unserer Werbekampagnen zu messen.</li>
  <li>Um die Website zu betreiben und abzusichern.</li>
  <li>Um unsere Spiele durch Werbung kostenlos zu halten und Werbebetrug zu verhindern.</li>
  <li>Um deine Nachrichten zu beantworten, Support zu leisten und über Partnerschaften zu sprechen.</li>
  <li>Um gesetzliche Pflichten zu erfüllen und unsere Rechte zu schützen.</li>
</ul>
<p>Wir erstellen keine Spielerprofile, treffen keine automatisierten Entscheidungen über dich und <strong>verkaufen oder vermieten keine personenbezogenen Daten</strong>.</p>

<h2 id="legal-bases">3. Rechtsgrundlagen</h2>
<p>Nach dem brasilianischen Datenschutzgesetz (LGPD) und der DSGVO (EU/UK) stützen wir uns auf:</p>
<ul>
  <li><strong>Berechtigte Interessen</strong> für die Nutzungsstatistiken und Absturzberichte, mit denen wir unsere Spiele verbessern und Fehler beheben.</li>
  <li><strong>Einwilligung</strong> (Art. 6 Abs. 1 lit. a DSGVO), für personalisierte Werbung, wo das Gesetz es verlangt (zum Beispiel im Europäischen Wirtschaftsraum, im Vereinigten Königreich und in der Schweiz). Du kannst sie jederzeit widerrufen.</li>
  <li><strong>Berechtigte Interessen</strong> (Art. 6 Abs. 1 lit. f DSGVO), für nicht personalisierte Werbung, die die Spiele kostenlos hält, für Betrugsprävention sowie für Hosting und Sicherheit der Website.</li>
  <li><strong>Vorvertragliche Maßnahmen oder einen Vertrag</strong> (Art. 6 Abs. 1 lit. b DSGVO), wenn du uns wegen eines Projekts oder einer Partnerschaft kontaktierst.</li>
  <li><strong>Rechtliche Verpflichtungen</strong> (Art. 6 Abs. 1 lit. c DSGVO), wenn wir Daten aufgrund gesetzlicher Vorgaben aufbewahren oder offenlegen müssen.</li>
</ul>

<h2 id="share">4. An wen wir Daten weitergeben</h2>
<p>Wir arbeiten mit wenigen Dienstleistern zusammen, die jeweils eigenen Datenschutzbestimmungen unterliegen:</p>
<ul>
  <li><strong>Google</strong>: AdMob (Werbung in unseren Spielen), Google Play (App-Vertrieb, Bewertungen, Android-Sicherung und Zahlung des In-App-Kaufs über Google Play Billing) und Google Fonts (Schriftarten der Website).</li>
  <li><strong>Google Firebase</strong>: Analytics und Crashlytics (Nutzungsstatistiken und Absturzberichte unserer Spiele).</li>
  <li><strong>GitHub</strong>: Hosting der Website.</li>
  <li><strong>Unser E-Mail-Anbieter</strong>: um deine Nachrichten zu empfangen und zu beantworten.</li>
</ul>
<p>Wir können Daten außerdem offenlegen, wenn wir in gutem Glauben annehmen, dass dies erforderlich ist, um: Gesetze, Gerichtsbeschlüsse oder gültige behördliche Anfragen zu erfüllen; die Sicherheit oder lebenswichtige Interessen einer Person zu schützen; Betrug, Missbrauch oder Sicherheitsprobleme zu verhindern; die Rechte und das Eigentum von AraStudioTech oder Dritten zu schützen; oder im Rahmen einer Fusion, Übernahme oder eines Verkaufs von Vermögenswerten, wobei diese Erklärung deine Daten weiterhin schützt.</p>

<h2 id="transfers">5. Wo Daten verarbeitet werden</h2>
<p>Wir haben unseren Sitz in Brasilien. Unsere Dienstleister (Google und GitHub) können Daten in den USA und anderen Ländern verarbeiten, in denen sie tätig sind. Diese Übermittlungen stützen sich auf die Garantien dieser Anbieter, etwa Standardvertragsklauseln, wie es LGPD und DSGVO erlauben.</p>

<h2 id="retention">6. Wie lange wir Daten speichern</h2>
<ul>
  <li><strong>Spieldaten</strong> bleiben auf deinem Gerät, bis du sie löschst oder das Spiel deinstallierst.</li>
  <li><strong>Werbedaten</strong> werden von Google nach dessen eigenen Aufbewahrungsrichtlinien gespeichert.</li>
  <li><strong>E-Mails</strong> bewahren wir auf, solange wir sie zur Bearbeitung deines Anliegens oder einer Partnerschaft brauchen, und löschen sie danach, sofern wir sie nicht gesetzlich länger aufbewahren müssen oder zur Verteidigung unserer Rechte benötigen.</li>
</ul>

<h2 id="rights">7. Deine Wahlmöglichkeiten und Rechte</h2>
<h3>Einstellungen, die du sofort nutzen kannst</h3>
<ul>
  <li><strong>Werbe-Einwilligung</strong>: in den Einstellungen des Spiels (Datenschutz-/Werbeoption, sofern in deiner Region verfügbar).</li>
  <li><strong>Werbe-ID</strong>: in den Android-Einstellungen zurücksetzen oder löschen (Einstellungen → Google → Anzeigen oder Einstellungen → Datenschutz → Anzeigen, je nach Gerät).</li>
  <li><strong>Google-Werbeeinstellungen</strong>: <a href="https://myadcenter.google.com" target="_blank" rel="noopener">myadcenter.google.com</a>.</li>
  <li><strong>Spieldaten</strong>: App-Daten löschen oder das Spiel deinstallieren.</li>
  <li><strong>Benachrichtigungen</strong>: in den Android-Benachrichtigungseinstellungen deaktivieren.</li>
</ul>
<h3>Deine Rechte</h3>
<p>Je nachdem, wo du lebst, hast du das Recht auf: Bestätigung, ob wir deine Daten verarbeiten; Auskunft; Berichtigung; Löschung; Anonymisierung, Sperrung oder Löschung unnötiger Daten; Datenübertragbarkeit; Information darüber, an wen wir Daten weitergeben; Widerruf deiner Einwilligung; Widerspruch gegen die Verarbeitung; und Beschwerde bei einer Datenschutzbehörde. In Brasilien sind das die Rechte aus Artikel 18 LGPD, zuständige Behörde ist die <a href="https://www.gov.br/anpd" target="_blank" rel="noopener">ANPD</a>. In der EU und im Vereinigten Königreich kannst du dich an deine örtliche Aufsichtsbehörde wenden.</p>
<p><strong>Einwohner der USA (zum Beispiel Kalifornien):</strong> Wir verkaufen keine personenbezogenen Daten. Werbung in unseren Spielen kann von Google anhand deiner Werbe-ID personalisiert werden, was manche US-Bundesstaaten als „Weitergabe“ für zielgerichtete Werbung einstufen. Du kannst jederzeit widersprechen, indem du deine Werbe-ID löschst oder die Personalisierung von Anzeigen in Android deaktivierst. Niemand wird benachteiligt, weil er seine Rechte ausübt.</p>
<p>Da wir keine Spielerdaten auf eigenen Servern speichern, lassen sich die meisten Anliegen zu den Spielen mit den Einstellungen oben erledigen. Für alles andere schreib uns an <a href="mailto:{{email}}">{{email}}</a> mit dem Betreff „Datenschutz“. Wir antworten innerhalb von 15 Tagen.</p>

<h2 id="security">8. Sicherheit</h2>
<p>Gar keine Daten zu erheben ist der beste Schutz. Die Website wird nur über HTTPS ausgeliefert, und Werbedaten werden verschlüsselt zwischen deinem Gerät und Google übertragen. Keine Übertragungs- oder Speichermethode ist zu 100 % sicher, aber wir treffen angemessene Maßnahmen, um die Daten zu schützen, die wir verarbeiten.</p>

<h2 id="children">9. Kinder</h2>
<p>Unsere Website und unsere Spiele richten sich an Personen ab 13 Jahren und nicht an Kinder. Wir erheben wissentlich keine personenbezogenen Daten von Kindern unter 13 Jahren, im Einklang mit dem US-Gesetz COPPA und der LGPD. Die Werbung in unseren Spielen ist auf Inhalte beschränkt, die für ein allgemeines Publikum und Jugendliche geeignet sind. Wenn du glaubst, dass uns ein Kind personenbezogene Daten geschickt hat, kontaktiere uns, und wir löschen sie.</p>

<h2 id="third-party">10. Links zu anderen Websites</h2>
<p>Unsere Website und unsere Spiele verlinken auf Dienste, die wir nicht kontrollieren, etwa Google Play und soziale Netzwerke. Bei deren Nutzung gelten ihre Datenschutzerklärungen, und wir sind für ihre Praktiken nicht verantwortlich.</p>

<h2 id="games">11. Erfasste Spiele</h2>
<p>Diese Erklärung gilt für alle Spiele, die AraStudioTech bei Google Play veröffentlicht, darunter <strong>FameUp: Influencer Life</strong>, <strong>Faísca</strong> und <strong>Mess Zero</strong>. Faísca wurde früher unter dem Namen „Faísca Games“ veröffentlicht, der jetzt AraStudioTech heißt. Wenn du uns an eine alte Adresse von Faísca Games geschrieben hast, schreib bitte an <a href="mailto:{{email}}">{{email}}</a>.</p>

<h2 id="changes">12. Änderungen dieser Erklärung</h2>
<p>Wir können diese Erklärung aktualisieren, wenn sich unsere Spiele, die Website oder die Gesetzeslage ändern. Das Datum oben zeigt die aktuelle Fassung. Bei wesentlichen Änderungen informieren wir zusätzlich auf dieser Website oder in der Google-Play-Seite des Spiels.</p>

<h2 id="contact">13. Kontakt</h2>
<p>AraStudioTech, Brasilien<br>
Fragen, Anfragen und Datenschutz-Kontakt („encarregado“ nach LGPD): <a href="mailto:{{email}}">{{email}}</a></p>
`
  },
  content: {
    title: "Inhaltsrichtlinie",
    description: "Was Creator und Fans mit den Spielen von AraStudioTech machen dürfen: Videos, Streams, Monetarisierung, Fan-Art, Merchandise und Mods für FameUp und Faísca.",
    updated: "9. November 2026",
    body: `
<p class="lead">Wir lieben es, wenn Leute unsere Spiele spielen, filmen, zeichnen und darüber sprechen. Diese Richtlinie erklärt, was du mit Inhalten aus Spielen von AraStudioTech (<strong>FameUp: Influencer Life</strong>, <strong>Faísca</strong> und künftigen Spielen) machen darfst, ohne uns vorher zu fragen.</p>
<p>Unsere Spiele, einschließlich Namen, Logos, Figuren, Grafiken, Musik, Soundeffekten und Code, gehören AraStudioTech oder unseren Lizenzgebern. Diese Richtlinie gibt dir eine eingeschränkte, nicht exklusive und widerrufliche Erlaubnis, diese Inhalte wie unten beschrieben zu nutzen. Sie überträgt dir kein Eigentum.</p>

<h2 id="videos">1. Videos, Streams und Social-Media-Beiträge</h2>
<h3>Du darfst</h3>
<ul>
  <li>Gameplay-Aufnahmen und Screenshots unserer Spiele in Videos, Livestreams, Let's Plays, Reviews, Guides, Shorts, TikToks, Reels und Social-Media-Beiträgen verwenden.</li>
  <li>Musik und Soundeffekte unserer Spiele in diesen Videos verwenden, solange die Nutzung transformativ ist: als Teil des gezeigten Gameplays oder zusammen mit deinem eigenen Kommentar oder Schnitt.</li>
  <li>Diese Videos und Streams <strong>monetarisieren</strong>, über Werbung, Kanalmitgliedschaften, Abos, Spenden, Trinkgelder und jede andere Methode, die deine Plattform anbietet.</li>
  <li>Sponsorings auf deinem Kanal annehmen, solange der Sponsor nicht so dargestellt wird, als stehe er mit uns in Verbindung.</li>
</ul>
<h3>Bitte</h3>
<ul>
  <li>Nenne uns als Quelle, indem du das Spiel nennst und, wenn möglich, auf seine Google-Play-Seite verlinkst.</li>
</ul>
<h3>Du darfst nicht</h3>
<ul>
  <li>Unsere Musik oder Soundeffekte für sich allein hochladen oder als Hintergrund für Inhalte nutzen, die nichts mit unseren Spielen zu tun haben.</li>
  <li>Deine Inhalte als offiziell darstellen oder behaupten bzw. andeuten, dass wir dich unterstützen oder sponsern.</li>
  <li>Irreführende Titel oder Thumbnails verwenden, etwa mit Versprechen von Gratis-Items, Hacks oder „Mod-APKs“.</li>
  <li>Cheats, Hacks oder modifizierte Versionen unserer Spiele bewerben (siehe Abschnitt 4).</li>
</ul>

<h2 id="fan-art">2. Fan-Art</h2>
<p>Fan-Art zu unseren Spielen ist sehr willkommen. Markiere uns in sozialen Netzwerken, damit wir sie sehen.</p>
<ul>
  <li>Wir teilen oder präsentieren deine Kunst nur mit deiner Erlaubnis und mit Nennung deines Namens.</li>
  <li>Wir nutzen deine Kunst nie kommerziell ohne eine separate Vereinbarung mit dir.</li>
  <li>Wir präsentieren keine Kunst, die plagiiert oder abgepaust, KI-generiert, sexuell bzw. NSFW, hasserfüllt oder anderweitig anstößig ist.</li>
</ul>

<h2 id="merch">3. Merchandise</h2>
<p>Kleine Creator dürfen Merchandise zu unseren Spielen verkaufen (Drucke, Sticker, Anstecker, Schlüsselanhänger und Ähnliches), etwa auf Conventions oder in einem kleinen Onlineshop, sofern:</p>
<ul>
  <li>Das Motiv <strong>dein eigenes Originalwerk</strong> ist, nicht plagiiert oder abgepaust.</li>
  <li>Es <strong>nicht KI-generiert</strong> ist.</li>
  <li>Es <strong>keine Inhalte aus unseren Spielen</strong>, Screenshots, Store-Einträgen oder Marketingmaterialien und keine unserer Logos verwendet.</li>
  <li>Es nicht den Eindruck erweckt, offizielles Merchandise zu sein.</li>
</ul>
<p>Diese Erlaubnis gilt nur für kleine, unabhängige Creator. Massenproduktion, Einzelhandel im großen Stil, Großhandel und unlizenzierte Herstellung von Produkten zu unseren Spielen sind nicht erlaubt. Wenn du etwas Größeres vorhast, schreib uns wegen einer Lizenz.</p>

<h2 id="mods">4. Mods, Hacks und modifizierte Apps</h2>
<p>Unsere Spiele werden über Google Play vertrieben. Zum Schutz der Spieler und des Studios darfst du nicht:</p>
<ul>
  <li>Modifizierte, neu verpackte oder „gecrackte“ Versionen unserer Spiele verbreiten (einschließlich „Mod-APKs“).</li>
  <li>Versionen oder Tools verbreiten, die Werbung entfernen oder blockieren, Inhalte freischalten, den Fortschritt verändern oder Spielsysteme umgehen.</li>
  <li>Unsere Spiele in anderen App-Stores oder auf Websites erneut hochladen.</li>
  <li>Cheats, Hacks oder modifizierte Versionen verkaufen, vermieten oder hinter eine Bezahlschranke stellen oder auf irgendeine Weise Geld dafür sammeln.</li>
  <li>Code oder Inhalte unserer Spiele zurückentwickeln, dekompilieren oder extrahieren, außer soweit das Gesetz es ausdrücklich erlaubt.</li>
</ul>
<p>Mods und modifizierte Apps dürfen sich nie als offiziell oder mit AraStudioTech verbunden ausgeben und müssen die Bedingungen der Plattformen einhalten, auf denen sie erscheinen.</p>
<p><strong>Fanseiten, Wikis und Guides sind willkommen.</strong> Tipps, Levellösungen, Komplettlösungen, Rechner, Wikis und Community-Seiten sind erlaubt, und du darfst dort Werbung schalten, solange sie unser Logo nicht als Hauptmarke verwenden, nicht wie eine offizielle Seite aussehen und keine Spieldateien hosten.</p>

<h2 id="not-allowed">5. Weitere nicht erlaubte Nutzungen</h2>
<ul>
  <li>Unsere Namen, Logos, Figuren oder Grafiken in Werbung für eigene Produkte oder Dienstleistungen oder in bezahlten Suchanzeigen verwenden.</li>
  <li>NFTs, Krypto-Token oder andere Blockchain-Objekte mit unseren Inhalten erstellen.</li>
  <li>Unsere Grafiken, Musik, Texte oder andere Inhalte zum Training von KI-Modellen oder zur Erstellung KI-generierter Inhalte verwenden.</li>
  <li>Unsere Inhalte in hasserfülltem, diskriminierendem, sexuellem, gewaltverherrlichendem, rechtswidrigem oder belästigendem Material verwenden.</li>
  <li>Domains, Social-Media-Konten oder App-Einträge mit unseren Namen so registrieren, dass Verwechslungsgefahr entsteht.</li>
</ul>

<h2 id="partners">6. Creator, Presse und Partnerschaften</h2>
<p>Streamer, YouTuber, TikToker und Presse können bei uns Early Access, Pressekits und Affiliate-Partnerschaften anfragen. Wenn du etwas vorhast, das diese Richtlinie nicht abdeckt, frag uns vorher unter <a href="mailto:{{email}}">{{email}}</a>. Wir sprechen gern darüber.</p>

<h2 id="rights">7. Unsere Rechte</h2>
<ul>
  <li>Wir können dich bitten, Inhalte zu entfernen, die gegen diese Richtlinie verstoßen, und die hier erteilte Erlaubnis für bestimmte Inhalte oder Creator widerrufen.</li>
  <li>Wir können diese Richtlinie jederzeit aktualisieren. Das Datum oben zeigt die aktuelle Fassung.</li>
  <li>Diese Richtlinie umfasst nur unsere eigenen Inhalte. Inhalte Dritter, etwa das Google-Play-Badge, haben eigene Regeln (siehe die Markenrichtlinien von Google).</li>
  <li>Nichts in dieser Richtlinie schränkt Nutzungen ein, die das Gesetz ohnehin erlaubt, etwa das Zitatrecht für Kritik und Rezensionen.</li>
</ul>

<h2 id="contact">8. Kontakt</h2>
<p>Fragen zu dieser Richtlinie, Lizenzanfragen oder Hinweise auf Missbrauch: <a href="mailto:{{email}}">{{email}}</a></p>
`
  }
};
