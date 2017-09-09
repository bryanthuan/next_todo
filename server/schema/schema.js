const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean
} = graphql;

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: {
        id: { type: GraphQLString },
        text: { type: GraphQLString },
        dismissed: { type: GraphQLBoolean }
        // createdAt: '',
        // updatedAt: '',
    }

});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        todo: {
            type: TodoType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                
            }
        }
    }
});