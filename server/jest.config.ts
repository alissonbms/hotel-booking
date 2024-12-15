import type { Config } from "jest";

import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: "<rootDir>/",
});

const config: Config = {
  // Use ts-jest preset for testing TypeScript files with Jest
  preset: "ts-jest",

  // Set the test environment to Node.js
  testEnvironment: "node",

  // Define the root directory for tests and modules
  roots: ["<rootDir>/"],

  // Regular expression to find test files
  testRegex: "((\\.|/)(test|spec))\\.tsx?$",

  // File extensions to recognize in module resolution
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  moduleNameMapper: {
    ...paths,
  },
};

export default config;
