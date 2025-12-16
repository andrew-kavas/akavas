import { useState } from 'react';

import Clickable from '#src/components/clickable.js';
import HooksTest from '#src/components/hooks-test.js';
import Input from '#src/components/input.js';
import LoadingArea from '#src/components/loading-area.js';
import config from '#src/config.js';
import colors from '#src/constants/colors.js';
import clsx from '#src/functions/clsx.js';
import useAsync from '#src/hooks/use-async.js';
// import RouterTest from '#src/components/router-test.js';

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

  const [color, setColor] = useState('');

  return (
    <>
      {/* <RouterTest />*/}
      <div className='text-orange-500'>Testing</div>
      <HooksTest />
      <Input
        id='color-input'
        style={{ background: colors[color]?.[600] || 'none' }}
        className={clsx('m-2', !colors[color] && 'border-slate-500')}
        label='Test Input'
        placeholder='Enter a color...'
        onChange={({ target: { value } }) => setColor(value)}
      />
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
