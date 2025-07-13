export const MOBILE_THROTTLING_CONFIG = {
  cpuSlowdownMultiplier: 4,
  rttMs: 150,
  throughputKbps: 1600,
};

export const DESKTOP_THROTTLING_CONFIG = {
  cpuSlowdownMultiplier: 1,
  rttMs: 40,
  throughputKbps: 10240,
};

export const FAST3G = {
  cpuSlowdownMultiplier: 4,
  rttMs: 150,
  throughputKbps: 1600,
};

export const SLOW3G = {
  cpuSlowdownMultiplier: 6,
  rttMs: 400,
  throughputKbps: 400,
};

export const LTE = {
  cpuSlowdownMultiplier: 2,
  rttMs: 70,
  throughputKbps: 9000,
};