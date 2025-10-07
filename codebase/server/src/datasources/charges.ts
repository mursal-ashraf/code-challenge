import { RESTDataSource } from '@apollo/datasource-rest';
import { dueCharges } from '../mocks';
import { Charge } from '../types';
import { GraphQLError } from 'graphql';

/**
 * TODO
 * - add datasource tests
 * - token/logging config
 */
export class Charges extends RESTDataSource {
  getDueCharges(): Promise<Charge[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          dueCharges.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
      }, 1000);
    });
  }

  async getDueChargesByAccountId(accountId: string): Promise<Charge[]> {
    const charges = await this.getDueCharges();
    if (!charges) return [];

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dueCharges.filter((charge) => charge.accountId === accountId));
      }, 1000);
    });
  }

  updateCharges({ accountId, amount }: { accountId: string; amount: number }) {
    if (amount <= 0) {
      throw new GraphQLError(
        `Payment amount needs to be greater than 0. Cannot process payment.`
      );
    }
    const newCharge = {
      id: 'new-payment-id',
      accountId,
      amount,
      date: new Date().toISOString().slice(0, 10),
    };
    dueCharges.push(newCharge);
  }
}
