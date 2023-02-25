<template>
  <q-page class="flex flex-center bg-secondary">
    <q-card class="q-ma-lg bg-white text-center box-size">
      <h3 class="text-primary q-my-md non-selectable">Produtos</h3>
      <q-separator/>
      <q-scroll-area style="height: calc(55vh - 150px)" class="q-py-sm q-mx-md">
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
                    <span class="text-body2">Editar produto</span>
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-separator/>
      <div style="height: 68px">
        <q-btn color="red" flat label="Sair" class="q-my-md" @click="actionSair"/>
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
    actionEditar (idProduto) {
      this.$router.push(`/produto/${idProduto}`)
    },

    actionSair () {
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
    }
  },
  mounted () {
    this.buscarProdutos()
  }
}
</script>
<style scoped lang="sass">
.box-size
  width: 600px
  height: 55vh

</style>
