var router = require('koa-router')();

router.prefix('/users');

router.get('/', function *(next) {
  this.body = 'this is a users response123!';
});

router.get('/bar', function *(next) {
  this.body = 'this is a users/bar response64!';
});

module.exports = router;
