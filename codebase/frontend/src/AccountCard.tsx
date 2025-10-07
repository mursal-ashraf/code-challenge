import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import type { EnergyAccount } from './types';
import { capitalize } from 'lodash';

export const AccountCard: React.FC<{ account: EnergyAccount }> = ({
  account,
}) => {
  return (
    <Card variant="outlined" sx={{ width: 400 }}>
      <CardContent>
        <Typography variant="h6">{capitalize(account.type)}</Typography>
        <Typography variant="body2">{account.id}</Typography>
        <Typography variant="body2">{account.address}</Typography>
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Typography variant="body2">Account Balance</Typography>
          <Typography variant="body2" color={getBalanceColor(account.balance)}>
            {`$${account.balance}`}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

const getBalanceColor = (balance: number) => {
  if (balance > 0) return 'success';
  if (balance < 0) return 'error';
  return 'textSecondary';
};
