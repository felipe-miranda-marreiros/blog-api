import config from './jest.config'
config.testMatch = ['**/*.spec.ts']
config.coverageDirectory = './coverage/unit'
module.exports = config
