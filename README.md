# Modern Chat Application


A responsive chat application with authentication, real-time messaging, and dark/light mode support.

## ✨ Features

- 🔐 User authentication (login/register)
- 💬 Real-time message exchange
- 🌗 Dark/light mode toggle
- 🎤 Voice-to-text message input
- 📥 Chat history export (JSON)
- 📱 Mobile-responsive design

## 🛠 Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Icons**: Lucide React
- **Build**: Vite

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

## 📁 Project Structure

```
src/
├── components/
│   ├── AuthForm.tsx      # Authentication UI
│   ├── Chat.tsx          # Main chat interface
│   ├── MessageBubble.tsx # Message component
│   └── VoiceButton.tsx   # Voice input component
├── context/
│   └── ThemeContext.tsx  # Theme management
├── hooks/
│   └── useAuth.tsx       # Authentication logic
├── utils/
│   └── exportChat.ts     # Chat export functionality
├── App.tsx               # Root component
└── main.tsx              # Entry point
```

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/8ed4700f-93df-4f7a-b76e-be371dc40149)

![image](https://github.com/user-attachments/assets/e2f640bb-8319-4626-af52-36bb60222f58)


