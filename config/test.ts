import IConfig from '../src/common/interfaces/config/IConfig';

// Config for non-production application
const testConfig: IConfig = {
    appName: 'sports-manager-api',
    port: 4000,
    host: 'localhost',
    pino: {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    }
}

export default testConfig;