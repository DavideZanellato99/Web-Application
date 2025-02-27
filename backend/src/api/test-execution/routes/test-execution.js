module.exports = { 
    routes: [
        // Definisce una route per una richiesta POST
        {
            method: 'POST',
            path: '/test-executions', // Percorso per la creazione di una nuova esecuzione del test
            handler: 'test-execution.create', // Funzione 'create' nel controller 'test-execution' che viene eseguita
            config: {
                auth: false, 
            },
        },
        // Definisce una route per una richiesta PUT
        {
            method: 'PUT',
            path: '/test-executions/:id', // Percorso per aggiornare una esecuzione del test con un ID specifico
            handler: 'test-execution.updateInstance', // Funzione 'updateInstance' nel controller 'test-execution' che viene eseguita
            config: {
                auth: false, 
            },
        },
    ],
};
