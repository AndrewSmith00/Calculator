<template>
        <div class="buttons-container">
      <div class="numbers-container">
        <button 
         class="input-button tool" 
         title="Предыдущее выражение"
         @click="this.$store.commit('resetExpression')">
          ↻
        </button>
        <button
          class="input-button tool"
          @click="this.$store.commit('openHistory')"
          title="История"
        >
          ◴
        </button>
        <button
          class="input-button tool"
          @click="this.$store.commit('deleteLast');"
          title="Стереть"
        >
          &#9003;
        </button>
        <button
          class="input-button number"
          v-for="number in numbers"
          v-bind:key="number"
          v-html="number"
          @click="changeExpr($event, number)"
        ></button>
      </div>

      <div class="operators-container">
        <button
          class="input-button operator"
          v-for="operator in operators"
          v-bind:key="operator"
          v-html="operator"
          @click="changeExpr($event, operator)"
        ></button>
        <button
          class="input-button operator"
          v-html="'='"
          @click="this.$store.dispatch('calculate')"
        ></button>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

    export default {
        computed: mapState(['numbers', 'operators']),

        methods: {
            changeExpr(event, input) {
                this.$store.commit('changeExpr', input)
                event.target.blur();
            }
        }
    }
</script>

<style>
.buttons-container {
  display: flex;
}

.numbers-container {
  width: 59%;
  margin-right: 1%;
}

.operators-container {
  width: 39%;
  margin-left: 1%;
}

.input-button {
  display: inline-block;
  margin-bottom: 3px;
  height: 2em;
  line-height: 17%;
  font-size: 1em;
  text-align: center;
  border: 1px solid #a7a7a7;
  border-radius: 4px;
}

.input-button.tool {
  background-color: rgb(228, 55, 55);
  color: #fff;
  font-weight: 600;
}

.input-button.number,
.input-button.tool {
  width: 32.3%;
  margin-right: 1%;
}

.input-button.operator {
  width: 49%;
  margin-right: 1%;
  background-color: rgb(123, 123, 255);
  border: 1px solid #5f61ff;
  color: #fff;
}

.input-button.operator:hover {
  background-color: rgb(165, 165, 250);
}

.input-button.number:hover {
  background-color: #c9c9c9;
}

.input-button.tool:hover {
  background-color: rgb(255, 100, 100);
}
</style>