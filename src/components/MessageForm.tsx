import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "../utils/validation";
import type { MessageFormData } from "../utils/validation";
import useFormSubmit from "../hooks/useFormSubmit";
import { useState, useEffect } from "react";
import leftWingImage from "../assets/left-wing.svg";
import rightWingImage from "../assets/right-wing.svg";

export default function MessageForm() {
  const {
    submitForm,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    successMessage,
    resetForm: resetSubmit,
  } = useFormSubmit();
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitted },
    reset: resetFormFields,
    watch,
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    mode: "onChange",
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
      className="relative min-h-screen items-center justify-center flex overflow-hidden"
    >
      <div
        className={`relative ${
          isFocused ? "animate-focus-glow" : "animate-float"
        } `}
      >
        <img
          src={leftWingImage}
          alt="Left Wing"
          className="hidden md:block absolute top-[30%] md:-left-24 lg:-left-32 w-28 md:w-32 lg:w-40 h-28 md:h-32 lg:h-40 opacity-30 md:opacity-40 lg:opacity-50 z-0 animate-flutter-left invert scale-y-75"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          id="message-form"
          className={`relative backdrop-blur-md bg-blue-200/20 sm:bg-blue-200/40 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl sm:shadow-2xl z-10 mx-4 sm:mx-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none ${
            isFocused ? "outline" : ""
          } outline-offset-2 outline-white/20 `}
        >
          <h2
            id="form-title"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white"
          >
            Got something to say?
          </h2>

          <div className="flex items-baseline flex-col gap-4 sm:gap-3 lg:gap-4">
            <label
              id="message-input-label"
              htmlFor="message"
              className="text-white/70 text-xs sm:text-base"
            >
              Send a message to us.
            </label>
            <div
              id="message-input-box"
              className="relative flex justify-center items-center gap-2 w-full"
            >
              <input
                {...register("message")}
                id="message"
                name="message"
                type="text"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isSubmitting || isSuccess || isSubmitted}
                placeholder="Enter your message here"
                className="backdrop-blur-sm bg-white/10 disabled:opacity-50 border border-white/30 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 placeholder-white/60 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-white/30 disabled:cursor-not-allowed flex-1 max-w-full min-w-0"
              />

              <span
                id="char-counter"
                className={`sm:absolute right-0 -bottom-5
                  ${
                  charCount > 10
                    ? "text-red-600/50 font-semibold"
                    : charCount > 0
                    ? "text-white/70"
                    : "text-white/30"
                } text-xs whitespace-nowrap`}
              >
                {charCount}/10
              </span>
            </div>

            {!errors.message && !isDirty && !isValid && (
              <p
                id="generic-error"
                className="-mb-2 sm:mt-2 text-white/80 text-xs sm:text-sm underline underline-offset-4 decoration-dotted decoration-white/40"
              >
                <span className="block lg:inline">Enter 1-10 characters. </span>
                <span className="block lg:inline">
                  Exclamation marks (!) are not allowed.
                </span>
              </p>
            )}

            {errors.message && (
              <p
                id="error-message"
                className="text-red-600/50 text-xs sm:text-sm font-semibold -mb-2"
              >
                {errors.message.message}
              </p>
            )}
          </div>

          <div
            id="action-buttons-box"
            className="mt-6 sm:mt-4 flex flex-col sm:flex-row gap-2 w-full"
          >
            <div className="flex flex-row gap-2">
              <button
                id="reset-button"
                type="button"
                onClick={handleReset}
                className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 cursor-pointer flex-1 sm:flex-none"
              >
                Clear
              </button>
              <button
                id="submit-button"
                type="submit"
                disabled={
                  isSubmitting || !isDirty || isSuccess || !isValid || isError
                }
                className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed flex-1 sm:flex-none"
              >
                {isSubmitting ? "Sending..." : isSuccess ? "Sent!" : "Send"}
              </button>
            </div>

            {isSubmitted && (
              <button
                onClick={handleReset}
                className="sm:-ml-3 px-3 py-1.5 sm:px-4 sm:py-2 text-white/70 text-xs sm:text-sm underline underline-offset-3 decoration-dotted decoration-white/40 cursor-pointer text-center sm:text-left"
              >
                Send Another?
              </button>
            )}
          </div>
        </form>

        <img
          src={rightWingImage}
          alt="Right Wing"
          className="hidden md:block absolute top-[30%] md:-right-24 lg:-right-32 w-28 md:w-32 lg:w-40 h-28 md:h-32 lg:h-40 opacity-30 md:opacity-40 lg:opacity-50 z-0 animate-flutter-right invert scale-y-75"
        />
      </div>

      {isSuccess && successMessage && (
        <div
          id="success-box"
          className="absolute max-w-fit h-fit bottom-50 sm:top-4 sm:right-4 sm:left-auto p-2 sm:p-3 backdrop-blur-sm bg-green-500/40 border border-green-400/30 rounded-lg z-50"
        >
          <p
            id="success-message"
            className=" text-green-100 text-xs sm:text-sm text-center sm:text-left"
          >
            Thank you for your message! :D
          </p>
        </div>
      )}

      {errorMessage && !isSuccess && (
        <div
          id="error-box"
          className="absolute max-w-fit h-fit bottom-50 sm:top-4 sm:right-4 sm:left-auto p-2 sm:p-3 backdrop-blur-sm bg-red-500/40 border border-red-400/30 rounded-lg z-50"
        >
          <p
            id="submission-error"
            className="text-red-100 text-xs sm:text-sm text-center sm:text-left"
          >
            {errorMessage}
          </p>
        </div>
      )}
    </section>
  );
}
