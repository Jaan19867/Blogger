import React, { useState } from "react"
import axios from "axios"

const CreatePost = () => {
  // State to manage form inputs
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate inputs
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content.")
      return
    }

    // Call the `onCreatePost` callback with the new post data

    const jwt= localStorage.getItem("token"); 
    console.log(jwt); 
  const response = await axios.post(
    "http://localhost:8787/api/v1/blog/create",
    {
      title,
      content,
      published: true,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`, // Include the token in the Authorization header
      },
      withCredentials: true, // Still include this if cookies are used for other purposes
    }
  )
     if(!response){
        console.log("post not created ") ; 

      }else{
       alert("post created ") ; 
        console.log(response)
        console.log("post created "); 
     }

    // Reset the form fields
    setTitle("")
    setContent("")
  }

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto  mt-[50px] ">
      <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title of your post"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Content Input */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            rows="5"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}

export default CreatePost
