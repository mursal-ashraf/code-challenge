import React from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Typography,
  Container,
} from '@mui/material';
import type { Charge } from '../../../types';

export const PaymentHistoryTable: React.FC<{ payments: Charge[] }> = ({
  payments,
}) => {
  if (!payments.length) {
    return (
      <Typography variant="body1">
        There are no payments for this account
      </Typography>
    );
  }
  return (
    <Container maxWidth="md">
      <Table>
        <TableHead>
          <TableCell>Date</TableCell>
          <TableCell>Amount</TableCell>
        </TableHead>
        <TableBody>
          {payments.map((payment) => {
            return (
              <TableRow>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
};
