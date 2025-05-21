import { FormattedFormFields } from "../types";

export const getValidationRules = (field: FormattedFormFields) => {
  return {
    required: field.required ? `${field.title} is required` : false,
    validate: {
      fieldValidation: (value: any) => {
        if (field.type === "select" && field.title.toLowerCase().includes("grad")) {
          return value ? true : "Please select your graduation year";
        } else if (field.type === "text") {
          if (typeof value !== "string" || value.trim() === "") {
            return "This field must be a valid string";
          }
        }
        return true;
      },
    },
    pattern: field.title.toLowerCase().includes("email")
      ? {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Please enter a valid email address",
        }
      : field.type === "text"
      ? {
          value: /^[A-Za-z\s]+$/,
          message: "Only alphabets are allowed",
        }
      : undefined,
  };
};
