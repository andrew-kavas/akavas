import Clickable from '#src/components/clickable.jsx';
import LoadingArea from '#src/components/loading-area.jsx';
import Test2 from '#src/components/test2.jsx';
import config from '#src/config.js';
import RickRoll from '#src/fun/rick-roll.jsx';
import SpeechFun from '#src/fun/speech-fun.jsx';
import consoleFun from '#src/functions/console-fun.js';
import useAsync from '#src/hooks/use-async.js';
// import AudioFun from '#src/fun/audio-fun.jsx';

const { fetch } = globalThis;

const { apiUrl } = config.andrewkavas;

/** @param {{ testParam1: string; testError?: boolean }} props */
const Test = ({ testParam1, testError }) => {
  consoleFun();

  const { data, error, execute, isLoading } = useAsync(async () => {
    const response = await fetch(
      `${apiUrl}/api/${testError ? 'error' : 'hello'}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const text = await response.text();
    return text;
  });

  return (
    <>
      <div className='text-orange-500'>Testing</div>
      <Clickable onClick={execute}>
        {testError ? 'Test Error' : 'Fetch Data'}
      </Clickable>
      {isLoading && <LoadingArea />}
      <div>testParam1: {testParam1} </div>
      {error && <div className='text-red-500'>Error: {error.message}</div>}
      <div>test change</div>
      {data && <div className='text-green-500'>{data}</div>}
      <SpeechFun />
      <RickRoll />
      {/* <AudioFun soundUrl='http://demo.twilio.com/docs/classic.mp3' />*/}
      <Test2 />
    </>
  );
};

export default Test;
