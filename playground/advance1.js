const Koa = require('koa');
const Router = require('koa-router'); // koa-router@7.x
const graphqlHTTP = require('koa-graphql');
var {buildSchema} = require('graphql');
const app = new Koa();
const router = new Router();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type User {
  id: String
  name: String
}

type Query {
  user(id: String): User
}
`);

// Maps id to User object
var fakeDatabase = {
'a': {
  id: 'a',
  name: 'alice',
},
'b': {
  id: 'b',
  name: 'bob',
},
};

var root = {
user: function ({id}) {
  return fakeDatabase[id];
}
};

router.all('/graphql', graphqlHTTP({schema: schema, rootValue: root, graphiql: true}));

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(async (ctx, next) => {
  await next();
  console.log('ip:', ctx.request.ip);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000, undefined, undefined, () => {
  console.log('Server is running on port 4000');
});