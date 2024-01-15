import './App.css';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    console.log(10);
  }, []);
  return (
    <div className="App">
      <form>
        <label>
          Enter github username: 
          <input type="test" name="username" />
        </label>
      </form>
    </div>
  );
}

export default App;
