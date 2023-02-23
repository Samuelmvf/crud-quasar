import { createServer, Model } from 'miragejs'

// Constantes para simular um atraso na respota da API
// Podendo assim emitir ações de carregamento
const TIMEOUT_GET_MS = 300
const TIMEOUT_POST_PUT_MS = 150

createServer({
  models: {
    cliente: Model,
    produto: Model
  },
  seeds(server) {
    server.db.loadData({
      clientes: [
        {
          id: "1",
          nome: 'Samuel Maia',
          documento: '13199879667',
          telefone: '3134869927',
          email: 'samuelmvf@gmail.com',
          ativo: 1
        }
      ],
      produtos: [
        {
          id: "1",
          nome: "SAMSUNG Monitor Gamer Odyssey 24' FHD, 165Hz, 1ms",
          ativo: 1
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api'

    // CLIENTES 
    this.get('/clientes', () => {
      return this.schema.all('cliente')
    }, { timing: TIMEOUT_GET_MS});

    this.post('/clientes', (schema, request) => {
      const requestBody = JSON.parse(request.requestBody)
      const { cliente } = requestBody
      return schema.create('cliente', cliente);
    }, { timing: TIMEOUT_POST_PUT_MS})

    this.put('/clientes:id', (schema, request) => {
      const requestBody = JSON.parse(request.requestBody)
      const id = request.params.id
      const cliente = schema.find('cliente', id)
      return cliente.update(requestBody)
    }, { timing: TIMEOUT_POST_PUT_MS})

    // PRODUTOS
    this.get('/produtos', () => {
      return this.schema.all('produto')
    }, { timing: TIMEOUT_GET_MS});
    
    this.post('/produtos', (schema, request) => {
      const requestBody = JSON.parse(request.requestBody)
      const { produto } = requestBody
      return schema.create('produto', produto);
    }, { timing: TIMEOUT_POST_PUT_MS});
    
    this.put('/produtos:id', (schema, request) => {
      const requestBody = JSON.parse(request.requestBody)
      const id = request.params.id
      const produto = schema.find('produto', id)
      return produto.update(requestBody)
    }, { timing: TIMEOUT_POST_PUT_MS})
  }
})