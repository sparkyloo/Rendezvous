import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

const defaultState = {
  message: "",
  reasons: [],
};

export function useErrorHandling() {
  const history = useHistory();
  const [errors, setErrors] = useState(defaultState);

  const redirectWhenError = useCallback((err) => {
    let status = 500;

    if (err && err.status) {
      status = err.status;
    }

    history.push(`/${status}`);
  }, []);

  const gatherErrors = useCallback(async (res) => {
    if (
      res &&
      res.status &&
      res.status >= 400 &&
      typeof res.json === "function"
    ) {
      try {
        let data = await res.json();

        if (data) {
          if (data.data) {
            data = data.data;
          }

          const { message, errors = [] } = data;

          setErrors({
            message,
            reasons: Object.values(errors),
          });
        }
      } catch (err) {
        console.error("Something went wrong while parsing a json response", {
          err,
          res,
        });
      }
    }
  }, []);

  const clearErrors = useCallback(() => {
    setErrors(defaultState);
  }, []);

  return {
    redirectWhenError,
    gatherErrors,
    clearErrors,
    setErrors,
    errors,
  };
}
