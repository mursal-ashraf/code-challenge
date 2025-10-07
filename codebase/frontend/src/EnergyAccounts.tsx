import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { useQuery } from '@apollo/client/react';
import type { EnergyAccount } from './types';
import { GET_ENERGY_ACCOUNTS } from './queries';

type EnergyTypeFilter = 'ALL' | 'ELECTRICITY' | 'GAS';


export const EnergyAccounts: React.FC = () => {
  const [filter, setFilter] = useState<EnergyTypeFilter>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { loading, error, data } = useQuery<{
    getEnergyAccounts: EnergyAccount[];
  }>(GET_ENERGY_ACCOUNTS);

  const allEnergyAccounts = data?.getEnergyAccounts ?? [];
  
  const filteredEnergyAccounts = useMemo(() => {
    let filtered = allEnergyAccounts;
    
    // Filter by energy type
    if (filter !== 'ALL') {
      filtered = filtered.filter(account => account.type === filter);
    }
    
    // Filter by address search
    if (searchTerm.trim()) {
      filtered = filtered.filter(account => 
        account.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [allEnergyAccounts, filter, searchTerm]);

  if (loading)
    return (
      <>
        <CircularProgress />
        <Typography variant="body1">loading energy accounts...</Typography>
      </>
    );
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 300 }}
          placeholder="Enter address to search..."
        />
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="energy-type-filter-label">Filter by Energy Type</InputLabel>
          <Select
            labelId="energy-type-filter-label"
            value={filter}
            label="Filter by Energy Type"
            onChange={(e) => setFilter(e.target.value as EnergyTypeFilter)}
          >
            <MenuItem value="ALL">All Types</MenuItem>
            <MenuItem value="ELECTRICITY">Electricity</MenuItem>
            <MenuItem value="GAS">Gas</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      
      <Stack direction="column" spacing={4}>
        {filteredEnergyAccounts.length ? (
          filteredEnergyAccounts.map((account) => (
            <Card variant="outlined" sx={{ minWidth: '100%' }}>
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
          <Typography variant="body1">
            {getNoResultsMessage(filter, searchTerm)}
          </Typography>
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

const getNoResultsMessage = (filter: EnergyTypeFilter, searchTerm: string) => {
  const hasSearch = searchTerm.trim().length > 0;
  const hasFilter = filter !== 'ALL';
  
  if (hasSearch && hasFilter) {
    return `No ${energyAccountTypeMap[filter]?.toLowerCase() || 'selected'} accounts found matching "${searchTerm}"!`;
  }
   if (hasSearch) {
    return `No accounts found matching "${searchTerm}"!`;
  } 
   if (hasFilter) {
    return `No ${energyAccountTypeMap[filter]?.toLowerCase() || 'selected'} accounts found!`;
  } 
  return 'No energy accounts found!';
};

const energyAccountTypeMap = {
  ELECTRICITY: 'Electricity',
  GAS: 'Gas',
};
