export const logMessages = {
    start: (name: string) => `[${name}] Starting to load chunk...`,
    success: (name: string, time: string) => `[${name}] Chunk loaded in ${time}ms`,
    exports: (name: string) => `[${name}] Module exports:`,
    error: (name: string) => `[${name}] Failed to load:`,
} as const;
