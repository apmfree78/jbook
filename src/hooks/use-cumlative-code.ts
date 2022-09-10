import { useTypedSelector } from './use-typed-selector';

export const useCumlativeCode = (cellId: string) => {
  // combining all code from previous cells up to current cell
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';

        // function to show elements on preview 
        var show = (value) => {
          const root = document.querySelector('#root');

          if (value.$$typeof && value.props) {
            _ReactDOM.render(value,root)
          }
          else if (typeof value === 'object'){
            root.innerHTML = JSON.stringify(value);
          } else {
            root.innerHTML = value;
          }
        };
      `;

    const showFuncNoop = 'var show = () => {}';

    const code = [];
    for (const c of orderedCells) {
      if (c.type === 'code') {
        // only add real show function to current cell
        if (c.id === cellId) code.push(showFunc);
        else code.push(showFuncNoop);

        code.push(c.content);
      }

      if (c.id === cellId) break;
    }
    return code;
  }).join('\n');
};
