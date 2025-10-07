import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';

const accounts: EnergyAccount[] = [
  {
    id: 'A-0001',
    type: 'ELECTRICITY',
    address: '1 Greville Ct, Thomastown, 3076, Victoria',
    meterNumber: '1234567890',
  },
  {
    id: 'A-0002',
    type: 'GAS',
    address: '74 Taltarni Rd, Yawong Hills, 3478, Victoria',
    volume: 3034,
  },
  {
    id: 'A-0003',
    type: 'ELECTRICITY',
    address: '44 William Road, Cresswell Downs, 0862, Northern Territory',
    meterNumber: '12345672313',
  },
  {
    id: 'A-0004',
    type: 'ELECTRICITY',
    address: '87 Carolina Park Road, Forresters Beach, 2260, New South Wales',
    meterNumber: '12345671244',
  },
  {
    id: 'A-0005',
    type: 'GAS',
    address: '12 Sunset Blvd, Redcliffe, 4020, Queensland',
    volume: 1900,
  },
  {
    id: 'A-0006',
    type: 'ELECTRICITY',
    address: '3 Ocean View Dr, Torquay, 3228, Victoria',
    meterNumber: '12412421244',
  },
  {
    id: 'A-0007',
    type: 'GAS',
    address: '150 Greenway Cres, Mawson Lakes, 5095, South Australia',
    volume: 1853,
  },
  {
    id: 'A-0008',
    type: 'ELECTRICITY',
    address: '88 Harbour St, Sydney, 2000, New South Wales',
    meterNumber: '22223141443',
  },
  {
    id: 'A-0009',
    type: 'GAS',
    address: '22 Boulder Rd, Kalgoorlie, 6430, Western Australia',
    volume: 1000,
  },
];

interface Charge {
  id: string;
  accountId: string;
  date: string;
  amount: number;
}

const dueCharges: Charge[] = [
  { id: 'D-0001', accountId: 'A-0001', date: '2025-04-01', amount: 10 },
  { id: 'D-0002', accountId: 'A-0001', date: '2025-04-08', amount: 20 },
  { id: 'D-0003', accountId: 'A-0003', date: '2025-03-25', amount: -15 },
  { id: 'D-0004', accountId: 'A-0003', date: '2025-04-05', amount: -25 },

  { id: 'D-0005', accountId: 'A-0004', date: '2025-03-30', amount: 20 },
  { id: 'D-0006', accountId: 'A-0004', date: '2025-04-06', amount: 15 },
  { id: 'D-0007', accountId: 'A-0004', date: '2025-04-13', amount: 15 },

  { id: 'D-0008', accountId: 'A-0005', date: '2025-04-04', amount: 10 },
  { id: 'D-0009', accountId: 'A-0005', date: '2025-04-11', amount: 15 },

  { id: 'D-0010', accountId: 'A-0006', date: '2025-04-01', amount: -5 },
  { id: 'D-0011', accountId: 'A-0006', date: '2025-04-09', amount: -10 },

  { id: 'D-0012', accountId: 'A-0008', date: '2025-03-31', amount: 40 },
  { id: 'D-0013', accountId: 'A-0008', date: '2025-04-07', amount: 40 },
  { id: 'D-0014', accountId: 'A-0008', date: '2025-04-14', amount: 40 },

  { id: 'D-0015', accountId: 'A-0009', date: '2025-04-02', amount: -30 },
  { id: 'D-0016', accountId: 'A-0009', date: '2025-04-12', amount: -30 },
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `

  type EnergyAccount {
    id: String
    type: String
    address: String
    volume: String
    meterNumber: String
    balance: Float
    charges: [Charge]
  }
  
  type Charge {
    id: String
    accountId: String
    date: String
    amount: Float
  }

  type Query {
    getEnergyAccounts: [EnergyAccount]
    getEnergyAccount(id: String!): EnergyAccount
  }

  type Mutation {
    processPayment(input: ProcessPaymentInput!): EnergyAccount!
  }

  input ProcessPaymentInput {
    accountId: String!
    amount: Float!
  }
`;

const resolvers = {
  Query: {
    getEnergyAccounts: () => accounts,
    getEnergyAccount: (_: {}, { id }: { id: string }) => {
      const account = accounts.find((account) => account.id === id);
      if (!account) {
        throw new GraphQLError(`No account found with id: ${id}`);
      }
      return account;
    },
  },
  Mutation: {
    processPayment: (
      _: {},
      {
        input: { accountId, amount },
      }: { input: { accountId: string; amount: number } }
    ) => {
      const account = accounts.find((account) => account.id === accountId);
      if (!account) {
        throw new GraphQLError(
          `Account not found for account id: ${accountId}. Cannot process payment.`
        );
      }
      if (amount <= 0) {
        throw new GraphQLError(
          `Payment amount needs to be greater than 0. Cannot process payment.`
        );
      }
      const newCharge = {
        id: 'new-payment-id', // TODO: charge id
        accountId,
        amount,
        date: new Date().toISOString().slice(0, 10),
      };
      dueCharges.push(newCharge);

      return accounts.find((account) => account.id === accountId);
    },
  },
  EnergyAccount: {
    balance: ({ id }: EnergyAccount) => {
      const accountCharges = dueCharges.filter(
        (charge) => charge.accountId === id
      );

      return accountCharges.reduce(
        (acc, currentCharge) => acc + currentCharge.amount,
        0
      );
    },
    charges: ({ id }: EnergyAccount) => {
      const accountCharges =
        dueCharges.filter((charge) => charge.accountId === id) || [];
      return accountCharges.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
  },
};

interface ElectricityAccount {
  id: string;
  type: 'ELECTRICITY';
  address: string;
  meterNumber: string;
}

interface GasAccount {
  id: string;
  type: 'GAS';
  address: string;
  volume: number;
}

type EnergyAccount = ElectricityAccount | GasAccount;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
