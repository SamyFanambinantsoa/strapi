'use strict';
const moment = require('moment');
const { entityService } = require('@strapi/strapi').factories;
/**
 * A set of functions called "actions" for `test`
 */

module.exports = {
   exampleAction: async (ctx, next) => {
     try {
      function getCurrentTime() {
        return moment().format('HH:mm:ss');
      }
      const currentTime = getCurrentTime();
      ctx.body = currentTime;
      return ctx.body
    } catch (err) {
       ctx.body = "Erreur de dataMind";
     }
   }
};
