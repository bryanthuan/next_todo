const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean
} = graphql;
const axios = require('axios');

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: {
        id: { type: GraphQLID},
        text: { type: GraphQLString },
        dismissed: { type: GraphQLBoolean },
        createdAt: { type : GraphQLInt},
        updatedAt: { type : GraphQLInt}
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