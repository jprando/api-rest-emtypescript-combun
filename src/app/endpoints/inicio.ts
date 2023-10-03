import { Requisicao } from "../../tipos";
import { Contexto } from "../Contexto";

export const endpoint = "/";

export default async function inicio(req: Requisicao) {
  // simular demora/processamento...
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

  const resposta = Response.json({
    erro: false,
    // teste: true,
    serial: [Date.now(), Contexto].join("-"),
  });

  return resposta;
}
