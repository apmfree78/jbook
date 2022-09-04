import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const iniatialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = iniatialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      break;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      // const index = state.order.findIndex((cell) => cell === action.payload);
      // state.order.splice(index, 1);
      break;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;

      // finv Index of cell in order array with its id
      const index = state.order.findIndex((id) => id === action.payload.id);
      // determine target index
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      // if targetIndex index is out of bounds, exit
      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;

      // swapping ids with targetIndex 
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      break;
  }
});

export default reducer;
