import React, { useEffect } from 'react'
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Footer from './common/Footer';
import auth from '../config/firebase';



function Blogs() {

    const [blogs, setBlogs] = useState([]);
    // const [log, setLog] = useState("")
    const [admin, setAdmin] = useState(false)

    useEffect(()=> 
    {
        window.scrollTo(0, 0);
        

        auth.onAuthStateChanged(function(user)
        { 
         if(user)
         {
           // console.log(user.uid)
           if(user.uid === "RSxl9wcjWPX3IhmfNjgx9ryivXi2")
           {
             console.log("he is Admin")
             setAdmin(true)
           }
           else
           {
             console.log("Not an Admin")
             setAdmin(false)
           }
         }
         else
         {
          console.log("User Logged Out")
        //   setLog(false)
         }
        }
        ) 


        // axios.get("https://blog-project-starter-backend.vercel.app/api/blogs").then((res)=>
        // axios.get("http://localhost:5000/api/blogs").then((res)=>
        axios.get("peer-backend-7tn3.vercel.app/api/blogs").then((res)=>
        {
            console.log(res.data)
            setBlogs(res.data)
        }
        ).catch(()=> 
        {
            console.log("Error fetching data")
        }
        )

    },[]
    )



    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');


    const handleLike = async (blog_id) => {
        try {
            // const response = await axios.patch(`https://blog-project-starter-backend.vercel.app/api/blogs/like/${blog_id}`);
            // const response = await axios.patch(`http://localhost:5000/api/blogs/like/${blog_id}`);
            const response = await axios.patch(`peer-backend-7tn3.vercel.app/api/blogs/like/${blog_id}`);
            // After successfully updating the likes count in the backend, fetch the updated list of blogs
            if (response.status === 200) {
                // axios.get("https://blog-project-starter-backend.vercel.app/api/blogs").then((res) => {
                    axios.get("peer-backend-7tn3.vercel.app/api/blogs").then((res) => {
                    console.log(res.data)
                    setBlogs(res.data)
                }).catch(() => {
                    console.log("Error fetching data")
                })
            }
        } catch (error) {
            console.error('Error liking the blog post:', error);
        }
    };

    const handleNewBlogSubmit = (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
        console.log("FORM SUBMITTED ✅"); // 👈 add this
        const today = new Date();
        const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });


        const likes = 0
        // axios.post("https://blog-project-starter-backend.vercel.app/api/blogs", { newTitle, date, newContent, likes }).then((res) => {
            axios.post("peer-backend-7tn3.vercel.app/api/blogs", { newTitle, date, newContent, likes }).then((res) => {
            console.log(res.data)

            // axios.get("https://blog-project-starter-backend.vercel.app/api/blogs").then((res) => {
                axios.get("peer-backend-7tn3.vercel.app/api/blogs").then((res) => {
                console.log(res.data)
                setBlogs(res.data)
            }).catch(() => {
                console.log("Error fetching data")
            })

        });




        setNewTitle('');
        setNewContent('');
    };

    return (
        <div className="blog-section py-14">
            <h2 className="text-center text-5xl font-bold mb-14"> <span className='text-blue-400'>Peer Project Hub</span> </h2>

            {/* Blog creation form */}
            {admin?
            <div className="blog-creation-form mb-8" style={{ width: "80%", margin: "auto" }}>
                <form onSubmit={handleNewBlogSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                    <textarea
                        placeholder="Paste your project here..."
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="p-2 border rounded"
                        rows="4"
                        required
                    />
                    <button type="submit" className="bg-blue-400 text-white p-2 rounded hover:bg-green-600">
                        Add Project
                    </button>
                </form>
            </div> 
             :
            ""  
             }

            <div className="blogs-container grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-post mb-8 p-6 bg-white shadow-lg rounded-lg">
                        <h3 className="blog-title font-semibold text-2xl text-gray-800 mb-3">{blog.newTitle}</h3>
                        <p className="blog-date text-gray-400 text-sm mb-4">{blog.date}</p>
                        <p className="blog-content text-gray-600 mb-4">{blog.newContent}</p>
                        <span className="text-blue-500 cursor-pointer" onClick={() => handleLike(blog._id)}>Like</span>
                        <span className="ml-2">{blog.likes} Likes</span>
                    </div>
                ))}
            </div>
<br />
            <Footer/>
        </div>
    );
}

export default Blogs