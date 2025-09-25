import { useState, useEffect } from 'react';
import MessageForm from './components/MessageForm';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Added a loader to allow all elements to be rendered smoothly
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, 3500);

    return () => clearTimeout(loadingTimer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-purple-500 to-cyan-500 sm:bg-gradient-to-br sm:from-purple-300 sm:via-blue-400 sm:to-cyan-300 transition-all duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      {showContent && <MessageForm />}
    </div>
  );
}

export default App