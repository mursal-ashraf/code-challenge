import React from 'react';
import type { EnergyAccount } from './types';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export const EnergyAccounts: React.FC = () => {
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
        {energyAccounts.map((account) => (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">
                {energyAccountTypeMap[account.type] ?? 'Other'}
              </Typography>
              <Typography variant="body2">{account.id}</Typography>
              <Typography variant="body2">{account.address}</Typography>
              {/* TODO: use account.balance and add colour to balance */}
              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="body2">Account Balance</Typography>
                <Typography variant="body2">$30</Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

const energyAccounts: EnergyAccount[] = [
  {
    id: 'A-0001',
    type: 'ELECTRICITY',
    address: '1 Greville Ct, Thomastown, 3076, Victoria',
    meterNumber: '1234567890',
  },
  {
    id: 'A-0002',
    type: 'GAS',
    address: '74 Taltarni Rd, Yawong Hills, 3478, Victoria',
    volume: 3034,
  },
  {
    id: 'A-0003',
    type: 'ELECTRICITY',
    address: '44 William Road, Cresswell Downs, 0862, Northern Territory',
    meterNumber: '12345672313',
  },
  {
    id: 'A-0004',
    type: 'ELECTRICITY',
    address: '87 Carolina Park Road, Forresters Beach, 2260, New South Wales',
    meterNumber: '12345671244',
  },
  {
    id: 'A-0005',
    type: 'GAS',
    address: '12 Sunset Blvd, Redcliffe, 4020, Queensland',
    volume: 1900,
  },
  {
    id: 'A-0006',
    type: 'ELECTRICITY',
    address: '3 Ocean View Dr, Torquay, 3228, Victoria',
    meterNumber: '12412421244',
  },
  {
    id: 'A-0007',
    type: 'GAS',
    address: '150 Greenway Cres, Mawson Lakes, 5095, South Australia',
    volume: 1853,
  },
  {
    id: 'A-0008',
    type: 'ELECTRICITY',
    address: '88 Harbour St, Sydney, 2000, New South Wales',
    meterNumber: '22223141443',
  },
  {
    id: 'A-0009',
    type: 'GAS',
    address: '22 Boulder Rd, Kalgoorlie, 6430, Western Australia',
    volume: 1000,
  },
];

const energyAccountTypeMap = {
  ELECTRICITY: 'Electricity',
  GAS: 'Gas',
};
