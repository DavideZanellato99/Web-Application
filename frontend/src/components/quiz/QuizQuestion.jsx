import DOMPurify from "dompurify";

const QuizQuestion = ({ state, tests, handleAnswer }) => {
    const currentQuestion = state.questions[state.currentQuestionIndex]; // Ottiene la domanda corrente in base all'indice attuale
    return (
        <div className="container mt-4 mb-5" tabIndex="0">
            <div className="border rounded p-4 shadow-sm">
                <h3 className="mb-4 text-center"><strong>Test: {tests.name}</strong></h3>

                {/* Sezione della domanda corrente */}
                <div className="form-group">
                    {/* Indicazione del progresso nel quiz: domanda attuale su totale */}
                    <h5 className="mb-2"><strong>Domanda {state.currentQuestionIndex + 1} / {state.questions.length}</strong></h5>
                    {/* Testo della domanda corrente */}
                    <p className="textquestion" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentQuestion?.text) }} />
                </div>

                {/* Sezione delle risposte */}
                <div className="form-group">
                    <h5 className="mb-2"><strong>Seleziona una risposta:</strong></h5>

                    {/* Elenco delle risposte come bottoni */}
                    <div className="d-grid gap-3">
                        {currentQuestion?.answers.map((answer, index) => ( // Mappa le risposte della domanda corrente
                            <button 
                                key={index} // Chiave unica per ogni bottone (identificatore univoco per ogni elemento generato all'interno della funzione map)
                                className="btn custom-btn py-3 textanswer"
                                onClick={() => handleAnswer(answer.text)} // Funzione chiamata al click con il testo della risposta come parametro
                                aria-label={`Risposta: ${answer.text}`} // Aggiungi aria-label per le risposte
                            >
                                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer.text) }} /> {/* Testo della risposta */}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizQuestion;
