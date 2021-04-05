import logo from './logo.svg';
import './App.css';
import {Button, Input} from '@material-ui/core';
import ExcelImporter from './components/ExcelImport';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          OCInsights Automated Newsletter System
        </h1>
      </header>
        <div class="container">
          <div className="links">

            <ExcelImporter/>
   

            <Button variant="contained" color="primary" component="label">
                Email Template
                <input type='file' accept='.xls .xlsx' hidden></input>
            </Button>
          </div>

          <div className='links'>
            <Button variant="contained" color="default" component="label">
              Load Data
            </Button>
          </div>
        </div>
     
    </div>
  );
}

export default App;
