/**
 * CustomError
 */
class CustomError extends Error {
  constructor(code = 0, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.name = 'CustomError';
    this.code = code;
  }
}
export default CustomError;
