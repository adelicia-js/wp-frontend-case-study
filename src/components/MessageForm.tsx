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
    <section
      id="form-section"
      className="min-h-screen items-center justify-center flex"
    >
      <form onSubmit={handleSubmit(onSubmit)} id="message-form" className="">
        <h2 id="form-title" className="lg:text-4xl">
          Message Submission
        </h2>

        <div className="flex items-baseline flex-col gap-4">
          <label id="message-input-label" htmlFor="message" className="">
            Got something to say?
          </label>
          <div
            id="message-input-box"
            className="flex justify-center items-center gap-2"
          >
            <input
              {...register("message")}
              id="message"
              name="message"
              type="text"
              disabled={isSubmitting || isSuccess}
              placeholder="Enter your message"
              className="border border-gray-300 rounded px-2 py-1"
            />

            <span id="char-counter">{charCount}/10</span>
          </div>

          {!errors.message && !isDirty && (
            <p id="generic-error" className="">
              Enter 1-10 characters. Exclamation marks (!) are not allowed.
            </p>
          )}

          {errors.message && (
            <p id="error-message" className="">
              {errors.message.message}
            </p>
          )}
        </div>

        {isSuccess && successMessage && (
          <div id="success-box" className="">
            <p id="success-message" className="">
              Success! Server responded with: {successMessage}
            </p>
          </div>
        )}

        {errorMessage && !isSuccess && (
          <div id="error-box" className="">
            <p id="submission-error" className="">
              {errorMessage}
            </p>
          </div>
        )}

        <div id="action-buttons-box" className="mt-4 flex gap-2">
          <button
            id="reset-button"
            type="button"
            onClick={handleReset}
            className="border border-gray-300 rounded px-2 py-1"
          >
            Clear
          </button>
          <button
            id="submit-button"
            type="submit"
            disabled={isSubmitting || !isDirty || isSuccess}
            className="border border-gray-300 rounded px-2 py-1"
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
