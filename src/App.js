import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Cart from "./screens/Cart";
import Order from "./screens/Order";
import { CartProvider } from "./components/ContextReducer";
import "./App.css";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App ">
      <CartProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/Cart" element={<Cart />} />
            <Route exact path="/myorders" element={<Order />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
