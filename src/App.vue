<template>
  <v-app id="inspire">
    <v-toolbar color="teal" dark fixed app>
      <v-toolbar-title>Todo App</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex xs12 sm6>
            <v-text-field
              @keyup.enter="addTodo"
              v-model="newTodo"
              label="Add a todo"
              outline
              clearable
            ></v-text-field>
            <ul v-for="todo in todos" :key="todo.id">
              <li>{{ todo.text }}</li>
            </ul>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop, Emit } from 'vue-property-decorator'

interface Todo {
  id: number
  text: string
  isCompleted: boolean
}

@Component
export default class App extends Vue {
  @Model('input', { type: String, default: '' }) todoInput!: string

  private todos: Todo[] = []
  private newTodo: string = `${this.todoInput}`

  @Emit()
  addTodo() {
    const value = this.newTodo && this.newTodo.trim()

    if (!value) {
      return
    }
    this.todos.push({
      id: this.todos.length,
      text: value,
      isCompleted: false,
    })

    this.newTodo = ''
  }
}
</script>
