module.exports = {
  default: {
    requireModule: [],
    require: ['tests/bdd/support/**/*.js', 'tests/bdd/steps/**/*.js'],
    paths: ['tests/bdd/features/**/*.feature'],
    format: [
      'progress',
      'summary',
      'json:tests/bdd/cucumber-report.json',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      resultsDir: 'tests/bdd/.allure-results'
    },
    publishQuiet: true
  }
};
