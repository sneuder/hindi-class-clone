const freeTranslate = require('bing-translate-api');


const translate = (wordToTrans) => {
  return freeTranslate.translate(wordToTrans, null, 'hi');
}

const getNodeTexts = ($) => {
  return $('body').find('*:not(script):not(noscript):not(:has(noscript))').contents().filter(function() {
    return this.nodeType === 3 && /\S/.test(this.nodeValue);
  });
}

module.exports = {
  translate,
  getNodeTexts
}
