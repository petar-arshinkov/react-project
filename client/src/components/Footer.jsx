export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-800 text-white mt-8 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm mb-2 opacity-80">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="text-sm font-light text-gray-400">
                    &copy; {currentYear} ClientDashboard. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
