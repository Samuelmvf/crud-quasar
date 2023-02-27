<template>
  <q-page class="flex flex-center bg-secondary">
    <q-card class="q-ma-lg bg-white text-center box-size">
      <h3 class="text-primary q-my-md non-selectable">CLIENTES</h3>
      <q-separator/>
      <q-scroll-area style="height: calc(55vh - 150px)" class="q-py-sm q-mx-md">
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
                    <span class="text-body2">Editar cliente</span>
                  </q-tooltip>
                </q-btn>
                <q-btn dense round flat color="green-8" icon="mdi-archive"
                  @click="showModalAssociacaoProdutoCliente(cliente)"
                >
                  <q-tooltip>
                    <span class="text-body2">Gerenciar produtos associados</span>
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-separator/>
      <div style="height: 68px">
        <q-btn color="red" flat label="Fechar" class="q-my-md" @click="actionFechar"/>
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
    actionEditar (idCliente) {
      this.$router.push(`/cliente/${idCliente}`)
    },
    actionFechar () {
      this.$router.push('/')
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
            message: 'Falha ao carregar clientes. Tente novamente mais tarde.'
          })
        })
    },
    showModalAssociacaoProdutoCliente (cliente) {
      this.$root.modal.associacaoProdutoCliente.show(cliente)
        .then(callback => {
          debugger
          console.log(callback)
          this.$root.modal.associacaoProdutoCliente.hide()
        })
    }
  },
  mounted () {
    this.buscarClientes()
  }
}
</script>