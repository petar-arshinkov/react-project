import Header from "./Header";

export default function Home() {

    return (
        <>
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow" >
                <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Recent Blog Posts</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                </div>

            </div>
        </>
    )

}