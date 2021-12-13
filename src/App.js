
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Customerspage from './pages/Customers';
import Trainingspage from './pages/Trainings';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { typography } from '@mui/system';

import Customerlist from './components/Customerlist';

// en tiedä nyt nuo linkkien osoitteet

function App() {
  return (
    <div className="App">

      <AppBar position="static">  
        <Toolbar>
          <Typography variant="h6">
            Personal trainer
          </Typography>
        </Toolbar>
      </AppBar>

      <BrowserRouter>
        <Link to= "/">Customers</Link>{' '}
        <Link to= "/trainings">Trainings</Link>{' '}
        <Routes>
          <><Route path="/" element={<Customerspage />} />
          <Route path="/trainings" element={<Trainingspage />} /> </>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
