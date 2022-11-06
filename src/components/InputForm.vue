<template>
  <form action="submit" @submit="calculate" @submit.prevent="onSubmit">
    <input
      name="expression"
      id="expression"
      type="text"
      placeholder="0"
      :value="expression"
      @input="updateExpression"
    />
    <input class="submit" type="submit" value=" " />
    <button
      class="clearButton"
      @click="clearExpr"
      @click.prevent="onClick"
    >
      &#215;
    </button>
    <label for="expression" v-html="message"></label>
  </form>
</template>

<script>
export default {
    computed: {
        expression() {
            return this.$store.state.expression
        },

        message() {
            return this.$store.state.message;
        }
    },
    methods: {
        updateExpression (e) {
            this.$store.commit('updateExpression', e.target.value);
        },

        calculate() {
            this.$store.commit('calculate');
        },

        clearExpr() {
            this.$store.commit('clearExpr');
        }
    }
}
</script>

<style>
input {
  position: relative;
  width: 70%;
  height: 2.2em;
  border: 1px solid;
  border-radius: 4px;
  margin: 2% 0 0 2%;
  padding-right: 0.5em;
  text-align: end;
  font-size: 1.2em;
  transition: 0.1s ease-in;
}

input:hover {
  background-color: rgb(240, 240, 240);
  box-shadow: 1px 1px 1px rgb(180, 180, 180);
}

label {
  display: block;
  padding-top: 0.5em;
  margin-left: 2%;
}

.clearButton {
  border: none;
  background-color: #fff;
  cursor: pointer;
  color: black;
  font-size: 1.1em;
  margin-left: 1%;
  width: fit-content;
  height: fit-content;
  text-align: center;
  vertical-align: middle;
  transition: 0.2s ease-in;
}

.clearButton:hover {
  background-color: rgb(214, 214, 214);
  box-shadow: 1px 1px 1px rgb(180, 180, 180);
}

.submit {
  width: 0;
  height: 0;
  position: fixed;
  top: -100px;
  left: -100px;
}
</style>
