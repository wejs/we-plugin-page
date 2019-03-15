module.exports = function (we, done) {
  Promise.all([
    // Article publication:
    we.db.defaultConnection.query(
      'UPDATE `content` SET `published`="1" WHERE publishedAt <= NOW() AND published != 1'
    )
  ])
  .then( ()=> {
    done();
    return null;
  })
  .catch(done);
};