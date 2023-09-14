'use strict';
const moment = require('moment');
const { entityService } = require('@strapi/strapi').factories;

module.exports = {
   exampleAction: async (ctx, next) => {
     try {
      // Fonction pour ajouter 2 heures à l'heure actuelle
      function addTwoHoursToCurrentTime() {
        return moment().add(2, 'hours').format('HH:mm:ss');
      }
      
      // Heure actuelle avec 2 heures ajoutées
      const currentTime = addTwoHoursToCurrentTime();
      
      // Heure spécifique (9:00)
      const specificTime = '09:00:00';

      // Conversion des heures en objets Moment
      const currentTimeObj = moment(currentTime, 'HH:mm:ss');
      const specificTimeObj = moment(specificTime, 'HH:mm:ss');

      // Calcul de la différence en minutes
      const timeDifferenceMinutes = currentTimeObj.diff(specificTimeObj, 'minutes');
      ctx.body = timeDifferenceMinutes;

      return ctx.body
    } catch (err) {
       ctx.body = "Erreur de dataMind";
     }
   }
};

