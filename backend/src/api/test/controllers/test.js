module.exports = {
    async getRandomEntry(ctx) {
        try {
            // Recupera solo le entries pubblicate
            const entries = await strapi.entityService.findMany('api::test.test', { // Recupera tutte le entry dalla collezione test
                filters: { publishedAt: { $notNull: true } }, // Filtra solo le entry pubblicate
                populate: {
                    questions: { // Popola il campo "questions" della entry
                        populate: {
                            answers: true // Popola il campo "answers" di ogni domanda
                        }
                    }
                }
            });

            // Se non ci sono entry pubblicate, restituisce un errore 404
            if (!entries || entries.length === 0) {
                return ctx.notFound('No published entries found.');
            }

            // Seleziona una entry casuale dalla lista delle entry pubblicate
            const randomEntry = entries[Math.floor(Math.random() * entries.length)];

            // Imposta il corpo della risposta con l'entry selezionata casualmente
            ctx.body = randomEntry;
        } catch (err) {
            // In caso di errore, restituisce un errore 500 con il messaggio dell'errore
            ctx.throw(500, err.message);
        }
    },
};
