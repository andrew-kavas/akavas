import React, { useState } from 'react';

import Clickable from '#src/components/clickable.js';
import Input from '#src/components/input.js';
import LoadingArea from '#src/components/loading-area.js';
import config from '#src/config.js';
import colors from '#src/constants/colors.js';
import clsx from '#src/functions/clsx.js';
import useAsync from '#src/hooks/use-async.js';
import history from '#src/constants/history.js';
import useLocalStorage from '#src/hooks/use-local-storage.js';

const { console, fetch, window } = globalThis;

const { apiUrl } = config.akavas;

const HooksTest = () => {
  console.log('history', history);

  const [count, saveCount] = useLocalStorage('local-count', 0);
  console.log('count', count);

  return (
    <div className='space-y-2'>
      <div>
        History Path
        {history.path}
      </div>
      <div className='space-x-2'>
        Local Storage Count: <div className='font-bold text-xl'>{count}</div>
        <button className='bg-blue-200' onClick={() => saveCount(count + 1)}>
          +
        </button>
        <button
          className='link border-emerald-400'
          onClick={() => window.location.reload()}
        >
          Reload Window
        </button>
        <button
          className='link border border-orange-400'
          onClick={() => {
            window.localStorage.clear();
            window.location.reload();
          }}
        >
          Clear Local Storage
        </button>
      </div>
    </div>
  );
};

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
    <div className='space-y-2 shadow rounded p-4'>
      {/* <RouterTest /> */}
      <div className='text-orange-600'>Testing</div>
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
    </div>
  );
};

export default Test;
