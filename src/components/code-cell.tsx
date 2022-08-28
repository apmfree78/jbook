import Resizable from './resizable';
import Preview from './preview';
import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import bundle from '../bundler';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundled = await bundle(input);
      console.log(bundled);
      setCode(bundled.code);
      setErr(bundled.err);
    }, 750);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <>
      <Resizable direction='vertical'>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction='horizontal'>
            <CodeEditor
              initialValue={'const a=1;'}
              onChange={(value) => setInput(value)}
            />
          </Resizable>
          <Preview code={code} err={err} />
        </div>
      </Resizable>
      {/* <button onClick={onClick}>Submit</button> */}
    </>
  );
};

export default CodeCell;
