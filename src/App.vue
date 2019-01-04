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
            <v-card>
              <v-list v-if="todos.length > 0">
                <template v-for="todo in todos">
                  <v-list-tile :key="todo.text">
                    <v-list-tile-action @click.prevent>
                      <v-checkbox v-model="todo.isCompleted" />
                    </v-list-tile-action>
                    <v-list-tile-content>{{ todo.text }}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider
                    :key="todo.id"
                    v-if="todo.id !== todos.length - 1"
                  />
                </template>
              </v-list>
            </v-card>
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
  private newTodo: string = Object.assign('', this.todoInput)

  @Emit()
  addTodo() {
    const value = this.newTodo && this.newTodo.trim()

    // skip if no text
    if (!value) {
      return
    }

    this.todos.push({
      id: this.todos.length,
      text: value,
      isCompleted: false,
    })

    // clear input value
    this.clearTodoInput()
  }

  @Emit()
  clearTodoInput() {
    this.newTodo = ''
  }
}
</script>
