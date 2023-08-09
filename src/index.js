import './style.css';

import Sidebar from './Components/Sidebar/Sidebar.js';

import Pathname from './Components/Pathname.js';

function App() {
    const path = Pathname();
    //create sidebar and button for it
    const sb = Sidebar(path);  
}

App();