import { log } from "../utils";
import { Contexto } from "./Contexto";

function gracefulShutdown(sinal: string) {
  process.on(sinal, async () => {
    const { app } = Contexto;

    Contexto.recusarNovasRequisicoes();
    log(`#APP ${sinal} recebido, encerrando...\n`); // emNovaLinha

    while (app.pendingRequests) {
      log(`#APP aguardando conclusao de ${app.pendingRequests} requisicoes\n`); // emNovaLinha
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    process.exit(0);
  });
}

export function configurarGracefulShutdown() {
  process.on("exit", () => log(`#APP encerrado!\n`, { emNovaLinha: true }));
  ["SIGHUP", "SIGINT", "SIGTERM", "SIGKILL"].forEach(gracefulShutdown);
}
