// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PostFeed from './components/PostFeed';
import CreatePost from './components/CreatePost';
import ChatRoom from './components/ChatRoom';

function App() {
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);

  const addPost = (post) => setPosts([post, ...posts]);
  const addMessage = (msg) => setMessages([...messages, msg]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <CreatePost onPost={addPost} />
        <PostFeed posts={posts} />
        <ChatRoom messages={messages} onSend={addMessage} />
      </div>
    </div>
  );
}

export default App;


// components/Navbar.jsx
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 text-center font-bold text-xl">
      Community Zone
    </nav>
  );
}


// components/CreatePost.jsx
import React, { useState } from 'react';

export default function CreatePost({ onPost }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text && !image) return;
    onPost({ id: Date.now(), text, image });
    setText('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
        className="w-full border p-2 rounded mb-2"
      ></textarea>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
        className="mb-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Post
      </button>
    </form>
  );
}


// components/PostFeed.jsx
import React from 'react';

export default function PostFeed({ posts }) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded shadow">
          {post.text && <p className="mb-2">{post.text}</p>}
          {post.image && <img src={post.image} alt="" className="rounded" />}
        </div>
      ))}
    </div>
  );
}


// components/ChatRoom.jsx
import React, { useState } from 'react';

export default function ChatRoom({ messages, onSend }) {
  const [msg, setMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg) return;
    onSend({ id: Date.now(), text: msg });
    setMsg('');
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Group Chat</h2>
      <div className="max-h-60 overflow-y-auto space-y-1 mb-2">
        {messages.map((m) => (
          <div key={m.id} className="bg-gray-100 p-2 rounded">
            {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}


// index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
