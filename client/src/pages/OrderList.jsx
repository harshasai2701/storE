import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      const fetchOrders = async () => {
        dispatch({ type: 'ORDER_LIST_REQUEST' });
        try {
          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const { data } = await axios.get('/api/orders', config);
          dispatch({ type: 'ORDER_LIST_SUCCESS', payload: data });
        } catch (err) {
          dispatch({
            type: 'ORDER_LIST_FAIL',
            payload: err.response?.data?.message || err.message,
          });
        }
      };
      fetchOrders();
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Orders</h1>
      {loading ? (
        <p className="animate-pulse tracking-widest font-semibold">Loading...</p>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
      ) : (
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">ID</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">USER</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">DATE</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">TOTAL</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">STATUS</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders && orders.map((order) => (
                <tr key={order._id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-gray-500">{order._id.substring(0, 10)}...</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.user && order.user.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.createdAt?.substring(0, 10)}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${order.totalPrice?.toFixed(2)}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    {order.isDelivered ? (
                      <span className="text-green-600 bg-green-50 px-2 py-1 rounded">Delivered</span>
                    ) : (
                      <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Processing</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <Link to={`/order/${order._id}`} className="text-blue-600 hover:underline">Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
