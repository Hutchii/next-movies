import { useState, useCallback, useRef } from "react";

function useForm(formObj) {
  const [form, setForm] = useState(formObj);
  const [isSending, setIsSending] = useState(false);
  const [sendingStatus, setSendingStatus] = useState("");
  const recaptchaRef = useRef();

  function renderFormInputs() {
    return Object.values(form).map((r) => {
      if (r.renderType === "captcha") return r.renderInput(recaptchaRef);
      return r.renderInput(
        onInputChange,
        r.value,
        r.isTouched,
        r.error,
        sendingStatus,
        r.renderType === "checkbox" ? null : onBlurChange
      );
    });
  }
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
      console.log(inputObj);
      inputObj.error = inputObj.validationRule(
        inputObj.value,
        inputObj.defaultError
      );
      setForm({ ...form, [name]: inputObj });
    },
    [form]
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSendingStatus("submitted");
      let isValid = true;
      let formValues = {};
      for (const [key, value] of Object.entries(form)) {
        if (value.optional || value.renderType === "captcha") continue;
        if (value.error) {
          isValid = false;
          break;
        }
        formValues = { ...formValues, [key]: value.value };
      }
      const captchaCode = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      if (!captchaCode) {
        setSendingStatus("error");
        return;
      }
      if (isValid) {
        setIsSending(true);
        try {
          const res = await fetch("api/sendMail", {
            method: "post",
            body: JSON.stringify({ ...formValues, captcha: captchaCode }),
          });
          setIsSending(false);
          if (res.status !== 200) throw new Error("Something went wrong");
          for (const [key, value] of Object.entries(form)) {
            if (value.optional || value.renderType === "captcha") continue;
            value.error = value.defaultError;
            value.renderType === "checkbox"
              ? (value.value = false)
              : (value.value = "");
            value.isTouched = false;
            setForm({ ...form, [key]: value });
          }
          setSendingStatus("success");
        } catch (error) {
          setSendingStatus("error");
        }
      }
    },
    [form]
  );

  return { renderFormInputs, onSubmit, isSending, sendingStatus };
}

export default useForm;
