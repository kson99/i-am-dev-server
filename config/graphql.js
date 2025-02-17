const { ApolloServer } = require("@apollo/server");
const { typeDefs } = require("../schema");
const { resolvers } = require("../resolvers");

// Initialize Apollo Server
const gqlServer = new ApolloServer({
	typeDefs,
	resolvers,
});

module.exports = { gqlServer };
