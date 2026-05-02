import { useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg text-center">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/" className="text-gray-900 font-semibold hover:underline">
            Go Back to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
          <div className="lg:col-span-8">
            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cartItems.map((item) => (
                <li key={item.product} className="py-6 flex">
                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-center object-cover" />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3><Link to={`/product/${item.product}`}>{item.name}</Link></h3>
                        <p className="ml-4">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <div className="flex items-center border border-gray-300 rounded">
                        <select
                          className="bg-transparent text-gray-900 border-none focus:ring-0 text-sm py-1 pl-2 pr-6"
                          value={item.qty}
                          onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:text-red-500"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="flex justify-between text-base text-gray-900 mb-6">
                <p>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</p>
                <p>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
              </div>
              <button
                type="button"
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
