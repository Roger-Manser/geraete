# GitHub Setup Anleitung für Geräteliste

## Schnellstart (5 Minuten)

### 1. GitHub Repository erstellen

```bash
# Terminal öffnen
# Zu GitHub gehen: https://github.com/new

# Oder mit GitHub CLI:
gh repo create geraete --public --source=HEAD --remote=origin --clone
cd geraete
```

Einstellungen:
- **Name**: `geraete`
- **Beschreibung**: "Verwaltung von Haushaltsgeräten und Elektrowerkzeugen"
- **Public**: Ja
- **.gitignore**: Keine
- **License**: MIT (optional)

### 2. Verzeichnisstruktur erstellen

```bash
# Im geraete/ Ordner:
mkdir -p docs/data/dateien

cd docs
```

### 3. Dateien entpacken

Entpacke die Geräteliste-ZIP in `docs/`:
```
docs/
├── index.html       # Hauptapp
├── manifest.json    # PWA Manifest
├── sw.js           # Service Worker
├── README.md       # Diese Datei
└── data/
    ├── geraete.json      # (wird von der App erstellt)
    └── dateien/          # (für Dateien)
```

### 4. Initialversion committen

```bash
cd .. # Zurück zum Repo-Root

git add docs/
git commit -m "Initial Geräteliste PWA Setup"
git push -u origin main
```

### 5. GitHub Pages aktivieren

1. Gehe zu **Repository Settings** → **Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / **Folder**: `/docs`
4. **Save**
5. Die App ist jetzt live unter: `https://roger-manser.github.io/geraete/`

⏳ Kann 1-2 Minuten dauern, bis live

### 6. Fine-grained Personal Access Token erstellen

Nur für Datei-Upload erforderlich:

1. https://github.com/settings/tokens?type=beta
2. **Token name**: `geraete-app`
3. **Expiration**: 90 days (oder länger)
4. **Description**: "For Geräteliste PWA"
5. **Resource owner**: Dein Account
6. **Repository access**: `Only select repositories` → `geraete`
7. **Permissions** → **Repository permissions**:
   - `contents`: `Read and write`
8. **Generate token**
9. **Token kopieren** (wird nicht nochmal angezeigt!)

Token speichern in:
```
Browser → DevTools → Application → localStorage
Key: github_token
Value: ghp_xxxxxxxxxxxxxxxxxxxx
```

### 7. Claude API Key (optional, für Photo-Analyse)

1. https://console.anthropic.com/keys
2. **+ Create Key**
3. Name: `Geräteliste`
4. Key kopieren
5. In der App unter **Settings** eingeben

### 8. Erste Initialisierung

1. App öffnen: `https://roger-manser.github.io/geraete/`
2. Modal wird angezeigt:
   - **GitHub Benutzer**: `roger-manser`
   - **Repository**: `geraete`
   - **Token**: (von Schritt 6)
   - **Claude Key**: (optional)
3. **Speichern**
4. App erstellt automatisch `data/geraete.json`

---

## Manuelle Initialisierung (Falls App-Setup fehlschlägt)

### Via Git

```bash
cd geraete/docs/data

# Leere geraete.json erstellen
cat > geraete.json << 'EOF'
{
  "geraete": [],
  "lastSync": "2024-01-01T00:00:00Z"
}
EOF

# Committen
git add geraete.json
git commit -m "Initialize geraete.json"
git push
```

### Via GitHub Web UI

1. https://github.com/roger-manser/geraete
2. Code → Add file → Create new file
3. **Name**: `docs/data/geraete.json`
4. **Content**:
```json
{
  "geraete": [],
  "lastSync": "2024-01-01T00:00:00Z"
}
```
5. **Commit directly to main**

---

## Troubleshooting

### "App lädt nicht"
- GitHub Pages Settings überprüfen
- Branch auf `main` und Folder `/docs`?
- 2 Minuten warten (Deployment läuft)
- Cache löschen (Ctrl+Shift+Delete)

### "GitHub Sync fehlgeschlagen"
- Token korrekt eingegeben?
- Token nicht abgelaufen?
- Repository existiert?
- `data/geraete.json` existiert?

### "Token funktioniert nicht"
- Token muss im Browser gespeichert sein
- Nicht im Quellcode kopieren!
- Fine-grained Token mit `contents:write` verwenden
- Nur für `geraete` Repository

### "Dateien können nicht hochgeladen werden"
- Nur mit Fine-grained Token möglich
- `contents: write` Permission erforderlich
- `data/dateien/` Ordner existiert?

---

## Erweiterte Konfiguration

### Custom Domain

1. Settings → Pages → Custom domain
2. `geraete.example.com` eingeben
3. DNS CNAME-Record erstellen:
   ```
   geraete.example.com CNAME roger-manser.github.io
   ```
4. SSL automatisch aktiviert

### Automatische Backups

GitHub Actions für tägliche Backups:

```yaml
# .github/workflows/backup.yml
name: Daily Backup

on:
  schedule:
    - cron: '0 2 * * *'  # Täglich um 2 Uhr

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Create backup
        run: |
          cp docs/data/geraete.json backup/geraete-$(date +%Y-%m-%d).json
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: 'Auto backup'
```

### Private Repository

1. Settings → Change repository visibility → Private
2. Token-Zugriff funktioniert weiterhin
3. App-Link nur für Dich zugänglich

---

## Token Security

⚠️ **Wichtig**:

- **Niemals** Token in Code committen
- Token läuft nach X Tagen ab → erneuern
- Wenn Token exposed: sofort https://github.com/settings/tokens löschen
- Verwende `localStorage` für Client-seitige Speicherung
- Browser-DevTools können Token sehen (verschlüsseln in Zukunft)

---

## CLI Schnell-Setup

```bash
# GitHub CLI muss installiert sein: https://cli.github.com

gh auth login  # Falls noch nicht angemeldet

# 1. Repo erstellen
gh repo create geraete --public --clone

cd geraete

# 2. Struktur
mkdir -p docs/data/dateien

# 3. Dateien entpacken (von ZIP)
# [Entpacke index.html, manifest.json, sw.js, README.md nach docs/]

# 4. Committen
git add docs/
git commit -m "Initial Geräteliste PWA"
git push

# 5. Pages enablen
gh repo edit --enable-pages --source main --root docs

# Fertig! App ist live: https://YOUR-USERNAME.github.io/geraete/
```

---

## Nächste Schritte

1. ✅ App öffnen und erste Geräte hinzufügen
2. 📱 Auf Handy installieren (Chrome: Menu → Installieren)
3. 📸 QR-Scanner testen
4. 📤 Sync zu GitHub testen
5. 🎉 Fertig!

**Fragen?** → Siehe README.md oder erstelle ein GitHub Issue
