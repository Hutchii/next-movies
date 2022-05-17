import { useState, useCallback, useRef } from "react";

function useForm(formObj) {
  const [form, setForm] = useState(formObj);
  const [isSending, setIsSending] = useState(false);
  const [sendingStatus, setSendingStatus] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const recaptchaRef = useRef();

  function renderFormInputs() {
    return Object.values(form).map((r) => {
      // if (r.renderType === "captcha")
      //   return r.renderInput(recaptchaRef, onReCAPTCHAChange);
      if (r.renderType === "checkbox")
        return r.renderInput(onInputChange, r.value, r.isTouched, r.error, wasSubmitted);
      return r.renderInput(
        onInputChange,
        onBlurChange,
        r.value,
        r.isTouched,
        r.error,
        wasSubmitted
      );
    });
  }
  // const isInputFieldValid = useCallback((field) => {
  //   const isValid = field.validationRule(field.value);
  //   if (isValid) {
  //     field.errorMessage = isValid;
  //     return false;
  //   }
  //   return true;

  //   // if (!field.validationRule(field.value)) {
  //   //   field.errorMessage = field.validationRule.message;
  //   //   return false;
  //   // }
  //   // return true;
  // }, []);

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
      inputObj.error = inputObj.validationRule(inputObj.value);
      setForm({ ...form, [name]: inputObj });
    },
    [form]
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSendingStatus("");
      setWasSubmitted(true);
      let isValid = true;
      let formValues = {};
      for (const [key, value] of Object.entries(form)) {
        if (value.optional || value.renderType === "captcha") continue;
        if (value.error) {
          isValid = false;
          break;
        }
        formValues = { ...formValues, [key]: value.value };
        // setForm({ ...form, [key]: value });
      }
      if (isValid) {
        setIsSending(true);
        try {
          const res = await fetch("api/sendMail", {
            method: "post",
            body: JSON.stringify(formValues),
          });
          setWasSubmitted(false);
          setIsSending(false);
          if (res.status !== 200) throw new Error("Błąd");
          for (const [key, value] of Object.entries(form)) {
            if (value.optional || value.renderType === "captcha") continue;
            value.error = value.validationMessage;
            value.renderType === "checkbox"
            ? (value.value = !value.value)
            : (value.value = "");
            value.isTouched = false;
            setForm({ ...form, [key]: value });
          }
          setSendingStatus("success");
        } catch (error) {
          setSendingStatus("error");
        } finally {
          // recaptchaRef.current.reset();
        }
      }

      // recaptchaRef.current.execute();
      // let isValid = true;
      // let formValues = {};
      // for (const [key, value] of Object.entries(form)) {
      //   if (value.optional || value.renderType === "captcha") continue;
      //   console.log(value.valid);
      //   if (!value.valid) {
      //     value.errorMessage = value.validationRule.message;
      //     value.isTouched = true;
      //     isValid = false;
      //     setForm({ ...form, [key]: value });
      //   }
      //   formValues = { ...formValues, [key]: value.value };
      // }
      // if (isValid) {
      //   setIsSending(true);
      //   console.log("test2");
      //   try {
      //     const res = await fetch("api/sendMail", {
      //       method: "post",
      //       body: JSON.stringify(formValues),
      //     });
      //     setIsSending(false);
      //     if (res.status !== 200) throw new Error("Błąd");
      //     setSendingStatus("success");
      //   } catch (error) {
      //     setSendingStatus("error");
      //   } finally {
      //     recaptchaRef.current.reset();
      //   }
      // }
    },
    [form]
  );

  // const onReCAPTCHAChange = async (captchaCode) => {
  //   setSendingStatus("");
  //   let isValid = true;
  //   let formValues = {};
  //   for (const [key, value] of Object.entries(form)) {
  //     if (value.optional || value.renderType === "captcha") continue;
  //     if (!value.valid) {
  //       value.errorMessage = value.validationRule.message;
  //       value.isTouched = true;
  //       isValid = false;
  //       setForm({ ...form, [key]: value });
  //     }
  //     formValues = { ...formValues, [key]: value.value };
  //   }

  //   if (!captchaCode) {
  //     console.log("test");
  //     return;
  //   }
  //   if (isValid) {
  //     setIsSending(true);
  //     console.log("test2");
  //     try {
  //       const res = await fetch("api/sendMail", {
  //         method: "post",
  //         body: JSON.stringify(formValues),
  //       });
  //       setIsSending(false);
  //       if (res.status !== 200) throw new Error("Błąd");
  //       setSendingStatus("success");
  //     } catch (error) {
  //       setSendingStatus("error");
  //     } finally {
  //       recaptchaRef.current.reset();
  //     }
  //   }
  // };

  return { renderFormInputs, onSubmit, isSending, sendingStatus };
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
