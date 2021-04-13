const createKeywords = (stringToSplit) => {
  if (!stringToSplit || stringToSplit === '') return [];

  const arrString = [];
  let currString = '';
  stringToSplit
    .toLowerCase()
    .split('')
    .forEach((letter) => {
      currString += letter;
      arrString.push(currString);
    });
  return arrString;
};

const splitComposerName = (composer) => {
  if (composer === '') return ['', ''];

  const composerNames = [];
  composerNames.push(composer.substr(0, composer.indexOf(' ')));
  composerNames.push(composer.substr(composer.indexOf(' ') + 1));

  return composerNames;
};

const stringsToWords = (stringToSplit) => {
  let keywords = createKeywords(stringToSplit);

  keywords = [];
  const keywordsArray = stringToSplit.split(/[\s\.\n]+/);
  const keywordsSearchTerms = keywordsArray.map(createKeywords);
  keywordsSearchTerms.forEach((c) => {
    keywords = [...keywords, ...c];
  });

  return keywords;
};

export const generateSearchTermArray = (material) => {
  const { title, composer, comments, seriesNumber, type } = material;
  const [composerFirstName, composerLastName] = splitComposerName(composer);
  const keywordsSeriesNumber = stringsToWords(seriesNumber);
  const keywordsTitle = stringsToWords(title);
  const keywordsType = stringsToWords(type);

  const keywordsComposerFirst = stringsToWords(composerFirstName);
  const keywordsComposerLast = stringsToWords(composerLastName);

  let keywordsComments = stringsToWords(comments);

  return [
    ...new Set([
      '',
      ...keywordsSeriesNumber,
      ...keywordsTitle,
      ...keywordsType,
      ...keywordsComposerFirst,
      ...keywordsComposerLast,
      ...keywordsComments,
    ]),
  ];
};
