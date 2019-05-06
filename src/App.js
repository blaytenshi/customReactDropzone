import React from 'react';
import Dropzone from './dropzone/Dropzone';
import './App.css';

function App() {
    return (
        <div className="App">
            <div className="Card">
                <Dropzone onFilesAdded={console.log} />
            </div>
        </div>
);
}

export default App;
