import { log } from "../utils";
import { Contexto } from "./Contexto";

export function configurarGracefulShutdown() {
  process.on("exit", () => log(`#APP encerrado!\n`, { emNovaLinha: true }));

  for (const sinal of ["SIGINT", "SIGTERM", "SIGKILL"]) {
    process.on(sinal, async () => {
      Contexto.recusarNovasRequisicoes();

      const { app } = Contexto;
      log(`#APP ${sinal} recebido, encerrando...\n`, { emNovaLinha: true });

      while (app.pendingRequests) {
        log(
          `#APP aguardando conclusao de ${app.pendingRequests} requisicoes\n`,
          { emNovaLinha: true }
        );
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      process.exit(0);
    });
  }
}
