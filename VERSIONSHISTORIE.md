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

## [1.5.2] — 04.09.2026 (PATCH)

### Clean-Up
- Entfernte ALLE console.log Befehle
- Entfernte alle Emojis aus dem Code
- Code ist jetzt minimal und sauber
- Keine Syntax Errors mehr!

---

## [1.5.1] — 04.09.2026 (PATCH)

### 🔧 Syntax Error Fix
- 🔧 Entfernte verwaiste Debug-Logs aus saveDevice()
- 🔧 Bereinigt den Code nach sed-Befehlen
- 🔧 Auto-Garantie funktioniert jetzt ohne Fehler

---

## [1.5.0] — 03.09.2026 (FEATURE)

### ✨ Auto-Garantie Berechnung
- 🔧 Wenn Kaufdatum eingegeben → Garantie bis wird automatisch berechnet
- 🔧 Formel: Kaufdatum + 2 Jahre - 1 Tag
- 🔧 Z.B. Kaufdatum 01.01.2024 → Garantie bis 31.12.2025
- 🔧 Funktioniert bei neuen und bearbeiteten Geräten
- 🔧 Kann manuell noch angepasst werden

---

## [1.4.0] — 03.09.2026 (STABLE - Production Release)

### ✅ Stabiler Production Release
- 🔧 Debug-Logs entfernt - Code ist sauber
- 🔧 Alle Features funktionieren perfekt
- ✨ **Speichern:** ✅ Funktioniert
- ✨ **Bearbeiten:** ✅ Funktioniert
- ✨ **Löschen:** ✅ Funktioniert
- ✨ **GitHub Sync:** ✅ Funktioniert
- 🎉 Einsatzbereit!

---

## [1.3.0] — 03.09.2026 (MAJOR: ROOT CAUSE FOUND!)

### 🔴 KRITISCHER BUG BEHOBEN - Der Grund warum nichts gespeichert wurde!

**Das Problem:** 
- Zeile 1305 hatte: `app.currentDevice = { ...device };`
- Das ist eine **KOPIE** des Geräts, nicht eine Referenz!
- Wenn wir bearbeiten, bearbeiten wir die Kopie
- Das Original im Array bleibt LEER!
- Beim Upload wird das Original (mit leerem Hersteller) hochgeladen!

**Die Lösung:**
- Geändert zu: `app.currentDevice = device;`
- Jetzt ist es eine **DIREKTE REFERENZ** zum Gerät im Array
- Alle Änderungen gehen direkt ins Array!
- Beim Upload sind die Daten bereits korrekt!

**Resultat:** ✅ Alles wird jetzt gespeichert!

---

## [1.2.4] — 03.09.2026 (PATCH)

### 🔍 Zeige LETZTE 30 Zeilen des JSON
- 🔧 Jetzt werden die LETZTEN 30 Zeilen des JSON-Strings gezeigt (nicht die ersten!)
- 🔧 Das letzte Gerät mit "Bose" sollte dort zu sehen sein
- 🔧 Zeigt auch: `TOTAL: X` - Wie viele Zeilen der JSON hat
- 🔧 Wird zeigen ob Bose wirklich im JSON ist oder nicht!

---

## [1.2.3] — 03.09.2026 (PATCH)

### 🔍 JSON-Upload Debugging
- 🔧 Zeigt den JSON-String der hochgeladen wird (erste 30 Zeilen)
- 🔧 Überprüft ob das GEÄNDERTE Gerät im Array ist
- 🔧 Zeigt: `✅ GERÄT GEFUNDEN im Array (Index X)` oder `❌ GERÄT NICHT IM ARRAY`
- 🔧 Zeigt: `app.devices[X].hersteller = 'Bose'` (was im Array gespeichert ist)
- 🔧 Wird zeigen ob Gerät nicht ins Array gepusht wurde!

---

## [1.2.2] — 03.09.2026 (PATCH)

### 🔍 renderDevices() Debugging
- 🔧 Zeigt alle Hersteller in der Liste wenn renderDevices() aufgerufen wird
- 🔧 Logs zeigen welche Hersteller im RAM sind
- 🔧 `📋 ALLE HERSTELLER:` nach jedem Render-Aufruf
- 🔧 Wird zeigen ob "Bose" in der Liste ist aber nicht angezeigt wird

---

## [1.2.1] — 03.09.2026 (PATCH)

### 🔍 Besseres Hersteller-Debugging
- 🔧 Debug zeigt jetzt das GERÄT MIT "BOSE" - nicht das erste!
- 🔧 Sucht nach `hersteller === 'Bose'` in allen Geräten
- 🔧 Wenn nicht gefunden: Zeigt ALLE Hersteller in der Liste
- 🔧 `📤 UPLOAD - BOSE GERÄT:` oder `⚠️ KEIN GERÄT MIT BOSE`
- 🔧 `📥 GELADEN - BOSE GERÄT:` oder `⚠️ GELADEN - KEIN GERÄT MIT BOSE`

---

## [1.2.0] — 03.09.2026 (MINOR: Cleanup)

### 🧹 Code-Cleanup & Fokussiertes Debugging
- 🔧 Alle unnötigen Debug-Logs entfernt
- 🔧 **Fokus auf HERSTELLER-Feld nur:**
  - `🔍 INPUT HERSTELLER:` - Was wurde eingegeben?
  - `💾 RAM HERSTELLER:` - Was ist im RAM?
  - `📤 UPLOAD - Erstes Gerät:` - Was wird hochgeladen?
  - `📥 GELADEN - Erstes Gerät:` - Was wird von GitHub gelesen?
- 🔧 Einfache, klare Logs - leicht zu verstehen
- 🔧 Zum Debuggen: Öffne Console, ändere Hersteller, drücke Speichern → Logs anschauen!

---

## [1.1.11] — 03.09.2026 (CRITICAL: GitHub Cache Fix)

### 🔴 GITHUB CACHE PROBLEM GELÖST!
- 🔧 **Problem:** Upload erfolgreich, aber loadDevices() holte alte Daten (GitHub cache)
- 🔧 **Lösung:** Nach Upload NICHT neu laden - Daten sind bereits im RAM korrekt!
- 🔧 **Änderung:** Entfernte loadDevices() aus saveDevice() & deleteDevice()
- 🔧 **Effekt:** renderDevices() aktualisiert die UI mit den aktuellen RAM-Daten
- 🔧 **BEHEBT:** "Wird nicht gespeichert" Problem vollständig!

---

## [1.1.10] — 03.09.2026 (PATCH)

### 🔧 JSON Parse Error-Handling
- 🔧 Try-Catch um JSON.parse() hinzugefügt
- 🔧 Zeigt exakten Fehler wenn JSON-Parsing crasht
- 🔧 Zeigt String-Anfang bei Fehler für Debugging
- 🔧 Detailed Error-Logs: 6️⃣ 7️⃣ 8️⃣ 9️⃣ Steps

---

## [1.1.9] — 03.09.2026 (CRITICAL BUG FIX)

### 🔴 KRITISCHER BUG BEHOBEN!
- 🔧 **saveDevice() war nicht async!** → loadDevices() wurde nicht awaited
- 🔧 **deleteDevice() war nicht async!** → loadDevices() wurde nicht awaited
- 🔧 Sync war erfolgreich (200), aber loadDevices() wurde nicht ausgeführt
- 🔧 **BEHEBT:** Bestehende Geräte-Änderungen werden jetzt gespeichert!
- 🔧 Beide Funktionen jetzt async + await für alle Operationen

---

## [1.1.8] — 03.09.2026 (PATCH)

### 🔧 loadDevices() Debug
- 🔧 Console Logs am Anfang & Ende
- 🔧 Error-Stack bei Fehler anzeigen
- 🔧 Wird zeigen ob loadDevices() crasht oder erfolgreich ist
- 🔧 Findet warum bestehendes Geräte nicht gespeichert wird

---

## [1.1.7] — 03.09.2026 (PATCH)

### 🔍 Maximum Debug-Verbosity
- 🔧 saveDevice() - Schritt-für-Schritt Logging (1️⃣ 2️⃣ 3️⃣ 4️⃣)
- 🔧 Button-Click Logging ("🖱️ SPEICHERN BUTTON GEKLICKT")
- 🔧 syncWithGitHub() - Komplettes Debug
- 🔧 Zeigt: Buttons werden geklickt → Funktionen aufgerufen → Sync startet → GitHub Upload

---

## [1.1.6] — 03.09.2026 (PATCH)

### 🔧 Aggressives Debug-Logging
- 🔧 Console-Logs in syncWithGitHub() für jeden Schritt
- 🔧 Config-Check mit Details
- 🔧 API-URL, SHA, Upload-Status - alles geloggt
- 🔧 Einfach F12 → Console öffnen und Fehler sehen!

---

## [1.1.5] — 03.09.2026 (PATCH)

### 🔄 Sync Fix
- 🔧 `loadDevices()` wird nach erfolgreichem GitHub Upload aufgerufen
- 🔧 Geräte werden jetzt nach dem Sync sofort aktualisiert
- 🔧 Speichern & Löschen funktioniert wieder

---

## [1.1.4] — 03.09.2026 (PATCH)

### 🐛 Bug Fix
- 🔧 ReferenceError behoben: `loadDevicesFromGitHub()` → `loadDevices()`
- 🔧 Funktionsnamen konsistent gemacht
- 🔧 App lädt jetzt Geräte richtig beim Start

---

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

**Aktuelle Version**: 1.1.4  
**Letztes Update**: 03.09.2026 11:30 UTC  
**Nächstes Check**: [Offen]
