import configuracao from "./app";
import { Contexto } from "./app/Contexto";

Contexto.app = Bun.serve(configuracao);
