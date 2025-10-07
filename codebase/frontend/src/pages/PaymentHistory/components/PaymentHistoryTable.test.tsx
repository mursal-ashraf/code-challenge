import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PaymentHistoryTable } from './PaymentHistoryTable';

describe('PaymentHistoryTable', () => {
  it('renders empty state when there are no payments', () => {
    render(<PaymentHistoryTable payments={[]} />);

    expect(
      screen.getByText('There are no payments for this account')
    ).toBeInTheDocument();
  });

  it('renders table headers and rows for provided payments', () => {
    const payments = [
      { id: '1', accountId: 'acc-1', date: '2024-01-10', amount: 12.34 },
      { id: '2', accountId: 'acc-1', date: '2024-02-15', amount: 56.78 },
    ];

    render(<PaymentHistoryTable payments={payments} />);

    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();

    for (const payment of payments) {
      expect(screen.getByText(payment.date)).toBeInTheDocument();
      expect(screen.getByText(String(payment.amount))).toBeInTheDocument();
    }
  });
});
