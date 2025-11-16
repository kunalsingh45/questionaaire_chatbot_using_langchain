import { useRef } from 'react'
import './App.css'
import { useState } from 'react';
import { Loader } from './components/Loader';

function App() {
  const ref = useRef("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);


  const fetchResponse = async () => {
    const question = ref.current.value;
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3001/getAnswer", {
        method: 'post', body: JSON.stringify({ question }), headers:
          { "Content-Type": "application/json", },
      })
      const data = await response.json();
      console.log(data)
      setAnswer(data.answer);
      ref.current.value = "";
    }
    catch (err) {
      console.log(err)
    } finally {
      setLoading(false); // Set loading to false after data is fetched or an error occurs
    }
  }

  return (
    <>
      <h1>Ask me anything!!!</h1>
      <div className="card">
        <input type='text' ref={ref} />
        <button onClick={fetchResponse}>
          submit
        </button>
      </div>
      {loading && <Loader />}
      {!loading && answer && <p>{answer}</p>}
    </>
  )
}

export default App
