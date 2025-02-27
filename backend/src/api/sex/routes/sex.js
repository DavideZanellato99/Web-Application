module.exports = {
    routes: [
        {
            method: 'GET', // Metodo HTTP utilizzato per la richiesta
            path: '/sex',  // Percorso dell'endpoint API
            handler: 'sex.getAllSexEntries', // Nome del controller e della funzione da eseguire
            config: {
                auth: false
            },
        },
    ],
};
