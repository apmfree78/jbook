import Preview from './components/preview';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import CodeEditor from './components/code-editor';
import bundle from './bundler';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('')



  const onClick = async () => {

    const bundled = await bundle(input);
    setCode(bundled);
  }


  return (
    <div>
      <CodeEditor initialValue={'const a=1;'} onChange={(value) => setInput(value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};


ReactDOM.render(<App />, document.querySelector('#root'));
