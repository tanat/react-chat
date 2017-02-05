const Koa = require('koa');
const IO = require('koa-socket');
const hbs = require('koa-hbs');
const serve = require('koa-static');
const shortid = require('shortid');

const app = new Koa();
const io = new IO();
const port = 3001;

const users = [];
const messages = [];

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

app.io.on('connection', (ctx, data) => {

  console.log('user connected');

  let id = shortid.generate();
  const socket = ctx.socket;

  let newUser = {
    id: id,
    name: id,
    socket: socket
  };
  users.push(newUser);

  let timer = setTimeout(() => {
    socket.emit('user info', { id: id, name: id});
  }, 300);

  app.io.broadcast('message', {
    type: 'enter',
    id: id,
  });

  socket.on('disconnect', () => {

    clearTimeout(timer);
    console.log('user disconnected');

    users.splice(users.findIndex((user) => user.id === id), 1);
    app.io.broadcast('message', {
      type: 'leave',
      id: id,
    });

  });

  socket.on('message', (text) => {
    app.io.broadcast('message', {
      type: 'text',
      id: id,
      text: text,
    });
  });

});

app.listen(port);
console.log(`Start listening on ${port}`);
