import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cell-list';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1
          className='title is-1'
          style={{
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '40px',
          }}
        >
          Indepth JavaScript Coding NoteBook
        </h1>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
