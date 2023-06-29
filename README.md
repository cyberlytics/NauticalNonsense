# BDCC_Team_Blau
# Nautical Nonsense
## Because Sometimes You Just Need to Sink Something

Nautical Nonsense ist ein Cloud Native Browser-Spiel nach dem Vorbild von "Schiffe versenken".

## Aufbau

Das Monorepo gliedert sich in folgende Unterordner
- `backend` - Backend der Anwendung mit FastAPI
- `frontend` - Frontend der Anwendung mit Phaser
- `deployment` - Deployment der Anwendung mit Kubernetes
- `infrastructure` - Deployment der Anwendung mit Kubernetes
- `templates` - Deployment der Anwendung mit Kubernetes

## Dokumentation
Im Ordner `sys_doc` befinden sich drei Ordner, welche Informationen zum Projekt beinhalten:
- `concept_paper`- Konzeptpapiert zeigt die zugrundeliegende Motivation und Idee des Projekts auf
- `technical_report`- Der Technical Report beschreibt die Architektur und Details der Umsetzung
- `Diagramme`- Diagramme, welche den Programm- und Spielablauf beschreiben

## Installation
### Voraussetzungen
Um das Projekt starten zu können benötigst du lediglich eine lauffähige `docker-compose` Installation. Um die Tests ausführen zu können benötigst du zusätzliche Programme:
- Frontend: `npm`
- Backend: `python`>=3.10, `pytest`, `pytest-asyncio` und `pytest-cov`

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
python -m pytest --cov -v --cov-report term-missing --cov-branch
``` 