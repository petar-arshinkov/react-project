import { useEffect } from "react";
import Post from "./Post";
import { useState } from "react";

export default function Home() {

    const BASE_API_URL = 'http://localhost:3030/data/posts';
    // "http://localhost:3030/jsonstore/blog/posts/"
    const [latestPosts, setLatestPosts] = useState([]);
  

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(BASE_API_URL);
                const data = await response.json();
                console.log('Fetched blog posts:', data);
               
                setLatestPosts(Object.values(data).slice(-4).reverse());
                


            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        })();

    }, []);

    return (

        <>

            {
                latestPosts.length > 0
                    ? (
                        <div className="min-h-screen pt-8 pb-12">
                            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">Recent Blog Posts</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {latestPosts.map(post => <Post key={post._id} {...post} />)}
                            </div>
                        </div>

                    ) : (<div className="min-h-screen pt-8 pb-12"><h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">No Blog Posts Yet</h2></div>)
            }
        </>
    )

}