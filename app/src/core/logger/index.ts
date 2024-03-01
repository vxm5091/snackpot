import { InteractionManager } from 'react-native';
import {
  configLoggerType,
  consoleTransport,
  logger,
} from 'react-native-logs';

const config: configLoggerType = {
  transport: [consoleTransport],
  enabled: true,
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  transportOptions: {
    colors: {
      debug: 'blue',
      info: 'white',
      warn: 'yellow',
      error: 'red',
    },
  },
  async: !__DEV__,
  asyncFunc: __DEV__ ? undefined :  InteractionManager.runAfterInteractions,
  printDate: true,
  printLevel: true,
  severity: __DEV__ ? 'debug' : 'info',
};

declare global {}

export type TLogSeverity = 'debug' | 'info' | 'warn' | 'error';


const baseLogger = logger.createLogger<TLogSeverity>(config);
export const Logger = baseLogger.extend('app');

export default Logger;
