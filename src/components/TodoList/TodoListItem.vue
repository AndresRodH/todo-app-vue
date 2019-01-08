<template>
  <v-list-tile>
    <v-list-tile-action @click="toggleTodo(todoItem)">
      <v-btn
        :color="todoItem.isCompleted ? 'green' : 'gray'"
        :outline="!todoItem.isCompleted"
        small
        fab
        :loading="loading"
        :disabled="loading"
      >
        <v-icon v-if="todoItem.isCompleted">check</v-icon>
      </v-btn>
    </v-list-tile-action>
    <v-list-tile-content>
      <span :class="{ completed: todoItem.isCompleted }">{{
        todoItem.text
      }}</span>
    </v-list-tile-content>
    <v-list-tile-action v-if="todoItem.isCompleted">
      <v-btn @click="clearTodo(todoItem.id)" icon>
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
  private todoItem: Todo = Object.assign('', this.todo)
  private loading: boolean = false
  private color: string = this.todoItem.isCompleted ? 'green' : 'gray'

  created() {
    // subscribe to updates on this todo
    this.Todos.doc(this.todoItem.id).onSnapshot(snap => {
      const updatedTodo: Todo = snap.data() as Todo
      this.todoItem = updatedTodo
    })
  }

  @Emit()
  async toggleTodo() {
    this.loading = true
    const isCompleted: boolean = !this.todoItem.isCompleted
    try {
      await this.Todos.doc(this.todoItem.id).set(
        { isCompleted },
        { merge: true },
      )
      this.todoItem.isCompleted = isCompleted
    } catch (e) {
      console.error(e)
    }
    this.loading = false
  }

  @Emit()
  clearTodo(id: string) {
    this.Todos.doc(id).delete()
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gainsboro;
}
</style>
