import React, { useReducer, useEffect, useState } from "react";
import { quizReducer, initialState } from "./QuizReducer";
import "./Quiz.css";
import { saveResultsToPDF } from "./SaveResults"; 
import { handleSendResults } from './SendResults'; // Importa la funzione
import QuizStart from "./QuizStart"; 
import QuizEnd from "./QuizEnd"; 
import QuizQuestion from "./QuizQuestion"; 

const Quiz = () => {
    // Gestione dello stato globale del quiz con `useReducer`
    const [state, dispatch] = useReducer(quizReducer, initialState);

    // Stati locali per i dati dell'utente e configurazione del test
    const [age, setAge] = useState("");
    const [sex, setSex] = useState(""); // Imposta un valore iniziale per il sesso
    const [IP, setIP] = useState("192.168.1.1"); // IP statico
    const [code, setCode] = useState(""); // Codice test iniziale vuoto
    const [error, setError] = useState(""); // Stato per il messaggio di errore
    const [tests, setTests] = useState([]); // Stato per memorizzare i test
    const [resultsSent, setResultsSent] = useState(false); // Stato per tracciare se i risultati sono stati inviati
    const [sexOptions, setSexOptions] = useState([]); // Stato per le opzioni di sesso

    // Funzione per generare il codice del test in formato ISO+3lettere
    const generateTestCode = () => {
        const isoDate = new Date().toISOString().split('T')[0].replace(/-/g, ''); // Formato data ISO (YYYYMMDD)
        const randomLetters = Array.from({ length: 3 }, () =>
            String.fromCharCode(65 + Math.floor(Math.random() * 26)) // Genera lettere maiuscole casuali A-Z
        ).join('');
        return `${isoDate}-${randomLetters}`; // Restituisce il codice completo 
    };
    
    // Funzione per caricare i test dal backend
    const fetchData = async () => {
        try {
            const url = `${process.env.REACT_APP_BACKEND_HOST}/api/test`;

            // Effettua una richiesta GET per ottenere i dati del quiz
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_FETCH_TOKEN}`,
                    "Content-Type": "application/json",
                },
            });

            // Se la risposta è positiva, aggiorna lo stato con i test ricevuti
            if (response.ok) {
                const data = await response.json();
                console.log("Test ricevuto dall'API:", data); // Log dei dati ricevuti
                setTests(data); // Salva l'intera risposta API
            } else {
                console.error("Errore nella risposta dell'API:", response.statusText);
            }
        } catch (error) {
            console.error("Errore nella fetch:", error);
        }
    };

    // useEffect per caricare i test al primo rendering
    useEffect(() => {
        fetchData();
    }, []);

    // useEffect che invia automaticamente i risultati al backend quando il quiz è finito
    useEffect(() => {
        if (state.isQuizFinished && !resultsSent) {
            handleSendResults(age, sex, tests, state, IP, code);  // Chiamata alla funzione solo quando il quiz è finito
            setResultsSent(true);  // Imposta a true quando i risultati sono inviati
        }
    }, [state.isQuizFinished, resultsSent]);  // Dipende dallo stato `isQuizFinished` e `resultsSent`

    // useEffect per caricare i tipi di sesso
    useEffect(() => {
        const fetchSexData = async () => {
            try {
                const url = `${process.env.REACT_APP_BACKEND_HOST}/api/sex`;

                // Effettua una richiesta GET per ottenere i tipi di sesso
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_FETCH_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                });

                // Se la risposta è positiva, aggiorna lo stato con i test ricevuti
                if (response.ok) {
                    const data = await response.json();
                    console.log("Dati sesso ricevuti:", data);
                    setSexOptions(data); 
                } else {
                    console.error("Errore nella risposta dell'API:", response.statusText);
                }
            } catch (error) {
                console.error("Errore nella fetch:", error);
            }
        };
        fetchSexData();
    }, []);

    // Algoritmo per mescolare le risposte
    const shuffleArray = (array) => {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    };    

    // Gestione dell'avvio del quiz
    const handleStartQuiz = () => {
        if (!age || !sex || age <= 0) { // Controlla che i campi obbligatori siano compilati
            setError("Inserisci un valore valido per l'età e il sesso per continuare");
            return;
        } 
        setError(""); // Resetta errore se i campi sono validi

        // Genera un codice casuale del test
        const testCode = generateTestCode();
        setCode(testCode);  // Imposta il codice del test nello stato

        // Mescola le risposte di ogni domanda del quiz 
        const questionsWithShuffledAnswers = tests.questions.map(question => ({
            ...question,
            answers: shuffleArray(question.answers), 
        }));

        // Imposta le domande del test selezionato nello stato globale
        dispatch({ type: "SET_QUESTIONS", payload: questionsWithShuffledAnswers || [] }); // Passa le domande com le risposte mescolate al reducer
        //dispatch({ type: "SET_QUESTIONS", payload: tests.questions || [] });
        dispatch({ type: "START_QUIZ" });
    };

    // Gestione della selezione delle risposte
    const handleAnswer = (answer) => {
        // Invia la risposta selezionata al reducer
        dispatch({
            type: "ANSWER_QUESTION",
            payload: { questionIndex: state.currentQuestionIndex, answer },
        });

        // Se è l'ultima domanda, termina il quiz
        if (state.currentQuestionIndex === state.questions.length - 1) {
            dispatch({ type: "FINISH_QUIZ" });
        }
    };

    // Funzione per trovare il nome associato all'id del sesso
    const getSexName = (sexid) => {
        // Usa il metodo 'find' per cercare l'oggetto nell'array 'sexOptions' 
        // dove l'ID dell'oggetto corrisponde all'ID passato alla funzione
        const selectedOption = sexOptions.find(option => option.id === parseInt(sexid));
        // Se è stato trovato un oggetto (selectedOption non è undefined), restituisce il nome
        // Altrimenti restituisce "Sconosciuto" se l'oggetto non è stato trovato
        return selectedOption ? selectedOption.name : "Sconosciuto";
    };

    // Gestione del salvataggio dei risultati
    const handleSaveResults = () => {
        saveResultsToPDF(age, sex, code, state, getSexName); // Chiama la funzione esterna
    };

    // Funzione per ricominciare il quiz
    const handleRestart = () => {
        dispatch({ type: "RESET" });
        setAge("");
        setSex("");
        setIP("192.168.1.1");
        setCode("");
        setError("");
        setResultsSent(false);
        fetchData(); // Richiama l'API per ottenere un nuovo test
    };

    // return per la schermata di inserimento dei dati iniziali
    if (!state.isQuizStarted && !state.isQuizFinished) {
        return (
            <QuizStart
                age={age}
                setAge={setAge}
                sex={sex}
                setSex={setSex}
                sexOptions={sexOptions}
                error={error}
                handleStartQuiz={handleStartQuiz}
            />
        );
    }

    // return per la schermata di fine quiz
    if (state.isQuizFinished) {
        return (
            <QuizEnd 
                state={state} 
                handleSaveResults={handleSaveResults} 
                handleRestart={handleRestart} 
                code={code} 
            />
        );
    }
    
    // return per la schermata delle domande durante il quiz
    return (
        <QuizQuestion 
            state={state} 
            tests={tests} 
            handleAnswer={handleAnswer} 
        />
    );
};

export default Quiz;
