import IConfig from '../src/common/interfaces/config/IConfig';

const defaultConfig: IConfig = {
    appName: 'sports-manager-api',
    port: 4000,
    host: 'localhost',
    mongo: {
        uri: 'mongodb://localhost:27017/sportmanager-dev'
    }
}

export default defaultConfig;