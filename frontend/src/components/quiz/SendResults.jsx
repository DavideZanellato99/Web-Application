// Funzione per inviare i risultati del quiz al backend
export const handleSendResults = async (age, sex, tests, state, IP, code) => {
    // Prepara i dati da inviare
    const testExecutionData = {
        data: {  
            age,
            sex: { id: sex },  
            test: { id: tests.id },  
            score: state.score,
            IP: IP,
            code,  
            execution_time: new Date().toISOString(),
            answers: state.answers.map((answer, index) => {
                const question = state.questions[index]; // Prendi la domanda corrente
                const selectedAnswer = question.answers.find(a => a.text === answer.answer); // Trova la risposta selezionata
            
                return {
                    id: selectedAnswer?.id, // ID della risposta selezionata
                    givenAnswer: answer.answer, // Risposta data
                };
            }),
        },
    };

    console.log("Dati inviati al backend", testExecutionData)

    try {
        const url = `${process.env.REACT_APP_BACKEND_HOST}/api/test-executions`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_FETCH_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(testExecutionData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Errore nell'invio dei risultati:", errorData);
            // alert("Errore nell'invio dei risultati.");
        } else {
            const data = await response.json();
            console.log("Risultati inviati con successo:", data);
            // alert("Risultati inviati con successo!");
        }
    } catch (error) {
        console.error("Errore durante l'invio:", error);
        // alert("Errore durante l'invio dei risultati.");
    }
};
