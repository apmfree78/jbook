import { useState } from 'react';
import ReactDOM from 'react-dom';

const Count = () => {

  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <p>{count}</p>
      <p>TEST</p>
    </div>
  )
}

ReactDOM.render(<Count />, document.querySelector('#root'));

export default Count;
