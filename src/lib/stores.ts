import { writable } from "svelte/store";
import type { Nation } from "./types/models";
import type { Writable } from "svelte/store";

export const nation: Writable<Nation> = writable();