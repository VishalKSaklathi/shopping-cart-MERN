import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './App.css'
import NavBar from './components/NavBar';

function App() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const content = document.getElementById('main-content');
    if (content) {
      content.style.marginTop = expanded ? '260px' : '60px';
    }
  }, [expanded]);

  return (
    <>
      <NavBar expanded={expanded} setExpanded={setExpanded} />
      <div id="main-content">
        <Outlet />
      </div>
    </>
  )
}

export default App
