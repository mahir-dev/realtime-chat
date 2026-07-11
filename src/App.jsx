import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (name.trim()) setJoined(true);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const data = { name, text: message, time: new Date().toLocaleTimeString() };
    socket.emit('sendMessage', data);
    setMessage('');
  };

  if (!joined) {
    return (
      <div style={{ maxWidth: '400px', margin: '80px auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <h1>Join Chat</h1>
        <form onSubmit={handleJoin}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '8px', width: '80%' }}
            required
          />
          <button type="submit" style={{ padding: '8px 16px', marginTop: '10px' }}>
            Join
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Chat Room</h1>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', height: '350px', overflowY: 'auto', padding: '10px', marginBottom: '10px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '8px' }}>
            <strong>{msg.name}</strong> <span style={{ fontSize: '0.75rem', color: '#888' }}>{msg.time}</span>
            <p style={{ margin: '2px 0' }}>{msg.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;