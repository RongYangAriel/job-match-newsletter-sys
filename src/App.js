import logo from './logo.svg';
import './App.css';
import {Button, Input} from '@material-ui/core';
import ExcelImporter from './components/ExcelImport';
import Email from './components/Email';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          OCInsights Automated Newsletter System
        </h1>
      </header>

       <ExcelImporter/>
     
    </div>
  );
}

export default App;
