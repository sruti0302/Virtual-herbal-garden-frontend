import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Search, BookOpen, Sprout, Leaf, MessageCircle, LogOut, Menu } from "lucide-react";
import "./dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState("subhadeepmishra100");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newsdata, setNewsdata] = useState(null);

  // Collapse sidebar by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "http://api.mediastack.com/v1/news?access_key=c9908f2c7f13c6de9816c1ca44a8021c&categories=health,science&languages=en&limit=2&countries=in&offset=10"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNewsdata(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-green-900 text-white p-6 flex flex-col justify-between transition-all duration-300`}
      >
        <div>
          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mb-6 text-white focus:outline-none"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          {!isCollapsed && <h1 className="text-3xl font-bold mb-10">Ayurherb</h1>}

          {/* Navigation Links */}
          <nav className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 nav-link" title="Home">
              <Home size={20} />
              {!isCollapsed && <span>Home</span>}
            </Link>
            <Link to="/dashboard/my-herbs" className="flex items-center space-x-2 nav-link" title="My Herbs">
              <Sprout size={20} />
              {!isCollapsed && <span>My Herbs</span>}
            </Link>
            <Link to="/dashboard/explore-herbs" className="flex items-center space-x-2 nav-link" title="Explore Herbs">
              <Search size={20} />
              {!isCollapsed && <span>Explore Herbs</span>}
            </Link>
            <Link to="/dashboard/gardening-tips" className="flex items-center space-x-2 nav-link" title="Gardening Tips">
              <Leaf size={20} />
              {!isCollapsed && <span>Gardening Tips</span>}
            </Link>
            <Link to="/community" className="flex items-center space-x-2 nav-link" title="Community Forum">
              <MessageCircle size={20} />
              {!isCollapsed && <span>Community Forum</span>}
            </Link>
            <Link to="/health" className="flex items-center space-x-2 nav-link" title="Health Tips">
              <MessageCircle size={20} />
              {!isCollapsed && <span>Health Tips</span>}
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Welcome, {user}!</h2>

        {/* News Section */}
        <section className="mt-12 bg-green-200 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-main-color">Latest News</h2>
          {newsdata?.data?.length > 0 ? (
            newsdata.data.map((article, index) => (
              <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-md">
                <h3 className="font-semibold text-lg">{article.title}</h3>
                <p className="text-gray-600">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Read more
                </a>
              </div>
            ))
          ) : (
            <p>Loading news articles...</p>
          )}
        </section>
      </main>
    </div>
  );
}
