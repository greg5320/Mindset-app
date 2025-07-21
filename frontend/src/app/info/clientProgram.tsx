'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './program.css';

export default function ClientProgram() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pdfFiles = [
    'License.pdf',
    '2. Положение об ОПД работников.pdf',
    '4. Положение об оценке вреда.pdf',
    '6. согласие на ОПД.pdf',
    '7. Политика в отношении ОПД.pdf',
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        }
      }
    }
  }, [loading, pathname, searchParams]);

  return (
    <>
      <Header />
      <main className="program-page">
        <div className="program-container">
          <h1 className="program-title">СВЕДЕНИЯ ОБ ОРГАНИЗАЦИИ</h1>
          <h2 className="program-title">Лицензия</h2>
          {loading ? (
            <div className="program-loading">
              <div className="spinner" />
              <p>Загрузка...</p>
            </div>
          ) : (
            <div className="pdf-list">
              {pdfFiles.map((file, idx) => {
                const props = idx === 4 ? { id: 'policy-opd' } : {};
                return (
                  <div key={file} className="pdf-container" {...props}>
                    <iframe
                      src={`/${file}#toolbar=0&navpanes=0&scrollbar=0`}
                      className="pdf-viewer"
                      title={file}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
