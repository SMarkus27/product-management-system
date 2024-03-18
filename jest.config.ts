
import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: ["**/**/*.spec.ts"],

  moduleNameMapper: {
    "@application/(.*)$": ["<rootDir>src/application/$1"],
    "@controllers/(.*)$": ["<rootDir>src/controllers/$1"],
    "@domain/(.*)$": ["<rootDir>src/domain/$1"],
    "@infra/(.*)$": ["<rootDir>src/infra/$1"],
  }
};

export default config;
