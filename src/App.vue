<template>
  <div class="calculator-container">
    <Input></Input>
    <History></History>
    <Buttons></Buttons>
  </div>
</template>

<script>
import Input from "./components/InputForm.vue";
import History from "./components/CalcHistory.vue";
import Buttons from "./components/inputButtons.vue";

export default {
  name: "App",
  components: { Input, History, Buttons },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.calculator-container {
  border: 3px solid #a7a7a7;
  border-radius: 6px;
  width: 95vw;
  margin: auto;
  height: fit-content;
}
</style>
