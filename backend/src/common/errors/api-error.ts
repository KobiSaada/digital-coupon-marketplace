export enum ErrorCode {
  // Product errors
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  PRODUCT_ALREADY_SOLD = 'PRODUCT_ALREADY_SOLD',

  // Pricing errors
  RESELLER_PRICE_TOO_LOW = 'RESELLER_PRICE_TOO_LOW',
  INVALID_PRICING = 'INVALID_PRICING',

  // Auth errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_TOKEN = 'INVALID_TOKEN',

  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',

  // Server errors
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export class ApiError extends Error {
  constructor(
    public readonly errorCode: ErrorCode,
    public readonly message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
