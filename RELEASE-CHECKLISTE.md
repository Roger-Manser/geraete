# Release Checkliste — Geräteliste

Verwende diese Checkliste bei jeder neuen Version!

## Beispiel: Update von 1.0.0 auf 1.0.1

### 1. Änderungen Implementieren
- [ ] Code-Änderungen in `index.html`, `sw.js`, etc.
- [ ] Testing: Lokal im Browser testen
- [ ] Browser Console prüfen (keine Errors)

### 2. Versionsnummern Aktualisieren

**In `index.html`**:
```html
<!-- Header -->
<title>Geräteliste v1.0.1</title>
<meta name="version" content="1.0.1">
<h1>⚙️ Geräteliste <span style="font-size: 0.8rem; opacity: 0.8;">(v1.0.1)</span></h1>

<!-- JavaScript -->
const APP_VERSION = '1.0.1';
const APP_BUILD_DATE = '30.08.2026';  // Aktualisieren!
```

**In `manifest.json`**:
```json
{
  "version": "1.0.1",
  "build_date": "2026-08-30",
  "description": "... v1.0.1"
}
```

**In `sw.js`**:
```javascript
// Version: 1.0.1 (30.08.2026)
const CACHE_NAME = 'geraete-v1.0.1';  // WICHTIG!
```

### 3. VERSIONSHISTORIE.md Aktualisieren

```markdown
## [1.0.1] — 30.08.2026

### 🔧 Bug Fixes
- Fehler bei Suchmaske behoben
- Toast-Notifications verbessert

### ✨ Verbesserungen
- Performance optimiert
- UI-Text präzisiert

---

## [1.0.0] — 30.08.2026
[... existierende Historie ...]
```

### 4. README.md Aktualisieren (Falls nötig)
- [ ] Neue Features dokumentieren
- [ ] Breaking Changes notieren
- [ ] Installation: Versionshinweise hinzufügen

### 5. Files Kopieren zur App
```bash
cp index.html manifest.json sw.js README.md VERSIONSHISTORIE.md geraete-app/docs/
```

### 6. Git Commit & Tag
```bash
git add .
git commit -m "Version 1.0.1 - Bug Fix: Suchmaske"
git tag v1.0.1
git push origin main --tags
```

### 7. ZIP Neu Erstellen
```bash
rm geraete-app.zip
zip -r geraete-app.zip geraete-app/
```

### 8. GitHub Release (Optional)
1. https://github.com/roger-manser/geraete/releases/new
2. **Tag**: v1.0.1
3. **Title**: "Version 1.0.1 - Bug Fix"
4. **Description**: (von VERSIONSHISTORIE.md kopieren)
5. **Attach**: geraete-app.zip
6. **Publish**

### 9. Benutzer Benachrichtigung
- [ ] Discord/Slack (falls Community)
- [ ] GitHub Issue (Was wurde geändert?)
- [ ] README.md Update-Hinweis

---

## Checklisten pro Versionstyp

### PATCH-Release (1.0.0 → 1.0.1)
- Bug Fixes
- Kleine Verbesserungen
- Keine neuen Features
- **Keine Breaking Changes**

Schritte: 1-6 (kurz)

### MINOR-Release (1.0.1 → 1.1.0)
- Neue Features
- Abwärtskompatibel
- Größere Verbesserungen
- **Keine Breaking Changes**

Schritte: 1-8 (mittel)
+ Detaillierte Dokumentation

### MAJOR-Release (1.1.0 → 2.0.0)
- Breaking Changes
- Komplett neue Struktur
- Migration Guide erforderlich
- Ggf. alte Version archived

Schritte: 1-8 (komplett)
+ Migration Guide
+ Kommunikation an Benutzer

---

## Service Worker Cache-Strategie

⚠️ **WICHTIG**: CACHE_NAME muss sich mit JEDER Version ändern!

Warum?
- Browser sieht neue CACHE_NAME
- Löscht alte Caches (activate event)
- Ladet neue Version herunter
- User bekommt neueste Version

Beispiel:
```javascript
// 1.0.0
const CACHE_NAME = 'geraete-v1.0.0';

// Nach Update zu 1.0.1
const CACHE_NAME = 'geraete-v1.0.1';  // Browser:
                                       // 1. Erkennt Änderung
                                       // 2. Invalidiert 1.0.0
                                       // 3. Cacht 1.0.1
```

---

## Testing nach Update

```
□ App lädt lokal (npm server)
□ Keine Console Errors
□ Scanner funktioniert
□ Foto-Upload funktioniert
□ GitHub Sync OK
□ Search funktioniert
□ Mobile responsiv
□ PWA Installation (Handy testen)
□ Offline Mode (DevTools: Offline)
□ Light/Dark Mode (Falls implementiert)
```

---

## Deployment zu GitHub

```bash
# 1. In Repo-Verzeichnis
cd roger-manser.github.io/geraete

# 2. Alle Files aktualisieren
cp /path/to/geraete-app/docs/* .

# 3. Committen
git add .
git commit -m "Version 1.0.1"

# 4. Pushen
git push origin main

# 5. GitHub Pages deployed automatisch
# → https://roger-manser.github.io/geraete/
```

---

## Probleme & Lösungen

### "User sieht alte Version noch"

**Grund**: Service Worker cached noch alte Version

**Lösung**:
- Hard-Refresh: Ctrl+Shift+R
- Browser Cache löschen
- Service Worker deregistrieren (DevTools)
- Warten bis neue CACHE_NAME aktiv (max 30 Min)

### "CACHE_NAME vergessen zu aktualisieren"

**Problem**: User bekommt neue Code, aber altes Caching

**Lösung**:
1. Sofort neue Datei deployen mit korrektem CACHE_NAME
2. Version zu 1.0.2 bumpen
3. Alle User notifizieren (Toast: "Bitte Reload")

### "Alte App-Version funktioniert nicht mehr"

**Grund**: Backend/API geändert, alte Client-Version inkompatibel

**Lösung**:
1. Minimum-Version in App prüfen
2. Benutzer zum Update zwingen (Banner)
3. Migration Guide bereitstellen

---

## Versioning mit anderen Apps

Diese Versioning-Strategie nutzen auch:
- **Haushaltbuch** (v2.x.x)
- **Fahrtenbuch** (v1.x.x)
- **Rezeptbuch** (v3.x.x)
- **Lebenskosten** (v1.x.x)

Alle folgen same Schema: MAJOR.MINOR.PATCH + VERSIONSHISTORIE.md

---

## Semver Referenz

https://semver.org/

**MAJOR.MINOR.PATCH** bedeutet:

1. **MAJOR** version wenn du inkompatible API-Änderungen machst
2. **MINOR** version wenn du neue Features hinzufügst (kompatibel)
3. **PATCH** version wenn du Bug Fixes machst

Zusatz:
- `v1.0.0-beta` = Pre-Release
- `v1.0.0+build.20240830` = Build Metadata

---

**Letzte Aktualisierung**: 30.08.2026  
**Gültig für**: v1.0.0 und höher
