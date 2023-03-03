<template>
  <q-page class="flex flex-center bg-secondary">
    <q-card class="q-ma-lg bg-white text-center" style="width: 600px">
      <h3 class="text-primary q-my-md non-selectable">{{ isCadastroProduto ? $t('pages.produto.cadastro.titulo.cadastrar') : $t('pages.produto.cadastro.titulo.editar') }}</h3>
      <q-separator/>
      <q-form
        @submit="actionSalvar"
      >
        <div class="row q-col-gutter-sm q-pa-md">
          <q-input
            dense
            class="col-12" outlined 
            v-model="produto.nome" :label="$t('pages.produto.cadastro.form.input.nome.label')"
            :rules="[val => !!val && val.length > 1 || $t('pages.produto.cadastro.form.input.nome.rules')]"
            lazy-rules/>
          <q-toggle
            dense
            v-model="produto.ativo"
            color="green"
            :label="$t('pages.produto.cadastro.form.input.ativo.label')"
            left-label
          />
        </div>
        <q-separator/>
        <div class="row q-pa-md">
          <q-btn color="primary" :label="isCadastroProduto ? $t('pages.produto.cadastro.button.cadastrar.label') : $t('pages.produto.cadastro.button.editar.label')" type="submit"/>
          <q-btn color="red" flat :label="$t('pages.produto.cadastro.button.cancelar.label')" class="q-ml-sm" @click="actionCancelar"/>
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
            message: this.$t('pages.produto.cadastro.acao.atualizar.notificacao.sucesso')
          })
          this.$router.push('/produto')
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: this.$t('pages.produto.cadastro.acao.atualizar.notificacao.erro')
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
            message: this.$t('pages.produto.cadastro.acao.buscarProduto.notificacao.erro')
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
            message: this.$t('pages.produto.cadastro.acao.cadastrar.notificacao.sucesso')
          })
          this.$router.push('/produto')
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: this.$t('pages.produto.cadastro.acao.cadastrar.notificacao.erro')
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
