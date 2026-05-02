import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: 'PRODUCT_CREATE_RESET' });

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
        <button
          onClick={createProductHandler}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 disabled:opacity-50"
          disabled={loadingCreate}
        >
          {loadingCreate ? 'Creating...' : '+ Create Product'}
        </button>
      </div>

      {errorDelete && <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">{errorDelete}</div>}
      {errorCreate && <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">{errorCreate}</div>}

      {loading || loadingDelete ? (
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
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">PRICE</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">CATEGORY</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">BRAND</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {products && products.map((product) => (
                <tr key={product._id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-gray-500">{product._id.substring(0, 10)}...</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${product.price}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.category}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.brand}</td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex gap-2 justify-end">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
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

export default ProductList;
