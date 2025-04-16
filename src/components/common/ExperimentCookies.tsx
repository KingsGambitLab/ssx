'use client';

import { useContext } from "react";
import { ExperimentsContext } from "@context/ExperimentContext";
import { setCookie } from "cookies-next";

const EXPERIMENTS_COOKIE = "experiments";
const COOKIE_EXPIRY_MINUTES = 30;

function createCookieString(experiments: Record<string, string>) {
  return Object.entries(experiments)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
}

function getCookieAge() {
  return COOKIE_EXPIRY_MINUTES * 60;
}

function setExperimentsCookie(experiments: Record<string, string>) {
  setCookie(EXPERIMENTS_COOKIE, createCookieString(experiments), {
    maxAge: getCookieAge(),
    path: "/",
  });
}

export default function ExperimentCookies() {
  const { experiments } = useContext(ExperimentsContext);
  setExperimentsCookie(experiments);
  return null;
}
