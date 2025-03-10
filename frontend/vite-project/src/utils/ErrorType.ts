


export class ApiError extends Error {
  /**
   * @param {number} status - The HTTP status code associated with the error.
   * @param {string} message - The error message.
   */
  constructor(public status: number, public message: string) {
    super(message);
    this.name = "ApiError";
  }
}

