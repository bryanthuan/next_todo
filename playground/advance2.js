const Koa = require('koa');
const Router = require('koa-router'); // koa-router@7.x
const graphqlHTTP = require('koa-graphql');
var graphql = require('graphql');
const app = new Koa();
const router = new Router();

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

// Define the User type
var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: graphql.GraphQLString },
      name: { type: graphql.GraphQLString },
    }
  });
  
  // Define the Query type
  var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        // `args` describes the arguments that the `user` query accepts
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: function (_, {id}) {
          return fakeDatabase[id];
        }
      }
    }
  });
  
  var schema = new graphql.GraphQLSchema({query: queryType});

  router.all('/graphql', graphqlHTTP({schema, graphiql: true}));
  
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