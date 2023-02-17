class HttpErrors extends Error {
  constructor(message, errorCode) {
    super(message);
    this.message = message;
    this.code = errorCode;
  }
}
module.exports = HttpErrors;