module.exports = {
    // Metodo per creare una nuova istanza
    async create(ctx) {
        // Estrae i dati dalla richiesta (request body)
        let { data } = ctx.request.body;

        // Aggiunge l'indirizzo IP dell'utente ai dati, per tracciare da quale IP è stata fatta la richiesta
        data.IP = ctx.request.ip;

        try {
            // Crea una nuova istanza dell'entità 'test-execution' utilizzando i dati forniti
            const newInstance = await strapi.entityService.create('api::test-execution.test-execution', {
                data
            });

            // Invia una risposta con la nuova istanza creata
            ctx.send({ data: newInstance });
        } catch (error) {
            // Se si verifica un errore durante la creazione, lo logga e restituisce un errore 400
            console.error("Errore durante la creazione dell'istanza:", error);
            ctx.throw(400, 'Errore durante la creazione dell\'istanza');
        }
    },

    // Metodo per aggiornare una istanza
    async updateInstance(ctx) {
        // Estrae l'ID dalla richiesta dei parametri dell'URL
        const { id } = ctx.params;

        // Estrae i nuovi valori da aggiornare dalla richiesta (request body)
        const { revision_date, note } = ctx.request.body;

        try {
            // Aggiorna l'istanza esistente con l'ID specificato
            const updatedInstance = await strapi.entityService.update('api::test-execution.test-execution', id, {
                data: {
                    revision_date, 
                    note,
                },
            });

            // Invia una risposta con l'istanza aggiornata
            ctx.send({ data: updatedInstance });
        } catch (error) {
            // Se si verifica un errore durante l'aggiornamento, restituisce un errore 400
            ctx.throw(400, 'Errore durante l\'aggiornamento dell\'istanza');
        }
    },
};
