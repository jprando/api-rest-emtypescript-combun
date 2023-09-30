import type { Requisicao } from "../tipos";
import { Contexto } from "./Contexto";
import endpoints from "./endpoints";

export default {
  async fetch(req: Requisicao): Promise<Response> {
    const { app, estaAceitandoRequisicao } = Contexto;

    if (!estaAceitandoRequisicao) {
      return new Response("nao esta aceitando novas requisicoes", {
        status: 500,
      });
    }

    req.app = app;
    req.contexto = Contexto;

    for (const _endpoint of endpoints) {
      const resposta = await _endpoint(req);
      if (resposta) {
        return resposta;
      }
    }

    return new Response("nao encontrado", { status: 404 });
  },
};
