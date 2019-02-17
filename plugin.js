/**
 * Main we-plugin-page file
 */

const path = require('path'),
  metatagContentFindAll = require('./lib/metatags/metatagContentFindAll.js'),
  metatagContentFindOne = require('./lib/metatags/metatagContentFindOne.js');

module.exports = function loadPagePlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);

  plugin.setConfigs({
    permissions: {
      'access_contents_unpublished': {
        'title': 'Access unpublished contents'
      }
    }
  });

  plugin.setResource({
    name: 'content',
    findAll: {
      metatagHandler: 'contentFindAll',
      search: {
        published: {
          parser: 'equalBoolean',
          target: {
            type: 'field',
            field: 'published'
          }
        }
      }
    },
    findOne: { metatagHandler: 'contentFindOne' }
  });

  plugin.setMetatagHandlers = function setMetatagHandlers(we) {
    if (we.router.metatag) {
      we.router.metatag.add('contentFindOne', metatagContentFindOne);
      we.router.metatag.add('contentFindAll', metatagContentFindAll);
    }
  }

  plugin.events.on('we:after:load:plugins', plugin.setMetatagHandlers);

  return plugin;
};