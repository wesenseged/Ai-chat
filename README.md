# AI Chat

A modern AI-powered chat application built using **React**, **Convex**, **Zustand**, **Tailwind CSS**, **Clerk**, and **ShadCN UI**. This app enables real-time, authenticated chat experiences with a clean and modular codebase.

## 📸 Preview
![Screenshot](https://github.com/wesenseged/Ai-chat/blob/main/public/screenshot.png)

---

## ✨ Features

- 💬 **Conversational AI** with real-time backend powered by Convex
- 🔐 **Authentication** via Clerk (sign-up, login, secure sessions)
- ⚛️ **Reactive UI** with Zustand for global state management
- 🎨 **Tailwind CSS + ShadCN UI** for beautiful and customizable components
- ⚡ **Modular architecture** with a clear separation of concerns

---

## 🛠️ Tech Stack

| Layer        | Technology                                                |
| ------------ | --------------------------------------------------------- |
| Frontend     | React                                                     |
| Styling      | Tailwind CSS, ShadCN UI                                   |
| State Mgmt   | Zustand                                                   |
| AI Providers | [Groq](https://groq.com), [Gemini](https://ai.google.dev) |
| Backend      | Convex                                                    |
| Auth         | Clerk                                                     |
| Linting      | ESLint                                                    |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-chat.git
cd ai-chat
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Setup Clerk

1. Go to [https://clerk.dev](https://clerk.dev) and create a project.
2. Copy your **Publishable Key**.
3. Create a `.env` file:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
```

### 4. Setup Convex

1. Install the Convex CLI:

```bash
npm install -g convex
```

2. Initialize Convex (if not already):

```bash
npx convex init
```

3. Deploy the backend:

```bash
npx convex deploy
```

### 5. AI Integration

This project supports both Groq and Gemini out-of-the-box via:

Add this to `.env` file

```bash
# AI Providers
VITE_GROQ_API_KEY=your_groq_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

5. Run the App

```bash
pnpm run dev
```

---

## 🧱 Project Structure

```
ai-chat/
├── convex/               # Convex backend functions
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components (ShadCN + custom)
│   ├── lib/              # Utility functions
│   ├── store/            # Zustand global state stores
│   ├── app.tsx           # Main App component
│   ├── main.tsx          # React root entry point
│   └── index.css         # Global styles (Tailwind base)
├── .env                  # Environment variables
├── .gitignore
├── package.json
├── eslint.config.mjs     # ESLint configuration
└── README.md
```

---

## 🧪 Future Plans

- 📜 Message streaming (OpenAI / Anthropic support)
- 🌍 i18n (multi-language support)
- 🔔 Notifications for new messages
- 🧩 Plugin/extension architecture for chat modules

---

## 📜 License

MIT License © 2025 Wesenseged
