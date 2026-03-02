import { beforeEach, vi } from 'vitest';

class LocalStorageMock {
    private store: Map<string, string> = new Map();

    clear() {
        this.store.clear();
    }

    getItem(key: string) {
        return this.store.get(key) || null;
    }

    setItem(key: string, value: string) {
        this.store.set(key, value);
    }

    removeItem(key: string) {
        this.store.delete(key);
    }

    get length() {
        return this.store.size;
    }

    key(index: number) {
        return Array.from(this.store.keys())[index] || null;
    }
}

Object.defineProperty(window, 'localStorage', {
    value: new LocalStorageMock(),
    writable: true,
});

beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
});
