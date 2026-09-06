/**
 * Returns the process-wide engine registry, creating it on first access.
 * Members are populated lazily by the subsystems that own them.
 * @returns {PhaserRegistryState} The engine registry.
 */
export const getRegistry = (): PhaserRegistryState => {
  globalThis.PhaserRegistry ??= {} as PhaserRegistryState;
  return globalThis.PhaserRegistry;
};
