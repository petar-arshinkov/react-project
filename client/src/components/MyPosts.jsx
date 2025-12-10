import { useEffect } from "react";
import Post from "./Post";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router";




export default function MyPosts() {


    const BASE_API_URL = 'http://localhost:3030/data/posts';

    const { user } = useContext(UserContext);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(BASE_API_URL);
                const data = await response.json();
                setPosts(Object.values(data).filter(post => post._ownerId === user._id));


            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        })();

    }, [user._id]);


    return <>

        {
            posts.length > 0
                ? (
                    <div className=" min-h-screen pt-8 pb-12">
                        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">Posts you have written</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {posts.map(post => <Post key={post._id} {...post} />)}
                        </div>
                    </div>

                ) : (<div className="min-h-screen pt-8 pb-12 text-center"><h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
                    No Blog Posts Yet</h2>

                     <button type="secondary" className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" >
                    <Link to="/posts/create">Create one?</Link>
                </button>
                    
                    </div>)
        }
    </>
}