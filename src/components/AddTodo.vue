<template>
  <v-text-field
    @keyup.enter="addTodo"
    v-model="newTodo"
    label="Add a todo"
    solo
    clearable
    counter
    :rules="[rules.counter]"
    maxlength="140"
    :loading="loading"
    :disabled="loading"
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Vue, Model, Emit } from 'vue-property-decorator'
import { db } from '@/main'

interface Todo {
  id: string
  text: string
  isCompleted: boolean
  created: Date
}

@Component
export default class AddTodo extends Vue {
  @Model('input', { type: String, default: '' }) todoInput!: string

  protected Todos = db.collection('todos')
  private loading: boolean = false
  private newTodo: string = Object.assign('', this.todoInput)
  private rules: any = {
    counter: (value: string) => value.length <= 140 || 'Max 140 characters',
  }

  @Emit()
  async addTodo() {
    // start
    this.loading = true
    const text = this.newTodo && this.newTodo.trim()
    // skip if no text
    if (!text) {
      return
    }

    // get an id for the new doc and insert
    const { id } = this.Todos.doc()
    const todo: Todo = {
      id,
      text,
      isCompleted: false,
      created: new Date(),
    }
    await this.Todos.doc(id).set(todo)

    // clear input value and loading states
    this.clearTodoInput()
    this.loading = false
  }

  @Emit()
  clearTodoInput() {
    this.newTodo = ''
  }
}
</script>
