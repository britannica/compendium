import { useEffect, useState } from 'react';

function useForm(callback, validationSchema) {
  const [values, setValues] = useState({});
  const [validationError, setValidationError] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted && typeof callback === 'function') {
      callback();

      setHasSubmitted(false);
    }
  }, [hasSubmitted, callback]);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    try {
      validationSchema.validateSync(values, { abortEarly: false });

      setValidationError(null);
    } catch (validationErrors) {
      setValidationError(validationErrors);
    }

    setHasSubmitted(true);
  };

  const handleChange = (event) => {
    event.persist();

    setValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    validationError,
    values: validationSchema.cast(values),
    isValid: validationSchema.isValidSync(values),
  };
}

export default useForm;
