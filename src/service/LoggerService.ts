class LoggerService {
  error = (arg: string) => {
    console.error("\x1b[31m%s\x1b[0m'", '[ERROR] ' + arg);
  }
}

const Logger = new LoggerService();

export default Logger;