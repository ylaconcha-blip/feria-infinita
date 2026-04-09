import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import proyectoMarkdown from '../data/proyecto.md?raw';
import { useEffect } from 'react';

function Proyecto() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.flourish.studio/resources/embed.js';
    script.async = true;
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0C0F08', paddingTop: '52px' }}>
      <style>{`
        .pmd h1, .pmd h2, .pmd h3, .pmd h4, .pmd h5, .pmd h6 {
          font-family: 'Bungee', sans-serif !important;
          font-style: normal !important;
          color: #C8F535 !important;
          margin-top: 2rem;
          margin-bottom: 0.8rem;
          letter-spacing: 0.04em;
        }
        .pmd h4 em, .pmd h4 i, .pmd h5 em, .pmd h5 i {
          font-style: normal !important;
          color: #C8F535 !important;
        }
        .pmd p { color: #EEF5D8 !important; font-size: 13px; line-height: 1.8; margin-bottom: 1.2rem; font-family: 'Space Mono', monospace; }
        .pmd strong, .pmd b { color: #C8F535 !important; }
        .pmd a { color: #C8F535 !important; text-decoration: none; border-bottom: 1px solid rgba(200,245,53,0.3); }
        .pmd blockquote { border-left: 2px solid #C8F535; padding: 12px 20px; background: #161A10; margin: 1.5rem 0; color: rgba(238,245,216,0.6); font-style: italic; font-family: 'Fraunces', serif; }
        .pmd img { border-radius: 3px; border: 1px solid rgba(200,245,53,0.2); max-width: 100%; }
        .pmd ul, .pmd ol { padding-left: 1.5rem; margin-bottom: 1.2rem; }
        .pmd li { color: #EEF5D8; font-size: 13px; line-height: 1.8; margin-bottom: 0.4rem; font-family: 'Space Mono', monospace; }
        .pmd hr { border: none; border-top: 1px solid rgba(200,245,53,0.15); margin: 2rem 0; }
        .pmd div { color: #EEF5D8; }
      `}</style>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{
          fontFamily: 'Bungee, sans-serif',
          fontSize: 'clamp(32px, 6vw, 56px)',
          color: '#EEF5D8',
          lineHeight: 0.9,
          marginBottom: '48px',
          letterSpacing: '0.02em',
        }}>
          EL <span style={{ color: '#C8F535' }}>PROYECTO</span>
        </div>

        <div className="pmd">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {proyectoMarkdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default Proyecto;