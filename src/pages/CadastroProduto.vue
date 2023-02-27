<template>
  <q-page class="flex flex-center bg-secondary">
    <q-card class="q-ma-lg bg-white text-center" style="width: 600px">
      <h3 class="text-primary q-my-md non-selectable">{{ isCadastroProduto ? 'CADASTRO DE PRODUTO' : 'EDITAR PRODUTO' }}</h3>
      <q-separator/>
      <q-form
        @submit="actionSalvar"
      >
        <div class="row q-col-gutter-sm q-pa-md">
          <q-input
            dense
            class="col-12" outlined 
            v-model="produto.nome" label="Nome*"
            :rules="[val => !!val && val.length > 1 || 'Preencha o nome corretamente']"
            lazy-rules/>
          <q-toggle
            dense
            v-model="produto.ativo"
            color="green"
            label="Ativo"
            left-label
          />
        </div>
        <q-separator/>
        <div class="row q-pa-md">
          <q-btn color="primary" :label="isCadastroProduto ? 'Cadastrar' : 'Editar'" type="submit"/>
          <q-btn color="red" flat label="Cancelar" class="q-ml-sm" @click="actionCancelar"/>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import produtoService from 'src/services/ProdutoService'

export default {
  name: 'CadastroProduto',

  data () {
    return {
      produto: {
        id: undefined,
        nome: undefined,
        ativo: false
      }
    }
  },

  computed: {
    isCadastroProduto () {
      return !this.$route.params.id
    },
  },

  methods: {
    actionCancelar () {
      this.$router.push('/')
    },

    actionSalvar () {
      if (this.isCadastroProduto) {
        this.cadastrarProduto()
      } else {
        this.atualizarProduto()
      }
    },

    atualizarProduto () {
      this.$q.loading.show()
      produtoService.atualizar(this.produto)
        .then(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'positive',
            message: 'Produto atualizado com sucesso.'
          })
          this.$router.push('/produto')
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao atualizar produto. Tente novamente mais tarde.'
          })
        })
    },

    buscarProdutoPorId (id) {
      this.$q.loading.show()
      produtoService.buscarPorId(id)
        .then(response => {
          this.$q.loading.hide()
          this.produto = response.data.produto
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao buscar produto. Tente novamente mais tarde.'
          })
        })
    },

    cadastrarProduto () {
      this.$q.loading.show()
      produtoService.criar(this.produto)
        .then(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'positive',
            message: 'Produto cadastrado com sucesso.'
          })
          this.$router.push('/produto')
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao cadastrar produto. Tente novamente mais tarde.'
          })
        })
    },
    
    limparCampos () {
      this.produto = {
        id: undefined,
        nome: undefined,
        ativo: false
      }
    },

    validaFluxoAtualizacaoProduto () {
      if (!!this.$route.params.id) {
        this.buscarProdutoPorId(this.$route.params.id)
      } else {
        this.limparCampos()
      }
    }
  },

  watch: {
    isCadastroProduto: {
      immediate: true,
      handler () {
        this.validaFluxoAtualizacaoProduto()
      }
    }
  }
}
</script>
