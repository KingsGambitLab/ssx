'use server';

import { headers } from "next/headers";
import { ABEX_API_URL, ABEX_REQUEST_HEADERS } from "./constants";

export async function getAbExperimentVariant(payload: {
  flagkey: string;
}) {
  try {
    const res = await fetch(`${ABEX_API_URL}/api/v1/evaluation`, {
      method: "POST",
      credentials: "include",
      headers: ABEX_REQUEST_HEADERS,
      body: JSON.stringify(payload),
      cache: "no-cache",
    });
    const resJson = await res.json();
    const { flagKey, variantKey } = resJson;

    return { flagKey, variantKey };
  } catch (error) {
    console.error('error while fetching abex variant on server', error);
  }
}