import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "../utils/validation";
import type { MessageFormData } from "../utils/validation";
import useFormSubmit from "../hooks/useFormSubmit";
import { useState, useEffect } from "react";
import leftWingImage from "../assets/left-wing.svg";
import rightWingImage from "../assets/right-wing.svg";
import cloud1Image from "../assets/cloud-1.svg";
import cloud2Image from "../assets/cloud-2.svg";
import cloud3Image from "../assets/cloud-3.svg";

export default function MessageForm() {
  const [charCount, setCharCount] = useState(0);

  const [isFocused, setIsFocused] = useState(false);

  const {
    submitForm,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    successMessage,
    resetForm: resetSubmit,
  } = useFormSubmit();

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

  // Autocounts characters
  useEffect(() => {
    setCharCount(messageValue.length);
  }, [messageValue]);

  // Autoclears success message
  useEffect(() => {
    if (isSuccess && successMessage) {
      const timer = setTimeout(() => {
        resetSubmit();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, successMessage, resetSubmit]);

  // Autoclears error message
  useEffect(() => {
    if (errorMessage && !isSuccess) {
      const timer = setTimeout(() => {
        resetSubmit();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, isSuccess, resetSubmit]);

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
      {/* bg clouds */}
      <img
        src={cloud3Image}
        alt=""
        className="absolute top-10 left-8 w-20 sm:w-24 md:w-32 opacity-20 z-0 animate-float invert"
        style={{ animationDelay: "1s", animationDuration: "8s" }}
      />

      <img
        src={cloud2Image}
        alt=""
        className="absolute top-16 right-12 w-24 sm:w-32 md:w-40 opacity-25 z-0 animate-float invert"
        style={{ animationDelay: "3s", animationDuration: "10s" }}
      />

      <img
        src={cloud1Image}
        alt=""
        className="absolute -bottom-12 -left-8 w-40 sm:w-48 md:w-56 lg:w-64 opacity-15 z-0 invert"
      />

      <img
        src={cloud2Image}
        alt=""
        className="absolute top-1/3 left-1/4 w-16 sm:w-20 md:w-24 opacity-20 z-0 animate-float invert"
        style={{ animationDelay: "5s", animationDuration: "12s" }}
      />

      <img
        src={cloud3Image}
        alt=""
        className="absolute bottom-20 right-16 w-18 sm:w-22 md:w-28 opacity-25 z-0 invert"
      />

      <div
        id="winged-form-container"
        className={`relative ${
          isFocused ? "animate-focus-glow" : "animate-float"
        } `}
      >
        {/* left box wing */}
        <img
          src={leftWingImage}
          alt="Left Wing"
          className="hidden md:block absolute top-[30%] md:-left-24 lg:-left-32 w-28 md:w-32 lg:w-40 h-28 md:h-32 lg:h-40 opacity-40 z-0 animate-flutter-left invert scale-y-75"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          id="message-form"
          className={`w-[80vw] md:w-[50vw] xl:w-[30vw] relative backdrop-blur-md bg-blue-200/20 sm:bg-blue-200/30 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl sm:shadow-2xl z-10 mx-4 sm:mx-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none ${
            isFocused ? "outline" : ""
          } outline-offset-2 outline-white/20 `}
        >
          <h2
            id="form-title"
            className="font-extralight tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white"
          >
            Got something to say?
          </h2>

          <div className="font-extralight flex items-baseline flex-col gap-4 sm:gap-3 lg:gap-4">
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
                placeholder="Type your message here :)"
                className="tracking-wide backdrop-blur-sm bg-gray-100/5 disabled:opacity-50 border border-white/30 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 placeholder-white/60 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-white/30 disabled:cursor-not-allowed flex-1 max-w-full min-w-0"
              />

              <span
                id="char-counter"
                className={`sm:absolute right-0 -bottom-5
                  ${
                    charCount > 10
                      ? "text-red-600/50 font-medium"
                      : charCount > 0
                      ? "text-white/70"
                      : "text-white/40"
                  } text-xs whitespace-nowrap`}
              >
                {charCount}/10
              </span>
            </div>

            {/* validation information */}
            {!errors.message && !isDirty && !isValid && (
              <p
                id="generic-message"
                className="font-light -mb-2 sm:mt-2 text-white/80 text-xs sm:text-sm underline underline-offset-4 decoration-dotted decoration-white/40"
              >
                <span id="generic-message-1" className="block lg:inline">
                  Enter 1-10 characters.{" "}
                </span>
                <span id="generic-message-2" className="block lg:inline">
                  Exclamation marks (!) are not allowed.
                </span>
              </p>
            )}

            {/* validation error */}
            {errors.message && (
              <p
                id="error-message"
                className="text-red-600/50 text-xs sm:text-sm font-medium -mb-2"
              >
                {errors.message.message}
              </p>
            )}
          </div>

          <div
            id="action-buttons-box"
            className="mt-6 sm:mt-4 flex flex-col sm:flex-row gap-2 w-full"
          >
            {!isSubmitted ? (
              // action buttons pre-submission
              <div className="flex flex-row gap-2">
                <button
                  id="reset-button"
                  type="button"
                  onClick={handleReset}
                  className="font-extralight backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 cursor-pointer flex-1 sm:flex-none"
                >
                  Clear
                </button>
                <button
                  id="submit-button"
                  type="submit"
                  disabled={
                    isSubmitting || !isDirty || isSuccess || !isValid || isError
                  }
                  className="font-extralight backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed flex-1 sm:flex-none"
                >
                  {isSubmitting ? "Sending..." : isSuccess ? "Sent!" : "Send"}
                </button>
              </div>
            ) : (
              // action button post submission
              <button
                id="send-another-button"
                type="button"
                onClick={handleReset}
                className="font-extralight backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 cursor-pointer w-full sm:w-auto"
              >
                Send Another?
              </button>
            )}
          </div>
        </form>

        {/* right box wing */}
        <img
          id="right-wing-image"
          src={rightWingImage}
          alt="Right Wing"
          className="hidden md:block absolute top-[30%] md:-right-24 lg:-right-32 w-28 md:w-32 lg:w-40 h-28 md:h-32 lg:h-40 opacity-40 z-0 animate-flutter-right invert scale-y-75"
        />
      </div>

      {/* shows if message is sent successfully */}
      {isSuccess && successMessage && (
        <div
          id="success-box"
          className="absolute max-w-fit h-fit bottom-50 p-2 sm:p-3 backdrop-blur-sm bg-gradient-to-r from-green-400/20 to-green-400/40 border border-green-600/40 rounded-lg z-50"
        >
          <p
            id="success-message"
            className="font-light text-green-100 text-xs sm:text-sm text-center"
          >
            Thank you for your message! :D
          </p>
        </div>
      )}

      {/* shows if an error occurs during submission */}
      {errorMessage && !isSuccess && (
        <div
          id="error-box"
          className="absolute max-w-fit h-fit bottom-50 p-2 sm:p-3 backdrop-blur-sm bg-gradient-to-r from-red-400/20 to-red-500/40 border border-red-600/40 rounded-lg z-50"
        >
          <p
            id="submission-error"
            className="font-light text-red-100 text-xs sm:text-sm text-center"
          >
            {errorMessage}
          </p>
        </div>
      )}

      <div id="footer-box" className="fixed bottom-4 z-50">
        <p
          id="footer"
          className="text-white/70 text-sm md:text-md font-extralight"
        >
          Built with 💙 by{" "}
          <a
            id="github-link"
            href="https://github.com/adelicia-js"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white underline underline-offset-3 decoration-dotted transition-colors duration-200"
          >
            Adelicia
          </a>
        </p>
      </div>
    </section>
  );
}
