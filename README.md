# NetXyper — Enterprise Cloud & AWS Architecture Platform

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![AWS Certified](https://img.shields.io/badge/AWS-Certified%20Architecture-FF9900?logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-22C55E?logo=github-actions&logoColor=white)](https://pages.github.com/)

**NetXyper** is a production-grade enterprise cloud consulting, infrastructure engineering, and interactive architecture design platform. Built with modern React 19, TypeScript, and FastAPI, it delivers interactive cloud visualization tools, real-time cost estimation, Well-Architected validation, and an AI-assisted cloud architectural companion.

---

## 🌟 Key Features

### 1. 🏗️ Interactive AWS Architecture Designer
- **Drag-and-Drop Canvas**: Build custom AWS topologies with official AWS service categories (Compute, Database, Storage, Networking, Security, Analytics, AI/ML, Integration).
- **Well-Architected Validation Engine**: Automated checks across Reliability, Security, Cost Optimization, and Performance pillars.
- **Export Capabilities**: Export diagrams as high-resolution PNG images, or generate Terraform / AWS CloudFormation templates.
- **Project Persistence**: Save, load, and version architecture blueprints locally or through the FastAPI backend.

### 2. 💰 FinOps & Cloud Cost Calculator
- Real-time monthly AWS expenditure forecasting for compute (EC2), databases (Aurora, RDS), containerized workloads (ECS Fargate), and storage (S3).
- Instant savings comparisons across On-Demand, 1-Year Savings Plans, and 3-Year All-Upfront commitments.

### 3. 🤖 AWS Cloud Architectural Assistant
- Embedded floating AI assistant powered by Groq (Qwen 3.8 / Llama 3) with an instant, graceful fallback to the built-in offline **NetXyper Cloud Knowledge Engine**.
- Context-aware recommendations for zero-downtime database migration (AWS DMS), exam/admission peak traffic scaling (ALB + ASG), and private document RAG (Amazon Bedrock).

### 4. 🚀 Zero-Downtime Migration & Case Studies
- Proven migration workflows for enterprise & educational campus IT (15,000+ concurrent student traffic peaks).
- Rehearsed cutover runbooks, automated rollback procedures, and client testimonials.

### 5. 📋 Enterprise Audit & Scoping Modals
- Interactive infrastructure audit booking modal with downloadable migration playbooks.
- Contact and proposal inquiry management stored with local and API submission support.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/) with relative base asset resolution (`./`)
- **Canvas / Diagramming**: [@xyflow/react](https://reactflow.dev/) (React Flow)
- **Icons**: [lucide-react](https://lucide.dev/) + [react-aws-icons](https://github.com/aws/aws-icons)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Visual Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti), [html-to-image](https://www.npmjs.com/package/html-to-image)
- **Linting**: [Oxlint](https://oxc.rs/) for blazing-fast lint analysis

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Server**: [Uvicorn](https://www.uvicorn.org/)
- **Database**: SQLite (built-in local) with PostgreSQL compatibility
- **Data Validation**: [Pydantic v2](https://docs.pydantic.dev/)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18.x or v20+ (v20+ recommended)
- **npm**: v9+
- *(Optional for backend)* **Python**: 3.10+

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
npm install
```

### 2. Environment Configuration

Copy the example environment template:

```bash
cp .env.example .env
```

Edit `.env` to supply optional credentials:

```env
# Optional: Live Groq API key for the AI Assistant.
# If left empty, the assistant seamlessly uses the built-in offline Cloud Knowledge Engine.
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### 3. Start Frontend Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:8000` (or the port specified in terminal output).

---

## 🐍 Backend API Setup (Optional)

The architecture diagram persistence and server-side validation can run locally via FastAPI:

```bash
cd backend
python -m venv venv

# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Interactive Swagger API documentation will be available at: `http://127.0.0.1:8000/docs`

---

## 📦 Building for Production

To create a type-checked, optimized production bundle:

```bash
npm run build
```

The production assets will be output to the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

---

## 🚢 Automated GitHub Pages Deployment

This repository includes a preconfigured GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### To enable GitHub Pages:
1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to `main` (or `master`) will automatically build and publish your site!

---

## 🔒 Security Best Practices

- **Zero Hardcoded Secrets**: Sensitive API keys and credentials are strictly excluded via `.gitignore` and handled through `.env`.
- **Sanitized Repository**: Database `.db` binaries, OS files, and Python `__pycache__` artifacts are untracked.
- **Safe Fallback**: All interactive components degrade gracefully without requiring live third-party API tokens.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
