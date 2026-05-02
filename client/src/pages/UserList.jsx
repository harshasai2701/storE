import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      const fetchUsers = async () => {
        dispatch({ type: 'USER_LIST_REQUEST' });
        try {
          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const { data } = await axios.get('/api/users', config);
          dispatch({ type: 'USER_LIST_SUCCESS', payload: data });
        } catch (err) {
          dispatch({
            type: 'USER_LIST_FAIL',
            payload: err.response?.data?.message || err.message,
          });
        }
      };
      fetchUsers();
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Users</h1>
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
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">NAME</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">EMAIL</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ADMIN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users && users.map((user) => (
                <tr key={user._id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-gray-500">{user._id.substring(0, 10)}...</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    {user.isAdmin ? (
                      <span className="text-green-600 bg-green-50 px-2 py-1 rounded font-medium">Yes</span>
                    ) : (
                      <span className="text-red-600 bg-red-50 px-2 py-1 rounded font-medium">No</span>
                    )}
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

export default UserList;
