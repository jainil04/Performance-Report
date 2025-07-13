import { FAST3G, SLOW3G, DESKTOP_THROTTLING_CONFIG, MOBILE_THROTTLING_CONFIG, LTE } from "./constants.js";

export function getThrottlingProfile(profile) {
  const profiles = {
    fast3g: FAST3G,
    slow3g: SLOW3G,
    desktop: DESKTOP_THROTTLING_CONFIG,
    mobile: MOBILE_THROTTLING_CONFIG,
    lte: LTE,
    none: null, // No throttling
  };

  return profiles[profile] || profiles.desktop;
}
