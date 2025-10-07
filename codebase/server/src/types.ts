import { Charges } from './datasources/charges';
import { EnergyAccounts } from './datasources/energyAccounts';

export interface Charge {
  id: string;
  accountId: string;
  date: string;
  amount: number;
}

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

export interface GraphGLContext {
  datasources: {
    energyAccounts: EnergyAccounts;
    charges: Charges;
  };
}
