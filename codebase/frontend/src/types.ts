interface ElectricityAccount {
  id: string;
  type: 'ELECTRICITY';
  address: string;
  meterNumber: string;
}

interface GasAccount {
  id: string;
  type: 'GAS';
  address: string;
  volume: number;
}

export type EnergyAccount = ElectricityAccount | GasAccount;
