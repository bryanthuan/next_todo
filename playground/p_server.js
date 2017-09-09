const Koa = require('koa');
const Router = require('koa-router'); // koa-router@7.x
const graphqlHTTP = require('koa-graphql');
var {buildSchema} = require('graphql');
const app = new Koa();
const router = new Router();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type RandomDie {
  numSides: Int!
  numRolls: Int!
  rollOnce: Int
  roll: [Int]
}

type Query {
  getDie(numSides: Int, numRolls: Int): RandomDie
}
`);

// This class implements the RandomDie GraphQL type
class RandomDie {
  constructor(numSides, numRolls) {
    this.numSides = numSides;
    this.numRolls = numRolls;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll() {
    var output = [];
    for (var i = 0; i < this.numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// The root provides the top-level API endpoints
var root = {
  getDie: function ({numSides, numRolls}) {
    return new RandomDie(numSides || 6, numRolls || 4);
  }
}

router.all('/graphql', graphqlHTTP({schema: schema, rootValue: root, graphiql: true}));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000, undefined, undefined, () => {
  console.log('Server is running on port 4000');
});