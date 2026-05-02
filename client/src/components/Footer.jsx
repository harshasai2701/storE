const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-gray-200 py-8 text-center mt-auto">
      <p className="text-gray-500 text-sm">
        &copy; {year} storE. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
