class ApiResponse {
  constructor(statusCode, message, info = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.info = info;
    this.success = statusCode < 400;
  }
}

module.exports = { ApiResponse };
