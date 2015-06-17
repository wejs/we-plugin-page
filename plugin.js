/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/extend.plugin
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);
  // set plugin configs
  plugin.setConfigs({
    permissions: {
      'find_page': {
        'group': 'page',
        'title': 'Find pages',
        'description': 'Find and find all pages'
      },
      'create_page': {
        'group': 'page',
        'title': 'Create one page',
        'description': 'Create one new page'
      },
      'update_page': {
        'group': 'page',
        'title': 'Update one page',
        'description': 'Update one new page'
      },
      'delete_page': {
        'group': 'page',
        'title': 'Delete one page',
        'description': 'Delete one page record'
      },
    }
  });
  // ser plugin routes
  plugin.setRoutes({
    // Page
    'get /page/:id([0-9]+)': {
      controller    : 'page',
      action        : 'findOne',
      model         : 'page',
      permission    : 'find_page'
    },
    'get /page': {
      controller    : 'page',
      action        : 'find',
      model         : 'page',
      permission    : 'find_page'
    },
    'post /page': {
      controller    : 'page',
      action        : 'create',
      model         : 'page',
      permission    : 'create_page'
    },
    'put /page/:id([0-9]+)': {
      controller    : 'page',
      action        : 'update',
      model         : 'page',
      permission    : 'update_page'
    },
    'delete /page/:id([0-9]+)': {
      controller    : 'page',
      action        : 'destroy',
      model         : 'page',
      permission    : 'delete_page'
    }
  });
  return plugin;
};