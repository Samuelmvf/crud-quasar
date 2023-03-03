<template>
  <q-layout view="lHh Lpr lFf">
    <q-header  elevated class="primary-gradient">
      <q-toolbar>
        <div class="row full-width justify-between">
          <div class="flex q-my-sm cursor-pointer text-primary items-center" @click="setarTraducao">
            <q-img class="logo-header" src="../../public/app-logo-48.svg" />
            <span v-if="$q.platform.is.desktop || $q.screen.gt.xs" class="text-h4 q-pl-md non-selectable">SAMUELMVF</span>
          </div>
          <div v-if="$q.screen.lt.sm" class="flex items-center">
            <div>
              <q-icon class="cursor-pointer" size="22px" name="img:estados-unidos.png" @click="$root.$i18n.locale = 'en'"/>
              <q-icon class="cursor-pointer" size="24px" name="img:brasil.png" @click="$root.$i18n.locale = 'pt'" />
            </div>
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
            <div>
              <q-icon class="cursor-pointer" size="22px" name="img:estados-unidos.png" @click="$root.$i18n.locale = 'en'"/>
              <q-icon class="cursor-pointer" size="24px" name="img:brasil.png" @click="$root.$i18n.locale = 'pt'"/>
            </div>
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
    <modal-confirmacao ref="refModalConfirmacao"></modal-confirmacao>
  </q-layout>
</template>

<script>
import ItemMenu from 'src/components/ItemMenu.vue'
import ModalAssociacaoProdutoCliente from 'src/components/modal/cliente/ModalAssociacaoProdutoCliente.vue'
import ModalConfirmacao from 'src/components/modal/comum/ModalConfirmacao.vue'

export default {
  name: 'MainLayout',

  components: {
    ItemMenu,
    ModalAssociacaoProdutoCliente,
    ModalConfirmacao
  },

  data () {
    return {
      showMenuLateralDireito: false,
      blocosMenu: this.getBlocosMenu()
    }
  },

  mounted () {
    this.referenciarModais()

    this.$nextTick(() => {
      this.showMenuLateralDireito = false
    })
  },

  methods: {
    setarTraducao () {
    },

    getBlocosMenu () {
      return [
        {
          titulo: this.$t('layouts.main.menu.cliente.titulo'),
          acoes: [
            {
              nome: this.$t('layouts.main.menu.cliente.acoes.criar'),
              icon: 'mdi-account-plus',
              path: '/cliente/criar'
            },
            {
              nome: this.$t('layouts.main.menu.cliente.acoes.listar'),
              icon: 'mdi-text-box-outline',
              path: '/cliente'
            }
          ]
        },
        {
          titulo: this.$t('layouts.main.menu.produto.titulo'),
          acoes: [
            {
              nome: this.$t('layouts.main.menu.produto.acoes.criar'),
              icon: 'mdi-archive',
              path: '/produto/criar'
            },
            {
              nome: this.$t('layouts.main.menu.produto.acoes.listar'),
              icon: 'mdi-text-box-outline',
              path: '/produto'
            }
          ]
        }
      ]
    },

    referenciarModais () {
      this.$root.modal = {}
      this.$root.modal.associacaoProdutoCliente = this.$refs.refModalAssociacaoProdutoCliente
      this.$root.modal.confirmacao = this.$refs.refModalConfirmacao
    },

    voltarParaPaginaPrincipal () {
      this.$router.push('/')
    }
  },

  watch: {
    '$root.$i18n.locale' () {
      this.blocosMenu = this.getBlocosMenu()
    }
  }
}
</script>

<style scoped lang="sass">
.logo-header
  width: 48px
  height: 48px

</style>
