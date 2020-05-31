import React from 'react';
import Home from './components/home/Home';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './components/login/loginpage'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home}/>
      <Route path='/quizcompetition/login' component={Login}/>
    </Router>
  );
}

export default App;
