module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src/"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  // testPathIgnorePatterns: ["/node_modules/", "/dist/", "/src/test.ts"],
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/",
    "^@env/(.*)$": "<rootDir>/src/environments/",
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\\\.mjs$)"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
    },
  },

  moduleFileExtensions: ["ts", "html", "js", "json"],
  collectCoverage: true,
  coverageReporters: ["html"],
  coverageDirectory: "coverage/my-app",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
  },
};
