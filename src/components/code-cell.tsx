import Resizable from './resizable';
import Preview from './preview';
import { useEffect } from 'react';
import './code-cell.css';
import CodeEditor from './code-editor';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumlativeCode } from '../hooks/use-cumlative-code';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  // extracting bundle for current cell
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumlativeCode = useCumlativeCode(cell.id);

  // calling createBundle to transpile and bundle user code
  // using debouncing to improve user experience and performance
  useEffect(() => {
    if (!bundle) createBundle(cell.id, cumlativeCode);
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumlativeCode);
    }, 750);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumlativeCode, cell.id, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
