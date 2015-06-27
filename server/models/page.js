/**
 * Page Model
 *
 * @module      :: Model
 * @description :: Role model
 *
 */

module.exports = function Model(we) {
  // set sequelize model define and options
  var model = {
    definition: {
      creatorId: { type: we.db.Sequelize.BIGINT, formFieldType: null },

      title: { type: we.db.Sequelize.TEXT },

      about: { type: we.db.Sequelize.TEXT },
      body: { type: we.db.Sequelize.TEXT, formFieldType: 'html' },

      active: { type: we.db.Sequelize.BOOLEAN, defaultValue: true, formFieldType: null },
      published: { type: we.db.Sequelize.BOOLEAN, defaultValue: false, formFieldType: 'boolean' },

      // body without tags
      bodyClean: { type: we.db.Sequelize.TEXT, formFieldType: null },
      // body small body text version or description
      bodyTeaser: { type: we.db.Sequelize.TEXT, formFieldType: null },
      featuredImageId: { type: we.db.Sequelize.BIGINT, formFieldType: null },

      parentModelId: { type: we.db.Sequelize.BIGINT, formFieldType: null },
      parentModelName: { type: we.db.Sequelize.BIGINT, formFieldType: null }
    },

    options: {
      termFields: {
        tags: {
          vocabularyName: null,
          canCreate: true
        },
        categories: {
          vocabularyName: 'Category',
          canCreate: false
        }
      },

      classMethods: {},
      instanceMethods: {},
      hooks: {}
    }
  }

  return model;
}