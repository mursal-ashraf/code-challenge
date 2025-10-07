import { EnergyAccount, GraphGLContext } from './types';

export const resolvers = {
  Query: {
    getEnergyAccounts: (_: {}, __: {}, { datasources }: GraphGLContext) => datasources.energyAccounts.getEnergyAccounts(),
    getEnergyAccount:  (
      _: {},
      { id }: { id: string },
      { datasources }: GraphGLContext
    ) => {
      return datasources.energyAccounts.getEnergyAccountById(id);
    },
  },
  Mutation: {
    processPayment: async (
      _: {},
      {
        input: { accountId, amount },
      }: { input: { accountId: string; amount: number } },
      { datasources }: GraphGLContext
    ) => {
      const account = await datasources.energyAccounts.getEnergyAccountById(
        accountId
      );

      datasources.charges.updateCharges({ accountId, amount });
      return account;
    },
  },
  EnergyAccount: {
    balance: async (
      { id }: EnergyAccount,
      _: {},
      { datasources }: GraphGLContext
    ) => {
      const accountCharges = await datasources.charges.getDueChargesByAccountId(
        id
      );

      return accountCharges.reduce(
        (acc, currentCharge) => acc + currentCharge.amount,
        0
      );
    },
    charges: (
      { id }: EnergyAccount,
      _: {},
      { datasources }: GraphGLContext
    ) => {
      return datasources.charges.getDueChargesByAccountId(id);
    },
  },
};
