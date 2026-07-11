# Real-Time Chat App

A simple real-time chat application built with Socket.io, allowing multiple users to send and receive messages instantly without refreshing.

## Features
- Join chat with a display name
- Send and receive messages in real time across multiple clients
- Timestamps on each message

## Tech Stack
- **Frontend:** React, Vite, Socket.io-client
- **Backend:** Node.js, Express, Socket.io

## Running Locally

### Backend
\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

### Frontend
\`\`\`bash
npm install
npm run dev
\`\`\`

## What I Learned
This project introduced WebSocket-based communication as an alternative to traditional request/response APIs — understanding how persistent connections work, and how to broadcast events to all connected clients in real time.
