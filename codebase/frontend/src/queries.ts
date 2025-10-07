import { gql } from '@apollo/client';

export const GET_ENERGY_ACCOUNTS = gql`
  query GetEnergyAccounts {
    getEnergyAccounts {
      id
      type
      address
      balance
    }
  }
`;
