import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useForm from "../hooks/useForm";
import useRequest from "../hooks/useRequest";

export default function Edit() {

    const editPostHandler = async () => {
        try {
            await request(`/data/posts/${id}`, "PUT", values);
            navigate(`/posts/view/${id}`);

        } catch (error) {
            alert(error.message);
        }


    }

    const {
        formAction,
        changeHandler,
        values,
        setValues
    } = useForm(editPostHandler, {
        tittle: "Lorem Ipsum",
        imageUrl: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Lorem Ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    })

    const BASE_API_URL = 'http://localhost:3030/data/posts/';
    const { id } = useParams();
    const navigate = useNavigate()
    const { request} = useRequest(`/data/posts/${id}`, {})

    useEffect(() => {

        fetch(`${BASE_API_URL}${id}`)
            .then(response => response.json())
            .then(result => {
                setValues(result)
            })
            .catch(error => {
                alert(error.message)
            })

    }, [id, setValues])




    return <div className="min-h-screen py-12 bg-gray-50">
        <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">

            <h2 className="text-3xl font-bold text-indigo-700 mb-8 border-b pb-4">Edit Post</h2>

            <form className="space-y-6" id="edit-form" action={formAction}>

                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Post Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        onChange={changeHandler}
                        value={values.title}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 sm:text-lg"
                        placeholder="Enter a descriptive title"
                    />
                </div>

                {/* Image URL Input */}
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                    </label>
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        onChange={changeHandler}
                        value={values.imageUrl}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 sm:text-lg"
                        placeholder="e.g., https://placehold.co/800x600/cccccc/000000?text=No+Image"
                    />
                    {/* Image Preview Area */}
                    <div className="relative w-full mt-4 aspect-video max-h-80 rounded-xl overflow-hidden shadow-md bg-gray-200">
                        <img
                            src={values.imageUrl || 'https://placehold.co/800x600/cccccc/000000?text=No+Image'}
                            alt="Image Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Body/Content Textarea */}
                <div>
                    <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                        Post Content
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        rows="10"
                        required
                        onChange={changeHandler}
                        value={values.body}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 sm:text-lg"
                        placeholder="Write the main content of your post here..."
                    ></textarea>
                </div>

                {/* Form Actions */}
                <div className="pt-6 border-t mt-8 flex justify-end space-x-4">
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
}