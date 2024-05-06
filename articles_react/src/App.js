import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import New from "./views/New";
import Navbar from "./components/Navbar";
import './App.css';
import SingleArticle from "./views/SingleArticle";

function App() {
  return (
    <div >
      <Router>
        <Navbar />
        <div className="main">
          <Routes>

            <Route path="/" element={<Home />}></Route>
            <Route path="/new_article" element={<New />}></Route>
            <Route path="/article/:id" element={<SingleArticle />}></Route>

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
