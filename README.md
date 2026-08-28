# Dmitry Starodubtsev — Portfolio.

Personal portfolio site built with Next.js 16. Covers production work, side projects, and the stack behind them.

## Projects featured

**Production**
- ERP Platform for K-12 Schools — multi-tenant Django + Celery + Next.js system with runtime-configurable RBAC and a tool-calling AI agent. Supports 3,200+ DAU and processes 500 AI-processed resumes per day at the 7th-largest Illinois K-12 district.
- Admissions & Career Platform — RAG pipeline with async document ingestion, OpenAI embeddings, Qdrant retrieval, cross-encoder reranking, and 100+ evaluation cases. 5 university partners at 95%+ retrieval accuracy across a 1K+ document corpus.
- Safety Straw — Node.js/Express and Stripe e-commerce backend with async order workflows, an AI support agent that automated 80%+ of inbound inquiries, and CI/CD that cut deployments to 5–8 minutes.

**Other**
- Multi-Agent Simulation Engine — 50k-agent real-time sim in C++23 + WebAssembly with a world-agnostic 4-tier stride scheduler.
- QuiKard — digital business card with Apple Wallet / NFC export.
- CourseChecker — verified university course review aggregator.
- Volunteer Matchmaker — composite-scoring match system with Ethereum donation tracking. SpartaHack XI Blockchain Track 3rd Place.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Framer Motion

## Running locally

```bash
npm install
npm run dev
```
