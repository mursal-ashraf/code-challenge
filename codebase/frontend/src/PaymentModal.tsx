import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Stack,
  TextField,
  Typography,
  DialogActions,
  Button,
} from '@mui/material';
import type { EnergyAccount } from './types';

export const PaymentModal: React.FC<{
  account: EnergyAccount;
  onClose: () => void;
}> = ({ account, onClose }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePay = () => {
    // TODO: Implement payment logic
    console.log('Payment submitted:', {
      accountId: account.id,
      cardNumber,
      expiryDate,
      cvv,
      amount: parseFloat(paymentAmount),
    });
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Make a Payment - {account.id}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Stack spacing={3}>
            <TextField
              label="Payment Amount"
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="0.00"
              fullWidth
              required
            />

            <Typography variant="h6" gutterBottom>
              Credit Card Details
            </Typography>

            <TextField
              label="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              fullWidth
              required
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="Expiry Date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                sx={{ flex: 1 }}
                required
              />
              <TextField
                label="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                sx={{ flex: 1 }}
                required
              />
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handlePay}
          variant="contained"
          color="primary"
          disabled={
            !cardNumber ||
            !expiryDate ||
            !cvv ||
            !paymentAmount ||
            parseFloat(paymentAmount) <= 0
          }
        >
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};
