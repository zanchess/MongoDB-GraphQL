const graphql = require('graphql');
const Movies = require('../model/movie');
const Directors = require('../model/director');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

/* const movies = [
	{ _id: '1', description: '123',  directorId: '1', movie: 'Pulp Fiction', genre: 'Crime' },
	{ _id: '2', description: '123',  directorId: '2', movie: '1984', genre: 'Sci-Fi' },
  { _id: '3', description: '123',  directorId: '2', movie: '1985', genre: 'Sci-Fi 2' },
  { _id: '4', description: '123',  directorId: '2', movie: '1986', genre: 'Sci-Fi 3' },
	{ _id: '5', description: '123',  directorId: '3', movie: 'V for vendetta', genre: 'Sci-Fi-Triller' },
	{ _id: '6', description: '123',  directorId: '4', movie: 'Snatch', genre: 'Crime-Comedy' }
]; */

/* const directors = [
	{ _id: '1', name: 'Alex 1', age: 21 },
	{ _id: '2', name: 'Alex 2', age: 22 },
	{ _id: '3', name: 'Alex 3', age: 23 },
	{ _id: '4', name: 'Alex 4', age: 24 }
]; */

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    _id: { type: GraphQLID },
    description: { type: GraphQLString },
    directorId: { type: GraphQLString },
    movie: { type: GraphQLString },
    genre: { type: new GraphQLList(GraphQLString) },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Directors.findById(parent._id);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movies.findById({ directorId: parent._id });
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: {
        _id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Movies.findById(args._id);
      },
    },
    director: {
      type: DirectorType,
      args: {
        _id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Directors.findById(args._id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movies.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Directors.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
