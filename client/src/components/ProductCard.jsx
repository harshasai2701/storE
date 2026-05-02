import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="aspect-square w-full overflow-hidden bg-gray-100 rounded-lg transition duration-300 group-hover:opacity-75">
        <img
          src={product.image || 'https://via.placeholder.com/400x500?text=Product'}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.brand} - {product.name}</h3>
      <p className="mt-1 text-lg font-semibold text-gray-900">${product.price}</p>
    </Link>
  );
};

export default ProductCard;
