import { useState, useCallback } from "react";

function useForm(formObj) {
  const [form, setForm] = useState(formObj);

  function renderFormInputs() {
    return Object.values(form).map((r) => {
      if (r.renderType === "checkbox")
        return r.renderInput(
          onInputChange,
          r.value,
          r.errorMessage,
          r.isTouched,
          r.valid
        );
      return r.renderInput(
        onInputChange,
        onBlurChange,
        r.value,
        r.errorMessage,
        r.isTouched,
        r.valid
      );
    });
  }
  const isInputFieldValid = useCallback(
    (el) => {
      for (const rule of el.validationRules) {
        if (!rule.validate(el.value, form)) {
          el.errorMessage = rule.message;
          return false;
        }
      }
      return true;
    },
    [form]
  );

  const onBlurChange = useCallback(
    (e) => {
      const { name } = e.target;
      const inputObj = form[name];
      inputObj.isTouched = true;
      setForm({ ...form, [name]: inputObj });
    },
    [form]
  );

  const onInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const inputObj = form[name];
      if (inputObj.renderType === "checkbox") {
        inputObj.isTouched = true;
        inputObj.value = !inputObj.value;
      } else {
        inputObj.value = value;
      }
      const isValidInput = isInputFieldValid(inputObj);
      if (isValidInput && !inputObj.valid) inputObj.valid = true;
      if (!isValidInput && inputObj.valid) inputObj.valid = false;
      setForm({ ...form, [name]: inputObj });
    },
    [form, isInputFieldValid]
  );

  const formData = useCallback(() => {
    let isValid = true;
    let formValues = {};
    for (const [key, value] of Object.entries(form)) {
      formValues = { ...formValues, [key]: value.value };
      if (value.optional) continue;
      if (!value.valid) isValid = false;
    }
    return { isValid, formValues };
  }, [form]);

  return { renderFormInputs, formData };
}

export default useForm;
