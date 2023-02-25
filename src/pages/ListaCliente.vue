<template>
  <q-page class="flex flex-center bg-secondary">
    <q-card class="q-ma-lg bg-white text-center box-size">
      <h3 class="text-primary q-my-md non-selectable">Clientes</h3>
      <q-separator/>
      <q-scroll-area style="height: calc(55vh - 150px)" class="q-py-sm q-mx-md">
        <q-list separator>
          <q-item v-for="cliente in clientes" :key="cliente.id">
            <div class="row full-width justify-between items-center">
              <span class="text-body2">
                {{ cliente.nome }} | Documento: {{ cliente.documento }}
              </span>
              <div class="q-gutter-sm">
                <q-btn dense round flat color="yellow-8" icon="mdi-pencil-outline">
                  <q-tooltip>
                    <span class="text-body2">Editar cliente</span>
                  </q-tooltip>
                </q-btn>
                <q-btn dense round flat color="green-8" icon="mdi-archive">
                  <q-tooltip>
                    <span class="text-body2">Associar e visualizar produtos</span>
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
import clienteService from 'src/services/ClienteService'

export default {
  name: 'ListaCliente',
  data () {
    return {
      clientes: []
    }
  },
  methods: {
    actionSair () {
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
    }
  },
  mounted () {
    this.buscarClientes()
  }
}
</script>
<style scoped lang="sass">
.box-size
  width: 600px
  height: 55vh

</style>
