export default {
  testEnvironment: "jsdom",
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
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
};
