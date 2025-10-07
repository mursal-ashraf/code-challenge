import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEnergyAccounts } from './hooks/useEnergyAccounts';
import { AccountCard } from './components/AccountCard';
import { Loader } from '../../common/components/Loader';

type EnergyTypeFilter = 'ALL' | 'ELECTRICITY' | 'GAS';

export const EnergyAccounts: React.FC = () => {
  const [energyTypeFilter, setEnergyTypeFilter] =
    useState<EnergyTypeFilter>('ALL');
  const [addressFilter, setAddressFilter] = useState<string>('');

  const { loading, error, energyAccounts, noAccountsFoundMessage } =
    useEnergyAccounts({ energyTypeFilter, addressFilter });

  if (loading) return <Loader text="getting accounts..." />;
  if (error) return <>error</>;

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

      <Stack direction="row" spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
        <TextField
          label="Search by address"
          variant="outlined"
          value={addressFilter}
          onChange={(e) => setAddressFilter(e.target.value)}
          sx={{ minWidth: 300 }}
          placeholder="Enter address to search..."
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="energy-type-filter-label">
            Filter by Energy Type
          </InputLabel>
          <Select
            labelId="energy-type-filter-label"
            value={energyTypeFilter}
            label="Filter by Energy Type"
            onChange={(e) =>
              setEnergyTypeFilter(e.target.value as EnergyTypeFilter)
            }
          >
            <MenuItem value="ALL">All Types</MenuItem>
            <MenuItem value="ELECTRICITY">Electricity</MenuItem>
            <MenuItem value="GAS">Gas</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack direction="column" spacing={4}>
        {energyAccounts.length ? (
          energyAccounts.map((account) => <AccountCard account={account} />)
        ) : (
          <Typography variant="body1">{noAccountsFoundMessage}</Typography>
        )}
      </Stack>
    </Box>
  );
};
