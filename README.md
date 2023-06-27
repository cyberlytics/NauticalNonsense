# BDCC_Team_Blau
# Nautical Nonsense
## Because Sometimes You Just Need to Sink Something

Nautical Nonsense ist ein Cloud Native Browser-Spiel nach dem Vorbild von "Schiffe versenken".

## Aufbau

Das Monorepo gliedert sich in folgende Unterordner
- `backend` - Backend der Anwendung mit FastAPI
- `frontend` - Frontend der Anwendung mit Phaser

## Dokumentation
Im Ordner `sys_doc` befinden sich zwei PDF-Dateien die das Projekt beschreiben:
- Das Konzeptpapiert zeigt die zugrundeliegende Motivation und Idee des Projekts auf.
- Der Technical Report beschreibt die Architektur und Details der Umsetzung.

## Installation
### Voraussetzungen
Um das Projekt starten zu können benötigst du lediglich eine lauffähige `docker-compose` Installation. Um die Tests ausführen zu können benötigst du zusätzliche Programme:
- Frontend: `npm`
- Backend: `python`>=3.8

### Starten der Anwendung
Zuerst musst du das Git Repository in ein lokales Verzeichnis klonen. Anschliesend kann mit Docker-Compose die gesamte Anwendung gestartet werden:
```bash
cd sys_src
docker-compose up
```
Docker wird die benötigten Images automatisch herunterladen und die Container starten. Anschliesend kannst du das Spiel lokal unter dem Port 8080 im Browser aufrufen (`localhost:8080/`).
Um die Anwendung zu stoppen genügt der Befehl:
```bash
docker-compose down
```

### Testen
#### Frontend

```bash
cd sys_src/frontend/NauticalNonsense
npm install
npm run test
```
#### Backend
```bash
cd sys_src/backend/
pip install -r requirements.txt
pip install pytest pytest-cov pytest-asyncio
pytest --cov=. --cov-report xml --cov-report term-missing --junitxml=report.xml
``` 