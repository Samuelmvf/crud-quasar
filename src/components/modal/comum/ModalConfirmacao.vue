<template>
  <q-dialog ref="refModal" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar v-if="avatar.icon" :icon="avatar.icon" :color="avatar.color" :text-color="avatar.textColor" />
        <span class="q-ml-sm">{{ descricao }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :label="confirmarAcao.label" :color="confirmarAcao.color" @click="actionConfirmar(true)"/>
        <q-btn flat :label="cancelarAcao.label" :color="cancelarAcao.color"  @click="actionConfirmar(false)"/>
      </q-card-actions>
      </q-card>
  </q-dialog>
</template>
  
<script>
const DESCRICAO_DEFAULT = 'Deseja confirmar ação?'
const CONFIRMAR_ACAO_DEFAULT = {
  label: 'Sim',
  color: 'green-8'
}
const CANCELAR_ACAO_DEFAULT = {
  label: 'Não',
  color: 'red-8'
}
const AVATAR_DEFAULT = {
  icon: undefined,
  color: undefined,
  textColor: undefined
}

export default {
  name: 'ModalConfirmacao',

  data () {
    return {
      resolve: undefined,
      descricao: undefined,
      confirmarAcao: CONFIRMAR_ACAO_DEFAULT,
      cancelarAcao: CANCELAR_ACAO_DEFAULT,
      avatar: AVATAR_DEFAULT
    }
  },

  methods: {
    actionConfirmar (acao) {
      this.resolve(acao)
    },

    hide () {
      this.$refs.refModal.hide()
    },

    setarInformacoesConfirmacao ({ descricao, confirmarAcao, cancelarAcao, avatar}) {
      this.descricao = !!descricao ? descricao : DESCRICAO_DEFAULT
      this.confirmarAcao = !!confirmarAcao ? confirmarAcao : CONFIRMAR_ACAO_DEFAULT
      this.cancelarAcao = !!cancelarAcao ? cancelarAcao : CANCELAR_ACAO_DEFAULT
      this.avatar = !!avatar && avatar.icon
        ? avatar
        : { icon: undefined, color: undefined, textColor: undefined }
    },

    show (detalhesModal) {
      this.setarInformacoesConfirmacao(detalhesModal)
      this.$refs.refModal.show()
      return new Promise(resolve => {
        this.resolve = resolve
      })
    }
  }
}
</script>
