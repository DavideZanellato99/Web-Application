module.exports = {
    async findPageBySlug(ctx) {
        const { pageId } = ctx.request.params;
        try {
            const page = await strapi.entityService.findMany('api::page.page', {
                filters: { slug: pageId.replace("slash", "/") },
                populate: {
                    layouts: {
                        populate: {
                            content1: {
                                populate: {
                                    members: true,
                                    tableTimes: {
                                        populate: {
                                            day: true,
                                            startTime: true,
                                            endTime: true,
                                        },
                                    },
                                    image: true,
                                    service: true,
                                    tests: { 
                                        populate: {
                                            questions: {
                                                populate: {
                                                    answers: true,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            content2: true,
                            content3: true,
                        },
                    },
                },
            });

            if (!page || page.length === 0) {
                return ctx.notFound('Page not found');
            }

            return page[0]; // Restituisci la prima corrispondenza
        } catch (error) {
            strapi.log.error('Errore in findPageBySlug:', error);
            return ctx.internalServerError('Errore nel recupero della pagina.');
        }
    },

    async find(ctx) {
        try {
            const pages = await strapi.entityService.findMany('api::page.page', {
                fields: ['title', 'slug'],
            });

            const transformedPages = pages.map(page => ({
                name: page.title,
                url: page.slug,
            }));
            
            const grouped = [];

            transformedPages.forEach(page => {
                // Trova il genitore per gli URL che iniziano con un prefisso comune
                const parent = grouped.find(group => page.url.startsWith(group.url) && page.url !== group.url);
        
                if (parent) {
                    // Se c'è un genitore, aggiungilo come sottopagina
                    if (!parent.sub) parent.sub = [];
                    parent.sub.push({ name: page.name, url: page.url });
                } else {
                    // Altrimenti, aggiungilo come una pagina principale
                    grouped.push({ name: page.name, url: page.url });
                }
            });
        
            // Rimuove i sottopagine duplicati dai livelli principali
            return grouped.map(page => {
                if (page.sub) {
                    page.sub = page.sub.filter(sub => !grouped.some(group => group.url === sub.url));
                }
                return page;
            });
        } catch (error) {
            return [];
        }
    }
};
