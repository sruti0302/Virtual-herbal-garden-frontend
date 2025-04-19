import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Search,
  BookOpen ,
  Sprout ,
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

//   const apiUrl = 'http://api.mediastack.com/v1/news?access_key=c9908f2c7f13c6de9816c1ca44a8021c' ;
//   let newsdata={};

// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('API Data:', data.data);
//     newsdata=data;
//     console.log(newsdata.data);
    
//     // You can process and display the data here
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });


const [newsdata, setNewsdata] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://api.mediastack.com/v1/news?access_key=c9908f2c7f13c6de9816c1ca44a8021c&categories=health,science&languages=en&limit=2&countries=in&offset=10");
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
      <aside className="w-64 bg-green-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-10">Ayurherb</h1>
          <nav className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 nav-link">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/dashboard/my-herbs" className="flex items-center space-x-2 nav-link">
              <Sprout  size={20} />
              <span>My Herbs</span>
            </Link>
            <Link to="/" className="flex items-center space-x-2 nav-link">
              <Search size={20} />
              <span>Explore Herbs</span>
            </Link>
            <Link to="/gardeningtips" className="flex items-center space-x-2 nav-link">
              <Leaf size={20} />
              <span>Gardening Tips</span>
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
          <Link to="" className="bg-green-100 p-7 rounded shadow feature-card">
          <Sprout  size={40} />
            <h3 className="font-semibold text-xl mb-1">View My Herbs</h3>
            <p className="text-sm text-gray-600">
              Check out your saved herbs and their details.
            </p>
          </Link>
          <Link to="/" className="bg-green-100 p-7 rounded shadow feature-card">
          <BookOpen size={40} />
            <h3 className="font-semibold text-xl mb-1">Explore New Herbs</h3>
            <p className="text-sm text-gray-600">
              Discover new herbs and their benefits.
            </p>
          </Link>

          <Link to="/gardeningtips" className="bg-green-100 p-7 rounded shadow feature-card">
          <Leaf size={40} />
            <h3 className="font-semibold text-xl mb-1">Gardening Tips</h3>
            <p className="text-sm text-gray-600">
              Learn tips and tricks for herb gardening.
            </p>
          </Link>
          <div className="bg-green-100 p-7 rounded shadow feature-card">
            <h3 className="font-semibold text-lg mb-1">Community Forum</h3>
            <p className="text-sm text-gray-600">
              Join discussions with fellow herb enthusiasts.
            </p>
          </div>
        </div>

        


        {/* News Section */}

        <section className="mt-12 bg-green-200 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-main-color">
            Latest News
          </h2>
          {newsdata && newsdata.data ? (
        newsdata.data.map((article, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-white rounded-lg shadow-md"
          >
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
