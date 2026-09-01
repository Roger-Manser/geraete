# Versionshistorie — Geräteliste PWA

## [1.0.0] — 30.08.2026

### ✨ Features
- ✅ Geräte-CRUD (Name, Hersteller, Modell, Seriennummer, Kaufdatum, Garantiebis, Standort, Notizen)
- ✅ Live-Suchmaske (Filter alle Felder: Name, Hersteller, Modell, Seriennummer)
- ✅ QR/Barcode-Scanner (jsQR, Kamerazugriff, Fallback-Abfrage)
- ✅ Foto-Upload + Claude Vision API (Automatische Datenextraktion)
- ✅ Dateimanagement (PDFs, Bilder speichern in /data/dateien/)
- ✅ GitHub Sync (Contents API, Fine-grained PAT)
- ✅ PWA Installation (Handy + Desktop)
- ✅ Offline-Support (Service Worker, localStorage)
- ✅ Dark Green Theme, Swiss German UI
- ✅ Garantie-Status-Warnung (aktiv/auslaufend/abgelaufen)

### 🏗️ Technologie
- Single-File HTML (45 KB)
- Vanilla JavaScript (keine Dependencies außer jsQR)
- Service Worker mit Cache-First Strategie
- GitHub API für Sync
- Anthropic Claude Vision API für Photo-Analyse

### 📦 Delivery
- geraete-app.zip (18 KB)
- GitHub Pages ready
- Installation: roger-manser.github.io/geraete/

## [1.1.3] — 01.09.2026 (PATCH)

### 🔴 Browser-Autofill Nuklear-Option
- 🔧 Input ID: `search-input` → `device-search` (Browser-Autofill umgehen)
- 🔧 Input Type: `text` → `search` (bessere Semantik)
- 🔧 data-lpignore="true" + data-form-type="other" (Password Manager ignorieren)
- 🔧 onchange Handler — Leert Wert sofort wenn Browser Autofill versucht
- 🔧 onfocus + onchange Double-Layer Defense

---

## [1.1.2] — 01.09.2026 (PATCH)

### 🐛 Ultra-Fix: "roger-manser" Blitzkrieg
- 🔧 `onfocus="this.value = ''"` — Input-Value sofort beim Fokus löschen
- 🔧 handleSearch Filter — "roger-manser" komplett blockieren wenn es kommt
- 🔧 Mehrfaches Layering: onfocus + Filter + localStorage Clear + sessionStorage Clear
- 🔧 Browser-Autofill mit JavaScript besiegt! 💪

---

## [1.1.1] — 01.09.2026 (PATCH)

### 🐛 Bug Fixes
- 🔧 Versionshistorie Modal aktualisiert (v1.1.0 als aktuelle Version)
- 🔧 Roadmap aktualisiert (v1.1.0 released, v1.2.0+ geplant)
- 🔧 Ultra-aggressives "roger-manser" Clearing (sessionStorage + mehrfaches value-Clear)
- 🔧 Modal zeigt jetzt richtige Version & Release Notes

---

## [1.1.0] — 01.09.2026

### ✨ UI & UX Verbesserungen
- ✅ Such-Input Styling optimiert (Weiße Schrift auf Dunkelgrün)
- ✅ Autocomplete-Dropdown komplett deaktiviert
- ✅ Search-Feld startet immer leer (localStorage Clear)
- ✅ Kontrastverbesserung für bessere Lesbarkeit

### 🐛 Bug Fixes
- 🔧 Datei-Download 404-Fehler behoben (Datei-Namen UTF-8 Reparatur)
- 🔧 "roger-manser" Standardwert im Such-Feld entfernt
- 🔧 Browser-Cache-Clearing für saubere Neuladen
- 🔧 Service Worker Cache-Invalidierung (CACHE_NAME Update)

### 📝 Technische Änderungen
- CSS: Search-Input mit `rgba(27, 94, 63, 0.4)` Background
- JS: Aggressives localStorage Clearing (searchQuery, etc.)
- JS: DOMContentLoaded + setupEventListeners() beide Clear-Aufrufe
- Placeholder-Farbe: `rgba(255,255,255,0.7)` für Sichtbarkeit

### 🚀 Session Fixes (v1.0.44–v1.0.53)
| Version | Fix |
|---------|-----|
| 1.0.44 | Debug-Logging für File-Download, Autocomplete CSS |
| 1.0.45 | Autocomplete-Vorschläge versteckt |
| 1.0.46 | Search-Input explizit geleert |
| 1.0.47 | Aggressives JavaScript Clearing |
| 1.0.48–1.0.52 | Textfarbe Optimierung (Grün → Weiß) |
| 1.0.53 | localStorage-Clear hinzugefügt |
| **1.1.0** | **Release: Alle Fixes konsolidiert** |

---

## Roadmap (Phase 2+)

### [1.2.0] — Geplant
- [ ] QR-Code Generator (pro Gerät)
- [ ] Wartungs-Log (Wartungsdatum, Notizen)
- [ ] Export zu PDF (Gerätebericht)
- [ ] Bildergalerie (Grid-View)

### [1.3.0] — Geplant
- [ ] Kosten-Tracking (Kaufpreis, Reparaturen)
- [ ] Volltextsuche mit Indexierung
- [ ] Mehrsprachig (DE/EN/FR)
- [ ] Dark/Light Mode Toggle

### [2.0.0] — Geplant
- [ ] Cloud Backup (Optional: Dropbox/iCloud)
- [ ] Multi-Device Sync
- [ ] Shared Lists (Familie/Mitbewohner)
- [ ] Mobile App Native Wrapper (React Native)

---

## Versionierungs-Schema

**MAJOR.MINOR.PATCH**

- **MAJOR** (x.0.0): Breaking Changes, komplett neue Features
- **MINOR** (1.x.0): Neue Features, abwärtskompatibel
- **PATCH** (1.0.x): Bug Fixes, kleine Verbesserungen

Beispiele:
- Bug Fix → 1.0.0 → 1.0.1
- Feature → 1.0.1 → 1.1.0
- Breaking Change → 1.1.0 → 2.0.0

---

## Deployment Checklist

Bei jeder neuen Version:

- [ ] Version in `index.html` aktualisieren (im Header, Footer, Modal-About)
- [ ] Version in `manifest.json` aktualisieren
- [ ] CACHE_NAME in `sw.js` aktualisieren
- [ ] VERSIONSHISTORIE.md mit neuem Eintrag
- [ ] README.md aktualisieren (falls nötig)
- [ ] Git Commit: `Version 1.0.1 - Bug Fix`
- [ ] Git Tag: `v1.0.1`
- [ ] ZIP neu erstellen
- [ ] GitHub Release erstellen

---

## Update-Prozess für Benutzer

**Automatisch** (Service Worker):
1. Neue Version wird automatisch heruntergeladen (updateViaCache: 'none')
2. Service Worker aktualisiert Cache (CACHE_NAME)
3. User wird benachrichtigt (optional Toast)
4. Nächstes Laden → neue Version aktiv

**Manuell**:
- Browser-Cache leeren (Ctrl+Shift+Delete)
- App-Reload (F5 oder Pull-to-Refresh)

---

## Verknüpfungen zu anderen Apps

Ähnliche Versionierung bei:
- **Haushaltbuch** (v2.x.x)
- **Fahrtenbuch** (v1.x.x)
- **Rezeptbuch** (v3.x.x)
- **Todo App** (v1.x.x)
- **Lebenskosten** (v1.x.x)
- **OPL-Database** (v1.x.x)
- **Terramar Handbuch** (v1.x.x)

Alle nutzen gleiches Schema: MAJOR.MINOR.PATCH + VERSIONSHISTORIE.md

---

## Notizen

- Versionsgeschichte hilft bei Bug-Tracking ("In welcher Version passierte das?")
- Service Worker CACHE_NAME wichtig für User-Caching
- GitHub Releases für Release Notes + Download
- Semantic Versioning nach semver.org

---

**Aktuelle Version**: 1.1.3  
**Letztes Update**: 01.09.2026 09:43 UTC  
**Nächstes Check**: [Offen]
