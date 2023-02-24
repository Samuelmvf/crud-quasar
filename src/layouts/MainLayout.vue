<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="primary-gradient">
      <q-toolbar>
        <div class="row full-width justify-between">
          <div class="img-container q-my-sm">
            <q-img src="https://datastone.com.br/wp-content/uploads/2018/03/data-stone.png"></q-img>
          </div>
          <div class="flex items-center">
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
          :icon="bloco.icon"
          :label="bloco.titulo"
        >
          <item-menu
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import ItemMenu from 'src/components/ItemMenu.vue'

const blocosMenu = [
  {
    titulo: 'Gestão de clientes',
    icon: 'mdi-account',
    acoes: [
      {
        nome: 'Criar cliente',
        icon: 'mdi-account-plus'
      },
      {
        nome: 'Listar clientes',
        icon: 'mdi-text-box-outline'
      }
    ]
  },
  {
    titulo: 'Gestão de produtos',
    icon: 'mdi-package-variant-closed',
    acoes: [
      {
        nome: 'Criar produto',
        icon: 'mdi-package-variant-closed-plus'
      },
      {
        nome: 'Listar produtos',
        icon: 'mdi-text-box-outline'
      }
    ]
  }
]

export default {
  name: 'MainLayout',
  components: {
    ItemMenu
  },
  data () {
    return {
      showMenuLateralDireito: false,
      blocosMenu: blocosMenu
    }
  }
}
</script>

<style scoped lang="sass">
.img-container
  width: 284px
  height: 48px

 
</style>
