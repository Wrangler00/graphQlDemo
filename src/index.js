
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const Feed = require('./resolvers/Feed');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload');
const Subscription = require('./resolvers/Subscription');

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    Feed
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
      ...req,
      db: new Prisma({
        typeDefs: 'src/generated/prisma.graphql',
        endpoint: 'https://eu1.prisma.sh/abhishek-kumar-27a332/database/dev',
        secret: 'mysecret123',
        debug: true
      })
    })
});

server.start(()=>console.log(`Server is running on http://localhost:4000`));