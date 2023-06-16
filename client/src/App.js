import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Aboutus from './Pages/Aboutus';
import Contactus from './Pages/Contactus';
import Policy from './Pages/Policy';
import Productnotfound from './Pages/Productnotfound';
import Register from './Pages/auth/Register';
import Login from './Pages/auth/Login';
import Dashboard from './Pages/user/Dashboard';
import PrivateRoute from './Components/Routes/Private';
import ForgetPassword from './Pages/auth/ForgetPassword';
import AdminRoute from './Components/Routes/AdminRoute.js';
import AdminDashboard from './Pages/admin/AdminDashboard.js';
import AddCategory from './Pages/admin/AddCategory';
import AddProduct from './Pages/admin/AddProduct';
import Order from './Pages/user/Order';
import Profile from './Pages/user/Profile';
import Allproducts from './Pages/admin/Allproducts';
import Updateproduct from './Pages/admin/Updateproduct';
import Search from './Pages/Search';
import SingleProductPage from './Pages/SingleProductPage';
import Categories from './Pages/categories';
import CategoryProduct from './Pages/CategoryProduct';
import CartPage from './Pages/CartPage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<SingleProductPage />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<Productnotfound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/order' element={<Order />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>
        <Route path='catgeories' element={<Categories />} />
        <Route path='catgeory/:slug' element={<CategoryProduct />} />
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/add-category' element={<AddCategory />} />
          <Route path='admin/add-product' element={<AddProduct />} />
          <Route path='admin/get-products' element={<Allproducts />} />
          <Route path='admin/product/:slug' element={<Updateproduct />} />
        </Route>
        <Route path='cart' element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
