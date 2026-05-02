import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../actions/orderActions';

const Order = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    if (!order || order._id !== id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, order, id]);

  return loading ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="animate-pulse tracking-widest font-semibold">Loading order details...</p>
    </div>
  ) : error ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
    </div>
  ) : (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-900">
      <h1 className="text-2xl font-bold tracking-tight mb-8">Order ID: {order._id}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold uppercase mb-4">Shipping</h2>
            <p className="mb-2"><strong>Name: </strong> {order.user.name}</p>
            <p className="mb-4"><strong>Email: </strong> <a className="text-gray-600 hover:underline" href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
            <p className="mb-4">
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-md font-medium px-4 py-2 mt-4 inline-block">Delivered</div>
            ) : (
              <div className="bg-yellow-50 text-yellow-700 p-4 rounded-md font-medium px-4 py-2 mt-4 inline-block">Processing Delivery</div>
            )}
          </div>

          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold uppercase mb-4">Payment Method</h2>
            <p className="mb-4">
              <strong>Method: </strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className="bg-green-50 text-green-700 rounded-md font-medium px-4 py-2 mt-4 inline-block">Paid</div>
            ) : (
              <div className="bg-yellow-50 text-yellow-700 rounded-md font-medium px-4 py-2 mt-4 inline-block">Pending Payment (COD)</div>
            )}
          </div>

          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold uppercase mb-4">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <p>Order is empty</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {order.orderItems.map((item, index) => (
                  <li key={index} className="py-4 flex">
                    <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />
                    <div className="ml-4 flex-1">
                      <Link to={`/product/${item.product}`} className="font-semibold text-lg hover:underline">{item.name}</Link>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold uppercase mb-6 border-b pb-4 border-gray-200">Order Summary</h2>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between">
                <span>Items:</span><span>${(order.itemsPrice || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span><span>${(order.shippingPrice || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-4">
                <span>Tax:</span><span>${(order.taxPrice || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>Total:</span><span>${(order.totalPrice || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
