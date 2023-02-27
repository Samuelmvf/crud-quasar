<template>
  <q-page class="flex flex-center bg-secondary">
    <q-card class="q-ma-lg bg-white text-center" style="width: 600px">
      <h3 class="text-primary q-my-md non-selectable">{{ isCadastroCliente ? 'CADASTRO DE CLIENTE' : 'EDITAR CLIENTE' }}</h3>
      <q-separator/>
      <q-form
        @submit="actionSalvar"
      >
        <div class="row q-col-gutter-sm q-pa-md">
          <q-input
            dense
            class="col-xs-12 col-sm-12 col-md-6" outlined 
            v-model="cliente.nome" label="Nome*"
            :rules="[val => !!val && val.length > 1 || 'Preencha o nome corretamente']"
            lazy-rules/>
          <q-input
            dense
            class="col-xs-12 col-sm-12 col-md-6" outlined
            v-model="cliente.documento" label="Documento*"
            :rules="[val => !!val || 'Preencha o documento corretamente']"
            lazy-rules/>
          <q-input
            dense
            class="col-xs-12 col-sm-12 col-md-6" outlined
            v-model="cliente.telefone" label="Telefone*"
            :mask="maskClienteTelefone"
            unmasked-value
            :rules="[val => !!val && val.length >= 10 || 'Preencha o telefone corretamente']"
            lazy-rules/>
          <q-input
            dense
            class="col-xs-12 col-sm-12 col-md-6" outlined
            v-model="cliente.email" label="Email*"
            :rules="[val => validarEmail(val) || 'Preencha o campo email corretamente']"
            lazy-rules/>
          <q-toggle
            dense
            v-model="cliente.ativo"
            color="green"
            label="Ativo"
            left-label
          />
        </div>
        <q-separator/>
        <div class="row q-pa-md">
          <q-btn color="primary" label="Cadastrar" type="submit"/>
          <q-btn color="red" flat label="Cancelar" class="q-ml-sm" @click="actionCancelar"/>
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
            message: 'Cliente atualizado com sucesso.'
          })
          this.$router.push('/cliente')
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao atualizar cliente. Tente novamente mais tarde.'
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
            message: 'Falha ao buscar cliente. Tente novamente mais tarde.'
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
            message: 'Cliente cadastrado com sucesso.'
          })
          this.$router.push('/cliente')
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao cadastrar cliente. Tente novamente mais tarde.'
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
