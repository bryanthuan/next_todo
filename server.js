const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {

    ctx.body = 'Hello World';

});

app.listen(3000, undefined, undefined, () => {
    console.log('Server is running on port 3000');
});