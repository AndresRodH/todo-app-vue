<template>
  <v-app>
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
              counter
              :rules="[rules.counter]"
              maxlength="140"
            ></v-text-field>
            <v-card>
              <v-list v-if="todos.length > 0">
                <template v-for="todo in todos">
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
import { db } from '@/main'

interface Todo {
  id: string
  text: string
  isCompleted: boolean
  loading?: boolean
}

@Component({
  data: () => ({ todos: [] }),
  firestore: () => ({
    todos: db.collection('todos'),
  }),
})
export default class App extends Vue {
  @Model('input', { type: String, default: '' }) todoInput!: string

  protected Todos = db.collection('todos')
  private newTodo: string = Object.assign('', this.todoInput)
  private rules: any = {
    counter: (value: string) => value.length <= 140 || 'Max 140 characters',
  }

  @Emit()
  async addTodo() {
    const text = this.newTodo && this.newTodo.trim()
    // skip if no text
    if (!text) {
      return
    }

    const { id } = this.Todos.doc()
    const todo: Todo = {
      id,
      text,
      isCompleted: false,
    }

    await this.Todos.doc(id).set(todo)
    // clear input value
    this.clearTodoInput()
  }

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

  @Emit()
  clearTodoInput() {
    this.newTodo = ''
  }
}
</script>
