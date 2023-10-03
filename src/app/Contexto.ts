import { Server } from "bun";
import { CINCO_MINUTOS } from "../constantes";
import { liberarMemoria, log, numeroAleatorio } from "../utils";
import { configurarGracefulShutdown } from "./gracefulShutdown";

export class Contexto {
  static readonly _iniciadoEm = Date.now();
  static _contadorSerial = 0;
  static _app: Server;
  static _estaAceitandoRequisicao = false;

  static get tempoDesdeIniciacao() {
    return Date.now() - Contexto._iniciadoEm;
  }
  static get contadorSerial() {
    if (Contexto._contadorSerial >= Number.MAX_SAFE_INTEGER) {
      Contexto._contadorSerial = 0;
    }
    return ++Contexto._contadorSerial;
  }
  static get app() {
    return Contexto._app;
  }
  static set app(valor: Server) {
    const { protocol = "http", hostname, port } = valor as any;
    Contexto._app = valor;
    configurarGracefulShutdown();
    Contexto._estaAceitandoRequisicao = true;
    log(`#INFO aceitando requisicoes em ${this.baseUrl}\n`); // emNovaLinha
  }
  static get baseUrl() {
    const { protocol = "http", hostname, port } = Contexto._app as any;
    return `${protocol}://${hostname}:${port}`;
  }
  static get estaAceitandoRequisicao() {
    return Contexto._estaAceitandoRequisicao;
  }

  static recusarNovasRequisicoes() {
    Contexto._estaAceitandoRequisicao = false;
    Contexto._app.stop();
  }
  static toString() {
    return [
      Contexto.tempoDesdeIniciacao,
      Contexto.contadorSerial,
      numeroAleatorio(),
    ].join("-");
  }
}

// kill -s 10 47987
// -s 10 -> SIGUSR1
// 47987 -> pid do processo
process.on("SIGUSR1", liberarMemoria);
setInterval(liberarMemoria, CINCO_MINUTOS);
