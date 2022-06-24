import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Create from './components/Create'
import Join from './components/Join'
import Chat  from './components/Chat';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials= true

function App() {
  return (
    <Router>
        <div className="app">
          <Routes>
            <Route path='/' element={<Join />}/>
            <Route path='/create-room' element={<Create />}/>
            <Route path='/chat' element={<Chat />}/>

          </Routes>
        </div>
      </Router>
  );
}

export default App;
