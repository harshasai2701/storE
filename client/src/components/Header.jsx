import { useState, useRef, useEffect } from 'react';
import { ShoppingBag, User, ChevronDown, Package, ClipboardList, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const [adminOpen, setAdminOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAdminOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">storE</span>
          </Link>

          <nav className="flex items-center gap-6">
            {/* Cart with item count badge */}
            <Link to="/cart" className="relative flex items-center gap-1 text-sm font-medium hover:text-gray-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-gray-900 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="flex items-center gap-4">
                {/* Admin Dropdown — only shown to admin users */}
                {userInfo.isAdmin && (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setAdminOpen((prev) => !prev)}
                      className="flex items-center gap-1 text-sm font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition-colors"
                    >
                      Admin
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${adminOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {adminOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                        <Link
                          to="/admin/productlist"
                          onClick={() => setAdminOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Package className="w-4 h-4 text-gray-400" />
                          Manage Products
                        </Link>
                        <Link
                          to="/admin/orderlist"
                          onClick={() => setAdminOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <ClipboardList className="w-4 h-4 text-gray-400" />
                          Manage Orders
                        </Link>
                        <Link
                          to="/admin/userlist"
                          onClick={() => setAdminOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Users className="w-4 h-4 text-gray-400" />
                          Manage Users
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Profile link */}
                <Link to="/profile" className="flex items-center gap-1 text-sm font-medium hover:text-gray-600 transition-colors">
                  <User className="w-5 h-5" />
                  <span>{userInfo.name.split(' ')[0]}</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={() => dispatch(logout())}
                  className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-sm font-medium hover:text-gray-600 transition-colors">
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

