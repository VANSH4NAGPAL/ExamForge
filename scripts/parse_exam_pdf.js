const { PDFParse } = require('pdf-parse');
const fs = require('fs');

async function main() {
  const buf = fs.readFileSync('C:/Users/Vansh/Downloads/SNPS/ServiceNow_CSA_Study_Guide (1).pdf');
  const parser = new PDFParse({ verbosity: -1 });
  await parser.load(buf);
  const numPages = parser.numPages;
  console.log('Pages:', numPages);

  let allText = '';
  for (let i = 1; i <= numPages; i++) {
    const pageText = await parser.getPageText(i);
    allText += `\n\n--- PAGE ${i} ---\n` + pageText;
  }

  fs.writeFileSync('parsed_exam_pdf.txt', allText);
  console.log('Total chars:', allText.length);
  console.log('\n--- FIRST 5000 CHARS ---\n');
  console.log(allText.substring(0, 5000));
  parser.destroy();
}

main().catch(e => console.error(e));
