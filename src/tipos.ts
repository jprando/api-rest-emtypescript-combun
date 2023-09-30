import { Contexto } from "./app/Contexto";

export type UtilLogOpcoes =
  | undefined
  | {
      emNovaLinha?: boolean;
      rotulo?: string;
      exibirRotulo?: boolean;
      velocidade?: number;
    };

export type Requisicao = Request & {
  app: ReturnType<typeof Bun.serve>,
  contexto: Contexto
};
