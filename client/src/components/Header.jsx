import { useState, useRef, useEffect } from 'react';
import { ShoppingBag, User, ChevronDown, Package, ClipboardList, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import ThemeToggle from './ThemeToggle';

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
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-bold text-2xl tracking-tighter text-gray-900 dark:text-white transition-colors">storE</span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            <ThemeToggle />
            
            {/* Cart with item count badge */}
            <Link to="/cart" className="relative flex items-center gap-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
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
                      className="flex items-center gap-1 text-sm font-semibold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                    >
                      Admin
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${adminOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {adminOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-100 dark:border-zinc-800 py-1 z-50">
                        <Link
                          to="/admin/productlist"
                          onClick={() => setAdminOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <Package className="w-4 h-4 text-gray-400" />
                          Manage Products
                        </Link>
                        <Link
                          to="/admin/orderlist"
                          onClick={() => setAdminOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <ClipboardList className="w-4 h-4 text-gray-400" />
                          Manage Orders
                        </Link>
                        <Link
                          to="/admin/userlist"
                          onClick={() => setAdminOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <Users className="w-4 h-4 text-gray-400" />
                          Manage Users
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Profile link */}
                <Link to="/profile" className="flex items-center gap-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{userInfo.name.split(' ')[0]}</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={() => dispatch(logout())}
                  className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
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

