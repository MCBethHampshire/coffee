import "@testing-library/jest-dom";
import { server } from "./mocks/server";
import "whatwg-fetch";

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

