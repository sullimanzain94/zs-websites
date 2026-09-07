// Logger Utility
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logsDir = path.join(__dirname, '../logs');

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const LOG_LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
};

const COLORS = {
    error: '\x1b[31m',      // Red
    warn: '\x1b[33m',       // Yellow
    info: '\x1b[36m',       // Cyan
    debug: '\x1b[90m',      // Gray
    reset: '\x1b[0m'
};

class Logger {
    constructor() {
        this.level = LOG_LEVELS[process.env.LOG_LEVEL || 'info'];
    }

    formatTimestamp() {
        return new Date().toISOString();
    }

    formatMessage(level, message, data = {}) {
        const timestamp = this.formatTimestamp();
        return {
            timestamp,
            level,
            message,
            ...data,
            env: process.env.NODE_ENV || 'development'
        };
    }

    writeLog(level, message, data = {}) {
        if (LOG_LEVELS[level] > this.level) return;

        const logEntry = this.formatMessage(level, message, data);
        const logString = JSON.stringify(logEntry);

        // Console output with color
        const color = COLORS[level];
        console.log(`${color}[${logEntry.timestamp}] [${level.toUpperCase()}]${COLORS.reset} ${message}`);
        if (Object.keys(data).length > 0) {
            console.log(`${color}Details:${COLORS.reset}`, data);
        }

        // File output
        const logFile = path.join(logsDir, `${level}.log`);
        fs.appendFileSync(logFile, logString + '\n');

        // Also append to combined log
        const combinedLogFile = path.join(logsDir, 'combined.log');
        fs.appendFileSync(combinedLogFile, logString + '\n');
    }

    error(message, data) {
        this.writeLog('error', message, data);
    }

    warn(message, data) {
        this.writeLog('warn', message, data);
    }

    info(message, data) {
        this.writeLog('info', message, data);
    }

    debug(message, data) {
        this.writeLog('debug', message, data);
    }
}

export const logger = new Logger();
export default logger;
