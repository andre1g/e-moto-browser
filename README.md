# e-moto / browser delle enduro elettriche

Interfaccia HTML/CSS/JavaScript in italiano, senza dipendenze e utilizzabile offline. I link esterni richiedono Internet. Repository locale: nessuna pubblicazione remota effettuata.

## Progetto personale, condiviso gratuitamente

Questo è uno strumento **vibe coded**, creato per uso personale per aiutarmi a scegliere e acquistare una e-moto nuova per me. Lo rendo disponibile gratuitamente, così com’è, senza assumermi alcuna responsabilità per il suo utilizzo, per eventuali errori o omissioni nei dati, né per le decisioni di acquisto prese sulla base delle informazioni riportate. Verifica sempre prezzi, specifiche, disponibilità e omologazione direttamente con il produttore o il rivenditore.

## Avvio

Apri **index.html** nel browser con un doppio clic. Non servono Node.js, build, account o chiavi API. In alternativa:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Apri `http://127.0.0.1:8080`. Arresta il server con Ctrl+C.

## Funzioni

- Catalogo separato L1e/L3e, ricerca e filtri per marchio, canale di acquisto e peso.
- Ordinamento per prezzo, peso e picco dichiarato, all’interno delle due classi. Valori non verificati in fondo.
- Collegamenti a produttori, acquisto e fonti, con stato dell’ufficialità del venditore.
- Confronto persistente nel browser: cambia i filtri senza perdere le moto selezionate.
- Esportazione CSV con note e URL; stampa del confronto tramite il browser.
- Layout responsive, navigazione da tastiera, nessun servizio di tracking o font remoto.

## Catalogo e ricerca

Fonti consultate il **13 ottobre 2026**. 16 versioni di 9 marchi: Stark Future, Talaria, Sur-Ron, Arctic Leopard, 79bike, KTM, Electric Motion, E Ride Pro e Zero Motorcycles. La data è editoriale: non viene aggiornata ad ogni visita. Prezzi e stock non vengono sincronizzati automaticamente. Aprire sempre le fonti per i valori attuali.

Ogni scheda riguarda una versione stradale dichiarata: niente conversioni tramite kit luci, MX non documentate, giocattoli o pit bike. Le compatte e le full size sono distinte dalla descrizione e dal filtro peso. Electric Motion Escape R è un’alternativa da motoalpinismo su base trial, esplicitamente segnalata.

Il catalogo è una selezione delle principali famiglie, non un censimento esaustivo. Esclusi Hyper Bee, KTM SX-E, pit bike e prototipi senza offerta stradale verificata; RFN Ares Road esclusa perché motard. Arctic Leopard EXT è principalmente trial. La vecchia Sur-Ron Storm Bee non è stata aggiunta senza una fonte attuale e coerente della specifica versione stradale.

### Come vengono trattati i dati

- **L1e/L3e**: categoria della versione dichiarata dalle fonti. Le equivalenze A1/125 cc vengono indicate come tali; nessuna sottocategoria legale dedotta dal picco. Il CoC della singola moto resta la verifica finale per l’immatricolazione italiana.
- **Prezzo**: listino italiano quando disponibile, senza ecobonus statali; promozioni del marchio nelle note. Prezzi base e configurazioni potenti non vengono abbinati arbitrariamente. Se una pagina comune non permette di identificare il prezzo della precisa versione, `null` e preventivo. Prezzo europeo esplicitamente identificato, IVA per destinazione/spedizione da confermare.
- **Potenza**: nominale continua separata dal picco dichiarato. Per L1e non si usa il picco della versione sbloccata. Per L3e il picco può riferirsi a configurazione sportiva: la nota ne conserva il contesto. Le conversioni Stark da CV a kW sono documentate, non sono un valore letto dal CoC.
- **Peso**: con batteria quando dichiarato, altrimenti base di misura esplicitata come sconosciuta. Niente normalizzazione inventata. Arctic XE Pro R: fonte discordante 75/77 kg e ruote 19/18 vs 21/18; peso numerico lasciato sconosciuto. Komodo: peso stradale non acquisito.
- **Rivenditori**: priorità Italia. Arctic Leopard Italia è collegato dal produttore; Ridewill compare nel portale Stark. Talaria usa shop e rete del canale nazionale. KTM rimanda ad annunci di concessionari indicati ufficiali dalla piattaforma. Gli altri canali dichiarati ufficiali o non verificati sono etichettati senza trasformare l’autodichiarazione in certificazione. Nessun canale italiano della precisa variante stradale 79bike/E Ride Pro verificato: fallback europeo. Electric Motion Italia propone la famiglia, anno/versione da confermare.
- **Sur-Ron HP**: canale italiano di contatto disponibile, ma fonte prezzo e specifiche della HP T L3e è ELMOX, Germania. Il confronto mantiene questa provenienza.
- **Zero Motorcycles XB/XE**: XB stradale in L1e, XE stradale A1 in L3e. Prezzi indicativi italiani da Vaielettrico (4.720/6.770 €), non preventivi ufficiali. Le pagine modello italiane sono dinamiche e non hanno restituito le specifiche alla lettura automatica: nominale e picco sono delle schede europee Brandt (XB 4/7,5 kW; XE 6/15,5 kW), con corrispondenza della versione italiana da confermare. XE pesa 101 kg secondo Zero Italia; XB 63 kg secondo il canale europeo e Motorgreen. Link alla rete ufficiale italiana e a Motorgreen, che dichiara distribuzione regionale senza conferma acquisita sul locator. I prezzi promozionali di Motorgreen non vengono applicati al listino.

### Fonti principali

- [Stark Future EX](https://starkfuture.com/it-IT/products/stark-varg-ex)
- [Talaria Italia](https://www.talariamoto.it/) e [rete rivenditori](https://www.talariamoto.it/rivenditori/)
- [Sur-Ron EU](https://eu.surron.com/) e [ELMOX HP L3e](https://elmox.de/collections/surron-modelle-2026/products/surron-ultra-bee-hp-2026)
- [Arctic Leopard e distributori](https://arctic-leopard.com/)
- [79bike Road Legal](https://79bikes.eu/it/products/79bike-falcon-pro) e [Ride On Distribution](https://www.rideondistribution.com/en)
- [KTM FREERIDE E 2027](https://www.ktm.com/it-it/models/electric/freeride/2027-ktm-freeridee.html)
- [Electric Motion X+](https://em-motorcycles.com/en/escape-x-2026) e [R 2026](https://em-motorcycles.com/escape-r-2026)
- [E Ride Pro SE L1e](https://erideproeu.com/products/se-l1e) e [SS 3.0 L1e/L3e](https://erideproeu.com/products/pro-ss-3-0-road-legal)
- [Zero XB](https://zeromotorcycles.com/it-it/model/zero-xb), [Zero XE](https://zeromotorcycles.com/it-it/model/zero-xe) e [rete concessionari italiana](https://zeromotorcycles.com/it-it/dealer-locator)
- [Regolamento UE 168/2013](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:02013R0168-20260802)

Tutte le fonti specifiche sono nel catalogo e consultabili dalle schede; alcuni siti restituiscono contenuti incompleti agli strumenti automatici. Non si tratta di una certificazione dei prodotti né della disponibilità a magazzino.

## Aggiornare il catalogo

Modifica `data/catalog.js`: `sources` contiene URL e provenienza; `bikes` le versioni con dati e note. Il payload dopo `window.CATALOG =` è JSON, senza funzioni: mantenere `null` per dati non acquisiti. Aggiungere una fonte per ogni dato nuovo e ricontrollare categoria/anno/configurazione. Aggiornare `verifiedAt` solo dopo una revisione reale dell’intero catalogo.

I collegamenti homepage servono quando una scheda stabile non è disponibile; per Talaria i dati italiani sono del canale nazionale, non della homepage globale. Non impostare scraping in browser: CORS, pagine dinamiche e varianti renderebbero i prezzi inaffidabili. Un aggiornamento automatico richiede un processo server separato e una revisione della variante.

## Verifica

```powershell
python scripts/validate_catalog.py
```

Controlla schema, categorie, URL HTTPS, riferimenti alle fonti, valori numerici, coerenza L1e della nominale e copertura marchi. Per la verifica funzionale nel browser: provare filtro L1e, ricerca KTM, filtro peso con esclusione dei valori sconosciuti, selezioni tra classi, rimozione, ricarica della pagina, CSV e viewport mobile.

Validazione dati eseguita con esito positivo; server locale verificato con risposta HTTP 200. In questo ambiente Chrome/Edge headless non hanno restituito un DOM utilizzabile: la verifica automatica delle interazioni e la verifica visiva non sono state completate.

## Struttura

```text
index.html                 Interfaccia e spiegazione del metodo
styles.css                 Stile responsive e stampa
app.js                     Filtri, selezione, confronto, CSV
data/catalog.js            Dati editoriali e fonti
scripts/validate_catalog.py Validazione senza dipendenze
```

Codice disponibile con licenza MIT; marchi e contenuti dei siti collegati appartengono ai rispettivi titolari. Nessuna immagine del produttore è stata copiata.
