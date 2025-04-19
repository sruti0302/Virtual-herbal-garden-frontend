import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Search,
  Leaf,
  MessageCircle,
  LogOut,
} from "lucide-react";
import "./dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState("subhadeepmishra100");
  const [forumPosts, setForumPosts] = useState([
    {
      title: "nklcknscnksskx",
      email: "subhadeep@gmail.com",
      replies: 1,
    },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-10">Ayurherb</h1>
          <nav className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 nav-link">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/dashboard/my-herbs" className="flex items-center space-x-2 nav-link">
              <Leaf size={20} />
              <span>My Herbs</span>
            </Link>
            <Link to="/dashboard/explore-herbs" className="flex items-center space-x-2 nav-link">
              <Search size={20} />
              <span>Explore Herbs</span>
            </Link>
            <Link to="/dashboard/gardening-tips" className="flex items-center space-x-2 nav-link">
              <Leaf size={20} />
              <span>Gardening Tips</span>
            </Link>
            <Link to="/dashboard/community-forum" className="flex items-center space-x-2 nav-link">
              <MessageCircle size={20} />
              <span>Community Forum</span>
            </Link>
            <Link to="/health" className="flex items-center space-x-2 nav-link">
              <MessageCircle size={20} />
              <span>Health Tips</span>
            </Link>
          </nav>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-green-900 mb-6">
          Welcome, {user}!
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-green-100 p-4 rounded shadow feature-card">
            <h3 className="font-semibold text-lg mb-1">View My Herbs</h3>
            <p className="text-sm text-gray-600">
              Check out your saved herbs and their details.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow feature-card">
            <h3 className="font-semibold text-lg mb-1">Explore New Herbs</h3>
            <p className="text-sm text-gray-600">
              Discover new herbs and their benefits.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow feature-card">
            <h3 className="font-semibold text-lg mb-1">Gardening Tips</h3>
            <p className="text-sm text-gray-600">
              Learn tips and tricks for herb gardening.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow feature-card">
            <h3 className="font-semibold text-lg mb-1">Community Forum</h3>
            <p className="text-sm text-gray-600">
              Join discussions with fellow herb enthusiasts.
            </p>
          </div>
        </div>

        {/* Community Forum */}
        <div className="bg-green-200 p-6 rounded">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            Community Forum
          </h3>
          <div className="space-y-4">
            {forumPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow text-sm"
              >
                <h4 className="font-bold text-gray-800 mb-1">{post.title}</h4>
                <p className="text-gray-600">
                  Started by {post.email} - {post.replies} replies
                </p>
              </div>
            ))}
          </div>
          <p className="text-right text-sm text-green-800 mt-4 cursor-pointer hover:underline">
            View All Discussions
          </p>
        </div>
      </main>
    </div>
  );
}
