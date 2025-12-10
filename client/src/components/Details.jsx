import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { Heart } from "lucide-react"


const BASE_API_URL = 'http://localhost:3030/data/posts/';

export default function Details() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const navigate = useNavigate()
    const { user, isAuthenticated } = useContext(UserContext);

      const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${BASE_API_URL}${id}`);
                const data = await response.json();
                setPost(data);
                console.log('Fetched post details:', data);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        })();
    }, [id]);

    const deleteHandler = async () => {


        const isConfirmed = confirm(`Are you sure you want to delete this post: ${post.title}?`);

        if (!isConfirmed) {
            return;
        }

        try {
            await fetch(`${BASE_API_URL}${id}`, {
                method: 'DELETE'
            })
            navigate('/blog');

        } catch (error) {
            alert('Error deleting post:', error);
        }
    }

    return (<>
        <div className="min-h-screen py-12">
            <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">

                <div className="relative w-full mb-6 aspect-video rounded-xl overflow-hidden shadow-md bg-gray-200">
                    <img
                        src={post.imageUrl || 'https://placehold.co/800x600/cccccc/000000?text=No+Image+Available'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="border-b pb-4 mb-8">
                    <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">{post.title}</h1>
                </div>

                <div className="text-gray-700 leading-relaxed space-y-6 break-words">
                    <p>{post.body}</p>


                    {isAuthenticated && user._id === post._ownerId ? (<div className="pt-6 border-t mt-8 flex justify-end">

                        <button type="primary"
                            className="bg-red-500
                         hover:bg-red-600
                         text-white font-semibold
                         py-2
                         px-4
                         rounded-md
                         shadow-md
                         transition duration-150
                         focus:outline-none
                         focus:ring-2 focus:ring-red-400
                         focus:ring-opacity-50" onClick={deleteHandler}>
                            Delete
                        </button>
                        <button type="primary"
                            className="bg-green-500 
                        hover:bg-green-600 
                        text-white font-semibold 
                        py-2 
                        px-4
                        rounded-md 
                        shadow-md 
                        transition 
                        duration-150 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-green-400
                        focus:ring-opacity-50 
                        ml-3" >
                            <Link to={`/posts/edit/${id}`}>Edit</Link>
                        </button>

                    </div>) :
                        <div className="pt-6 border-t mt-8 flex justify-end">
                            <button 
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            onClick={toggleLike}
                            >
                                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                            </button> <span className="font-semibold">{isLiked ? 'Liked' : 'Like'}</span></div>
                    }

                </div>
            </div>
        </div >
    </>
    );
}