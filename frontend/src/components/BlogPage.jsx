import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [commentText, setCommentText] = useState("");

  const token = localStorage.getItem("token");

  // Fetch blogs function (can be reused)
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/blogs/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlogs(res.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (token) {
      fetchBlogs();
    }
  }, [token]);

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit blog to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token);
    

    if (!formData.title || !formData.content) return;

    try {
      await axios.post(
        "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/blogs/add",
        {
          title: formData.title,
          content: formData.content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh blogs after posting
      await fetchBlogs();
      setFormData({ title: "", content: "" }); // Reset form
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  // Like button
  const handleLike = (id) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id ? { ...blog, likes: (blog.likes || 0) + 1 } : blog
      )
    );
  };

  // Comment handling
  const handleComment = (id) => {
    if (commentText.trim() === "") return;
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id
          ? { ...blog, comments: [...(blog.comments || []), commentText] }
          : blog
      )
    );
    setCommentText("");
    setActiveCommentBox(null);
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen relative">
      <div className="absolute top-4 right-4 bg-white shadow-md rounded-full flex items-center p-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="ml-2">
          <h2 className="text-sm font-bold">Subha Deep Mishra</h2>
          <p className="text-xs text-gray-600">Kolkata, West Bengal</p>
        </div>
      </div>

      <div className="flex-grow p-6">
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
                    👍 {blog.likes || 0} Likes
                  </button>
                  <button
                    onClick={() =>
                      setActiveCommentBox(
                        activeCommentBox === blog.id ? null : blog.id
                      )
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    💬 {blog.comments?.length || 0} Comments
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
                {blog.comments && blog.comments.length > 0 && (
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
