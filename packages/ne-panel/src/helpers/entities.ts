import { getSecondaryHighlightColor } from '@spotlightdata/ne-helpers';

export const entityTypes = [
  {
    key: 'PERSON',
    text: 'People, including fictional.',
  },
  {
    key: 'NORP',
    text: 'Nationalities or religious or political groups.',
  },
  {
    key: 'FAC',
    text: 'Buildings, airports, highways, bridges, etc.',
  },
  {
    key: 'ORG',
    text: 'Companies, agencies, institutions, etc.',
  },
  {
    key: 'GPE',
    text: 'Countries, cities, states.',
  },
  {
    key: 'LOC',
    text: 'Non-GPE locations, mountain ranges, bodies of water.',
  },
  {
    key: 'PRODUCT',
    text: 'Objects, vehicles, foods, etc. (Not services.)',
  },
  {
    key: 'EVENT',
    text: 'Named hurricanes, battles, wars, sports events, etc.',
  },
  {
    key: 'WORK_OF_ART',
    text: 'Titles of books, songs, etc.',
  },
  {
    key: 'LAW',
    text: 'Named documents made into laws.',
  },
  {
    key: 'LANGUAGE',
    text: 'Any named language.',
  },
  {
    key: 'DATE',
    text: 'Absolute or relative dates or periods.',
  },
  {
    key: 'TIME',
    text: 'Times smaller than a day.',
  },
  {
    key: 'PERCENT',
    text: 'Percentage, including "%".',
  },
  {
    key: 'MONEY',
    text: 'Monetary values, including unit.',
  },
  {
    key: 'QUANTITY',
    text: 'Measurements, as of weight or distance.',
  },
  {
    key: 'ORDINAL',
    text: '"first", "second", etc.',
  },
  {
    key: 'CARDINAL',
    text: 'Numerals that do not fall under another type.',
  },
];

export const entityColors = entityTypes.reduce((dict, entry, i) => {
  dict[entry.key] = getSecondaryHighlightColor(i);
  return dict;
}, {});
