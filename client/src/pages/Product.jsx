import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link className="text-gray-900 font-semibold hover:underline mb-8 inline-block" to="/">
        &larr; Go Back
      </Link>
      {loading ? (
        <p className="animate-pulse tracking-widest font-semibold">Loading product...</p>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-900">
          <div className="aspect-square w-full overflow-hidden bg-gray-100 rounded-lg">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight mb-2">{product.name}</h1>
            <p className="text-xl font-medium mb-6">${product.price}</p>
            <p className="text-gray-700 mb-8 leading-relaxed max-w-xl">{product.description}</p>
            
            <div className="border border-gray-200 p-6 rounded-lg mb-8 max-w-sm">
              <div className="flex justify-between font-medium mb-4 pb-4 border-b">
                <span>Status:</span>
                <span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>
              
              {product.countInStock > 0 && (
                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium">Quantity:</span>
                  <select
                    className="block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm rounded-md"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <button
                onClick={addToCartHandler}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50"
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>Brand: <span className="text-gray-900 font-medium">{product.brand}</span></p>
              <p>Category: <span className="text-gray-900 font-medium">{product.category}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
