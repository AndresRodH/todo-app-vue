<template>
  <v-footer dark height="auto">
    <v-card class="flex" flat tile>
      <v-card-actions class="grey darken-3 justify-center">
        <span>&copy;2019 — <strong>Andrés Rodríguez</strong> </span>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop, Emit } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {}
</script>
