import chalk from "chalk";

function getDate() {
	const date = new Date();
	
	const timeStr = [
		String(date.getHours()).padStart(2, "0"), 
		String(date.getMinutes()).padStart(2, "0"),
		String(date.getSeconds()).padStart(2, "0")
	].join(":");

	const dateStr = [
		String(date.getFullYear()).padStart(2, "0"),
		String(date.getMonth()).padStart(2, "0"),
		String(date.getDate()).padStart(2, "0")
	].join("/");

	return `${dateStr} ${timeStr}`;
}

const warning = chalk.hex('#FFA500');
const bgWarning = chalk.bgHex('#FFA500').whiteBright;

enum LoggerType {
	Info = 1,
	Warn = 2,
	Error = 3
}

class Logger {
	private context: string;

	public constructor(context: string) {
		this.context = context.toUpperCase();
	}

	public info(...messages: any[]): void {
		this.logInformation(LoggerType.Info, ...messages);
	}

	public warn(...messages: any[]): void {
		this.logInformation(LoggerType.Warn, ...messages);
	}

	public error(...messages: any[]): void {
		this.logInformation(LoggerType.Error, ...messages);
	}

	private logInformation(type: LoggerType, ...messages: any[]): void {
		switch (type) {
			case LoggerType.Info: {
				console.log(chalk.gray(getDate()), chalk.green(this.context), chalk.bgGreenBright(" INFO "), ...messages);
				return;
			}
			case LoggerType.Warn: {
				console.warn(chalk.gray(getDate()), warning(this.context), bgWarning(" WARN "), ...messages);
				return;
			}
			case LoggerType.Error: {
				console.error(chalk.gray(getDate()), chalk.red(this.context), chalk.bgRedBright(" ERROR "), ...messages);
				return;
			}
		}
	}
}

export const systemLogger = new Logger("system");