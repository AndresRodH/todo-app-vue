<template>
  <v-list-tile :key="todo.text">
    <v-list-tile-action @click="toggleTodo(todo)">
      <v-checkbox v-model="todo.isCompleted" />
    </v-list-tile-action>
    <v-list-tile-content>{{ todo.text }}</v-list-tile-content>
    <v-list-tile-action>
      <v-btn @click="removeTodo(todo.id)" icon>
        <v-icon color="red lighten-1">delete</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { Todo } from '@/App.vue'
import { db } from '@/main'

@Component
export default class TodoListItem extends Vue {
  @Prop({ required: true }) todo!: Todo
  protected Todos = db.collection('todos')

  @Emit()
  toggleTodo(todo: Todo) {
    this.Todos.doc(todo.id).set({
      ...todo,
      isCompleted: !todo.isCompleted,
    })
  }

  @Emit()
  removeTodo(id: string) {
    this.Todos.doc(id).delete()
  }
}
</script>
