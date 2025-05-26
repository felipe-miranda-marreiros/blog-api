import { Logger } from '@/Application/Contracts/Logger/Logger'
import { AsyncLocalStorage } from 'node:async_hooks'
import pino, { Logger as PinnoLoger } from 'pino'

export const baseLogger = pino({
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  redact: {
    paths: ['password']
  }
})

export const requestContext = new AsyncLocalStorage<Map<string, PinnoLoger>>()

export const loggerProxy = new Proxy(baseLogger, {
  get(target, property, receiver) {
    const storeLogger = requestContext.getStore()?.get('logger') || baseLogger
    return Reflect.get(storeLogger, property, receiver)
  }
})

export const logger: Logger = {
  debug: function (message: string, ...meta: any[]): void {
    loggerProxy.debug(meta, message)
  },
  info: function (message: string, ...meta: any[]): void {
    loggerProxy.info(meta, message)
  },
  warn: function (message: string, ...meta: any[]): void {
    loggerProxy.warn(meta, message)
  },
  error: function (message: string, ...meta: any[]): void {
    loggerProxy.error(meta, message)
  }
}
