const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { translate, getNodeTexts } = require('./services');

const folderPath = '../institution'; // Ruta de la carpeta que deseas leer
const extension = '.html'; // Extensión de los archivos que deseas leer

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error al leer la carpeta:', err);
    return;
  }

  // Filtramos solo los archivos con la extensión especificada
  const htmlFiles = files.filter((file) => path.extname(file) === extension);

  for (const file of htmlFiles) {
    const filePath = path.join(folderPath, file);
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);

    const textNodes = getNodeTexts($);

    (async () => {
      for (textNode of textNodes) {
        try {
          const englishText = $(textNode).text().trim();
          const text = await translate(englishText);
          const hiText = text.translation;

          console.log(hiText);

          textNode.data = hiText;

          const translatedHTML = $.html();
          fs.writeFileSync('../rankings.html', translatedHTML);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }
});
