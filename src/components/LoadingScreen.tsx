export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-cyan-500 sm:bg-gradient-to-br sm:from-purple-300 sm:via-blue-400 sm:to-cyan-300">
      <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8 px-4">
        {/* Main Logo/Title */}
        <div className="animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-2 sm:mb-4">
            Wind Pioneers
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/70 mb-4 sm:mb-6">
            Soaring into innovation
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-1 sm:space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/60 rounded-full animate-bounce-1"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/60 rounded-full animate-bounce-2"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/60 rounded-full animate-bounce-3"></div>
        </div>
      </div>
    </div>
  );
}
