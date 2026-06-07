import { useState, useRef } from 'react';
import { 
  TrendingUp, 
  ExternalLink, 
  Globe, 
  BookOpen, 
  Maximize2,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'relatorio'>('inicio');
  const reportSectionRef = useRef<HTMLDivElement>(null);

  const scrollToReport = () => {
    setActiveTab('relatorio');
    setTimeout(() => {
      reportSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const topMunicipalities = [
    { rank: 1, name: 'Gavião Peixoto', uf: 'SP', score: 73.26, pib: 'R$ 248.661,57' },
    { rank: 2, name: 'Gabriel Monteiro', uf: 'SP', score: 71.29, pib: 'R$ 33.578,46' },
    { rank: 3, name: 'Jundiaí', uf: 'SP', score: 70.70, pib: 'R$ 126.200,85' },
    { rank: 4, name: 'Águas de São Pedro', uf: 'SP', score: 70.51, pib: 'R$ 52.645,58' },
    { rank: 5, name: 'Cândido Rodrigues', uf: 'SP', score: 70.26, pib: 'R$ 36.560,45' },
  ];

  const bottomMunicipalities = [
    { rank: 5570, name: 'Uiramutã', uf: 'RR', score: 37.59, pib: 'R$ 9.311,91' },
    { rank: 5569, name: 'Jacareacanga', uf: 'PA', score: 40.04, pib: 'R$ 24.237,79' },
    { rank: 5568, name: 'Amajari', uf: 'RR', score: 40.95, pib: 'R$ 15.567,22' },
    { rank: 5567, name: 'Bannach', uf: 'PA', score: 40.99, pib: 'R$ 30.561,79' },
    { rank: 5566, name: 'Alto Alegre', uf: 'RR', score: 41.07, pib: 'R$ 16.847,64' },
  ];

  return (
    <div className="app-container">
      <div className="gradient-blob blob-1"></div>
      <div className="gradient-blob blob-2"></div>
      <div className="gradient-blob blob-3"></div>

      <header className="app-nav">
        <a href="#" className="nav-brand">
          <span>IPS</span>
          IPS Brasil 2025
        </a>
        <nav>
          <ul className="nav-links">
            <li>
              <span 
                className={`nav-link ${activeTab === 'inicio' ? 'active' : ''}`}
                onClick={() => setActiveTab('inicio')}
              >
                Início
              </span>
            </li>
            <li>
              <span 
                className={`nav-link ${activeTab === 'relatorio' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('relatorio');
                  setTimeout(() => {
                    reportSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Relatório Interativo
              </span>
            </li>
            <li>
              <a 
                href="https://github.com/EvaniIdo/Analise-Espacial" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nav-link"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
        <button className="btn-cta" onClick={scrollToReport}>
          Ver Relatório <ChevronRight size={16} />
        </button>
      </header>

      <section className="hero-section animate-fade-in">
        <div className="hero-tag">
          Análise Espacial e Econômica
        </div>
        <h1 className="hero-title">
          Índice de Progresso Social <br />
          <span className="text-gradient-purple-cyan">Brasil 2025</span>
        </h1>
        <p className="hero-subtitle">
          Análise espacial exploratória da correlação entre o Índice de Progresso Social (IPS) 
          e o PIB per capita dos 5.570 municípios do Brasil.
        </p>
        <div className="hero-actions">
          <button className="btn-cta" onClick={scrollToReport} style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
            Explorar Painel Interativo <ChevronRight size={18} />
          </button>
          <a href="/relatorio.html" target="_blank" className="btn-secondary">
            Abrir Relatório Rmd <ExternalLink size={18} />
          </a>
        </div>
      </section>

      <section className="dashboard-section animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="section-header">
          <h2 className="section-title">Indicadores de Destaque</h2>
          <p className="section-subtitle">Visão geral da distribuição nacional</p>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card glass">
            <div className="stat-header">
              <span className="stat-title">Média Nacional IPS</span>
              <div className="stat-icon primary">
                <Globe size={18} />
              </div>
            </div>
            <div className="stat-value text-gradient-primary">58.71</div>
            <div className="bar-track" style={{ marginTop: '0.5rem' }}>
              <div className="bar-fill high" style={{ width: '58.71%' }}></div>
            </div>
            <p className="stat-desc">
              Pontuação média em escala de 0 a 100.
            </p>
          </div>

          <div className="stat-card glass">
            <div className="stat-header">
              <span className="stat-title">Maior Progresso Social</span>
              <span className="stat-badge primary">1º Lugar</span>
            </div>
            <div className="stat-value text-gradient-purple-cyan" style={{ fontSize: '1.8rem', lineHeight: '1.2' }}>
              Gavião Peixoto <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>(SP)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
              <span className="ranking-score high">73.26 IPS</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>| PIB: R$ 248k</span>
            </div>
            <p className="stat-desc">
              Melhor pontuação do ranking de qualidade de vida municipal.
            </p>
          </div>

          <div className="stat-card glass">
            <div className="stat-header">
              <span className="stat-title">Menor Progresso Social</span>
              <span className="stat-badge" style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--danger)' }}>5570º Lugar</span>
            </div>
            <div className="stat-value" style={{ fontSize: '1.8rem', lineHeight: '1.2', color: 'var(--danger)' }}>
              Uiramutã <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>(RR)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
              <span className="ranking-score low">37.59 IPS</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>| PIB: R$ 9,3k</span>
            </div>
            <p className="stat-desc">
              Menor pontuação registrada, com desafios estruturais e de saneamento básico.
            </p>
          </div>

          <div className="stat-card glass">
            <div className="stat-header">
              <span className="stat-title">Correlação Econômica</span>
              <div className="stat-icon secondary">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="stat-value text-gradient-primary">R = 0.73</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
              <span className="stat-badge" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--secondary-light)' }}>
                Correlação Positiva Forte
              </span>
            </div>
            <p className="stat-desc">
              Coeficiente estatístico de Pearson que indica a relação entre PIB per capita e progresso social.
            </p>
          </div>
        </div>

        <div className="rankings-section">
          <div className="ranking-card glass">
            <div className="ranking-header">
              <TrendingUp size={20} style={{ color: 'var(--success)' }} />
              Top 5 Municípios (Maior IPS)
            </div>
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Município</th>
                  <th>Estado</th>
                  <th>IPS</th>
                  <th>PIB per capita</th>
                </tr>
              </thead>
              <tbody>
                {topMunicipalities.map((mun) => (
                  <tr key={mun.rank}>
                    <td style={{ fontWeight: '700' }}>#{mun.rank}</td>
                    <td><span className="mun-name">{mun.name}</span></td>
                    <td>{mun.uf}</td>
                    <td>
                      <div className="bar-container">
                        <span className="ranking-score high">{mun.score}</span>
                        <div className="bar-track" style={{ width: '40px' }}>
                          <div className="bar-fill high" style={{ width: `${mun.score}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{mun.pib}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ranking-card glass">
            <div className="ranking-header">
              <TrendingDown size={20} style={{ color: 'var(--danger)' }} />
              Últimos 5 Municípios (Menor IPS)
            </div>
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Município</th>
                  <th>Estado</th>
                  <th>IPS</th>
                  <th>PIB per capita</th>
                </tr>
              </thead>
              <tbody>
                {bottomMunicipalities.map((mun) => (
                  <tr key={mun.rank}>
                    <td style={{ fontWeight: '700' }}>#{mun.rank}</td>
                    <td><span className="mun-name">{mun.name}</span></td>
                    <td>{mun.uf}</td>
                    <td>
                      <div className="bar-container">
                        <span className="ranking-score low">{mun.score}</span>
                        <div className="bar-track" style={{ width: '40px' }}>
                          <div className="bar-fill low" style={{ width: `${mun.score}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{mun.pib}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="report-section animate-fade-in" style={{ animationDelay: '0.4s' }} ref={reportSectionRef}>
        <div className="section-header">
          <h2 className="section-title">Análise de Dados Interativa</h2>
          <p className="section-subtitle">Visualizações e filtros interativos gerados a partir do R Markdown</p>
        </div>

        <div className="browser-frame">
          <div className="browser-header">
            <div className="browser-dots">
              <div className="browser-dot dot-red"></div>
              <div className="browser-dot dot-yellow"></div>
              <div className="browser-dot dot-green"></div>
            </div>
            <div className="browser-address">
              https://analise-espacial.pages.dev/relatorio.html
            </div>
            <div className="browser-actions">
              <a href="/relatorio.html" target="_blank" rel="noopener noreferrer" className="browser-btn" title="Abrir em Nova Aba">
                <Maximize2 size={16} />
              </a>
            </div>
          </div>
          <div className="iframe-container">
            <iframe 
              src="/relatorio.html" 
              title="Relatório Rmd Análise Espacial"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="dashboard-section" style={{ marginTop: '0', marginBottom: '2rem' }}>
        <div className="glass" style={{ padding: '2.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="stat-icon primary" style={{ width: '4rem', height: '4rem', borderRadius: '15px' }}>
            <BookOpen size={32} />
          </div>
          <div style={{ flex: '1', minWidth: '280px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Contexto do Projeto Acadêmico
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Trabalho desenvolvido para a disciplina de <strong>Introdução à Análise Espacial (CC0314)</strong>, ministrada pelo 
              <strong> Prof. Dr. Júlio Francisco Barros Neto</strong>. O estudo analisa a relação entre o PIB municipal e indicadores de progresso social.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: '1px solid var(--card-border)', paddingLeft: '2rem', minWidth: '200px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Autor</span>
            <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Marcus Vinicius (EvaniIdo)</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', marginTop: '0.5rem' }}>Disciplina</span>
            <span style={{ fontWeight: '500', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Análise Espacial (CC0314)</span>
          </div>
        </div>
      </section>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            &copy; {new Date().getFullYear()} <strong>Análise Espacial IPS Brasil</strong>.
          </div>
          <div className="footer-right">
            <a href="https://github.com/EvaniIdo/Analise-Espacial" target="_blank" rel="noopener noreferrer" className="footer-link">
              GitHub
            </a>
            <a href="/relatorio.html" target="_blank" className="footer-link">
              Relatório Rmd
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
