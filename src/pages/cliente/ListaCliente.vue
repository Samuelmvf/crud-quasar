<template>
  <q-page class="flex flex-center bg-secondary">
    <q-card class="q-ma-lg bg-white text-center box-size">
      <h3 class="text-primary q-my-md non-selectable">{{ $t('pages.cliente.lista.titulo') }}</h3>
      <q-separator/>
      <q-scroll-area v-if="clientes.length" style="height: calc(55vh - 150px)" class="q-py-sm q-mx-md">
        <q-list separator>
          <q-item v-for="cliente in clientes" :key="cliente.id">
            <div class="row full-width justify-between items-center">
              <span class="text-body2">
                {{ cliente.nome }}
              </span>
              <div class="q-gutter-sm">
                <q-btn dense round flat color="yellow-8" icon="mdi-pencil-outline"
                  @click="actionEditar(cliente.id)"
                >
                  <q-tooltip>
                    <span class="text-body2">{{ $t('pages.cliente.lista.button.editar.tooltip') }}</span>
                  </q-tooltip>
                </q-btn>
                <q-btn dense round flat color="green-8" icon="mdi-archive"
                  @click="showModalAssociacaoProdutoCliente(cliente)"
                >
                  <q-tooltip>
                    <span class="text-body2">{{ $t('pages.cliente.lista.button.gerenciarProduto.tooltip') }}</span>
                  </q-tooltip>
                </q-btn>
                <q-btn dense round flat color="red-8" icon="mdi-delete"
                  @click="actionDeletar(cliente)"
                >
                  <q-tooltip>
                    <span class="text-body2">{{ $t('pages.cliente.lista.button.deletar.tooltip') }}</span>
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div v-else class="flex items-center justify-center" style="height: calc(55vh - 150px)">
        <span class="non-selectable">{{ $t('pages.cliente.lista.semDados') }}</span>
      </div>
      <q-separator/>
      <div style="height: 68px">
        <q-btn color="red" flat :label="$t('pages.cliente.lista.button.fechar.label')" class="q-my-md" @click="actionFechar"/>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import clienteService from 'src/services/ClienteService'

export default {
  name: 'ListaCliente',

  data () {
    return {
      clientes: []
    }
  },

  methods: {
    actionDeletar ({ nome, id}) {
      const detalhesModal = {
        descricao: this.$t('pages.cliente.lista.acao.deletar.modal.confirmacao.descricao', { nome }),
        confirmarAcao: {
          label: this.$t('pages.cliente.lista.acao.deletar.modal.confirmacao.labelConfirmarAcao'),
          color: 'red-8'
        },
        cancelarAcao: {
          label: this.$t('pages.cliente.lista.acao.deletar.modal.confirmacao.labelCancelarAcao'),
          color: 'grey-8'
        }
      }

      this.$root.modal.confirmacao.show(detalhesModal)
        .then(callback => {
          if (callback) {
            this.deletarCliente(id)
            this.buscarClientes()
          }
          this.$root.modal.confirmacao.hide()
        })
    },

    actionEditar (idCliente) {
      this.$router.push(`/cliente/${idCliente}`)
    },

    actionFechar () {
      this.$router.push('/')
    },

    atualizarClienteListado (clienteAtualizado) {
      const clienteDesatualizado = this.clientes.find(cliente => cliente.id === clienteAtualizado.id)
      clienteDesatualizado.produtos = clienteAtualizado.produtos
    },

    buscarClientes () {
      this.$q.loading.show()
      clienteService.buscarTodos()
        .then(response => {
          this.$q.loading.hide()
          this.clientes = response.data.clientes || []
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: this.$t('pages.cliente.lista.acao.buscar.notificacao.erro')
          })
        })
    },

    deletarCliente (id) {
      this.$q.loading.show()
      clienteService.deletar(id)
        .then(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'positive',
            message: this.$t('pages.cliente.lista.acao.deletar.notificacao.sucesso')
          })
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'negative',
            message: this.$t('pages.cliente.lista.acao.deletar.notificacao.erro')
          })
        })
    },

    showModalAssociacaoProdutoCliente (cliente) {
      this.$root.modal.associacaoProdutoCliente.show(cliente)
        .then(clienteCallback => {
          if (clienteCallback) {
            this.atualizarClienteListado(clienteCallback)
          }
          this.$root.modal.associacaoProdutoCliente.hide()
        })
    }
  },

  mounted () {
    this.buscarClientes()
  }
}
</script>