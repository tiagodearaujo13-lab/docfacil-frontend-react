# DocFacil.pt - Plataforma SaaS de Automação Jurídica

![Status](https://img.shields.io/badge/Status-Production-success)
![License](https://img.shields.io/badge/License-Proprietary-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

> **Micro-SaaS Fullstack** desenvolvido para automatizar a criação de contratos e documentos jurídicos em conformidade com a legislação portuguesa.

## Visão Geral

O **DocFacil.pt** resolve a complexidade burocrática para Freelancers e PMEs, permitindo gerar contratos blindados (Arrendamento, Trabalho, CPCV, etc.) em segundos através de um formulário inteligente.

A plataforma inclui um sistema completo de autenticação, gestão de subscrições (Stripe), geração de PDFs dinâmicos e armazenamento na nuvem.

** Live Demo:** [https://docfacil.pt](https://docfacil.pt)

---

## Tech Stack & Arquitetura

O projeto segue uma arquitetura moderna, desacoplada e escalável, com foco em performance e segurança.

### **Frontend (Client-Side)**
* **Framework:** React.js (Vite)
* **Styling:** CSS Modules (Scoped & Responsivo)
* **Routing:** React Router v6 (Protected Routes & Layouts)
* **PDF Engine:** `@react-pdf/renderer` (Client-side generation para privacidade)
* **Animations:** Intersection Observer API (Custom Hook)

### **Backend (Server-Side)**
* **Runtime:** Node.js
* **Framework:** Express.js (RESTful API)
* **Database:** PostgreSQL (Hospedado em Neon.tech)
* **ORM/Query:** `pg` (node-postgres) com queries parametrizadas (segurança contra SQL Injection)
* **Email:** Nodemailer (SMTP Integrado com cPanel)

### **Infraestrutura & Serviços**
* **Auth:** JWT (JSON Web Tokens) + Google OAuth 2.0
* **Payments:** Stripe API (Checkout, Webhooks & Customer Portal)
* **Hosting:**
    * Frontend: cPanel (Apache Rewrite Rules)
    * Backend: Render (Auto-Deploy CI/CD)

---

## Funcionalidades Principais

### 1. Motor de Documentos Inteligente
* Geração de PDFs em tempo real baseada em templates jurídicos parametrizáveis.
* Lógica condicional (ex: cláusulas de fiador ou exclusividade aparecem apenas se selecionadas).

### 2. Sistema de Subscrição (SaaS)
* Integração profunda com Stripe.
* Gestão de Planos (Free vs Pro).
* **Lógica de Negócio:** Utilizadores "Free" têm limite de 3 documentos/mês e marca d'água; "Pro" têm acesso ilimitado.

### 3. Segurança & Autenticação
* Login Híbrido: Email/Senha (com hash `bcrypt`) ou Google Account.
* Proteção de Rotas (`Middleware` no Backend e `Higher-Order Components` no Frontend).
* Gestão de Variáveis de Ambiente (`dotenv`) para chaves sensíveis.

### 4. Dashboard & Analytics
* Painel de controlo com estatísticas de uso em tempo real.
* Gestão de perfil e documentos salvos na nuvem.

---

## 📂 Estrutura do Projeto

```bash
/
├── backend/                 # API Node.js & Express
│   ├── server.js            # Entry point & Rotas
│   └── .env                 # Variáveis de Ambiente (Ignorado)
│
└── frontend/                # Aplicação React
    ├── src/
    │   ├── components/      # Componentes Reutilizáveis (UI)
    │   ├── contexts/        # Context API (Toast, Auth)
    │   ├── modelos/         # Lógica Jurídica dos Contratos (.js)
    │   ├── pages/           # Views/Páginas da Aplicação
    │   └── App.jsx          # Router Config
    └── vite.config.js       # Configuração de Build
