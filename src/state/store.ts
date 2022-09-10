import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';
import { updateCell } from './action-creators';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// testing reducer

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'text',
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'code',
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'text',
  },
});

const app = `import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bulmaswatch/cosmo/bulmaswatch.min.css';

const App = () => {
  const [count, setCount] = useState(0);
  const style = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={style}>
      <button
        className="button is-primary is-rounded is-large"
        onClick={() => setCount(count + 1)}
      >
        Add 1
      </button>
      <h1 className="title is-1">{count}</h1>
    </div>
  );
};

show(<App />);`;

const cellId: string | undefined = store.getState().cells?.order[1];

console.log(cellId);

// if (cellId) store.dispatch(moveCell(cellId, 'down'));
if (cellId) store.dispatch(updateCell(cellId, app));

console.log(store.getState());

const markdown = `
# Jupyter style Coding Notebook for JavaScript (Full Details: [GitHub](https://github.com/apmfree78/jbook/blob/master/README.md))

- Allows you to add Multiple Coding and Markdown Cells
- Each cell has a preview window. 
- Any variable, object, or React component created in 1 cell is ascessible in all subsequent cells.
- **Import any npm package using standard ES6 import statement at to of cell**
 
### *Use the \`show()\` to display any variable, object, JSX, or React component to the adjacent preview window.*

## => You can Click on THIS cell to edit the Markdown...Try it!
`;

const markdownId: string | undefined = store.getState().cells?.order[0];

if (markdownId) store.dispatch(updateCell(markdownId, markdown));

const markdown2 = `
## Sample React Counter App Above...

See Sample React App in Above Code Cell. Styled with Bulma and Flexbox.
`;

const markdownId2: string | undefined = store.getState().cells?.order[2];

if (markdownId2) store.dispatch(updateCell(markdownId2, markdown2));
