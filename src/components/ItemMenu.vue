<template>
  <q-item
    clickable
    tag="a"
    @click="$event => goTo()"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'ItemMenu',
  props: {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    }
  },
  methods: {
    goTo () {
      this.$router.push(this.path)
    }
  }
}
</script>
