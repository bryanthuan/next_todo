const Koa = require('koa');
const Router = require('koa-router'); // koa-router@7.x
const graphqlHTTP = require('koa-graphql');
var { buildSchema } = require('graphql');
const app = new Koa();
const router = new Router();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint

router.all('/graphql', graphqlHTTP({
  schema: schema,
//   rootValue: root,
  graphiql: true
}));
 
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, undefined, undefined, () => {
    console.log('Server is running on port 4000');
});