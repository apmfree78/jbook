import Resizable from './resizable';
import Preview from './preview';
import { useEffect } from 'react';
import './code-cell.css';
import CodeEditor from './code-editor';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  // extracting bundle for current cell
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  // combining all code from previous cells up to current cell
  const cumlativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    let code = [
      `
        const show = (value) => {
        if (typeof value === 'object'){
          document.querySelector('#root').innerHTML = JSON.stringify(value);
        } else {
          document.querySelector('#root').innerHTML = value;
        }
        };
      `,
    ];
    for (const c of orderedCells) {
      if (c.type === 'code') {
        code.push(c.content);
      }

      if (c.id === cell.id) break;
    }
    return code;
  });

  // calling createBundle to transpile and bundle user code
  // using debouncing to improve user experience and performance
  useEffect(() => {
    if (!bundle) createBundle(cell.id, cumlativeCode.join('\n'));
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumlativeCode.join('\n'));
    }, 750);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumlativeCode.join('\n'), cell.id, createBundle]);

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
