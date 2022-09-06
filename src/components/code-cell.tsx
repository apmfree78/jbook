import Resizable from './resizable';
import Preview from './preview';
import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import bundle from '../bundler';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundled = await bundle(cell.content);
      console.log(bundled);
      setCode(bundled.code);
      setErr(bundled.err);
    }, 750);

    return () => clearTimeout(timer);
  }, [cell.content]);

  return (
    <>
      <Resizable direction='vertical'>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction='horizontal'>
            <CodeEditor
              initialValue={cell.content}
              onChange={(value) => updateCell(cell.id, value)}
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
