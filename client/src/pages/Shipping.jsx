import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Shipping Information</h2>
      <form onSubmit={submitHandler} className="space-y-6 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-900">Address</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 px-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">City</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 px-3"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Postal Code</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 px-3"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Country</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 px-3"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Shipping;
