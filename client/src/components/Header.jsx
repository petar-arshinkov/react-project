import { useState } from 'react';
import { Link } from 'react-router';

// Define the navigation array outside the component
const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Blog', to: '/blog' },
    { name: 'Create Post', to: '/posts/create' },
    { name: 'Login', to: '/login' },
    { name: 'Register', to: '/register' },
    { name: 'Logout', to: '/logout' }
];

export default function Header(
    { user }
) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    console.log();

    return (
        <header className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            My Awesome Blog
                        </Link>
                    </div>


                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                >
                                    {item.name}
                                </Link>
                                
                            ))}

                            {user && (
                                
                                <div className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                                    Welcome, {user}
                                </div>
                            )}


                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded={isOpen}
                        >
                            {/* Conditional Icon Rendering */}
                            {isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content (Conditionally Rendered) */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.to}
                            className="block text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-3 py-2 rounded-md text-base font-medium"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}

