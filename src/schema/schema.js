const graphql = require('graphql');
const { resolveConfig } = require('prettier');


const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema} = graphql;

const movies = [
	{ _id: '1', description: '123',  directorId: '1', directorName: 'Pulp Fiction', genre: 'Crime' },
	{ _id: '2', description: '123',  directorId: '2', directorName: '1984', genre: 'Sci-Fi' },
	{ _id: '3', description: '123',  directorId: '3', directorName: 'V for vendetta', genre: 'Sci-Fi-Triller' },
	{ _id: '4', description: '123',  directorId: '4', directorName: 'Snatch', genre: 'Crime-Comedy' },
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    directorId: { type: GraphQLString },
    directorName: {type: GraphQLString },
    genre: {type: GraphQLString }
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
        return movies.find(movie => movie._id === args._id)
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query
});