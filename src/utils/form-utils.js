/**
 * Map a `yup` ValidationError object to individual form fields
 * e.g.
 * {
 *   field1: [
 *     'Error message 1',
 *     'Error message 2',
 *   ],
 *   field2: [
 *     'Error message 3',
 *   ],
 * }
 *
 * @param {ValidationError} validationError
 * @returns {object}
 */

const mapValidationErrorToFormFields = validationError => {
  if (!validationError.inner) {
    return {};
  }

  const errors = {};

  validationError.inner.forEach(error => {
    if (!errors[error.params.path]) {
      errors[error.params.path] = [];
    }

    errors[error.params.path].push(error.message);
  });

  return errors;
};

export { mapValidationErrorToFormFields };
