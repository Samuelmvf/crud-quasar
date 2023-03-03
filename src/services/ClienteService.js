import { mirageApi } from "src/boot/axios"

const BASE_PATH = '/cliente'

const criar = (cliente) => {
  return mirageApi.post(BASE_PATH, cliente)
}

const atualizar = (cliente) => {
  return mirageApi.put(`${BASE_PATH}/${cliente.id}`, cliente)
}

const buscarPorId = (id) => {
  return mirageApi.get(`${BASE_PATH}/${id}`)
}

const buscarTodos = () => {
  return mirageApi.get(BASE_PATH)
}

const deletar = (id) => {
  return mirageApi.delete(`${BASE_PATH}/${id}`)
}

export default {
  criar,
  atualizar,
  buscarPorId,
  buscarTodos,
  deletar
}