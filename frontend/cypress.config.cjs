const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);

      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    specPattern: [
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
      "cypress/e2e/**/*.feature",
      "cypress/e2e/**/*.{ts,tsx}",
    ],
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
