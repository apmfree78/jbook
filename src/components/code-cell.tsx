import Resizable from './resizable';
import Preview from './preview';
import { useState } from 'react';
import CodeEditor from './code-editor';
import bundle from '../bundler';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('')



  const onClick = async () => {

    const bundled = await bundle(input);
    console.log(bundled);
    setCode(bundled);
  }


  return (
    <>
      <Resizable direction='vertical'>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction='horizontal'>
            <CodeEditor initialValue={'const a=1;'} onChange={(value) => setInput(value)} />
          </Resizable>
          <Preview code={code} />
        </div>
      </Resizable>
      {/* <button onClick={onClick}>Submit</button> */}
    </>
  );
};

export default CodeCell; 
