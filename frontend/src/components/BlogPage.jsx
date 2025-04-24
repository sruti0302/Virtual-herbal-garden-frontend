import React, { useState } from "react";

const BlogPage = () => {
  console.log("BlogPage rendered");
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [activeCommentBox, setActiveCommentBox] = useState(null); // Track which post's comment box is active
  const [commentText, setCommentText] = useState(""); // Track the comment text

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.content) {
      const newBlog = { ...formData, id: Date.now(), likes: 0, comments: [] };
      setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
      setFormData({ title: "", description: "", content: "" });
    }
  };

  const handleLike = (id) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    );
  };

  const handleComment = (id) => {
    if (commentText.trim() === "") return; // Prevent empty comments
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id
          ? { ...blog, comments: [...blog.comments, commentText] }
          : blog
      )
    );
    setCommentText(""); // Clear the comment input
    setActiveCommentBox(null); // Close the comment box
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen relative">
      {/* Profile in Top-Right Corner */}
      <div className="absolute top-4 right-4 bg-white shadow-md rounded-full flex items-center p-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="ml-2">
          <h2 className="text-sm font-bold">Subha Deep Mishra</h2>
          <p className="text-xs text-gray-600">Kolkata, West Bengal</p>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-grow p-6">
        {/* Start a Post */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-4 mb-6"
        >
          <h2 className="text-lg font-semibold mb-4">Start a post</h2>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter blog description"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="What do you want to talk about?"
            rows="4"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Post
          </button>
        </form>

        {/* Blog Feed */}
        <div className="space-y-6">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-600">
              No posts yet. Be the first to share something!
            </p>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold text-green-700 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4">{blog.content}</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLike(blog.id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    👍 {blog.likes} Likes
                  </button>
                  <button
                    onClick={() =>
                      setActiveCommentBox(
                        activeCommentBox === blog.id ? null : blog.id
                      )
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    💬 {blog.comments.length} Comments
                  </button>
                </div>
                {activeCommentBox === blog.id && (
                  <div className="mt-4">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      rows="2"
                      className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button
                      onClick={() => handleComment(blog.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                      Post Comment
                    </button>
                  </div>
                )}
                {blog.comments.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Comments:
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {blog.comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
