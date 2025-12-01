import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',

  testEnvironment: 'jest-environment-jsdom',

  roots: ['<rootDir>/src'],

  moduleDirectories: ['node_modules', 'src'],

  moduleNameMapper: {
    // Handle svg?react imports
    '\\.svg\\?react$': '<rootDir>/__mocks__/svgMock.tsx',

    '@/(.*)$': '<rootDir>/src/$1',

    '\\.(scss|css)$': 'identity-obj-proxy',

    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js'
  },

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json'
      }
    ]
  }
};

export default config;
