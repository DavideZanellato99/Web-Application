import DOMPurify from "dompurify";

const QuizEnd = ({ state, handleSaveResults, handleRestart, code }) => {
    return (
        <div className="container mt-4 mb-5" tabIndex="0">
            <div className="border rounded p-4 shadow-sm">

                {/* Messaggio di fine quiz */}
                <h3 className="text-center mb-4" aria-live="polite">
                    <strong>Quiz completato!</strong>
                </h3>

                {/* Mostra il punteggio dell'utente */}
                <p className="lead text-center mb-4">
                    Il tuo punteggio: <strong>{state.score} / {state.questions.length}</strong>
                </p>

                {/* Codice del test */}
                <p className="text-center mb-4">
                    <strong>Il codice del tuo test:</strong> {code}
                </p>

                {/* Intestazione per la lista delle risposte */}
                <h4 className="mb-3">
                    <strong>Le tue risposte:</strong>
                </h4>

                {/* Lista delle domande e risposte */}
                <ul className="list-group mb-2">
                    {state.questions.map((question, index) => {
                        const givenAnswer = state.answers[index]?.answer; // Risposta fornita dall'utente
                        const correction = state.answers[index]?.correction; // Correzione in caso di errore
                        const isCorrect = correction === null; // Se la correzione è null, la risposta è corretta
                        const isIncorrect = correction !== null; // Se c'è una correzione, la risposta è errata

                        // Imposta la classe di sfondo in base alla correttezza della risposta
                        let answerClass = "list-group-item border-top mb-3 rounded";
                        if (isCorrect) {
                            answerClass += " bg-success"; // Verde per risposta corretta
                        } else if (isIncorrect) {
                            answerClass += " bg-danger"; // Rosso per risposta sbagliata
                        }

                        // Elemento della lista con dettagli della domanda e risposta
                        return (
                            <li key={index} className={answerClass}>
                                {/* Testo della domanda */}
                                <div className="mb-2">
                                    <p>
                                        <strong>Domanda {index + 1}: </strong> 
                                        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.text) }} />
                                    </p>
                                </div>

                                {/* Risposta fornita */}
                                <div className="mb-2">
                                    <p>
                                        <strong>Risposta data: </strong> 
                                        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(givenAnswer || "Nessuna risposta data") }} />
                                    </p>
                                </div>

                                {/* Correzione se la risposta è errata */}
                                {correction && (
                                    <div className="mb-2">
                                        <p>
                                            <strong>Correzione: </strong> 
                                            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(correction) }} />
                                        </p>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Pulsanti per inviare i risultati e iniziare un nuovo quiz*/}
                <div className="d-flex justify-content-center gap-2 mt-3">
                    <button 
                        className="btn custom-btn w-100" 
                        onClick={handleSaveResults}
                        aria-label="Scarica i risultati del quiz"
                    >
                        Scarica i risultati
                    </button>
                    <button 
                        className="btn btn-secondary w-100" 
                        onClick={handleRestart}
                        aria-label="Inizia un nuovo quiz"
                    >
                        Inizia a un nuovo quiz
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizEnd;
