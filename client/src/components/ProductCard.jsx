import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="aspect-square w-full overflow-hidden bg-gray-100 dark:bg-zinc-900 rounded-xl transition duration-300 border border-transparent dark:border-zinc-800">
        <img
          src={product.image || 'https://via.placeholder.com/400x500?text=Product'}
          alt={product.name}
          className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105 group-hover:opacity-80"
        />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {product.brand} - {product.name}
      </h3>
      <p className="mt-1 text-lg font-bold text-gray-900 dark:text-zinc-100 transition-colors">
        ${product.price}
      </p>
    </Link>
  );
};


export default ProductCard;
