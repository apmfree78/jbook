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

const reducer = (
  state: CellsState = iniatialState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;

      return {
        ...state,
        data: {
          [id]: {
            ...state.data[id],
            content,
          },
        },
      };
    case ActionType.DELETE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    case ActionType.MOVE_CELL:
      return state;
    default:
      return state;
  }
};

export default reducer;
