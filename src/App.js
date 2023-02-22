
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import Main from './pages/Main';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Adduser from './pages/Adduser';
import Votelist from './pages/Votelist';
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
 
     <Router>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/home' element={<Main/>}/>
        <Route exact path='/user' element={<Adduser/>}/>
        <Route exact path='/votelist' element={<Votelist/>}/>
        <Route exact path='*' element={<Error/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
