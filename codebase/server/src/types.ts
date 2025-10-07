import { Charges } from './datasources/charges';
import { EnergyAccounts } from './datasources/energyAccounts';

export interface Charge {
  id: string;
  accountId: string;
  date: string;
  amount: number;
}

interface BaseAccount {
  id: string;
  address: string;
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

export interface GraphGLContext {
  datasources: {
    energyAccounts: EnergyAccounts;
    charges: Charges;
  };
}
