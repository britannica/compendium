import { useEffect, useState } from 'react';

export default function useForm(callback, validationSchema) {
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
    }
    catch (validationErrors) {
      setValidationError(validationErrors);
    }

    setHasSubmitted(true);
  };

  const handleChange = (event) => {
    event.persist();

    return setValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }));
  };

  const setValuesCallback = passedValues => setValues(validationSchema.cast(passedValues));

  return {
    handleChange,
    handleSubmit,
    setValues: setValuesCallback,
    validationError,
    values: validationSchema.cast(values),
    isValid: validationSchema.isValidSync(values),
  };
}
