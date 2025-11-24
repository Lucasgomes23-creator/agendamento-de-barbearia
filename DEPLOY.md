# Guia de Deploy - Barber Shop App

Este projeto é um Monorepo contendo o Backend (Node.js) e o Frontend (React). Para colocar o sistema online, você precisará fazer o deploy de cada parte separadamente.

## 1. Backend (Node.js) - Render.com

O **Render** é uma excelente opção gratuita para hospedar APIs Node.js.

1.  Crie uma conta no [Render](https://render.com/).
2.  Clique em **New +** e selecione **Web Service**.
3.  Conecte seu repositório do GitHub.
4.  Configure o serviço:
    *   **Root Directory**: `server`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
5.  Clique em **Create Web Service**.
6.  Copie a URL gerada (ex: `https://barber-shop-api.onrender.com`).

## 2. Frontend (React) - Vercel

A **Vercel** é a melhor opção para projetos React/Vite.

1.  Crie uma conta na [Vercel](https://vercel.com/).
2.  Clique em **Add New...** -> **Project**.
3.  Importe seu repositório do GitHub.
4.  Configure o projeto:
    *   **Framework Preset**: Vite
    *   **Root Directory**: `client` (Clique em Edit e selecione a pasta `client`)
    *   **Environment Variables**:
        *   Adicione uma variável para a URL da API (você precisará ajustar o código do frontend para usar essa variável em vez de `localhost:3000`).
        *   *Nota*: No código atual, a URL está fixa. Antes do deploy, altere em `client/src/components/BookingForm.jsx`:
            ```javascript
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            // Use API_URL nas chamadas fetch
            ```
5.  Clique em **Deploy**.

## 3. Ajuste Final (CORS)

Após o deploy do Frontend, você precisará adicionar a URL do seu site (ex: `https://minha-barbearia.vercel.app`) na configuração de CORS do Backend (`server/server.js`), ou permitir todas as origens (já configurado como padrão com `app.use(cors())`).
