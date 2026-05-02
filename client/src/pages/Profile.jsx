import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listMyOrders());
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <p className="mb-2"><strong>Name:</strong> {userInfo?.name}</p>
            <p className="mb-2"><strong>Email:</strong> {userInfo?.email}</p>
            {userInfo?.isAdmin && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Admin
              </span>
            )}
          </div>
        </div>
        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold mb-4">My Orders</h2>
          {loadingOrders ? (
            <p className="animate-pulse tracking-widest font-semibold">Loading orders...</p>
          ) : errorOrders ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-md">{errorOrders}</div>
          ) : orders && orders.length > 0 ? (
            <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">DATE</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">TOTAL</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        <Link to={`/order/${order._id}`} className="hover:underline text-blue-600">
                          {order._id.substring(0, 10)}...
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.createdAt.substring(0, 10)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${order.totalPrice.toFixed(2)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {order.isDelivered ? (
                          <span className="text-green-600 bg-green-50 px-2 py-1 rounded">Delivered</span>
                        ) : (
                          <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Processing</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
              <p className="text-gray-500">You have no previous orders.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
