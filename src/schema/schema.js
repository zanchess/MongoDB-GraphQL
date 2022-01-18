const graphql = require('graphql');
const { resolveConfig } = require('prettier');

const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema} = graphql;

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    directorId: { type: GraphQLString },
    directorName: {type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType ({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: {
        _id: { type: GraphQLString }
      },
      resolve(parent, args){

      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query
});