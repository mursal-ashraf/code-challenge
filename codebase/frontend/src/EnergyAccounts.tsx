import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@apollo/client/react';
import type { EnergyAccount } from './types';
import { GET_ENERGY_ACCOUNTS } from './queries';

export const EnergyAccounts: React.FC = () => {
  const { loading, error, data } = useQuery<{
    getEnergyAccounts: EnergyAccount[];
  }>(GET_ENERGY_ACCOUNTS);

  if (loading)
    return (
      <>
        <CircularProgress />
        <Typography variant="body1">loading energy accounts...</Typography>
      </>
    );
  if (error) return <>error</>;

  const energyAccounts = data?.getEnergyAccounts ?? [];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography gutterBottom component="h1" variant="h3">
        Energy Accounts
      </Typography>
      <Stack direction="column" spacing={4}>
        {energyAccounts.length ? (
          energyAccounts.map((account) => (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  {energyAccountTypeMap[account.type] ?? 'Other'}
                </Typography>
                <Typography variant="body2">{account.id}</Typography>
                <Typography variant="body2">{account.address}</Typography>
                <Stack direction="row" justifyContent="space-between" mt={2}>
                  <Typography variant="body2">Account Balance</Typography>
                  <Typography
                    variant="body2"
                    color={getBalanceColor(account.balance)}
                  >
                    {`$${account.balance}`}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">No energy accounts found!</Typography>
        )}
      </Stack>
    </Box>
  );
};

const getBalanceColor = (balance: number) => {
  if (balance > 0) return 'success';
  if (balance < 0) return 'error';
  return 'textSecondary';
};

const energyAccountTypeMap = {
  ELECTRICITY: 'Electricity',
  GAS: 'Gas',
};
