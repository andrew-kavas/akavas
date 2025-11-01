import { useState } from 'react';

const { console, window } = globalThis;

const { SpeechSynthesisUtterance } = window;

// todo: new component snippets
export default () => {
  const placeholder = 'Happy Halloween boogie nation';
  const [text, setText] = useState(placeholder);
  console.log(text);

  const utterance = new SpeechSynthesisUtterance(text);

  const speakText = () => {
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <input
        className='w-fit rounded border border-orange-600'
        onChange={({ target: { value } }) => setText(value)}
        placeholder={placeholder}
      />
      <button color='bg-green-500' onClick={speakText}>
        Say something
      </button>
    </div>
  );
};
