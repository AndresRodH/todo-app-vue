<template>
  <v-app>
    <v-toolbar color="teal" dark fixed app>
      <v-toolbar-title>Todo App</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm6>
            <AddTodo />
            <TodoList :todos="todos" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop, Emit } from 'vue-property-decorator'
import AddTodo from '@/components/AddTodo.vue'
import Footer from '@/components/Footer.vue'
import TodoList from '@/components/TodoList'
import { db } from '@/main'

export interface Todo {
  id: string
  text: string
  isCompleted: boolean
}

enum VisibilityFilter {
  ALL,
  COMPLETED,
  REMAINING,
}

@Component({
  data: () => ({ todos: [] }),
  firestore: () => ({
    todos: db.collection('todos').orderBy('created', 'desc'),
  }),
  components: {
    AddTodo,
    TodoList,
    Footer,
  },
})
export default class App extends Vue {
  private visibilityFilter = VisibilityFilter.ALL
}
</script>
