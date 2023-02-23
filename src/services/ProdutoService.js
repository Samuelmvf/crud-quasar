import { api } from "src/boot/axios"

const BASE_PATH = '/produtos'

const criar = (produto) => {
  return api.post(BASE_PATH, produto)
}

const atualizar = (produto) => {
  return api.put(`${BASE_PATH}/${produto.id}`, produto)
}

const buscarTodos = () => {
  return api.get(BASE_PATH)
}

export default {
  criar,
  atualizar,
  buscarTodos
}