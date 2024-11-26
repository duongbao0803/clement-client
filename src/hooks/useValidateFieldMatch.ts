import { FormInstance } from "antd";

export const useValidateFieldsMatch = (form: FormInstance) => {
  const validateFieldsMatch = (fieldKey: string, errorMessage: string) => {
    return (_: unknown, value: string) => {
      const fieldValue = form.getFieldValue(fieldKey);
      if (value && fieldValue && value !== fieldValue) {
        return Promise.reject(new Error(errorMessage));
      }
      return Promise.resolve();
    };
  };

  return { validateFieldsMatch };
};
