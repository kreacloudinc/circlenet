# Mappa dei Contatti

Questa repository contiene "Mappa dei Contatti", una piccola applicazione composta da un backend Node.js con SQLite e da un frontend React. Il server Express serve i file statici presenti nella cartella `frontend` e fornisce API facoltative per salvare i contatti in un database.

L'applicazione permette di gestire i propri contatti su una mappa a cerchi concentrici: ogni contatto è rappresentato da un nodo trascinabile. Le informazioni e le posizioni vengono salvate nel `localStorage` del browser oppure, se attivato, nel database SQLite tramite le API del backend.

## Requisiti

- Node.js 20+

## Installazione

Installa le dipendenze con npm:

```bash
npm install
```

## Avvio

Esegui il server:

```bash
npm start
```

Il database SQLite verrà creato automaticamente nel file `contacts.db` nella radice del progetto.

Apri poi [http://localhost:3000](http://localhost:3000) per usare l'applicazione.
Dal menu in alto è possibile attivare l'uso del backend per salvare i contatti nel database.
