import { useQuery } from '@apollo/client/react';
import { GET_ENERGY_ACCOUNTS } from '../../../gql/queries';
import type { EnergyAccount } from '../../../types';
import { capitalize } from 'lodash';

type EnergyTypeFilter = 'ALL' | 'ELECTRICITY' | 'GAS';

export const useEnergyAccounts = ({
  energyTypeFilter = 'ALL',
  addressFilter = '',
}: {
  energyTypeFilter?: EnergyTypeFilter;
  addressFilter?: string;
}) => {
  const { loading, error, data } = useQuery<{
    getEnergyAccounts: EnergyAccount[];
  }>(GET_ENERGY_ACCOUNTS);

  const allEnergyAccounts = data?.getEnergyAccounts ?? [];

  const energyAccounts = allEnergyAccounts
    .filter(
      (account) =>
        energyTypeFilter === 'ALL' || account.type === energyTypeFilter
    )
    .filter((account) =>
      account.address.toLowerCase().includes(addressFilter.toLowerCase())
    );

  const noAccountsFoundMessage = getNoAccountsFoundMessage(
    energyAccounts,
    energyTypeFilter,
    addressFilter
  );

  return { loading, error, energyAccounts, noAccountsFoundMessage };
};

const getNoAccountsFoundMessage = (
  energyAccounts: EnergyAccount[],
  energyTypeFilter: EnergyTypeFilter,
  addressFilter: string
) => {
  if (energyAccounts.length) return;

  const hasEnergyTypeFilter = energyTypeFilter !== 'ALL';
  const hasAddressFilter = addressFilter.length;

  if (hasEnergyTypeFilter && hasAddressFilter) {
    return `No ${capitalize(
      energyTypeFilter
    )} accounts found matching "${addressFilter}"!`;
  }
  if (hasAddressFilter) {
    return `No accounts found matching "${addressFilter}"!`;
  }
  if (hasEnergyTypeFilter) {
    return `No ${capitalize(energyTypeFilter)} accounts found!`;
  }

  return 'No energy accounts found!';
};
