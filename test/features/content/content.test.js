const assert = require('assert');
const request = require('supertest');
const helpers = require('we-test-tools').helpers;
const stubs = require('we-test-tools').stubs;
let _, http, we;

describe('pageFeature', function () {
  let salvedPage, salvedUser, salvedUserPassword;
  let authenticatedRequest;

  before(function (done) {
    http = helpers.getHttp();
    we = helpers.getWe();

    _ = we.utils._;

    let userStub = stubs.userStub();
    helpers.createUser(userStub, function(err, user) {
      if (err) throw err;

      salvedUser = user;
      salvedUserPassword = userStub.password;

      // login user and save the browser
      authenticatedRequest = request.agent(http);
      authenticatedRequest.post('/login')
      .set('Accept', 'application/json')
      .send({
        email: salvedUser.email,
        password: salvedUserPassword
      })
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err) {
        if (err) throw err;
        let pageStub = stubs.pageStub(user.id);
        we.db.models.content.create(pageStub)
        .then(function (p) {
          salvedPage = p;
          done();
        })

      });

    });
  });

  describe('find', function () {
    it('get /content route should find one page', function(done){
      request(http)
      .get('/content')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        assert.equal(200, res.status);
        assert(res.body.content);
        assert( _.isArray(res.body.content) , 'page not is array');
        assert(res.body.meta);

        done();
      });
    });
  });

  describe('create', function () {

    it('post /content create one page record', function(done) {
      var pageStub = stubs.pageStub(salvedUser.id);

      authenticatedRequest
      .post('/content')
      .send(pageStub)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (err) throw err;

        assert.equal(201, res.status);
        assert(res.body.content);
        assert(res.body.content.title, pageStub.title);
        assert(res.body.content.about, pageStub.about);
        assert(res.body.content.body, pageStub.body);
        done();
      });
    });
  });

  describe('findOne', function () {
    it('get /content/:id should return one page', function(done){
      request(http)
      .get('/content/' + salvedPage.id)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (err) throw err;
        assert.equal(200, res.status);
        assert(res.body.content);
        assert(res.body.content.title, salvedPage.title);
        assert(res.body.content.about, salvedPage.about);
        assert(res.body.content.body, salvedPage.body);
        done();
      });
    });
  });

  describe('update', function () {
    it('put /content/:id should upate and return page', function(done){
      var newTitle = 'my new title';

      authenticatedRequest
      .put('/content/' + salvedPage.id)
      .send({
        title: newTitle
      })
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (err) throw err;
        assert.equal(200, res.status);
        assert(res.body.content);
        assert(res.body.content.title, newTitle);
        assert(res.body.content.id, salvedPage.id);

        salvedPage.title = newTitle;
        done();
      });
    });
  });

  describe('destroy', function () {
    it('delete /content/:id should delete one page', function(done){
      var pageStub = stubs.pageStub(salvedUser.id);
      we.db.models.content.create(pageStub)
      .then(function (p) {
        authenticatedRequest
        .delete('/content/' + p.id)
        .set('Accept', 'application/json')
        .end(function (err, res) {
          if (err) throw err;
          assert.equal(204, res.status);
          we.db.models.content.findOne({
            where: { id: p.id }
          })
          .then( function(page) {
            assert.equal(page, null);
            done();
          })
        });
      })
    });
  });
});
