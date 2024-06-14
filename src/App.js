import { useState } from 'react';
import axios from "axios";
import './App.css';
import Loader from './Loader/Loader'

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState(["1.................................", "2", "3"]);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/GenAIGenerate/generate", value);
      setResult(res);
    } catch (error) {
      setResult(["Something went wrong...."]);
      console.log(error);
      throw error;
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <div className="App">
      <div className='App-header'>
        <div className='above'>
          {loading ? <Loader /> :
            result.length > 0 &&
            result.map((it) => {
              return <div>{it}</div>
            })}
        </div>
        <div className='bottom'>
          <input value={value} onChange={(e) => {
            setValue(e.target.value);
          }} />
          <button onClick={handleClick} disabled={loading} title='Search'>Search</button>
        </div>
      </div>
    </div>
  );
}

export default App;
