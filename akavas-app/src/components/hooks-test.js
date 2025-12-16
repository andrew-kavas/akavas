import useHistory from '#src/hooks/use-history.js';
import useLocalStorage from '#src/hooks/use-local-storage.js';

const { console, window } = globalThis;

export default () => {
  const history = useHistory();
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
