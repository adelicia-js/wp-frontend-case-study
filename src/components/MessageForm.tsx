import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "../utils/validation";
import type { MessageFormData } from "../utils/validation";
import useFormSubmit from "../hooks/useFormSubmit";
import { useState, useEffect } from "react";

export default function MessageForm() {
  const {
    submitForm,
    isSubmitting,
    isSuccess,
    errorMessage,
    successMessage,
    resetForm: resetSubmit,
  } = useFormSubmit();
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset: resetFormFields,
    watch,
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const messageValue = watch("message", "");

  useEffect(() => {
    setCharCount(messageValue.length);
  }, [messageValue]);

  const onSubmit = async (data: MessageFormData) => {
    await submitForm(data);
  };

  const handleReset = () => {
    resetFormFields();
    resetSubmit();
    setCharCount(0);
  };

  return (
    <section id="form-section">
      <form onSubmit={handleSubmit(onSubmit)} id="message-form">
        <h2 id="form-title">Message Submission</h2>

        <div>
          <label id="message-input-label" htmlFor="message">
            Got something to say?
          </label>
          <div id="message-input-box">
            <input
              {...register("message")}
              id="message"
              name="message"
              type="text"
              disabled={isSubmitting || isSuccess}
              placeholder="Enter your message"
            />
            <span id="char-counter">{charCount}/10</span>
          </div>

          {!errors.message && !isDirty && (
            <p id="generic-error">
              Enter 1-10 characters. Exclamation marks (!) are not allowed.
            </p>
          )}

          {errors.message && <p id="error-message">{errors.message.message}</p>}
        </div>

        {isSuccess && successMessage && (
          <div id="success-box">
            <p id="success-message">
              Success! Server responded with: {successMessage}
            </p>
          </div>
        )}

        {errorMessage && !isSuccess && (
          <div id="error-box">
            <p id="submission-error">{errorMessage}</p>
          </div>
        )}

        <div id="action-buttons-box">
          <button id="reset-button" type="button" onClick={handleReset}>
            Clear
          </button>
          <button
            id="submit-button"
            type="submit"
            disabled={isSubmitting || !isDirty || isSuccess}
          >
            {isSubmitting
              ? "Submitting..."
              : isSuccess
              ? "Submitted"
              : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
