/**
 * Content model
 */

module.exports = function contentModel(we) {
  const model = {
    definition: {
      active: {
        type: we.db.Sequelize.BOOLEAN,
        defaultValue: true,
        formFieldType: null
      },
      published: {
        type: we.db.Sequelize.BOOLEAN,
        defaultValue: false,
        formFieldType: null
      },
      highlighted: {
        type: we.db.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        formFieldType: null
      },
      showInLists: {
        type: we.db.Sequelize.BOOLEAN,
        defaultValue: true,
        formFieldType: null
      },
      allowComments: {
        type: we.db.Sequelize.BOOLEAN,
        defaultValue: true,
        formFieldType: null
      },
      title: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      about: {
        type: we.db.Sequelize.TEXT,
        allowNull: true,
        formFieldType: 'textarea',
      },
      body: {
        type: we.db.Sequelize.TEXT,
        allowNull: true,
        formFieldType: 'html',
        formFieldHeight: 400
      },
      publishedAt: {
        type: we.db.Sequelize.DATE,
        allowNull: true
      },
      categoryItem: {
        type: we.db.Sequelize.VIRTUAL,
        get() {
          const category = this.get('category');
          if (category && category.length) {
            return category[0];
          }

          return null;
        }
      },

      setAlias: {
        type: we.db.Sequelize.VIRTUAL
      }
    },

    associations: {
      creator: {
        type: 'belongsTo',
        model: 'user'
      },
      cats: {
        type: 'belongsToMany',
        // as: 'Tasks',
        through: {
          model: 'modelsterms',
          unique: false,
          constraints: false,
          scope: {
            modelName: 'content'
          }
        },
        constraints: false,
        foreignKey: 'modelId',
        // otherKey: 'termId',
        //type: 'hasMay',
        model: 'term'
      }
    },
    options: {
      // title field, for default title record pages
      titleField: 'title',
      tableName: 'contents',

      termFields: {
        tags: {
          vocabularyName: null,
          canCreate: true,
          formFieldMultiple: true,
          onlyLowercase: true
        },
        category: {
          vocabularyName: 'Category',
          canCreate: false,
          formFieldMultiple: false
        }
      },

      imageFields: {
        featuredImage: { formFieldMultiple: false },
        images: { formFieldMultiple: true }
      },

      fileFields: {
        attachment: { formFieldMultiple: true }
      },

      // Class methods for use with: we.db.models.[yourmodel].[method]
      classMethods: {
        // suport to we.js url alias feature
        urlAlias(record) {
          const part1 = we.utils.slugifyAndTruncate (
            record.title, 50
          );

          return {
            alias: '/' + record.id + '-' +  part1,
            target: '/content/' + record.id,
          };
        }

      },
      // record method for use with record.[method]
      instanceMethods: {},
      hooks: {
        beforeValidate(r) {
          if (!r.highlighted) {
            r.highlighted = 0;
          }
        },
        beforeCreate(r) {
          // create an published content and set its publishedDate:
          if (r.published) {
            r.publishedAt = Date.now();
          }
        },

        beforeUpdate(r) {
          if (r.published && !r.publishedAt) {
            // set publishedAt on publish:
            r.publishedAt = Date.now();
          }
        }
      }
    }
  };

  return model;
};
