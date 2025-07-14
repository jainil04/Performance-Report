// src/utils/lighthouseUtils.js

/**
 * Maps shorthand keys to Lighthouse audit IDs and labels
 */
const AUDIT_KEYS = {
  fcp: 'first-contentful-paint',
  lcp: 'largest-contentful-paint',
  tbt: 'total-blocking-time',
  si: 'speed-index',
  cls: 'cumulative-layout-shift',
  tti: 'interactive',
  srt: 'server-response-time'
};

const LABELS = {
  fcp: 'FCP',
  lcp: 'LCP',
  tbt: 'TBT',
  si: 'SI',
  cls: 'CLS',
  tti: 'TTI',
  srt: 'SRT'
};

/**
 * Compute numeric averages for each metric across multiple Lighthouse runs.
 * @param {Array<Object>} runs
 * @returns {Object<string, number>}
 */
export function averageMetrics(runs) {
  const count = runs.length;
  const totals = Object.keys(AUDIT_KEYS).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});

  runs.forEach(run => {
    const { audits } = run;
    for (const key in AUDIT_KEYS) {
      const value = audits[AUDIT_KEYS[key]]?.numericValue;
      if (typeof value === 'number') totals[key] += value;
    }
  });

  return Object.keys(totals).reduce((avg, key) => ({
    ...avg,
    [key]: totals[key] / (count || 1)
  }), {});
}

/**
 * Format a numeric metric value into a human-readable string.
 * Time metrics -> seconds with one decimal, CLS -> three decimals.
 */
export function formatMetric(value, key) {
  if (key === 'cls') return value.toFixed(3);
  return (value / 1000).toFixed(1) + ' s';
}

/**
 * Compute and format average metrics, returning an array:
 * [{ key, label, numeric, display }]
 */
export function getAverageMetrics(runs) {
  const averages = averageMetrics(runs);
  return Object.keys(averages).map(key => ({
    key,
    label: LABELS[key] || key,
    numeric: averages[key],
    display: formatMetric(averages[key], key)
  }));
}

/**
 * Map a single Lighthouse run to an array of metric entries:
 * [{ key, label, value, display }]
 */
export function mapRunMetrics(run) {
  const { audits } = run;
  return Object.keys(AUDIT_KEYS).map(key => {
    const audit = audits[AUDIT_KEYS[key]] || {};
    return {
      key,
      label: LABELS[key] || key,
      value: audit.numericValue || 0,
      display: audit.displayValue || ''
    };
  });
}

/**
 * Map multiple runs into a 2D array: each run’s metrics array.
 * [[{...},...], [{...},...], ...]
 */
export function mapRunsMetrics(runs) {
  return runs.map(run => mapRunMetrics(run));
}
