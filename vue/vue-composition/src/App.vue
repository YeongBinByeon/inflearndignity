<template>
  <TodoHeader :appTitle="title"></TodoHeader
  ><TodoInput @add="addTodoItem"></TodoInput
  ><TodoList :todoItems="todoItems" @remove="removeTodoItem"></TodoList>
</template>

<script>
import { onBeforeMount } from "vue";
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import { useTodo } from "./hooks/useTodo";

export default {
  components: {
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList,
  },

  data() {
    return {
      title: "할일 앱",
    };
  },
  setup() {
    const { todoItems, addTodoItem, fetchTodos } = useTodo();

    // 컴포넌트가 화면에 부착되기 바로 직전에
    // 라이플 사이클 API가 적용된 구간
    onBeforeMount(() => {
      // console.log("onBeforeMount called");
      todoItems.value = fetchTodos();
    });

    // function removeTodoItem(param1, param2) {
    //   todoItems.value.splice(param2, 1);
    //   localStorage.removeItem(param1);
    // }

    // console.log("setup called");

    return { todoItems, addTodoItem };
  },

  methods: {
    removeTodoItem(item, index) {
      this.todoItems.splice(index, 1);
      localStorage.removeItem(item);
    },
  },
};
</script>

<style lang="scss" scoped></style>
