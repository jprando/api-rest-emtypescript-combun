import { Contexto } from "./app/Contexto";

export type UtilLogOpcoes =
  | undefined
  | {
      rotulo?: string;
      velocidade?: number;
    };

export type Requisicao = Request & {
  app: ReturnType<typeof Bun.serve>;
  ehEndpoint: (endpoint: string) => boolean;
};
