class LoggerService {
  error = (arg: string) => {
    console.error("\x1b[31m%s\x1b[0m'", '[ERROR] ' + arg);
  }

  success = (arg: string) => {
    console.info("\x1b[32m%s\x1b[0m'", '[SUCCESS] ' + arg);
  }
}

const Logger = new LoggerService();

export default Logger;