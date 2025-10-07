import React, { useState } from 'react';
import { Card, CardContent, Typography, Stack, Button } from '@mui/material';
import { capitalize } from 'lodash';
import { PaymentModal } from './PaymentModal';
import { useNavigate } from 'react-router';
import type { EnergyAccount } from '../../../types';

export const AccountCard: React.FC<{ account: EnergyAccount }> = ({
  account,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const navigateTo = useNavigate();

  return (
    <>
      <Card variant="outlined" sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h6">{capitalize(account.type)}</Typography>
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
          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Make a Payment
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => navigateTo(`${account.id}/payment-history`)}
            >
              Payment History
            </Button>
          </Stack>
        </CardContent>
      </Card>
      {isPaymentModalOpen && (
        <PaymentModal
          account={account}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}
    </>
  );
};

const getBalanceColor = (balance: number) => {
  if (balance > 0) return 'success';
  if (balance < 0) return 'error';
  return 'textSecondary';
};
