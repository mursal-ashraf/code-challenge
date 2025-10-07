interface BaseAccount {
  id: string;
  address: string;
  balance: number;
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
