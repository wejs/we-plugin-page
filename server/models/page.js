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
      creatorId: { type: we.db.Sequelize.BIGINT },

      title: {
        type: we.db.Sequelize.TEXT
      },

      about: {
        type: we.db.Sequelize.TEXT
      },

      active: {
        type: we.db.Sequelize.BOOLEAN,
        defaultValue: true
      },

      published: {
        type: 'boolean',
        defaultValue: false
      },

      body: {
        type: we.db.Sequelize.TEXT
      },

      // body without tags
      bodyClean: {
        type: we.db.Sequelize.TEXT
      },

      // body small body text version or description
      bodyTeaser: {
        type: we.db.Sequelize.TEXT
      }
    },

    associations: {
      featuredImage: {
        type: 'belongsTo',
        model: 'image',
        via: 'inApageFeatured',
        foreignKey : 'featuredImageId'
      },

      images: {
        type: 'belongsToMany',
        model: 'image',
        via: 'inArticle',
        through: 'page_images'
      }
    },

    options: {
      termFields: {
        tags: {
          vocabularyId: null,
          canCreate: true
        },
        categories: {
          vocabularyId: 1,
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