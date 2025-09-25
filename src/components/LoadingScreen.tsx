export default function LoadingScreen() {
  return (
    <div
      id="loader-box"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-cyan-500 sm:bg-gradient-to-br sm:from-purple-400/60 sm:via-blue-400/60 sm:to-cyan-500/60 text-center px-4 "
    >
      <div id="loader-header-box" className="animate-fade-in-up">
        <h1
          id="loader-header"
          className="font-loading text-4xl md:text-5xl lg:text-6xl font-light text-white mb-2 sm:mb-4 -tracking-[0.1em]"
        >
          Wind Pioneers
        </h1>
        <p
          id="loader-subheader"
          className="font-loading font-extralight lowercase text-xs sm:text-base md:text-xl text-white/70 mb-4 sm:mb-6 tracking-tight"
        >
          Soaring into innovation
        </p>
      </div>

      <div
        id="loading-dots"
        className="flex items-center justify-center space-x-1 sm:space-x-2"
      >
        <div
          id="loading-dot-1"
          className="w-2 h-2 sm:w-3 sm:h-3 bg-white/60 rounded-full animate-bounce-1"
        ></div>
        <div
          id="loading-dot-2"
          className="w-2 h-2 sm:w-3 sm:h-3 bg-white/60 rounded-full animate-bounce-2"
        ></div>
        <div
          id="loading-dot-3"
          className="w-2 h-2 sm:w-3 sm:h-3 bg-white/60 rounded-full animate-bounce-3"
        ></div>
      </div>
    </div>
  );
}
