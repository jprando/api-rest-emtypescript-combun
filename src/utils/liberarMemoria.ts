import { log } from "./log";

export function liberarMemoria() {
    log("#INFO liberando memoria\n");
    Bun.gc(true);
  }