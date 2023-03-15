import Home from "./screens/Home"
import Login from "./screens/Login"
import SignUp from "./screens/Signup"
import "./App.css"
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
function App() {
  return (
    <div className="App ">
      <Router>
        <Routes>
<Route exact path="/" element={<Home/>}></Route>
<Route exact path="/login" element={<Login/>}/>
<Route exact path="/signup" element={<SignUp/>}/>
        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
