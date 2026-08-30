# Geräteliste PWA

Eine native Progressive Web App für die Verwaltung von Haushaltsgeräten und Elektrowerkzeugen.

## Features

✅ **Geräte-Verwaltung**: Name, Hersteller, Modell, Seriennummer, Kaufdatum, Garantie, Standort  
✅ **Live-Suchmaske**: Suche nach Name, Hersteller, Modell, Seriennummer  
✅ **Barcode/QR-Scanner**: Mit Kamera direkt scannen  
✅ **Foto-Upload + Claude Vision API**: Automatische Datenextraktion aus Bildern  
✅ **Dateimanagement**: PDF, Bilder, Bedienungsanleitungen speichern  
✅ **GitHub Sync**: Automatische Synchronisierung auf GitHub  
✅ **PWA Installation**: Installierbar auf Handy & Desktop  
✅ **Offline-Support**: Funktioniert ohne Internetverbindung  
✅ **Dark Green Theme**: Swiss German UI  

## Installation

### Schritt 1: GitHub Setup

1. Erstelle ein neues **öffentliches** Repository: `geraete`
2. Erstelle eine `data/` Ordnerstruktur:
   ```
   geraete/
   ├── data/
   │   ├── geraete.json
   │   └── dateien/
   ```
3. Initialisiere `data/geraete.json` mit:
   ```json
   {
     "geraete": [],
     "lastSync": "2024-01-01T00:00:00Z"
   }
   ```

### Schritt 2: GitHub Pages aktivieren

1. Repository-Settings → Pages
2. Source: **main** branch, `/docs` folder
3. Custom domain (optional): `geraete.example.com`

### Schritt 3: Dateien entpacken

Entpacke alle Dateien in den `/docs` Ordner:
```
docs/
├── index.html
├── manifest.json
├── sw.js
└── README.md
```

### Schritt 4: GitHub Tokens erstellen

#### Fine-grained Personal Access Token (für Dateien)
1. https://github.com/settings/tokens?type=beta
2. **Permissions**: `contents:write` (nur für `/data/dateien/` Ordner)
3. **Repository access**: Only select repositories → wähle `geraete`
4. Token kopieren

#### Classic Personal Access Token (für JSON-Sync)
1. https://github.com/settings/tokens
2. **Scopes**: `repo` (full control of private repositories)
3. Token kopieren (als Fallback zu Fine-grained token)

### Schritt 5: Claude API Key

1. https://console.anthropic.com/keys
2. **API Key generieren** (für Photo-Analyse)
3. Key sicher speichern

### Schritt 6: App-Konfiguration

1. App öffnen: `https://roger-manser.github.io/geraete/`
2. GitHub-Modal wird angezeigt:
   - **GitHub Benutzer**: `roger-manser`
   - **Repository Name**: `geraete`
   - **GitHub Token**: (Fine-grained oder Classic)
   - **Claude API Key**: (optional, für Photo-Analyse)
3. Speichern → App lädt

## Verwendung

### Gerät hinzufügen
1. `+ Gerät` Button
2. Grundinfos ausfüllen (Name, Hersteller, Modell, SN)
3. **Optional**: Foto uploaden → Claude Vision API extrahiert Infos automatisch
4. Dateien hinzufügen (PDFs, Bilder)
5. Speichern → Sync zu GitHub

### Barcode scannen
1. `📱 Scan` Button
2. Barcode/QR-Code mit Kamera erfassen
3. Code wird angezeigt
4. `Verwenden` → als Seriennummer speichern
5. Oder `Erneut scannen`

### Suchen
- Live-Filterung nach Name, Hersteller, Modell, Seriennummer
- Suchfeld in Header

### Synchronisierung
- `🔄 Sync` Button → manuell synchronisieren
- Auto-Sync nach jedem Speichern
- Offline-Modus unterstützt

## Datenstruktur (GitHub)

### `geraete.json`
```json
{
  "geraete": [
    {
      "id": "1234567890",
      "name": "Waschmaschine",
      "hersteller": "Bosch",
      "modell": "WAZ28740",
      "seriennummer": "ABC123XYZ",
      "kaufdatum": "2020-03-15",
      "garantiebis": "2025-03-15",
      "standort": "Keller",
      "notizen": "...",
      "dateien": [
        {
          "id": "file-1",
          "name": "Bedienungsanleitung.pdf",
          "type": "bedienungsanleitung",
          "size": 2458624,
          "githubPath": "data/dateien/waschmaschine-001/Bedienungsanleitung.pdf",
          "hochgeladen": "2024-01-20T12:00:00Z"
        }
      ],
      "erstelltAm": "2024-01-20T12:00:00Z",
      "aktualisierAm": "2024-01-20T12:00:00Z"
    }
  ],
  "lastSync": "2024-01-20T12:00:00Z"
}
```

### Dateien-Ordner
```
data/dateien/
├── waschmaschine-001/
│   ├── Bedienungsanleitung.pdf
│   ├── Foto.jpg
│   └── Garantie.pdf
├── kühlschrank-001/
│   └── Manual_DE.pdf
└── [weitere Geräte]/
```

## API Integration

### Claude Vision API
- Analysiert hochgeladene Fotos
- Extrahiert: Hersteller, Modell, Seriennummer
- Befüllt automatisch Formularfelder
- Erfordert API Key in `localStorage`

### GitHub API (Contents Endpoint)
- Read/Write Zugriff auf Dateien
- Automatische Versionierung
- Branch: `main`
- Authentifizierung: Personal Access Token

## Versioning

**Aktuelle Version**: 1.0.0 (30.08.2026)

Schema: **MAJOR.MINOR.PATCH**
- **MAJOR** (x.0.0): Breaking Changes, komplett neue Features
- **MINOR** (1.x.0): Neue Features, abwärtskompatibel  
- **PATCH** (1.0.x): Bug Fixes, kleine Verbesserungen

Siehe **VERSIONSHISTORIE.md** für alle Versionen und Roadmap.

### Automatische Updates
- Service Worker checkt täglich
- CACHE_NAME erhöht sich mit Version
- User sieht "Neue Version verfügbar" (Phase 2)

## Browser-Support

✅ Chrome/Edge 90+  
✅ Safari 15+  
✅ Firefox 88+  
✅ Android Chrome  
✅ iOS Safari (begrenzt)  

## Installation auf Handy

### Android (Chrome)
1. App öffnen
2. Menu → "Zum Startbildschirm hinzufügen"
3. App wird als Icon installiert

### iOS (Safari)
1. App öffnen
2. Share → "Zum Startbildschirm"
3. App wird als Icon installiert

## Offline-Modus

- Service Worker cached alle Daten
- Änderungen werden lokal gespeichert
- Auto-Sync wenn Verbindung wiederhergestellt
- Keine Datenverluste

## Sicherheit

⚠️ **Wichtig**:
- Tokens nur in Private/Incognito speichern
- Kein Passwort in `notizen` speichern
- GitHub Repo sollte privat sein
- Claude API Key nur lokal speichern

## Troubleshooting

### "GitHub Sync fehlgeschlagen"
- Token überprüfen
- Repository-Name korrekt?
- `data/` Ordner existiert?

### "Foto-Analyse nicht möglich"
- Claude API Key eingegeben?
- API Key gültig?
- Internetverbindung?

### "Kamerazugriff verweigert"
- Browser-Berechtigung prüfen
- HTTPS erforderlich!

## Weitere Versionen

**Phase 2** (geplant):
- QR-Codes generieren pro Gerät
- Wartungs-Log (Wann wurde gewartet?)
- Kosten-Tracking
- Export zu PDF
- Volltext-Suche mit Indexierung
- Bilder-Galerie pro Gerät

## Support

- Issues auf GitHub
- Discord: roger-manser#1234
- Email: roger@example.com

---

**Version**: 1.0.0  
**Letzte Änderung**: 30.08.2026  
**Lizenz**: MIT  
