import cellsReducers from './cellsReducer';
import bundlesReducer from './bundlesReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  cells: cellsReducers,
  bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
