module.exports = {
  async afterCreate(event) {
    const { data, result, params } = event;
    console.log("data");
    
    await result;
    projet = {
      ...result
    }
    const updatedUsers = await strapi.entityService.findMany('plugin::users-permissions.user', {
      filters: {
        taches: projet.id
      },
    });
    const updatedProjets = await strapi.entityService.findMany('api::projet.projet', {
      filters: {
        taches: projet.id
      },
    });

    await strapi.entityService.create('api::tache-modif.tache-modif', {
      data: {
        id: projet.id,
        nom: projet.nom,
        description: projet.description,
        IsFinished: projet.IsFinished,
        createdAt: projet.createdAt,
        taches: projet.taches,
        user: updatedUsers,
        deadline: projet.deadline,
        projet: updatedProjets,
        projet_modifs: projet.projet_modifs,
        type: "Création"
      },
    });
    
    strapi.$io.raw("tachecreated", updatedUsers[0]['name']);
    strapi.log.info('VOICI LE TEST DE PRINT : qsdfqsdfqsdfqsdfqsdfqsdf')
  },

  async afterUpdate(event) {
    const { data, result, params } = event;

    await result;
    projet = {
      ...result
    }
    const updatedUsers = await strapi.entityService.findMany('plugin::users-permissions.user', {
      filters: {
        taches: projet.id
      },
    });
    const updatedProjets = await strapi.entityService.findMany('api::projet.projet', {
      filters: {
        taches: projet.id
      },
    });
    await strapi.entityService.delete('api::tache-modif.tache-modif', projet.id),
      await strapi.entityService.create('api::tache-modif.tache-modif', {
        data: {
          id: projet.id,
          nom: projet.nom,
          description: projet.description,
          IsFinished: projet.IsFinished,
          createdAt: projet.createdAt,
          user: updatedUsers,
          deadline: projet.deadline,
          projet: updatedProjets,
          type: "Modification"
        },
      });
      strapi.log.info('Cqsdqsdqsdqsd');
      strapi.$io.raw("tacheModified", updatedUsers[0]['name']);
  },
};
