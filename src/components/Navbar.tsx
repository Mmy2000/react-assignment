
const Navbar = () => {

  return (
    <>
      <nav className="sticky z-[100] bg-white/75 h-14 inset-x-0 top-0 w-full border-b border-gray-200 backdrop-blur-lg transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between py-2 md:py-3 items-center">
            {/* Logo */}
            <div className="flex justify-center items-center space-x-3 lg:space-x-20 ">
              <div className="flex-shrink-0">
                <a href="/" className="flex items-center">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                    JSON <span className="text-green-600">Placeholder</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar