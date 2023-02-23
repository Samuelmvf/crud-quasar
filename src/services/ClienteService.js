import { api } from "src/boot/axios"

const BASE_PATH = '/clientes'

const criar = (cliente) => {
  return api.post(BASE_PATH, cliente)
}

const atualizar = (cliente) => {
  return api.put(`${BASE_PATH}/${cliente.id}`, cliente)
}

const buscarTodos = () => {
  return api.get(BASE_PATH)
}

export default {
  criar,
  atualizar,
  buscarTodos
}