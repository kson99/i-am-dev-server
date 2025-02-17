const Queries = require("./queries");
const Relational = require("./relational");
const Mutations = require("./mutations");

const resolvers = {
  Query: {
    ...Queries,
  },
  ...Relational,
  Mutation: {
    ...Mutations,
  },
};

module.exports = { resolvers };
