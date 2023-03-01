<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="primary-gradient">
      <q-toolbar>
        <div class="row full-width justify-between">
          <div class="flex q-my-sm cursor-pointer text-primary items-center" @click="voltarParaPaginaPrincipal">
            <q-img class="logo-header" src="../../public/app-logo-48.svg" />
            <span v-if="$q.platform.is.desktop || $q.screen.gt.xs" class="text-h4 q-pl-md non-selectable">SAMUELMVF</span>
          </div>
          <div v-if="$q.screen.lt.sm" class="flex items-center">
            <q-btn
              color="primary"
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="showMenuLateralDireito = !showMenuLateralDireito"
            />
          </div>
          <div v-else class="flex items-center">
            <q-btn v-for="bloco in blocosMenu" :key="bloco.titulo" flat color="primary" :label="bloco.titulo" class="text-bold">
              <q-menu>
                <q-list class="bg-accent text-white" style="min-width: 100px">
                  <div
                    v-for="acao in bloco.acoes"
                    :key="acao.nome"
                  >
                    <item-menu
                      :title="acao.nome" :icon="acao.icon" :path="acao.path"
                    />
                    <q-separator v-if="acao != bloco.acoes.at(-1)" color="white" />
                  </div>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="showMenuLateralDireito"
      overlay
      show-if-above
      bordered
      content-class="bg-accent text-white"
      side="right"
    >
      <q-list>
        <q-expansion-item
          v-for="bloco in blocosMenu"
          :key="bloco.titulo"
          expand-separator
          :label="bloco.titulo"
        >
          <item-menu
            v-for="acao in bloco.acoes"
            :key="acao.nome" :title="acao.nome" :icon="acao.icon" :path="acao.path"
          />
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <modal-associacao-produto-cliente ref="refModalAssociacaoProdutoCliente"></modal-associacao-produto-cliente>
  </q-layout>
</template>

<script>
import ItemMenu from 'src/components/ItemMenu.vue'
import ModalAssociacaoProdutoCliente from 'src/components/modal/ModalAssociacaoProdutoCliente.vue'

const blocosMenu = [
  {
    titulo: 'Gestão de clientes',
    acoes: [
      {
        nome: 'Criar cliente',
        icon: 'mdi-account-plus',
        path: '/cliente/criar'
      },
      {
        nome: 'Listar clientes',
        icon: 'mdi-text-box-outline',
        path: '/cliente'
      }
    ]
  },
  {
    titulo: 'Gestão de produtos',
    acoes: [
      {
        nome: 'Criar produto',
        icon: 'mdi-archive',
        path: '/produto/criar'
      },
      {
        nome: 'Listar produtos',
        icon: 'mdi-text-box-outline',
        path: '/produto'
      }
    ]
  }
]

export default {
  name: 'MainLayout',
  components: {
    ItemMenu,
    ModalAssociacaoProdutoCliente
  },
  data () {
    return {
      showMenuLateralDireito: false,
      blocosMenu
    }
  },
  mounted () {
    this.referenciarModais()

    this.$nextTick(() => {
      this.showMenuLateralDireito = false
    })
  },
  methods: {
    referenciarModais () {
      this.$root.modal = {}
      this.$root.modal.associacaoProdutoCliente = this.$refs.refModalAssociacaoProdutoCliente
    },

    voltarParaPaginaPrincipal () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="sass">
.logo-header
  width: 48px
  height: 48px

</style>
