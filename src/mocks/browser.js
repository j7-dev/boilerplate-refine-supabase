// src/mocks/browser.js
import { setupWorker } from "msw";
import { default as mocks } from "./data/index";
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...mocks);
