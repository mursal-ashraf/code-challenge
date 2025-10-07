import { describe, it, expect } from 'vitest';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { GraphGLContext } from './types';
import { EnergyAccounts } from './datasources/energyAccounts';
import { Charges } from './datasources/charges';

describe('Query.getEnergyAccount (e2e)', () => {
  it('returns the specified energy account with computed fields', async () => {
    const server = new ApolloServer<GraphGLContext>({ typeDefs, resolvers });

    const result = await server.executeOperation(
      {
        query: `
          query GetEnergyAccount($id: String!) {
            getEnergyAccount(id: $id) {
              id
              type
              address
              meterNumber
              volume
              balance
              charges { id accountId date amount }
            }
          }
        `,
        variables: { id: 'A-0001' },
      },
      {
        contextValue: {
          datasources: {
            energyAccounts: new EnergyAccounts(),
            charges: new Charges(),
          },
        },
      }
    );

    if (result.body.kind !== 'single') {
      throw new Error('Expected single result response');
    }
    const { data, errors } = result.body.singleResult as any;
    expect(errors).toBeUndefined();
    expect(data.getEnergyAccount.id).toBe('A-0001');
    expect(typeof data.getEnergyAccount.type).toBe('string');
    expect(typeof data.getEnergyAccount.address).toBe('string');
    // computed fields
    expect(typeof data.getEnergyAccount.balance).toBe('number');
    expect(Array.isArray(data.getEnergyAccount.charges)).toBe(true);
  });

  it('returns error when account not found', async () => {
    const server = new ApolloServer<GraphGLContext>({ typeDefs, resolvers });

    const result = await server.executeOperation(
      {
        query: `
          query GetEnergyAccount($id: String!) {
            getEnergyAccount(id: $id) { id }
          }
        `,
        variables: { id: 'does-not-exist' },
      },
      {
        contextValue: {
          datasources: {
            energyAccounts: new EnergyAccounts(),
            charges: new Charges(),
          },
        },
      }
    );

    if (result.body.kind !== 'single') {
      throw new Error('Expected single result response');
    }
    const { errors } = result.body.singleResult as any;
    expect(errors?.[0]?.message).toMatch(/No account found with id/i);
  });
});
