import { GraphQLError } from 'graphql';
import { accounts } from '../mocks';
import { RESTDataSource } from '@apollo/datasource-rest';
import { EnergyAccount } from '../types';

export class EnergyAccounts extends RESTDataSource {
  override baseURL = 'https://energy-accounts.com/';

  async getEnergyAccounts(): Promise<EnergyAccount[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(accounts);
      }, 1000);
    });
  }

  async getEnergyAccountById(id: string): Promise<EnergyAccount> {
    const accounts = await this.getEnergyAccounts();
    const account = accounts.find((account) => account.id === id);
    if (!account) {
      throw new GraphQLError(`No account found with id: ${id}`);
    }
    return account;
  }
}
