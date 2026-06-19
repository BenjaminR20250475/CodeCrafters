import { useState, useEffect } from 'react'


function App() {
  const [test, setTest] = useState(null);

  useEffect(() => {
  fetch("/api/hello")
  .then(res => res.json())
  .then(data => setTest(JSON.stringify(data)));
  }, []);

  return (
    <div>
      <h1>Test Connection</h1>
      <p>{test}</p>
    </div>
  )
}

export default App
