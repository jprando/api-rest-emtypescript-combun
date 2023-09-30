import { Requisicao } from "../../tipos";
import { log } from "../../utils";

export default async function inicio(req: Requisicao) {
  const inicio = performance.now();
  const rotulo = log(`| ${req.method} ${req.url}`, { emNovaLinha: true });

  // simular demora/processamento...
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

  const resposta = Response.json({
    erro: false,
    serial: [Date.now(), req.contexto].join("-"),
  });

  const fim = performance.now();
  log(`| ${req.method} ${req.url} | ${resposta.status}`, {
    rotulo,
    emNovaLinha: true,
    velocidade: fim - inicio,
  });

  return resposta;
}
