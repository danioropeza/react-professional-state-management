import { UseState } from './UseState.js';
import { UseReducer } from './UseReducer.js';
import { ClassState } from './ClassState.js';
import './App.css';

function App() {
  return (
    <div className="App">
      { /*<ClassState name="ClassState"/> */}
      <UseState name="UseState"/>
      <UseReducer name="UseReducer"/>
    </div>
  );
}

export default App;
