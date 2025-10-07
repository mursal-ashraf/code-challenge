interface BaseAccount {
  id: string;
  address: string;
  balance: number;
  charges: Charge[];
}

export interface Charge {
  id: string;
  accountId: string;
  date: string;
  amount: number;
}

interface ElectricityAccount extends BaseAccount {
  type: 'ELECTRICITY';
  meterNumber: string;
}

interface GasAccount extends BaseAccount {
  type: 'GAS';
  volume: number;
}

export type EnergyAccount = ElectricityAccount | GasAccount;
