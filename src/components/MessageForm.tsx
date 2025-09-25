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
          className="absolute top-[30%] -left-32 w-40 h-40 opacity-50 z-0 animate-flutter-left invert scale-y-75"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          id="message-form"
          className={`relative backdrop-blur-md bg-blue-200/40 border border-white/20 rounded-2xl p-8 shadow-2xl z-10 ${
            isFocused ? "outline" : ""
          } outline-offset-2 outline-white/20 `}
        >
          <h2 id="form-title" className="lg:text-4xl text-white">
            Send a message to us.
          </h2>

          <div className="flex items-baseline flex-col gap-4">
            <label
              id="message-input-label"
              htmlFor="message"
              className="text-white/70"
            >
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
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isSubmitting || isSuccess || isSubmitted}
                placeholder="Enter your message here"
                className="backdrop-blur-sm bg-white/10 border border-white/30 rounded-lg px-3 py-2 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/30 disabled:cursor-not-allowed"
              />

              <span
                id="char-counter"
                className={`${
                  charCount > 10
                    ? "text-red-600/50 font-semibold"
                    : charCount > 0
                    ? "text-white/70"
                    : "text-white/30"
                } text-sm  `}
              >
                {charCount}/10
              </span>
            </div>

            {!errors.message && isDirty && !isValid && (
              <p
                id="generic-error"
                className="text-white/80 text-sm underline underline-offset-4 decoration-dotted decoration-white/40"
              >
                <span>Enter 1-10 characters. </span>
                <span className="">Exclamation marks (!) are not allowed.</span>
              </p>
            )}

            {errors.message && (
              <p
                id="error-message"
                className="text-red-600/50 text-sm font-semibold"
              >
                {errors.message.message}
              </p>
            )}
          </div>

          <div id="action-buttons-box" className="mt-4 flex gap-2">
            <button
              id="reset-button"
              type="button"
              onClick={handleReset}
              className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 cursor-pointer"
            >
              Clear
            </button>
            <button
              id="submit-button"
              type="submit"
              disabled={isSubmitting || !isDirty || isSuccess || !isValid}
              className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : isSuccess ? "Sent!" : "Send"}
            </button>
            {isSubmitted && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-white/70 text-sm underline underline-offset-2 decoration-white/40 cursor-pointer"
              >
                Send Another?
              </button>
            )}
          </div>
        </form>

        <img
          src={rightWingImage}
          alt="Right Wing"
          className="absolute top-[30%] -right-32 w-40 h-40 opacity-50 z-0 animate-flutter-right invert scale-y-75 "
        />

      </div>

      
        {isSuccess && successMessage && (
        <div
          id="success-box"
          className="absolute top-[2%] right-[2%] p-3 backdrop-blur-sm bg-green-500/40 border border-green-400/30 rounded-lg"
        >
          <p id="success-message" className="text-green-100">
            Thank you for your message! :D
          </p>
        </div>
        )}

        {errorMessage && !isSuccess && (
        <div
          id="error-box"
          className="absolute top-[2%] right-[2%] p-3 backdrop-blur-sm bg-red-500/40 border border-red-400/30 rounded-lg"
        >
          <p id="submission-error" className="text-red-100">
            {errorMessage}
          </p>
        </div>
        )}
    </section>
  );
}
