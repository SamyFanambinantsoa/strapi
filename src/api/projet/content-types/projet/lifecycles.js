
module.exports = {
  async afterCreate(event) {
    const { result, params } = event;

    await result;
    projet = {
      ...result
    }
    await strapi.entityService.create('api::projet-modif.projet-modif', {
      data: {
        id: projet.id,
        Nom: projet.Nom,
        Description: projet.Description,
        createdAt: projet.createdAt,
        publishedAt: projet.createdAt,
        category: projet.category,
        taches: projet.taches,
        users: projet.users,
        publishedAt: projet.publishedAt,
        type: "Création"
      },
    });
    //console.log(projet.id)
  },

  async afterUpdate(event) {
    const { result, params } = event;
    value = true,
      await result;
    projet = {
      ...result
    }
    const updatedUsers = await strapi.entityService.findMany('plugin::users-permissions.user', {
      filters: {
        projets: projet.id
      },
    });
    await strapi.entityService.delete('api::projet-modif.projet-modif', projet.id),
      test = await strapi.entityService.create('api::projet-modif.projet-modif', {
        data: {
          id: projet.id,
          Nom: projet.Nom,
          Description: projet.Description,
          createdAt: projet.createdAt,
          publishedAt: projet.createdAt,
          category: projet.category,
          Deadline: projet.Deadline,
          users: updatedUsers,
          type: "Modification"
        },
      });
  },

  async beforeDelete(event) {
    const { data, params } = event.params;
    console.log(event.params.where.id);
    //await strapi.entityService.delete('api::tache.tache',event.params.where.id);
    const task = await strapi.entityService.findMany('api::tache.tache', {
      filters: {
        projets: event.params.where.id
      },
    }
    );
    const length = task.length;
    console.log(length);
    for (let index = 0; index < length; index++) {
      const firstTask = task[index];
      const id = firstTask.id;
      console.log(id);
      await strapi.entityService.delete('api::tache.tache', id);
    }
  },

  async beforeDeleteMany(event) {
    const { data, params } = event.params;
    console.log(event.params.where.id);
  }
};
