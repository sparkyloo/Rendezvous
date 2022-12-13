import "./ErrorDisplay.css";
import React, { useMemo } from "react";

export default function ErrorDisplay({ errors }) {
  const hasErrors = useMemo(() => {
    if (!errors) {
      return false;
    } else {
      const { message, reasons = [] } = errors;

      if (message || reasons.length) {
        return true;
      }
    }
  }, [errors]);

  return !hasErrors ? null : (
    <div className="error-display">
      <p className="error-display-message">
        {errors.message || "Please fix the following"}
      </p>
      <ul>
        {errors.reasons.map((issue) => (
          <li key={issue} className="error-display-item">
            {issue}
          </li>
        ))}
      </ul>
    </div>
  );
}
