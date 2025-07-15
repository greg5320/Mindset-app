import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./rating.css";

type Row = {
  rating: string;
  name: string;
  medalUrl: string;
};

function extractFileId(raw: string): string | null {
  const m = raw.replace(/&amp;/g, "&")
               .match(/[?&]id=([^&]+)/);
  return m ? m[1] : null;
}

export default async function RatingPage() {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY!;
  const sheetId = process.env.SHEET_ID!;
  const range = process.env.RANGE!;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/`
    + `${sheetId}/values/${range}`
    + `?majorDimension=ROWS&key=${apiKey}`;

  const res = await fetch(url);
  const text = await res.text();
  if (!res.ok) {
    console.error("Sheets API response:", text);
    throw new Error(`Sheets API error: ${res.status}`);
  }
  const json = JSON.parse(text) as { values: string[][] };
  const rowsAll = json.values ?? [];

  if (rowsAll.length < 2) {
    return (
      <>
        <Header />
        <main className="main">
          <h1 className="title">Рейтинг</h1>
          <p>Нет данных для отображения.</p>
        </main>
        <Footer />
      </>
    );
  }

  const data: Row[] = rowsAll.slice(1).map((r) => ({
    rating: r[0] || "",
    name: r[2] || "",
    medalUrl: r[3] || "",
  }));

  data.sort((a, b) => {
    const ra = parseFloat(a.rating) || 0;
    const rb = parseFloat(b.rating) || 0;
    return rb - ra;
  });

  return (
    <>
      <Header />
      <main className="main">
        <div className="titleSection">
          <h1 className="title">РЕЙТИНГ</h1>
        </div>
        <div className="tableContainer">
          <div className="tableWrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Рейтинг</th>
                  <th>Медаль</th>
                  <th>ФИО</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ rating, name, medalUrl }, i) => {
                  const fileId = extractFileId(medalUrl);
                  const src = fileId ? `/api/medal?id=${fileId}` : "";
                  return (
                    <tr key={i}>
                      <td>{rating}</td>
                      <td>
                        {src && (
                          <img
                            src={src}
                            alt="Медаль"
                            style={{
                              maxWidth: 60,
                              maxHeight: 60,
                              objectFit: "contain",
                            }}
                          />
                        )}
                      </td>
                      <td>{name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
