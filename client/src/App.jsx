import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import PlaceOrder from './pages/PlaceOrder';
import Profile from './pages/Profile';
import Product from './pages/Product';
import Order from './pages/Order';
import UserList from './pages/UserList';
import OrderList from './pages/OrderList';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">

        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
            <Route path="/admin/productlist" element={<ProductList />} />
            <Route path="/admin/orderlist" element={<OrderList />} />
            <Route path="/admin/userlist" element={<UserList />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart/:id?" element={<Cart />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
