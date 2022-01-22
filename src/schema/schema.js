const graphql = require('graphql');


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;

const movies = [
	{ _id: '1', description: '123',  directorId: '1', movie: 'Pulp Fiction', genre: 'Crime' },
	{ _id: '2', description: '123',  directorId: '2', movie: '1984', genre: 'Sci-Fi' },
	{ _id: '3', description: '123',  directorId: '3', movie: 'V for vendetta', genre: 'Sci-Fi-Triller' },
	{ _id: '4', description: '123',  directorId: '4', movie: 'Snatch', genre: 'Crime-Comedy' }
];

const directors = [
	{ _id: '1', name: 'Alex 1', age: 21 },
	{ _id: '2', name: 'Alex 2', age: 22 },
	{ _id: '3', name: 'Alex 3', age: 23 },
	{ _id: '4', name: 'Alex 4', age: 24 }
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    _id: { type: GraphQLID },
    description: { type: GraphQLString },
    directorId: { type: GraphQLString },
    movie: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: { 
      type: DirectorType,
      resolve(parent, args ){
        return directors.find(director => director._id = parent._id);
      }
    }
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: {type: GraphQLInt }
  }),
});

const Query = new GraphQLObjectType ({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(parent, args){
        return movies.find(movie => movie._id === args._id);
      }
    },
    director: {
      type: DirectorType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(parent, args){
        return directors.find(director => director._id === args._id);
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query
});