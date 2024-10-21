import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [showButtons, setShowButtons] = useState(false);
  const [showBugMask, setShowBugMask] = useState(false);
  const [showTaskMask, setShowTaskMask] = useState(false);

  const handleInitClick = () => {
    setShowButtons(true);
    setShowBugMask(false);
    setShowTaskMask(false);
  };

  const handleBugClick = () => {
    setShowBugMask(true);
    setShowButtons(false);
  };

  const handleTaskClick = () => {
    setShowTaskMask(true);
    setShowButtons(false);
  };

  const handleBugSubmitClick = async () => {
    setShowBugMask(false);
    const bugTitle = document.getElementById('bugTitle');
    const bugReportTime = document.getElementById('bugReportTime');
    // const response = await axios.post('http://127.0.0.1:8000/issues/');
  };

  const handleTaskSubmitClick = async () => {
    setShowTaskMask(false);
    const taskTitle = document.getElementById('taskTitle');
    const taskPoints = parseInt(document.getElementById('taskPoints'));
    // const response = await axios.post('http://127.0.0.1:8000/issues/');
  };

  return (
    <div className="App">
      <header className="app-header">
        <button onClick={handleInitClick}>+</button>

        {showButtons && (
          <div className='issue-selecter'>
            <button onClick={handleBugClick}>Add new Bug</button>
            <button onClick={handleTaskClick}>Add new Task</button>
          </div>
        )}

        {showBugMask && (
          <div className='bug-mask'>
            <input type="text" placeholder="Title" id="bugTitle"></input><br></br>
            <input type="text" placeholder="Report Time" id="bugReportTime"></input><br></br>

            <button onClick={handleBugSubmitClick} type='submit'>Submit</button>
          </div>
        )}

        {showTaskMask && (
          <div className='bug-mask'>
            <input type="text" placeholder="Title" id="taskTitle"></input><br></br>
            <input type="text" placeholder="Task Points" id="taskPoints"></input><br></br>

            <button onClick={handleTaskSubmitClick} type='submit'>Submit</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
