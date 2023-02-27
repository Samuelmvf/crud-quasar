<template>
  <q-dialog ref="refModal" persistent>
    <q-card class="box-size q-ma-lg bg-white text-center">
      <div class="q-my-md">
        <h3 class="text-primary q-ma-none non-selectable">{{ nomeClienteTratado }}</h3>
        <span class="text-subtitle1 text-accent q-mb-md non-selectable">GESTÃO DE PRODUTOS</span>
      </div>
      <q-separator/>
      <div class="row q-ma-md">
        <q-select class="col-8" dense v-model="produtosSelecionados"
          :options="produtosTratados" label="Associar produto(s)" multiple
          option-label="nome"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-italic text-grey">
                Nenhum produto disponível
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <div class="col-4 q-pl-sm q-py-sm">
          <!-- TODO Implementar botão apenas com icone para visão de mobile -->
          <q-btn class="fit" dense color="green-8"
            :disable="!produtosSelecionados.length"
            @click="actionVincularProdutos"
          >
            <template v-slot:default>
              <q-icon v-if="$q.screen.lt.sm" name="mdi-plus" />
              <span v-else>Vincular</span>
            </template>
          </q-btn>
        </div>
      </div>
      <q-scroll-area v-if="cliente.produtos.length" class="container-produtos-vinculados q-my-sm q-mx-md">
        <div class="q-py-xs">
          <span class="text-subtitle1 text-accent q-mb-md non-selectable">Produtos associados</span>
        </div>
        <q-list>
          <q-item clickable class="cursor-inherit" v-for="produto in cliente.produtos" :key="produto.id">
            <div class="row full-width items-center">
              <span class="text-body2">
                {{ produto.nome }}
              </span>
            </div>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div v-else class="container-produtos-vinculados q-my-sm q-mx-md flex items-center justify-center text-accent">
        <span class="non-selectable">Nenhum produto vinculado</span>
      </div>
      <q-separator/>
      <div style="height: 68px">
        <q-btn color="red" flat label="Fechar" class="q-my-md" @click="actionFechar"/>
      </div>
    </q-card>
  </q-dialog>
</template>
  
<script>
import { extend } from 'quasar'

import clienteService from 'src/services/ClienteService'
import produtoService from 'src/services/ProdutoService'

export default {
  name: 'ModalAssociacaoProdutoCliente',

  data () {
    return {
      resolve: null,
      cliente: {
        nome: '',
        produtos: []
      },
      produtosSelecionados: [],
      produtos: []
    }
  },

  computed: {
    nomeClienteTratado () {
      return this.cliente.nome.split(' ').slice(0, 2).join(' ')
    },

    produtosTratados () {
      return this.produtos.filter(produto => produto.ativo
        && !this.cliente.produtos.find(produtoCliente => produtoCliente.id === produto.id)
      )
    }
  },

  methods: {
    actionFechar () {
      this.resolve(this.cliente)
    },

    actionVincularProdutos () {
      const produtosASeremVinculados = this.produtosSelecionados.map(produtoSelecionado => {
        return this.produtos.find(produto => produto.id === produtoSelecionado.id)
      })

      const produtosAssociados = [
        ...this.cliente.produtos,
        ...produtosASeremVinculados
      ]
      
      const clienteTratado = this.getClienteTratado(produtosAssociados)
      this.salvarCliente(clienteTratado)
    },

    buscarProdutos () {
      this.$q.loading.show()
      produtoService.buscarTodos()
        .then(response => {
          this.$q.loading.hide()
          this.produtos = response.data.produtos || []
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao carregar produtos. Tente novamente mais tarde.'
          })
        })
    },

    limparCampos () {
      this.produtosSelecionados = []
    },

    getClienteTratado (produtosAssociados) {
      const clientePayload = extend(true, {}, this.cliente)
      clientePayload.produtos = produtosAssociados
      return clientePayload
    },

    hide () {
      this.$refs.refModal.hide()
    },

    salvarCliente (cliente) {
      this.$q.loading.show()
      clienteService.atualizar(cliente)
        .then(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'positive',
            message: 'Produtos associados ao cliente com sucesso.'
          })

          this.limparCampos()
          this.cliente.produtos = cliente.produtos
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao associar produtos ao cliente. Tente novamente mais tarde.'
          })
        })
    },

    show (cliente) {
      this.buscarProdutos()
      this.cliente = extend(true, {}, cliente)
      
      this.$refs.refModal.show()
      return new Promise(resolve => {
        this.resolve = resolve
      })
    },
  }
}
</script>
<style lang="sass" scoped>
.container-produtos-vinculados
  height: calc(55vh - 180px - 88px)
  border: solid 1px $grey-4
  min-height: 100px

</style>
