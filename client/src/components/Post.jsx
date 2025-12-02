export default function Post(
    {
        id,
        title,
        body
    }
) {

    return (<>
        <div key={id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col justify-between h-full">
            <div>
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h3>

                <p className="text-gray-600 mb-4 text-sm">{body}</p>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
                <button type="secondary" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" >
                    View
                </button>
                <button type="primary" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50" >
                    Edit
                </button>
            </div>
        </div >
    </>
    );

}



