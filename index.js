const Koa = require('koa');
const IO = require('koa-socket');
const hbs = require('koa-hbs');
const serve = require('koa-static');

const app = new Koa();
const io = new IO();
const port = 3001;

app.use(hbs.middleware({
  viewPath: `${__dirname}/source/views`
}));

app.use(serve(`${__dirname}/build`));

app.use(function *(next) {
  let start = new Date;
  yield next;
  let ms = new Date - start;
  this.set(`X-Response-Time: ${ms}ms`);
});

app.use(function *(next) {
  yield next;
  console.log('%s %s', this.method, this.url);
});

app.on('error', function(err) {
  console.error('server error', err)
});

app.use(function *() {
  yield this.render('index', { title: "React Chat App"});
});

io.attach(app);

app.listen(port);
console.log(`Start listening on ${port}`);
