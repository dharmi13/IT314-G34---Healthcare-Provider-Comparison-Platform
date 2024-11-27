module.exports = {
    testEnvironment: "jsdom",
  
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // For CSS modules
      '\\.(svg)$': '<rootDir>/__mocks__/fileMock.js', // For SVG files
      '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // For image files
    },
  
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transpile JS/JSX files
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: 'coverage', // Output directory for coverage reports
  // collectCoverageFrom: [
  //   'pages/**/*.{js,jsx}',
  //   '!src/index.js', // Exclude specific files if needed
  //   '!src/serviceWorker.js', // Exclude service worker if applicable
  //   '!**/node_modules/**', // Exclude node_modules
  // ],
  // coverageReporters: [
  //   'text', // Output coverage summary in the terminal
  //   'html', // Generate an HTML report for viewing in the browser
  //   // 'lcov', // Uncomment if you want to generate lcov report as well
  // ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80, // Minimum coverage percentage for branches
  //     functions: 80, // Minimum coverage percentage for functions
  //     lines: 80, // Minimum coverage percentage for lines
  //     statements: 80, // Minimum coverage percentage for statements
  //   },
  // },
  // setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  };