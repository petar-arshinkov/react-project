import { useEffect } from "react";
import Post from "./Post";
import { useState } from "react";


const BASE_API_URL = 'http://localhost:3030/data/posts';
// "http://localhost:3030/jsonstore/blog/posts/"

export default function Blog() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(BASE_API_URL);
                const data = await response.json();
                setPosts(Object.values(data));


            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        })();

    }, []);

    return (
        <>

            {
                posts.length > 0
                    ? (
                        <div className=" min-h-screen pt-8 pb-12">
                            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">Full Blog Catalog</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {posts.map(post => <Post key={post._id} {...post} />)}
                            </div>
                        </div>

                    ) : ( <div className="min-h-screen pt-8 pb-12"><h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">No Blog Posts Yet</h2></div>)
            }
        </>
    )

}
