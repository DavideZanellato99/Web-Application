module.exports = {
    routes: [
        {
            method: 'GET', // Metodo HTTP utilizzato per la richiesta
            path: '/test', // Percorso dell'endpoint API
            handler: 'test.getRandomEntry', // Nome del controller e della funzione da eseguire
            config: {
                auth: false, 
            },
        },
    ],
};
