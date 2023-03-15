<template>
  <q-page class="flex flex-center bg-secondary">
    <q-card class="q-ma-lg bg-white text-center" style="width: 600px">
      <h3 class="text-primary q-my-md non-selectable">{{ isCadastroCliente ? $t('pages.cliente.cadastro.titulo.cadastrar') : $t('pages.cliente.cadastro.titulo.editar') }}</h3>
      <q-separator/>
      <q-form
        @submit="actionSalvar"
      >
        <div class="row q-col-gutter-sm q-pa-md">
          <q-input
            dense
            class="col-xs-12 col-sm-12 col-md-6" outlined 
            v-model="cliente.nome" :label="$t('pages.cliente.cadastro.form.input.nome.label')"
            :rules="[val => !!val && val.length > 1 || $t('pages.cliente.cadastro.form.input.nome.rules')]"
            lazy-rules/>
          <q-input
            dense
            class="col-xs-12 col-sm-12 col-md-6" outlined
            v-model="cliente.documento" :label="$t('pages.cliente.cadastro.form.input.documento.label')"
            :rules="[val => !!val || $t('pages.cliente.cadastro.form.input.documento.rules')]"
            lazy-rules/>
          <q-input
            dense
            class="col-xs-12 col-sm-12 col-md-6" outlined
            v-model="cliente.telefone" :label="$t('pages.cliente.cadastro.form.input.telefone.label')"
            :mask="maskClienteTelefone"
            unmasked-value
            :rules="[val => !!val && val.length >= 10 || $t('pages.cliente.cadastro.form.input.telefone.rules')]"
            lazy-rules/>
          <q-input
            dense
            class="col-xs-12 col-sm-12 col-md-6" outlined
            v-model="cliente.email" :label="$t('pages.cliente.cadastro.form.input.email.label')"
            :rules="[val => validarEmail(val) || $t('pages.cliente.cadastro.form.input.email.rules')]"
            lazy-rules/>
          <q-toggle
            dense
            v-model="cliente.ativo"
            color="green"
            :label="$t('pages.cliente.cadastro.form.input.ativo.label')"
            left-label
          />
        </div>
        <q-separator/>
        <div class="row q-pa-md">
          <q-btn color="primary" :label="isCadastroCliente ? $t('pages.cliente.cadastro.button.cadastrar.label') : $t('pages.cliente.cadastro.button.editar.label')" type="submit"/>
          <q-btn color="red" flat :label="$t('pages.cliente.cadastro.button.cancelar.label')" class="q-ml-sm" @click="actionCancelar"/>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { validarEmail } from 'src/utilities/Utils'
import clienteService from 'src/services/ClienteService'

export default {
  name: 'CadastroCliente',

  data () {
    return {
      cliente: {
        id: undefined,
        nome: undefined,
        documento: undefined,
        telefone: '',
        email: undefined,
        ativo: false
      }
    }
  },

  computed: {
    isCadastroCliente () {
      return !this.$route.params.id
    },
    maskClienteTelefone () {
      return (!!this.cliente.telefone && this.cliente.telefone.length > 10) ? '(##) #####-####' : '(##) ####-#####'
    }
  },

  methods: {
    actionCancelar () {
      this.$router.push('/')
    },

    actionSalvar () {
      if (this.isCadastroCliente) {
        this.cadastrarCliente()
      } else {
        this.atualizarCliente()
      }
    },

    atualizarCliente () {
      this.$q.loading.show()
      clienteService.atualizar(this.cliente)
        .then(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'positive',
            message: this.$t('pages.cliente.cadastro.acao.atualizar.notificacao.sucesso')
          })
          this.$router.push('/cliente')
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: this.$t('pages.cliente.cadastro.acao.atualizar.notificacao.erro')
          })
        })
    },

    buscarClientePorId (id) {
      this.$q.loading.show()
      clienteService.buscarPorId(id)
        .then(response => {
          this.$q.loading.hide()
          this.cliente = response.data.cliente
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: this.$t('pages.cliente.cadastro.acao.buscarCliente.notificacao.erro')
          })
        })
    },

    cadastrarCliente () {
      this.$q.loading.show()
      clienteService.criar(this.cliente)
        .then(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'positive',
            message: this.$t('pages.cliente.cadastro.acao.cadastrar.notificacao.sucesso')
          })
          this.$router.push('/cliente')
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: this.$t('pages.cliente.cadastro.acao.cadastrar.notificacao.erro')
          })
        })
    },

    limparCampos () {
      this.cliente = {
        id: undefined,
        nome: undefined,
        documento: undefined,
        telefone: '',
        email: undefined,
        ativo: false
      }
    },

    validarEmail,

    validaFluxoAtualizacaoCliente () {
      if (!!this.$route.params.id) {
        this.buscarClientePorId(this.$route.params.id)
      } else {
        this.limparCampos()
      }
    }
  },

  watch: {
    isCadastroCliente: {
      immediate: true,
      handler () {
        this.validaFluxoAtualizacaoCliente()
      }
    }
  }
}
</script>
