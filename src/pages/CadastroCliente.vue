<template>
  <q-page class="flex flex-center bg-secondary">
    <q-card class="q-ma-lg bg-white text-center" style="width: 600px;">
      <h3 class="text-primary q-my-md non-selectable">Cadastro de cliente</h3>
      <q-separator inset/>
      <q-form class="q-ma-md">
        <div class="row q-col-gutter-sm">
          <q-input
            class="col-xs-12 col-sm-12 col-md-6" outlined 
            v-model="cliente.nome" label="Nome" />
          <q-input
            class="col-xs-12 col-sm-12 col-md-6" outlined
            v-model="cliente.documento" label="Documento" />
          <q-input
            class="col-xs-12 col-sm-12 col-md-6" outlined
            v-model="cliente.telefone" label="Telefone" />
          <q-input
            class="col-xs-12 col-sm-12 col-md-6" outlined
            v-model="cliente.email" label="Email" />
          <q-toggle
            v-model="cliente.ativo"
            color="green"
            label="Ativo"
            left-label
          />
        </div>
      </q-form>
      <q-separator inset/>
      <div class="row q-ma-md">
        <q-btn color="primary" label="Cadastrar" />
        <q-btn color="red" flat label="Cancelar" class="q-ml-sm"/>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'CadastroCliente',
  data () {
    return {
      cliente: {
        nome: undefined,
        documento: undefined,
        telefone: undefined,
        email: undefined,
        ativo: false
      }
    }
  }
}
</script>
