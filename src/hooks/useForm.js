import { useState, useCallback } from "react";

function useForm(formObj) {
  const [form, setForm] = useState(formObj);
  const [isSending, setIsSending] = useState(false);
  const [sendingStatus, setSendingStatus] = useState("");

  function renderFormInputs() {
    return Object.values(form).map((r) => {
      if (r.renderType === "checkbox")
        return r.renderInput(onInputChange, r.value, r.isTouched, r.valid, r.errorMessage);
      return r.renderInput(
        onInputChange,
        onBlurChange,
        r.value,
        r.isTouched,
        r.valid,
        r.errorMessage
      );
    });
  }
  const isInputFieldValid = useCallback((field) => {
    if (!field.validationRule.validate(field.value)) {
      console.log(field.errorMessage);
      field.errorMessage = field.validationRule.message;
      return false;
    }
    return true;
  }, []);

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
      setSendingStatus("");
      let isValid = true;
      let formValues = {};
      for (const [key, value] of Object.entries(form)) {
        if (value.optional) continue;
        if (!value.valid) {
          value.errorMessage = value.validationRule.message;
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
          setIsSending(false);
          if (res.status !== 200) throw new Error("błą");
          setSendingStatus("success");
        } catch (error) {
          setSendingStatus("error");
        }
      }
    },
    [form]
  );
  return { renderFormInputs, formData, isSending, sendingStatus };
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
