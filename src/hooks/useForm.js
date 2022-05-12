import { useState, useCallback } from "react";

function useForm(formObj) {
  const [form, setForm] = useState(formObj);
  const [isSending, setIsSending] = useState(false);

  function renderFormInputs() {
    return Object.values(form).map((r) => {
      if (r.renderType === "checkbox")
        return r.renderInput(onInputChange, r.value, r.isTouched, r.valid);
      return r.renderInput(
        onInputChange,
        onBlurChange,
        r.value,
        r.isTouched,
        r.valid
      );
    });
  }
  const isInputFieldValid = useCallback(
    (el) => {
      for (const rule of el.validationRules) {
        if (!rule.validate(el.value, form)) return false;
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

  const formData = useCallback(
    async (e) => {
      e.preventDefault();
      let isValid = true;
      let formValues = {};
      for (const [key, value] of Object.entries(form)) {
        if (value.optional) continue;
        if (!value.valid) {
          value.isTouched = true;
          isValid = false;
          setForm({ ...form, [key]: value });
        }
        formValues = { ...formValues, [key]: value.value };
      }
      if (isValid) {
        setIsSending(true);
        try {
          const res = await fetch("api/sendMail", {
            method: "post",
            body: JSON.stringify(formValues),
          });
          console.log("cxzzcxzx");
          console.log(res.status);
          setIsSending(false);
        } catch (error) {
          console.log(error);
          console.log("ERROR");
        }
      }
    },
    [form]
  );
  console.log(isSending);
  return { renderFormInputs, formData };
}

export default useForm;

// const isValidInput = isInputFieldValid(value);
// if (value.optional) continue;
// if (isValidInput && !value.valid) {
//   value.valid = true;
// }
// if (!isValidInput) {
//   isValid = false;
// }
