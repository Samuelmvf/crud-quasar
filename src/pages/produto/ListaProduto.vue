<template>
  <q-page class="flex flex-center bg-secondary">
    <q-card class="q-ma-lg bg-white text-center box-size">
      <h3 class="text-primary q-my-md non-selectable">{{ $t('pages.produto.lista.titulo') }}</h3>
      <q-separator/>
      <q-scroll-area v-if="produtos.length" style="height: calc(55vh - 150px)" class="q-py-sm q-mx-md">
        <q-list separator>
          <q-item v-for="produto in produtos" :key="produto.id">
            <div class="row full-width justify-between items-center">
              <span class="text-body2">
                {{ produto.nome }}
              </span>
              <div>
                <q-btn dense round flat color="yellow-8" icon="mdi-pencil-outline"
                  @click="actionEditar(produto.id)"
                >
                  <q-tooltip>
                    <span class="text-body2">{{ $t('pages.produto.lista.button.editar.tooltip') }}</span>
                  </q-tooltip>
                </q-btn>
                <q-btn dense round flat color="red-8" icon="mdi-delete"
                  @click="actionDeletar(produto)"
                >
                  <q-tooltip>
                    <span class="text-body2">{{ $t('pages.produto.lista.button.deletar.tooltip') }}</span>
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div v-else class="flex items-center justify-center" style="height: calc(55vh - 150px)">
        <span class="non-selectable">{{ $t('pages.produto.lista.semDados') }}</span>
      </div>
      <q-separator/>
      <div style="height: 68px">
        <q-btn color="red" flat :label="$t('pages.cliente.lista.button.fechar.label')" class="q-my-md" @click="actionFechar"/>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import produtoService from 'src/services/ProdutoService'

export default {
  name: 'ListaProduto',

  data () {
    return {
      produtos: []
    }
  },

  methods: {
    actionDeletar ({ nome, id}) {
      const detalhesModal = {
        descricao: `Deseja realmente deletar o produto "${ nome }" ?`,
        confirmarAcao: {
          label: 'Deletar',
          color: 'red-8'
        },
        cancelarAcao: {
          label: 'Cancelar',
          color: 'grey-8'
        }
      }

      this.$root.modal.confirmacao.show(detalhesModal)
        .then(callback => {
          if (callback) {
            this.deletarProduto(id)
            this.buscarProdutos()
          }
          this.$root.modal.confirmacao.hide()
        })
    },

    actionEditar (idProduto) {
      this.$router.push(`/produto/${idProduto}`)
    },

    actionFechar () {
      this.$router.push('/')
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

    deletarProduto (id) {
      this.$q.loading.show()
      produtoService.deletar(id)
        .then(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'positive',
            message: 'Produto deletado com sucesso.'
          })
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao deletar produto. Tente novamente mais tarde.'
          })
        })
    }
  },

  mounted () {
    this.buscarProdutos()
  }
}
</script>