import React from 'react';
import { useQuery } from '@apollo/client/react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { PaymentHistoryTable } from './components/PaymentHistoryTable';
import { GET_ENERGY_ACCOUNT_WITH_CHARGES } from '../../gql/queries';
import type { EnergyAccount } from '../../types';
import { Loader } from '../../common/components/Loader';

export const PaymentHistory: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigateTo = useNavigate();

  const { loading, error, data } = useQuery<{
    getEnergyAccount: EnergyAccount;
  }>(GET_ENERGY_ACCOUNT_WITH_CHARGES, {
    variables: { id: accountId },
  });

  if (loading) return <Loader text="getting payments..." />;
  if (error) return <>error</>;

  const energyAccount = data?.getEnergyAccount!;
  const payments = energyAccount.charges.filter((charge) => charge.amount > 0);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Button onClick={() => navigateTo(-1)}>Go Back</Button>
      <Typography gutterBottom component="h1" variant="h3">
        Payment History
      </Typography>
      <PaymentHistoryTable payments={payments} />
    </Box>
  );
};
