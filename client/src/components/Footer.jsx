const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 py-8 text-center mt-auto transition-colors duration-300">
      <p className="text-gray-500 dark:text-zinc-500 text-sm">
        &copy; {year} storE. All rights reserved.
      </p>
    </footer>
  );
};


export default Footer;
