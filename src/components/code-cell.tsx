import Resizable from './resizable';
import Preview from './preview';
import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import bundle from '../bundler';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    const timer = setTimeout(async () => { }, 750);
    createBundle(cell.id, cell.content);
    return () => clearTimeout(timer);
  }, [cell.content, cell.id]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={bundle.code} err={bundle.err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
