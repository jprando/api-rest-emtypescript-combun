import { Contexto } from "../app/Contexto";
import type { UtilLogOpcoes } from "../tipos";

let ultimoRotulo: string, ultimaMensagem: string;

export function log(mensagem: string, opcoes: UtilLogOpcoes = undefined) {
  const _rotulo =
    opcoes?.rotulo ||
    `${Date.now()}:PID:${process.pid}:${Contexto.contadorSerial}`;
  let _mensagem = mensagem;

  if (_rotulo === ultimoRotulo && mensagem.startsWith(ultimaMensagem)) {
    _mensagem = mensagem.slice(ultimaMensagem.length);
  } else {
    _mensagem = `\n[${_rotulo}] ${_mensagem}`;
  }
  if (opcoes?.velocidade) {
    _mensagem = `${_mensagem} | ${opcoes.velocidade.toFixed(2)}ms`;
  }

  process.stdout.write(_mensagem);
  ultimoRotulo = _rotulo;
  ultimaMensagem = mensagem;
  return _rotulo;
}
