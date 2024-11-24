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
  };