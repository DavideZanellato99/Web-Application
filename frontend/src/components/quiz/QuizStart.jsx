const QuizStart = ({ age, setAge, sex, setSex, sexOptions, error, handleStartQuiz }) => {
    return (
        <div className="container mt-4 mb-5 pb-4" tabIndex="0">
            <div className="border rounded p-4 shadow-sm">
            <h4 className="mb-4">Inserisci i dati per iniziare</h4>
                <div className="row mb-3">

                    {/* Campo di input per l'età */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Età</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)} // Aggiorna lo stato quando cambia
                                className="form-control"
                                placeholder="Inserisci la tua età"
                                aria-label="Seleziona l'età"
                            />
                        </div>
                    </div>

                    {/* Campo di selezione per il sesso */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Sesso</label>
                            <select
                                value={sex}
                                onChange={(e) => setSex(e.target.value)} // Aggiorna lo stato quando cambia 
                                className="form-select responsive-select"
                                aria-label="Seleziona il sesso"
                            >
                                <option value="">Seleziona il sesso</option>
                                {sexOptions.map(option => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {/* Messaggio di errore se i dati inseriti non sono validi */}
                {error && <p className="text-danger">{error}</p>}
                <div className="d-flex justify-item-center align-items-center">
                    <button 
                        className="btn custom-btn btn-block col-4 m-auto"
                        onClick={handleStartQuiz} // Funzione chiamata al click
                    >
                    Inizia</button>
                </div>
            </div>
        </div>
    );
}

export default QuizStart;