import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions'; 

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success, order]);

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  const placeOrderHandler = () => {
     dispatch(createOrder({
       orderItems: cart.cartItems,
       shippingAddress: cart.shippingAddress,
       paymentMethod: 'Cash On Delivery',
       itemsPrice: cart.itemsPrice,
       shippingPrice: cart.shippingPrice,
       taxPrice: cart.taxPrice,
       totalPrice: cart.totalPrice,
     }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold uppercase mb-4">Shipping</h2>
            <p>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
              {cart.shippingAddress.country}
            </p>
          </div>

          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold uppercase mb-4">Payment Method</h2>
            <p>
              <strong>Method: </strong> Cash On Delivery
            </p>
          </div>

          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold uppercase mb-4">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cart.cartItems.map((item, index) => (
                  <li key={index} className="py-4 flex">
                    <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />
                    <div className="ml-4 flex-1">
                      <Link to={`/product/${item.product}`} className="font-semibold text-lg hover:underline">{item.name}</Link>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold uppercase mb-6 border-b pb-4">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Items:</span><span>${cart.itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span><span>${cart.shippingPrice}</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span>Tax:</span><span>${cart.taxPrice}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span><span>${cart.totalPrice}</span>
              </div>
            </div>
            <button
              className="mt-6 w-full bg-gray-900 text-white py-3 rounded-md font-semibold hover:bg-gray-800 focus:outline-none"
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
