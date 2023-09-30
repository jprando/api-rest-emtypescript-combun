import type { Requisicao } from "../../tipos";

export default function favicon404(req: Requisicao): Response | undefined {
  if (req.url.endsWith("/favicon.ico")) {
    return new Response(undefined, {
      status: 404,
      statusText: "nao encontrado",
    });
  }
}
