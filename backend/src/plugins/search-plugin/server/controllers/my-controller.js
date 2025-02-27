'use strict';

module.exports = {
  async search(ctx) {
    try {
      const { code } = ctx.request.query;
      
      const results = await strapi.entityService.findMany('api::test-execution.test-execution', {
        filters: {
          code: {
            $containsi: code,
          },
        },
        populate: {
          sex: true,
          test: true,
          answers: {
            populate:{
              question: true
            }
          }
        }
      });
      ctx.send({ data: results });
    } catch (err) {
      ctx.badRequest('Error during search', err);
    }
  },
};
