export default {
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.{ts,tsx}"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "@/(.*)$": "<rootDir>/src/$1",
  },
  setupFiles: ["<rootDir>/setupJest.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/__tests__/*.{ts,tsx}"],
};
