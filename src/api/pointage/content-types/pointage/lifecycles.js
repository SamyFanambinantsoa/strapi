const moment = require('moment');
module.exports = {
    async afterCreate(event) {
        const { result, params } = event;
        await result;
    },

    async afterUpdate(event) {
        const { result, params } = event;
        await result;

    },
};
