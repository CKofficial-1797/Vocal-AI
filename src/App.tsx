import { useEffect, useState } from 'react'
import { MicVAD } from '@ricky0123/vad-web'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function App() {
  const [isTalking, setIsTalking] = useState<boolean>(false);
  const { transcript } = useSpeechRecognition();


  useEffect(() => {
    let vadInstance: any = null;

    const initVAD = async () => {
      try {
        vadInstance = await MicVAD.new({
          onSpeechStart: () => {
            setIsTalking(true);
            SpeechRecognition.startListening();
          },
          onSpeechEnd: () => {
            setIsTalking(false);
            SpeechRecognition.stopListening();
          },
        });

        await vadInstance.start();
      } catch (err) {
        console.error('Failed to initialize VAD:', err);
      }
    };

    initVAD();

    return () => {
      if (vadInstance?.stop) vadInstance.stop();
    };
  }, []);

  return (
    <main className="flex items-center justify-center bg-gray-950 min-h-screen p-4">
      <div className="flex space-x-4">
        <div
          className={`h-10 w-10 rounded-full bg-white ${isTalking ? 'animate-bounce [animation-delay:0ms]' : ''
            }`}
        ></div>
        <div
          className={`h-10 w-10 rounded-full bg-white ${isTalking ? 'animate-bounce [animation-delay:150ms]' : ''
            }`}
        ></div>
        <div
          className={`h-10 w-10 rounded-full bg-white ${isTalking ? 'animate-bounce [animation-delay:300ms]' : ''
            }`}
        ></div>
        <div
          className={`h-10 w-10 rounded-full bg-white ${isTalking ? 'animate-bounce [animation-delay:450ms]' : ''
            }`}
        ></div>
      </div>

      <div className="absolute text-white bottom-28 text-xs max-w-xs truncate">
        {transcript || 'No transcription yet...'}
      </div>
    </main>
  )
}

export default App