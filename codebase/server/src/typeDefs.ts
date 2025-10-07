export const typeDefs = `
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
