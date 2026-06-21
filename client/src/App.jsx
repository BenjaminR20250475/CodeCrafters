import { useState, useEffect } from 'react'


function App() {
  const [test, setTest] = useState(null);
  const [testdb, setTestdb] = useState(null);

  // Test That we can talk to the backend
  useEffect(() => {
  fetch("/api/hello")
  .then(res => res.json())
  .then(data => setTest(JSON.stringify(data)));

  // Test that we can talk to the DB
  fetch("/api/test-db")
  .then(res => res.json())
  .then(data => setTestdb(JSON.stringify(data)));
  }, []);

  return (
    <div>
      <h1>Test Connection</h1>
      <p>Server Response: {test}</p>
      <p>Database Response {testdb}</p>
    </div>
  )
}

export default App
