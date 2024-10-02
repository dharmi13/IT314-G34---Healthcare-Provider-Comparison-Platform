const errorCodes = {
  SUCCESS: {code: 200, message: 'Success'},
  CREATED: {code: 201, message: 'Resource created successfully'},
  UNAUTHORIZED: {code: 401, message: 'Unauthorized'},
  NOT_FOUND: {code: 404, message: 'Resource not found'},
  VALIDATION_ERROR: {code: 422, message: 'Validation Error'},
  INTERNAL_SERVER_ERROR: {code: 500, message: 'Internal Server Error'}
};

export default errorCodes;