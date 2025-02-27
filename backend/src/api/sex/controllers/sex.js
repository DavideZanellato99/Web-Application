module.exports = {
    async getAllSexEntries(ctx) {
        try {
            // Recupera tutte le entry dalla collezione "sex"
            const entries = await strapi.entityService.findMany('api::sex.sex');

             // Imposta il corpo della risposta con le entry trovate
            ctx.body = entries;
            
        } catch (err) {

            // In caso di errore, restituisce un errore 500 (Internal Server Error)
            ctx.throw(500, err);

        }
    },
};
