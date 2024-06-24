import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import Header from "./components/Header/Header";
import './style.css'
import Detail from "./pages/Details/Detail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "./redux/reducer";


function App() {
const dispatch = useDispatch()

useEffect(() => {
  dispatch(getCategories())
},[])

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/cart" element={<Cart/>}/>
       <Route path="/category/:category" element={<CategoryPage/>}/>
       <Route path="/product/:id" element={<Detail/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
