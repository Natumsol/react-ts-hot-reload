import React from 'react';
import { Dialog } from '@alifd/next';

import './App.css';

function App() {
  return (
    <div className="App">
      <Dialog visible title="提示">
        你好啊
      </Dialog>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn.......
        </a>
      </header>
    </div>
  );
}

export default App;
