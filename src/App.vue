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
              v-model="newTodo"
              label="Add a todo"
              outline
              clearable
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
