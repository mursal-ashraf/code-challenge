import { gql } from '@apollo/client';

const ACCOUNT = `
  id
  type
  address
  balance
`;

export const GET_ENERGY_ACCOUNTS = gql`
  query GetEnergyAccounts {
    getEnergyAccounts {
      ${ACCOUNT}
    }
  }
`;

export const GET_ENERGY_ACCOUNT_WITH_CHARGES = gql`
  query GetEnergyAccount($id: String!) {
    getEnergyAccount(id: $id) {
      ${ACCOUNT}
      charges {
        id
        accountId
        amount
        date
      }
    }
  }
`;
