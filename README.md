# Análise Espacial - Progresso Social vs. PIB per capita (Brasil 2025)

**Desenvolvido para a disciplina CC0314 - Introdução à Análise Espacial (UFC).** 🎓

---

## 📌 Descrição
Painel interativo construído com React, Vite e TypeScript para visualização e análise exploratória de dados de correlação entre o Índice de Progresso Social (IPS) e o PIB per capita dos 5.570 municípios do Brasil, integrando o relatório compilado do R Markdown.

## 📋 Funcionalidades
- 📊 **Visualização de KPIs**: Exibição da média nacional de IPS, município com maior/menor progresso social e coeficiente de correlação linear de Pearson.
- 🏆 **Rankings**: Tabelas contendo o Top 5 e Últimos 5 municípios em qualidade de vida e seus respectivos valores de PIB per capita.
- 🌐 **Relatório Interativo**: Visualização embutida do relatório gerado via R Markdown contendo ferramentas de zoom e busca dinâmica.
- 🔍 **Filtros Dinâmicos**: Pesquisa por municípios e estados diretamente no painel interativo.

## 🚀 Tecnologias Utilizadas
- **React 18** ⚛️
- **Vite** ⚡
- **TypeScript** 📘
- **R Markdown** 📊

## 📂 Estrutura do Projeto
```
public/
│── relatorio.html (Relatório interativo Rmd compilado)
r_analysis/
│── Análise Espacial asd.R (Script R de tratamento)
│── Análise Espacial.Rmd (Arquivo R Markdown original)
src/
│── App.css (Estilos específicos do painel)
│── App.tsx (Componente principal do dashboard)
│── index.css (Estilos globais e design system)
│── main.tsx (Ponto de entrada do React)
│── vite-env.d.ts (Declaração de tipos)
package.json
tsconfig.json
vite.config.ts
LICENSE
```

## 🛠️ Configuração e Instalação
### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/EvaniIdo/Analise-Espacial.git
```
```bash
cd Analise-Espacial
```
### 2️⃣ Instalar dependências com NPM
```bash
npm install
```
### 3️⃣ Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
### 4️⃣ Compilar para produção
```bash
npm run build
```

## 📊 Fontes de Dados
- **IPSBrasil Dados**: Dados do Índice de Progresso Social do Brasil.
- **Link para Mapas Digitais**: Divisões e limites territoriais fornecidos pelo IBGE.
- **Dados IPSBrasil 2025 Primeiras Variáveis**: Microdados preliminares para o cálculo do IPS 2025.