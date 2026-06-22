# SBI Saathi AI 🤝

> **Banking Made Simple** — a friendly, multilingual agentic banking assistant
> built to help everyone bank with confidence, in their own language and at
> their own pace.

SBI Saathi AI is a production-ready web application that combines a premium
fintech experience with an empathetic, human-centric AI assistant. It guides
people through everyday banking — activating UPI, finding the right products,
discovering government schemes, and learning the basics — without the jargon.

---

## ✨ Tech Stack

| Layer        | Technology                                            |
| ------------ | ----------------------------------------------------- |
| Framework    | **Next.js 15** (App Router)                           |
| Language     | **TypeScript** (strict mode)                          |
| Styling      | **Tailwind CSS** + **Framer Motion**                  |
| Components   | **Shadcn UI** + **Radix UI** primitives               |
| Backend      | **Next.js API Routes** (Node serverless functions)    |
| Database     | **MongoDB** via **Mongoose**                          |
| AI           | **Google Gemini** / **OpenAI**                        |
| Voice        | **Web Speech API** (Speech-to-Text & Text-to-Speech)  |
| Charts       | **Recharts**                                          |

---

## 📁 Project Structure

```
sbi-saathi-ai/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (marketing)/           # Public landing experience      [Phase 3]
│   │   ├── assistant/             # AI chat assistant page         [Phase 4]
│   │   ├── recommendations/       # Product recommendation engine  [Phase 5]
│   │   ├── learn/                 # Financial literacy hub         [Phase 5]
│   │   ├── schemes/               # Government scheme advisor      [Phase 5]
│   │   ├── dashboard/             # Admin analytics dashboard      [Phase 5]
│   │   ├── api/                   # Serverless API routes
│   │   │   ├── chat/              # AI chat + agentic workflow     [Phase 4]
│   │   │   ├── recommendations/   # Profiling → recommendations    [Phase 5]
│   │   │   └── schemes/           # Eligibility matching           [Phase 5]
│   │   ├── globals.css            # Tailwind + design tokens       ✅ Phase 1
│   │   ├── layout.tsx             # Root layout + ThemeProvider     ✅ Phase 1
│   │   └── page.tsx               # Home (placeholder for now)      ✅ Phase 1
│   ├── components/
│   │   ├── ui/                    # Shadcn UI primitives
│   │   ├── layout/                # Navbar, Footer, AI Widget      [Phase 3]
│   │   ├── sections/              # Landing page sections          [Phase 3]
│   │   └── theme-provider.tsx     # Light/Dark theme provider       ✅ Phase 1
│   ├── lib/
│   │   ├── utils.ts               # cn() class merge helper         ✅ Phase 1
│   │   ├── db.ts                  # Mongoose connection            [Phase 2]
│   │   └── ai/                    # Agentic AI workflow helpers    [Phase 4]
│   ├── models/                    # Mongoose schemas               [Phase 2]
│   ├── types/                     # Shared TypeScript interfaces   [Phase 2]
│   └── hooks/                     # Custom React hooks (voice etc) [Phase 4]
├── public/                        # Static assets
├── components.json                # Shadcn UI config                ✅ Phase 1
├── tailwind.config.ts             # Tailwind + brand theme          ✅ Phase 1
├── tsconfig.json                  # TypeScript (strict)             ✅ Phase 1
├── next.config.mjs                                                  ✅ Phase 1
└── .env.example                   # Environment variable template   ✅ Phase 1
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js 18.18+** (Node 20/22 recommended)
- A **MongoDB** database (local or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier)
- An AI API key — **Gemini** ([Google AI Studio](https://aistudio.google.com/app/apikey)) _or_ **OpenAI**

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Then open `.env.local` and add your `MONGODB_URI` and one AI key
(`GEMINI_API_KEY` or `OPENAI_API_KEY`).

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Useful scripts

| Command             | What it does                       |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start the local dev server         |
| `npm run build`     | Production build                   |
| `npm run start`     | Run the production build           |
| `npm run lint`      | Lint the codebase                  |
| `npm run typecheck` | Type-check without emitting        |

---

## 🗺️ Build Roadmap

- ✅ **Phase 1** — Project foundation, config, design tokens
- ⏳ **Phase 2** — MongoDB schemas & TypeScript interfaces
- ⏳ **Phase 3** — Landing page + core layout (Navbar, Footer, AI Widget)
- ⏳ **Phase 4** — AI Assistant chat UI + agentic API route
- ⏳ **Phase 5** — Admin dashboard + remaining internal pages

---

> Built with empathy. SBI Saathi AI is an independent project and uses an
> SBI-_inspired_ palette for familiarity; it does not use official SBI assets.
