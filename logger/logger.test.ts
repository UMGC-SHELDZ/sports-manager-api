import pino, { Logger } from 'pino';
import pinoLogger from './logger';

describe('PINO LOGGER TESTS', () => {
    it('pinoLogger should be instantiated', () => {
        const logger: Logger = pinoLogger();
        expect(logger).toBeDefined();
    });
});