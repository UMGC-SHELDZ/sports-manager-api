import IConfig from '../src/common/interfaces/config/IConfig';

// Mongo URI string variables for login
const dbUser: string | undefined = process.env.DBUSER;
const dbPasswd: string | undefined = process.env.DBPASSWD;

const prodConfig: IConfig = {
    appName: 'sports-manager-api',
    port: 4000,
    host: 'localhost',
    mongo: {
        uri: `mongodb://${dbUser}:${dbPasswd}@localhost:27017/sportmanager`
    }
}

export default prodConfig;