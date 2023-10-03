import type { Requisicao } from "../../tipos";

export const endpoint = "/teste";

export default function favicon404(req: Requisicao): Response | undefined {
  const resposta = JSON.stringify({ ola: "mundo" });
  return new Response(resposta, { status: 200 });
}
