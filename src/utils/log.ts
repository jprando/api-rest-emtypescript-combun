import { Contexto } from "../app/Contexto";
import type { UtilLogOpcoes } from "../tipos";

export function log(mensagem: string, opcoes: UtilLogOpcoes = undefined) {
  const _rotulo =
    opcoes?.rotulo ||
    `${Date.now()}:PID:${process.pid}:${Contexto.contadorSerial}`;

  opcoes?.emNovaLinha === true && process.stdout.write("\n");
  opcoes?.exibirRotulo !== false && process.stdout.write(`[${_rotulo}] `);

  process.stdout.write(mensagem);

  opcoes?.rotulo &&
    opcoes?.velocidade &&
    process.stdout.write(` | ${opcoes.velocidade.toFixed(2)}ms`);

  return _rotulo;
}
