import React, { useState } from 'react';
import { Textarea, TextInput, DateTimePicker, Button, Box, Typography } from '@strapi/design-system';
import { Search, Archive } from '@strapi/icons';
import { useIntl } from "react-intl"; // Importa la libreria per la gestione della localizzazione
import { useNotification } from '@strapi/helper-plugin'; // Importa la libreria per le notifiche
import axios from 'axios'; // Importa Axios per effettuare le richieste HTTP

const Homepage = () => {
  // Inizializzazione dei vari stati
  const { formatMessage } = useIntl(); // Hook per la gestione dei messaggi tradotti
  const toggleNotification = useNotification(); // Hook per le notifiche

  const [code, setCode] = useState(''); // Stato per il codice di ricerca
  const [results, setResults] = useState([]); // Stato per i risultati di ricerca
  const [selectedEntry, setSelectedEntry] = useState(null); // Stato per il risultato selezionato

  // Funzione di ricerca dei risultati
  const handleSearch = async () => {
    try {
      // Effettua una richiesta GET al server per cercare con il codice
      const response = await axios.get(`/search-plugin/search?code=${code}`);
      setResults(response.data.data); // Imposta i risultati della ricerca
      setSelectedEntry(null); // Resetta l'entry selezionata
    } catch (error) {
      console.error('Error fetching search results:', error); 
    }
  };

  // Funzione per salvare i dati modificati
  const handleSave = async (e) => {
    try {
      // Effettua una richiesta PUT per aggiornare i dati dell'entry selezionata
      const response = await axios.put(`/api/test-executions/${selectedEntry.id}`, {
        revision_date: new Date(),
        note: selectedEntry.note
      });
      toggleNotification({ type: 'success', message: formatMessage({id:'search-plugin.notification.success'}) });
      handleSearch(); // Rilancia la ricerca per aggiornare i risultati
    } catch (error) {
      console.error('Error fetching search results:', error); 
      toggleNotification({ type: 'warning', message: formatMessage({id:'search-plugin.notification.failed'}) }); 
    }
  }

  return (
    <Box padding={8} background="neutral100">
      {/* Titolo della pagina */}
      <Typography variant="alpha">{formatMessage({id:'search-plugin.plugin.name'})}</Typography>

      {/* Sezione di ricerca */}
      <div style={{display: 'flex', paddingTop:"1rem"}}>
        <div style={{width:"85%"}}>
          <TextInput
              placeholder={formatMessage({id:'search-plugin.input.search'})} 
              value={code} // Valore del codice da ricercare
              label={formatMessage({id:'search-plugin.label.search'})} 
              onChange={(e) => setCode(e.target.value)} // Gestione del cambiamento del valore di input
            />
        </div>
        <div style={{width:"15%", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
          {/* Bottone per eseguire la ricerca */}
          <Button onClick={handleSearch} size="L">
            <Search /> {formatMessage({id:'search-plugin.button.search'})} {/* Icona e testo del bottone */}
          </Button>
        </div>
      </div>

      {/* Mostra i risultati della ricerca se ci sono */}
      {results.length > 0 && (
        <div style={{paddingTop:"1rem"}}>
            <Typography variant="beta">{formatMessage({id:'search-plugin.results.title'})}:</Typography>
            <div style={{display:"flex", flexWrap:"wrap", paddingTop:"0.5rem"}}>
                {results.map((result) => (
                    <div 
                      style={{width: "16%", paddingLeft:"0.5rem", paddingRight:"0.5rem"}}
                      key={result.id}
                    >
                      <Button
                        style={{width: "100%", justifyContent:"center"}}
                        variant="secondary"
                        size="L"
                        onClick={() => { setSelectedEntry(result) }} // Setta l'entry selezionata
                      >
                        {result.code} {/* Mostra il codice del risultato */}
                      </Button>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* Mostra i dettagli se c'è un'entry selezionata */}
      {selectedEntry && (
        <div style={{paddingTop:"1rem"}}>
          <Typography variant="beta">{formatMessage({id:'search-plugin.details.title'})}:</Typography>
          <br />

          {/* Mostra i dettagli dell'entry selezionata */}
          <div style={{width:"100%", display: "flex", paddingTop:"0.5rem"}}>
            <div style={{width:"33%", paddingRight:"1rem"}}>
              <TextInput
                label={formatMessage({id:'search-plugin.label.code'})}
                disabled={true} // Campo disabilitato
                value={selectedEntry.code} // Mostra il codice dell'entry
              />
            </div>
            <div style={{width:"67%", paddingLeft:"1rem"}}>
              <TextInput
                label={formatMessage({id:'search-plugin.label.testname'})}
                disabled={true} 
                value={selectedEntry.test.name} // Mostra il nome del test
              />
            </div>
          </div>

          <div style={{width:"100%", paddingTop:"0.5rem"}}>
            <Textarea
              label={formatMessage({id:'search-plugin.label.testdescription'})}
              disabled={true} 
              value={selectedEntry.test.description} // Mostra la descrizione del test
            />
          </div>

          {/* Altri campi con informazioni aggiuntive */}
          <div style={{width:"100%", display: "flex", paddingTop:"0.5rem"}}>
            <div style={{width:"16.8%", paddingRight:"1rem"}}>
              <TextInput
                label={formatMessage({id:'search-plugin.label.sex'})}
                disabled={true}
                value={selectedEntry.sex.name} // Mostra il sesso
              />
            </div>
            <div style={{width:"16.8%", paddingLeft:"1rem", paddingRight:"1rem"}}>
              <TextInput
                label={formatMessage({id:'search-plugin.label.age'})}
                disabled={true}
                value={selectedEntry.age} // Mostra l'età
              />
            </div>
            <div style={{width:"22.2%", paddingRight:"1rem", paddingLeft:"1rem"}}>
              <TextInput
                label={formatMessage({id:'search-plugin.label.ip'})}
                disabled={true}
                value={selectedEntry.IP} // Mostra l'IP
              />
            </div>
            <div style={{width:"33.3%", paddingRight:"1rem", paddingLeft:"1rem"}}>
              <DateTimePicker
                label={formatMessage({id:'search-plugin.label.execution_time'})}
                disabled={true}
                value={selectedEntry.execution_time} // Mostra l'execution time
              />
            </div>
            <div style={{width:"10.9%", paddingLeft:"1rem"}}>
              <TextInput
                label={formatMessage({id:'search-plugin.label.score'})}
                disabled={true}
                value={selectedEntry.score} // Mostra il punteggio
              />
            </div>
          </div>

          {/* Mostra le risposte alle domande */}
          <div style={{ 
            color: "rgb(50, 50, 77)", 
            fontSize: "0.75rem", 
            fontWeight: "600", 
            paddingTop:"0.5rem", 
            paddingBottom: "0rem"
            }}>
            {formatMessage({id:'search-plugin.label.questions'})}:
          </div>

          <div style={{paddingLeft: "1rem", paddingRight:"1rem"}}>
            {selectedEntry.answers.map(answer => (
              <div style={{width:"100%", display: "flex", paddingTop:"0.5rem"}} key={answer.id}>
                <div style={{width:"91.6%", paddingRight:"1rem"}}>
                  <TextInput
                    label={answer.question.text} // Etichetta della domanda
                    disabled={true}
                    value={answer.text} // Mostra la risposta
                  />
                  {answer.score == 0 && (
                    <span style={{ color: "rgb(208, 43, 32)", fontSize: "0.75rem", fontWeight: "600" }}>
                      {answer.correction} {/* Mostra la correzione se il punteggio è 0 */}
                    </span>
                  )}
                </div>
                <div style={{width:"8.4%", paddingLeft:"1rem", paddingRight:"1rem"}}>
                  <TextInput
                    label={formatMessage({id:'search-plugin.label.score'})}
                    disabled={true}
                    value={answer.score} // Mostra il punteggio della risposta
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mostra il campo per la data di revisione e il commento */}
          <div style={{width:"100%", display: "flex", paddingTop:"1rem"}}>
            <div style={{width:"33%", paddingRight:"1rem"}}>
              <DateTimePicker
                label={formatMessage({id:'search-plugin.label.revision_date'})}
                disabled={true}
                value={selectedEntry.revision_date} // Mostra la data di revisione
              />
            </div>
            <div style={{width:"67%", paddingLeft:"1rem"}}>
              <Textarea
                label={formatMessage({id:'search-plugin.label.note'})}
                onChange={(e) => {
                  setSelectedEntry({ ...selectedEntry, note: e.target.value}); // Modifica la nota
                }}
                value={selectedEntry.note ? selectedEntry.note : ""} // Mostra la nota
              />
            </div>
          </div>

          {/* Bottone per salvare i dati */}
          <div style={{width:"100%", display: "flex", paddingTop:"1rem"}}>
            <Button onClick={handleSave} size="L">
              <Archive /> {formatMessage({id:'search-plugin.button.save'})} {/* Icona e testo del bottone */}
            </Button>
          </div>

        </div>
      )}
    </Box>
  );
};

export default Homepage;
