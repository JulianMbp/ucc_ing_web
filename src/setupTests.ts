// Este archivo extiende el entorno de prueba de Jest.

import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill para TextEncoder/TextDecoder
if (typeof global.TextEncoder === "undefined") {
  (global as any).TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  (global as any).TextDecoder = TextDecoder;
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({ // <-- Aquí se agrega ': string'
    matches: false, // Puedes cambiar a 'true' para simular el modo oscuro en tus tests.
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

Object.defineProperty(window, "localStorage", {
  value: (() => {
    // simple in-memory storage so tests can set/get values
    let store: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string) => (key in store ? store[key] : null)),
      setItem: jest.fn((key: string, value: string) => {
        store[String(key)] = String(value);
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      removeItem: jest.fn((key: string) => {
        delete store[String(key)];
      }),
    };
  })(),
  writable: true,
});

Object.defineProperty(document, "documentElement", {
  value: {
    classList: {
      toggle: jest.fn(),
      add: jest.fn(),
      remove: jest.fn(),
    },
  },
  writable: true,
});

Object.defineProperty(document, "dispatchEvent", {
  value: jest.fn(),
});