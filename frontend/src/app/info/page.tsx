"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./program.css";

export default function ProgramPage() {
  const [loading, setLoading] = useState(true);

  // список файлов
  const pdfFiles = [
    "License.pdf",
    "2. Положение об ОПД работников.pdf",
    "4. Положение об оценке вреда.pdf",
    "6. согласие на ОПД.pdf",
    "7. Политика в отношении ОПД.pdf",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
              {pdfFiles.map((file) => (
                <div key={file} className="pdf-container">
                  <iframe
                    src={`/${file}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="pdf-viewer"
                    title={file}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
