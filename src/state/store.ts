import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';
import { moveCell, deleteCell, updateCell } from './action-creators';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// testing reducer

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'code',
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'text',
  },
});

console.log(store.getState());

const cellId: string | undefined = store.getState().cells?.order[0];

console.log(cellId);

if (cellId) store.dispatch(moveCell(cellId, 'down'));
if (cellId) store.dispatch(updateCell(cellId, 'content for cell'));

console.log(store.getState());

// if (cellId) store.dispatch(deleteCell(cellId));

console.log(store.getState());
