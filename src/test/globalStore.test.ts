import { describe, it, expect, beforeEach } from 'vitest';
import { useGlobalStore, globalStore } from '../store/globalStore';

describe('useGlobalStore (Global Loading Store)', () => {
  beforeEach(() => {
    globalStore.clearLoading();
  });

  it('initializes with empty loading states and isGlobalLoading false', () => {
    const state = useGlobalStore.getState();
    expect(state.loadingStates).toEqual({});
    expect(state.isGlobalLoading).toBe(false);
    expect(globalStore.isLoading()).toBe(false);
  });

  it('sets loading for a specific service using tuple [service, true]', () => {
    globalStore.setLoading(['PRODUCT_BY_SLUG', true]);

    const state = useGlobalStore.getState();
    expect(state.loadingStates['PRODUCT_BY_SLUG']).toBe(true);
    expect(state.isGlobalLoading).toBe(true);
    expect(globalStore.isLoading('PRODUCT_BY_SLUG')).toBe(true);
    expect(globalStore.isLoading('OTHER_SERVICE')).toBe(false);
    expect(globalStore.isLoading()).toBe(true);
  });

  it('clears loading for a specific service using tuple [service, false]', () => {
    globalStore.setLoading(['PRODUCT_BY_SLUG', true]);
    expect(globalStore.isLoading('PRODUCT_BY_SLUG')).toBe(true);

    globalStore.setLoading(['PRODUCT_BY_SLUG', false]);
    expect(globalStore.isLoading('PRODUCT_BY_SLUG')).toBe(false);
    expect(globalStore.isLoading()).toBe(false);
  });

  it('tracks concurrent loading services correctly', () => {
    globalStore.setLoading(['CLINICS', true]);
    globalStore.setLoading(['DOCTORS', true]);

    expect(globalStore.isLoading('CLINICS')).toBe(true);
    expect(globalStore.isLoading('DOCTORS')).toBe(true);
    expect(globalStore.isLoading()).toBe(true);

    // One finishes
    globalStore.setLoading(['CLINICS', false]);
    expect(globalStore.isLoading('CLINICS')).toBe(false);
    expect(globalStore.isLoading('DOCTORS')).toBe(true);
    expect(globalStore.isLoading()).toBe(true); // Still true because DOCTORS is loading

    // Second finishes
    globalStore.setLoading(['DOCTORS', false]);
    expect(globalStore.isLoading('DOCTORS')).toBe(false);
    expect(globalStore.isLoading()).toBe(false);
  });

  it('allows setting global boolean loading directly', () => {
    globalStore.setLoading(true);
    expect(globalStore.isLoading()).toBe(true);

    globalStore.setLoading(false);
    expect(globalStore.isLoading()).toBe(false);
  });

  it('clears all active loadings on clearLoading()', () => {
    globalStore.setLoading(['SERVICE_A', true]);
    globalStore.setLoading(['SERVICE_B', true]);
    expect(globalStore.isLoading()).toBe(true);

    globalStore.clearLoading();
    expect(globalStore.isLoading('SERVICE_A')).toBe(false);
    expect(globalStore.isLoading('SERVICE_B')).toBe(false);
    expect(globalStore.isLoading()).toBe(false);
  });
});
