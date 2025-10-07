import React from 'react';
import { useQuery } from '@apollo/client/react';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { PaymentHistoryTable } from './components/PaymentHistoryTable';
import { GET_ENERGY_ACCOUNT_WITH_CHARGES } from '../../gql/queries';
import type { EnergyAccount } from '../../types';
import { Loader } from '../../common/components/Loader';
import { CenterHorizontally, H1 } from '../../common/components/Styles';

/**
 * TODO: proper query error handling.
 * maybe move query to within PaymentHistoryTable component
 */
export const PaymentHistory: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigateTo = useNavigate();

  const { loading, error, data } = useQuery<{
    getEnergyAccount: EnergyAccount;
  }>(GET_ENERGY_ACCOUNT_WITH_CHARGES, {
    variables: { id: accountId },
  });

  if (loading) return <Loader text="getting payments..." />;
  if (error || !data?.getEnergyAccount) return <>error</>;

  const energyAccount = data?.getEnergyAccount;
  const payments = energyAccount.charges.filter((charge) => charge.amount > 0);

  return (
    <CenterHorizontally>
      <Button onClick={() => navigateTo(-1)}>Go Back</Button>
      <H1>Payment History</H1>
      <PaymentHistoryTable payments={payments} />
    </CenterHorizontally>
  );
};
