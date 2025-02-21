import fetch from 'node-fetch';

async function fetchAndProcessCSV() {
  const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/owlinventory-OGSmXzZoOKjpQqGV6TxDDwMK0axd1S.csv');
  const text = await response.text();
  
  // Parse CSV
  const rows = text.split('\n').map(row => row.split(','));
  const headers = rows[0];
  const data = rows.slice(1)
    .filter(row => row.length === headers.length)
    .map(row => {
      return {
        locationName: row[0],
        siteName: row[1],
        equipType: row[2],
        grade: row[3],
        available: row[4],
        size: row[5]
      };
    });

  console.log('Processed Data Sample:');
  console.log(JSON.stringify(data.slice(0, 2), null, 2));
  console.log(`Total Records: ${data.length}`);
}

fetchAndProcessCSV();