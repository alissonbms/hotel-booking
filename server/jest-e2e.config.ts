import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: "<rootDir>/",
});

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  preset: "ts-jest",
  moduleNameMapper: {
    ...paths,
  },
};

export default config;
