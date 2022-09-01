import cellsReducers from './cellsReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  cells: cellsReducers,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
