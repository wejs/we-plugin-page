const projectPath = process.cwd(),
      path = require('path'),
      deleteDir = require('rimraf'),
      testTools = require('we-test-tools');

let we;

before(function(callback) {
  testTools.copyLocalSQLiteConfigIfNotExists(projectPath, callback);
});

before(function(callback) {
  this.slow(100);

  const We = require('we-core');
    we = new We();

  testTools.init({}, we);

  we.bootstrap({
    port: 9800,
    hostname: 'http://localhost:9800',
    appName: 'We test',
    i18n: {
      directory: path.join(__dirname, 'locales'),
      updateFiles: true
    }
  } , callback);
});

// start the server:
before(function (callback) {
  we.plugins['we-plugin-page'] = we.plugins.project;
  we.startServer(callback);
});

// after all tests remove test folders and delete the database:
after(function (callback) {
  testTools.helpers.resetDatabase(we, (err)=> {
    if(err) return callback(err);

    we.db.defaultConnection.close();

    const tempFolders = [
      path.join(projectPath + 'files', 'config'),
      path.join(projectPath, 'database.sqlite'),
      path.join(projectPath, 'sessionsDB'),
      path.join(projectPath, 'files', 'sqlite')
    ];

    we.utils.async.each(tempFolders, (folder, next)=> {
      deleteDir( folder, next);
    }, callback);
  });
});

after(function () {
  we.exit(process.exit);
});
