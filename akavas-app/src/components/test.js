import Clickable from '#src/components/clickable.js';
import LoadingArea from '#src/components/loading-area.js';
import config from '#src/config.js';
import useAsync from '#src/hooks/use-async.js';

const { fetch } = globalThis;

const { apiUrl } = config.akavas;

/** @param {{ testParam1: string; testError?: boolean }} props */
const Test = ({ testParam1, testError }) => {
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
    </>
  );
};

export default Test;
