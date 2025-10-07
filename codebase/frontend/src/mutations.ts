import { gql } from '@apollo/client';

export const PROCESS_PAYMENT = gql`
  mutation ProcessPayment($input: ProcessPaymentInput!) {
    processPayment(input: $input) {
      id
      balance
      charges {
        accountId
        amount
      }
    }
  }
`;
