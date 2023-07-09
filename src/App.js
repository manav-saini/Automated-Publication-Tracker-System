import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import HomePage from "./components/homepage.component"
import RankDataList from "./components/RankDataList.component";
import BIBDATA from "./components/bib.component"
import UPDATA from "./components/upload.component"
//import JCRDataRankList from "./components/JCRDataRankList.component";
function App() {
  return (
     <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Routes>
        <Route path="/home" element={<HomePage/>}/>  
        <Route path="/rankdata" element={<RankDataList/>} />
        <Route path="/:id" element={<BIBDATA/>} />
        <Route path="/upload" element={<UPDATA/>} />
        {/* <Route path="/jcrdata" element={<JCRDataList/>} />
        <Route path="/:id" element={<JCRBIBDATA/>} /> */}
        {/* <Route path="/jcrdata" component={CoreDataRankList} />
        <Route path="/jcrbib/:id" component={JCRDataList} /> */}
        {/* <Route path="/jcrdata/:rank" component={JCRDataRankList} /> */}
        </Routes>
      </div>
      </Router>
  );
}
export default App;