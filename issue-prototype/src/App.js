import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [showButtons, setShowButtons] = useState(false); // State to show issue type buttons
  const [showBugMask, setShowBugMask] = useState(false); // State to show Bug Mask
  const [showTaskMask, setShowTaskMask] = useState(false); // State to show Task Mask
  const [issues, setIssues] = useState([]); // State to store issues
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Shows issue selection Buttons
  const handleInitClick = () => {
    setShowButtons(true);
    setShowBugMask(false);
    setShowTaskMask(false);
  };

  // Shows Bug Mask
  const handleBugClick = () => {
    setShowBugMask(true);
    setShowButtons(false);
  };

  // Show Task Mask
  const handleTaskClick = () => {
    setShowTaskMask(true);
    setShowButtons(false);
  };

  // Handle Submit Click for Bugs
  const handleBugSubmitClick = async () => {
    const bugTitle = document.getElementById('bugTitle').value;
    const bugReportTime = document.getElementById('bugReportTime').value;

    try {
      const response = await axios.post('http://localhost:8002/issues', {
        title: bugTitle,
        report_time: bugReportTime,
        issue_type: 'Bug',
      });
      console.log('Bug submitted:', response.data);
      fetchIssues(); // Refresh the issues after submitting
    } catch (error) {
      console.error('Error submitting bug:', error);
    }

    setShowBugMask(false);
  };

  // Handle Submit Click for Tasks
  const handleTaskSubmitClick = async () => {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskPoints = parseInt(document.getElementById('taskPoints').value, 10);

    try {
      const response = await axios.post('http://localhost:8002/issues', {
        Task: {issue_type: 'Task', title: taskTitle, report_time: '', task_point: taskPoints}
      });
      console.log('Task submitted:', response.data);
      fetchIssues(); // Refresh the issues after submitting
    } catch (error) {
      console.error('Error submitting task:', error);
    }

    setShowTaskMask(false);
  };

  // Fetch issues from the server
  const fetchIssues = async () => {
    setLoading(true);
    try {
        const response = await axios.get('http://localhost:8002/show-issues');
        setIssues(response.data); // Assuming the data is in response.data
        console.log(response);
    } catch (error) {
        console.error('Error fetching issues:', error);
    }
    setLoading(false);
  };

  // Fetch issues when the component mounts
  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <button onClick={handleInitClick}>+</button>

        {showButtons && (
          <div className='issue-selector'>
            <button onClick={handleBugClick}>Add new Bug</button>
            <button onClick={handleTaskClick}>Add new Task</button>
          </div>
        )}

        {showBugMask && (
          <div className='bug-mask'>
            <input type="text" placeholder="Title" id="bugTitle" /><br />
            <input type="text" placeholder="Report Time" id="bugReportTime" /><br />
            <button onClick={handleBugSubmitClick} type='submit'>Submit</button>
          </div>
        )}

        {showTaskMask && (
          <div className='task-mask'>
            <input type="text" placeholder="Title" id="taskTitle" /><br />
            <input type="text" placeholder="Task Points" id="taskPoints" /><br />
            <button onClick={handleTaskSubmitClick} type='submit'>Submit</button>
          </div>
        )}

        <div className="issues-list">
          {loading ? (
            <p>Loading issues...</p>
          ) : (
            <ul>
              {issues.map((issue, index) => (
                <li key={index}>
                  <strong>{issue.title}</strong> - {issue.issue_type} 
                  {issue.report_time && ` (Report Time: ${issue.report_time})`}
                  {issue.task_point !== undefined && ` (Task Points: ${issue.task_point})`}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
