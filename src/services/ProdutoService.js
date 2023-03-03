import { mirageApi } from "src/boot/axios"

const BASE_PATH = '/produto'

const criar = (produto) => {
  return mirageApi.post(BASE_PATH, produto)
}

const atualizar = (produto) => {
  return mirageApi.put(`${BASE_PATH}/${produto.id}`, produto)
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