import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { GraphGLContext } from './types';
import { EnergyAccounts } from './datasources/energyAccounts';
import { Charges } from './datasources/charges';

const server = new ApolloServer<GraphGLContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    return {
      datasources: {
        energyAccounts: new EnergyAccounts(),
        charges: new Charges(),
      },
    };
  },
});

console.log(`Server ready at: ${url}`);
