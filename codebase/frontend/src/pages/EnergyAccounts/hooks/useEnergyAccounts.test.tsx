import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import {useQuery} from '@apollo/client/react';
import { useEnergyAccounts } from './useEnergyAccounts';

vi.mock('@apollo/client/react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    useQuery: vi.fn(),
  };
});


const mockUseQuery = useQuery as unknown as ReturnType<typeof vi.fn>

const mockAccounts = [
  { id: 'A1', type: 'ELECTRICITY', address: '1 Main St', balance: 10 },
  { id: 'A2', type: 'GAS', address: '22 Elm Street', balance: 20 },
  { id: 'A3', type: 'ELECTRICITY', address: '99 Harbor Road', balance: 0 },
];

describe('useEnergyAccounts', () => {
  it('returns loading state', () => {
    mockUseQuery.mockReturnValue({
      loading: true,
      error: undefined,
      data: undefined,
    });

    const { result } = renderHook(() => useEnergyAccounts({}));
    expect(result.current.loading).toBe(true);
    expect(result.current.energyAccounts).toEqual([]);
    expect(result.current.noAccountsFoundMessage).toBeUndefined();
  });

  it('returns error state', () => {
    const err = new Error('boom');
    mockUseQuery.mockReturnValue({
      loading: false,
      error: err,
      data: undefined,
    });

    const { result } = renderHook(() => useEnergyAccounts({}));
    expect(result.current.error).toBe(err);
  });

  it('filters by energy type', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { getEnergyAccounts: mockAccounts },
    });

    const { result } = renderHook(() =>
      useEnergyAccounts({ energyTypeFilter: 'ELECTRICITY' })
    );
    expect(result.current.energyAccounts.map((a) => a.id)).toEqual(['A1', 'A3']);
    expect(result.current.noAccountsFoundMessage).toBeUndefined();
  });

  it('filters by address substring (case-insensitive)', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { getEnergyAccounts: mockAccounts },
    });

    const { result } = renderHook(() =>
      useEnergyAccounts({ addressFilter: 'elm' })
    );
    expect(result.current.energyAccounts.map((a) => a.id)).toEqual(['A2']);
    expect(result.current.noAccountsFoundMessage).toBeUndefined();
  });

  it('produces correct message: no results with both filters', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { getEnergyAccounts: mockAccounts },
    });

    const { result } = renderHook(() =>
      useEnergyAccounts({ energyTypeFilter: 'GAS', addressFilter: 'Main' })
    );
    expect(result.current.energyAccounts).toEqual([]);
    expect(result.current.noAccountsFoundMessage).toBe(
      'No Gas accounts found matching "Main"!'
    );
  });

  it('produces correct message: no results with address filter only', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { getEnergyAccounts: mockAccounts },
    });

    const { result } = renderHook(() =>
      useEnergyAccounts({ addressFilter: 'Unknown' })
    );
    expect(result.current.energyAccounts).toEqual([]);
    expect(result.current.noAccountsFoundMessage).toBe(
      'No accounts found matching "Unknown"!'
    );
  });

  it('produces correct message: no results with type filter only', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { getEnergyAccounts: [] },
    });

    const { result } = renderHook(() =>
      useEnergyAccounts({ energyTypeFilter: 'GAS' })
    );
    expect(result.current.energyAccounts).toEqual([]);
    expect(result.current.noAccountsFoundMessage).toBe('No Gas accounts found!');
  });

  it('produces correct message: no results with no filters', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { getEnergyAccounts: [] },
    });

    const { result } = renderHook(() => useEnergyAccounts({}));
    expect(result.current.energyAccounts).toEqual([]);
    expect(result.current.noAccountsFoundMessage).toBe('No energy accounts found!');
  });
});


