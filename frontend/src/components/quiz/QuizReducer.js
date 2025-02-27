// Stato iniziale del quiz
export const initialState = {
    questions: [], // Lista delle domande del quiz
    currentQuestionIndex: 0, // Indice della domanda attuale
    answers: [], // Lista delle risposte date dall'utente
    isQuizStarted: false, // Stato che indica se il quiz è iniziato
    isQuizFinished: false, // Stato che indica se il quiz è terminato
    score: 0, // Punteggio totale dell'utente
};

// Funzione reducer per gestire lo stato del quiz
export const quizReducer = (state, action) => {
    switch (action.type) {
        case "SET_QUESTIONS":
            // Imposta le domande nel quiz
            return { ...state, questions: action.payload };

        case "START_QUIZ":
            // Avvia il quiz, resettando le risposte e il punteggio
            return { 
                ...state, 
                isQuizStarted: true, 
                currentQuestionIndex: 0, // Resetta l'indice alla prima domanda
                answers: [], // Cancella eventuali risposte precedenti
                score: 0 // Resetta il punteggio
            };

        case "ANSWER_QUESTION":
            // Estrai l'indice della domanda e la risposta selezionata dall'utente dal payload dell'azione
            const { questionIndex, answer } = action.payload;

            // Cerca tra le risposte della domanda corrente quella che corrisponde alla risposta selezionata dall'utente
            const selectedAnswer = state.questions[questionIndex].answers.find(
                ans => ans.text === answer
            );

            // Verifica se la risposta è corretta (score === 1 indica correttezza)
            const isCorrect = selectedAnswer?.score === 1;

            // Se la risposta è sbagliata, ottieni la correzione (testo esplicativo)
            const correction = isCorrect ? null : selectedAnswer?.correction;

            return {
                ...state,
                answers: [
                    ...state.answers, // Mantieni le risposte precedenti
                    { questionIndex, answer, correction } // Aggiungi la nuova risposta
                ],
                score: isCorrect ? state.score + 1 : state.score, // Incrementa il punteggio se corretto
                currentQuestionIndex: state.currentQuestionIndex + 1, // Passa alla domanda successiva
            };

        case "FINISH_QUIZ":
            // Termina il quiz, aggiornando lo stato
            return { 
                ...state, 
                isQuizFinished: true, // Segna il quiz come completato
                isQuizStarted: false // Imposta lo stato di non avviato
            };

        case "RESET":
            // Resetta lo stato del quiz
            return { 
                ...state, 
                questions: [], 
                isQuizStarted: false,
                isQuizFinished: false,
                currentQuestionIndex: 0,
                answers: [],
                score: 0 
            };

        default:
            // Ritorna lo stato attuale per azioni sconosciute
            return state;
    }
};
