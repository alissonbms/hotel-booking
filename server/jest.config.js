module.exports = {
  // Use ts-jest preset for testing TypeScript files with Jest
  preset: "ts-jest",
  // Set the test environment to Node.js
  testEnvironment: "node",

  // Define the root directory for tests and modules
  roots: ["<rootDir>/tests"],

  // Use ts-jest to transform TypeScript files
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

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
};
