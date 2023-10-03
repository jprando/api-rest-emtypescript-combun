import type { Requisicao } from "../tipos";
import { log } from "../utils";
import { Contexto } from "./Contexto";
import endpoints from "./endpoints";

export default {
  async fetch(req: Requisicao): Promise<Response> {
    const { baseUrl, estaAceitandoRequisicao } = Contexto;

    if (!estaAceitandoRequisicao) {
      return new Response("nao esta aceitando novas requisicoes", {
        status: 500,
      });
    }

    const inicio = performance.now();
    const { method, url: urlAtual } = req;
    const rotulo = log(`${method} ${urlAtual}`); // emNovaLinha
    let resposta = new Response("nao encontrado", { status: 404 });

    try {
      for (const item of endpoints) {
        const { endpoint, default: executar } = item;
        if (urlAtual !== `${baseUrl}${endpoint}`) continue;
        resposta = await executar(req);
        break;
      }
    } finally {
      const fim = performance.now();
      log(`${method} ${urlAtual} | ${resposta.status}`, {
        rotulo,
        emNovaLinha: true,
        velocidade: fim - inicio,
      });
    }

    return resposta;
  },
};
