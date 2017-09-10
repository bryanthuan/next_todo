const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull
} = graphql;
const axios = require('axios');

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
                return axios.get('http://localhost:3000/todos')
                .then(res=> res.data);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTodo: {
            type: TodoType,
            description: 'Add a Todo',
            args: {
              text: {
                name: 'Todo title',
                type: new GraphQLNonNull(GraphQLString)
              }
            },
            resolve: (parentValue, {text}) => {
              var newTodo = {
                title: text,
                completed: false,
                createdAt: Date.now()
              };              
              return axios.post('http://localhost:3000/todos', newTodo)
                .then(res => res.data);
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
});