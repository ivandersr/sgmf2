class AppError {
  statusCode: number;

  description: string;

  constructor(statusCode: number = 400, description: string) {
    this.statusCode = statusCode;
    this.description = description;
  }
}

export default AppError;
