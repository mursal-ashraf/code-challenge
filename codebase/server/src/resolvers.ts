import { GraphQLError } from 'graphql';
import { accounts, dueCharges } from './mocks';
import { EnergyAccount } from './types';

export const resolvers = {
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
