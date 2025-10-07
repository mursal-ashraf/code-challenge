import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import type { EnergyAccount } from '../../../types';
import { useMutation } from '@apollo/client/react';
import { PROCESS_PAYMENT } from '../../../gql/mutations';
import { Column, Row } from '../../../common/components/Styles';

/**
 * TODO
 * - create some common components
 * - validation for payment
 */

export const PaymentModal: React.FC<{
  account: EnergyAccount;
  onClose: () => void;
}> = ({ account, onClose }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [processPayment, { loading, error }] = useMutation(PROCESS_PAYMENT);

  const handlePayment = () => {
    processPayment({
      variables: {
        input: { accountId: account.id, amount: parseFloat(paymentAmount) },
      },
      onCompleted: () => {
        console.log('mutation completed successfully');
        setShowSuccessModal(true);
      },
    });
  };

  if (loading) {
    return (
      <Dialog open={true}>
        <CircularProgress />
      </Dialog>
    );
  }

  if (error) {
    console.log('error processing payment: ', error);
    return (
      <Dialog open={true}>
        <DialogTitle>Error processing payment</DialogTitle>
      </Dialog>
    );
  }

  if (showSuccessModal) {
    return (
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Payment processed successfully</DialogTitle>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  // TODO: validation on inputs
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Make a Payment - {account.id}</DialogTitle>
      <DialogContent>
        <Column spacing={3} sx={{ pt: 2 }}>
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

          <Row spacing={2}>
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
          </Row>
        </Column>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handlePayment}
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
