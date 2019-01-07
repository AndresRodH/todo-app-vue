<template>
  <v-card>
    <v-list v-if="todos.length > 0">
      <template v-for="todo in todos">
        <TodoListItem :todo="todo" :key="todo.id" />
      </template>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Todo } from '@/App.vue'
import TodoListItem from './TodoListItem.vue'

@Component({
  components: {
    TodoListItem,
  },
})
export default class TodoList extends Vue {
  @Prop() todos: Todo[] = []
}
</script>
