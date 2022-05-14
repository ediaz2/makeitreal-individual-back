/* eslint-disable no-unused-vars */
import { bold, cyan, dim, green, magenta, red, yellow } from 'colorette';
import { EOL } from 'node:os';
import { env, stdout } from 'node:process';
import { format } from 'node:util';

type Level = 'debug' | 'info' | 'warn' | 'error' | 'doc';

const levels = {
  debug: { color: cyan, emoji: '🐛' },
  info: { color: green, emoji: '🚀' },
  warn: { color: yellow, emoji: '⚠️' },
  error: { color: red, emoji: '❌' },
  doc: { color: magenta, emoji: '📝' },
};

const entry = (level: Level, scope?: string) => ({
  level: levels[level].emoji,
  scope: scope ? bold(levels[level].color(` [${scope.toUpperCase()}]`)) : '',
  timestamp: dim(
    `[${new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })}]`,
  ),
});

interface ILogger {
  debug: (scope: string, message: string) => void;
  info: (scope: string, message: string) => void;
  warn: (scope: string, message: string) => void;
  error: (scope: string, message: string) => void;
  doc: (scope: string, message: string) => void;
}

class Logger implements ILogger {
  debug(message: string, scope?: string) {
    this.#log('debug', message, scope);
  }

  info(message: string, scope?: string) {
    this.#log('info', message, scope);
  }

  warn(message: string, scope?: string) {
    this.#log('warn', message, scope);
  }

  error(message: string, scope?: string) {
    this.#log('error', message, scope);
  }

  doc(message: string, scope?: string) {
    this.#log('doc', message, scope);
  }

  // eslint-disable-next-line class-methods-use-this
  #log(level: Level, message: string | object, scope?: string) {
    const msg = entry(level, scope);

    if (typeof message === 'string') {
      const output = `${msg.timestamp} ${msg.level}${msg.scope} ${message}`;
      if (env.NODE_ENV !== 'test') {
        stdout.write(`${output}${EOL}`);
      }
    } else {
      const output = format.apply(null, [
        `${msg.timestamp} ${msg.level} ${msg.scope}${EOL} %O${EOL}`,
        message,
      ]);
      if (env.NODE_ENV !== 'test') {
        stdout.write(output);
      }
    }
  }
}

export const logger = new Logger();
