const Koa = require('koa');
const Router = require('koa-router'); // koa-router@7.x
const graphqlHTTP = require('koa-graphql');
const graphql = require('graphql');
const app = new Koa();
const router = new Router();

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean} = graphql;

// add some sample data:
var TODOs = [
    {
        "id": 1446412739542,
        "text": "Read emails",
        "dismissed": false,
        "createdAt": 1505012677438,
        "updatedAt": null
    }, {
        "id": 1305012049594,
        "text": "Buy orange",
        "dismissed": true,
        "createdAt": 1505012736931,
        "updatedAt": 1505012749594

    }, {
        "id": 1505012928371,
        "text": "Meeting with CTO",
        "dismissed": false,
        "createdAt": 1505012928371,
        "updatedAt": null

    }
];

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: {
        id: {
            type: GraphQLID
        },
        text: {
            type: GraphQLString
        },
        dismissed: {
            type: GraphQLBoolean
        },
        createdAt: {
            type: GraphQLInt
        },
        updatedAt: {
            type: GraphQLInt
        }
    }

});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        todos: {
            type: new graphql.GraphQLList(TodoType),
            resolve() {
                return TODOs;
            }
        }
    }
});

var schema = new graphql.GraphQLSchema({query: RootQuery});

router.get('/', async(ctx, next) => {
    console.log('ip:', ctx.request.ip);
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}, (ctx, next) => {
    ctx.body = 'Hello Todo!';
}).all('/graphql', graphqlHTTP({schema: schema, graphiql: true}));

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});