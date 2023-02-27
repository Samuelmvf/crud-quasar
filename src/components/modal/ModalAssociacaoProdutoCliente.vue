<template>
  <q-dialog ref="refModal">
    <q-card class="box-size q-ma-lg bg-white text-center">
      <div class="q-my-md">
        <h3 class="text-primary q-ma-none non-selectable">Samuel Maia</h3>
        <span class="text-subtitle1 text-accent q-mb-md non-selectable">GESTÃO DE PRODUTOS</span>
      </div>
      <q-separator/>
      <div class="row q-ma-md">
        <q-select class="col-8" dense v-model="produtosSelecionados"
          :options="produtos" label="Associar produto(s)" multiple
          option-label="nome"
          />
        <div class="col-4 q-px-md q-py-sm">
          <q-btn class="fit" dense color="green-8" label="Vincular"
            @click="actionVincularProduto"
          />
        </div>
      </div>
      <q-scroll-area v-if="cliente.produtos.length" class="container-produtos-vinculados q-my-sm q-mx-md">
        <q-list separator>
          <q-item v-for="produto in cliente.produtos" :key="produto.id">
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
        <q-btn color="red" flat label="Fechar" class="q-my-md" @click="hide"/>
      </div>
    </q-card>
  </q-dialog>
</template>
  
<script>
import { extend } from 'quasar'
import produtoService from 'src/services/ProdutoService'

export default {
  name: 'ModalAssociacaoProdutoCliente',

  data () {
    return {
      resolve: null,
      cliente: {
        produtos: []
      },
      produtosSelecionados: [],
      produtos: []
    }
  },

  computed: {
    produtosTratados () {
      return this.produtos.filter(produto => produto.ativo
        && !this.cliente.produtos.find(produtoCliente => produtoCliente.id === produto.id)
      ).map(produto => {
        return { label: produto.nome, value: produto.id }  
      })
    }
  },

  methods: {
    actionVincularProduto () {
      console.log('vinculou', this.produtosSelecionados)
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

    hide () {
      this.$refs.refModal.hide()
    },

    show (cliente) {
      this.$refs.refModal.show()
      this.cliente = extend(true, {}, cliente)

      return new Promise(resolve => {
        this.resolve = resolve
      })
    },
  },

  mounted () {
    this.buscarProdutos()
  }
}
</script>
<style lang="sass" scoped>
.container-produtos-vinculados
  height: calc(55vh - 180px - 88px)
  border: solid 1px $grey-4
  min-height: 80px

</style>
