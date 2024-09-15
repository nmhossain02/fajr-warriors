import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { getUsersEmails } from './funcs/index.js';

function App() {
  const [count, setCount] = useState(0)
  const [test, setTest] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      console.log('Hello, World!');
      const emails = await getUsersEmails();
      console.log(emails);
      setTest(emails);
    };
    
    fetchData();
  }
  , [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="read-the-docs">
        {
          test.map((email, index) => (
            <p key={index}>{email}</p>
          ))  
        }
      </div>
    </>
  )
}

export default App
