import IMongoConnect from './IMongoConnect';

// Interface for default configuration
export default interface IConfig {
    appName: string;
    port: number;
    host: string;
    mongo: IMongoConnect;
}