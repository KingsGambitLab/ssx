import { cookies } from "next/headers";
import { ABEX_FLAG_CONFIG } from "./constants";
import { getAbExperimentVariant } from "./api";

const EXPERIMENTS_COOKIE = "experiments";

interface AbexPayload {
  flagkey: string;
}

const bottomNavbarAbexPayload: AbexPayload = {
  flagkey: ABEX_FLAG_CONFIG.BOTTOM_NAVBAR.KEY,
};

export const getAllExperiments = async () => {
  const cookieStore = await cookies();
  const experimentsCookieValue = cookieStore.get(EXPERIMENTS_COOKIE)?.value;
  const experiments = getCurrentExperiments(experimentsCookieValue as string);
  const bottomNavbarVariant = experiments[bottomNavbarAbexPayload.flagkey];

  const fetchExperiments = [];

  if (!bottomNavbarVariant) {
    experiments[ABEX_FLAG_CONFIG.BOTTOM_NAVBAR.KEY] = ABEX_FLAG_CONFIG.BOTTOM_NAVBAR.DEFAULT_VARIANT;
    fetchExperiments.push(getAbExperimentVariant(bottomNavbarAbexPayload));
  }

  if (fetchExperiments.length) {
    try {
      const serverPromiseResults = await Promise.allSettled(fetchExperiments);
      serverPromiseResults.forEach((result) => {
        if (result.status === "fulfilled") {
          const { flagKey, variantKey } = result.value as {
            flagKey: string;
            variantKey: string;
          };
          if(variantKey) {
            experiments[flagKey] = variantKey;
          }
        }
      });
    } catch (error) {
      //eslint-disable-next-line no-console
      console.error("Failed to fetch or set experiments:", error);
    }
  }

  return experiments;
};

function getCurrentExperiments(experimentCookieVal: string): Record<string, string> {
  const experiments: Record<string, string> = {};
  if (experimentCookieVal) {
    const experimentsArr = experimentCookieVal.split(";");
    experimentsArr.forEach((experiment) => {
      const [key, val] = experiment.split(":");
      if (key && val) {
        experiments[key] = val;
      }
    });
  }
  return experiments;
}