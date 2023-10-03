import { log } from "./log";

export function liberarMemoria() {
  log("#INFO liberando memoria\n"); // emNovaLinha
  Bun.gc(true);
}
