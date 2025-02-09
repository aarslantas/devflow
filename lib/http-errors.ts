export class RequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;
  constructor(
    message: string,
    statusCode: number,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.errors = errors;
    this.name = "RequestError";
    this.statusCode = statusCode;
  }
}

export class ValidationError extends RequestError {
  constructor(errors: Record<string, string[]>) {
    const message =
      ValidationError.formatFieldErrors(errors);
    super(message, 400, errors);
    this.name = "ValidationError";
    this.errors = errors;
  }

  static formatFieldErrors(
    errors: Record<string, string[]>
  ): string {
    const formattedMessages = Object.entries(
      errors
    ).map(([field, messages]) => {
      const fieldName =
        field.charAt(0).toUpperCase() +
        field.slice(1);

      if (messages[0] === "Required") {
        return `${fieldName} is required`;
      } else {
        return messages.join(" and ");
      }
    });
    return formattedMessages.join(", ");
  }
}
