import { readFileSync } from 'fs-extra';

import {
  INITIAL_DATA_PATTERN, OUTPUT_TYPE_HTML, OUTPUT_TYPE_JSON,
} from './constants';

const templateFilepath = require.resolve('@relative-ci/webpack-bundle-stats-html-template');

export const createHTMLReport = (data) => {
  const template = readFileSync(templateFilepath, 'utf-8');
  return template.replace(INITIAL_DATA_PATTERN, `window.__INITIAL_DATA__ = ${JSON.stringify(data)}`);
};

export const createJSONReport = data => JSON.stringify(data, null, 2);

const REPORT_HANDLERS = {
  [OUTPUT_TYPE_HTML]: createHTMLReport,
  [OUTPUT_TYPE_JSON]: createJSONReport,
};

export const createReports = (initialData, types) => Promise.all(
  types.map(type => ({
    output: REPORT_HANDLERS[type](initialData),
    type,
  })),
);
