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
    setCode(bundled);
  }


  return (
    <Resizable direction='vertical'>
      <div>
        <CodeEditor initialValue={'const a=1;'} onChange={(value) => setInput(value)} />
        <div>
          <button onClick={onClick}>Submit</button>
        </div>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell; 
