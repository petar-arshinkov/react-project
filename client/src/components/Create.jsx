import { useNavigate } from "react-router";



export default function Create() {

    const BASE_API_URL = 'http://localhost:3030/data/posts';
    // "http://localhost:3030/jsonstore/blog/posts/"
    const navigate = useNavigate();

    const createPostHandler = async (e) => {
        e.preventDefault();


        const formData = new FormData(e.target);
        const postData = Object.fromEntries(formData);

        try {
            const response = await fetch(BASE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            const result = await response.json()
            console.log('Created new post:', result);
            navigate('/blog');
        } catch (error) {
            alert('Error creating post:', error);
        }

    }
    return (
        <div className="min-h-screen py-12" >
            <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">Create New Blog Post</h2>
                <form className="space-y-6" onSubmit={createPostHandler}>
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            placeholder="Your catchy title here"
                            name="title"
                        />
                    </div>

                    {/* Image URL Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="imageUrl">Image URL</label>
                        <input
                            id="imageUrl"
                            type="url"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            placeholder="e.g., https://example.com/image.jpg"
                            name="imageUrl"
                        />
                    </div>

                    {/* Full Content Textarea */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="content">Full Content</label>
                        <textarea
                            id="content"
                            rows="10"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            placeholder="Write your amazing content here..."
                            name="body"
                        />
                    </div>

                    {/* Buttons (assuming Button component is imported) */}
                    <div className="flex justify-end space-x-4">
                        {/* Note: I've replaced Button/PlusCircle with plain button tags for a 'pure' template, you may need to adjust this depending on your Button component */}
                        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150">
                            Publish Post
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
}