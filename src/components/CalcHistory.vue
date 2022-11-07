<template>
  <div v-if="historyIsOpen" class="history">
    <div class="history__row history__title">
      <span>Предыдущие вычисления</span>
      <button @click="clearHistory" class="clearHistoryBtn">Очистить</button>
    </div>
    <div
      class="history__row history__item"
      v-for="item in history.slice().reverse()"
      v-bind:key="item"
    >
      <div class="history__time">{{ item.time }}</div>
      <div @click="setExprFromHistory(item.expr)" class="history__expr">
        {{ item.expr }}
      </div>
      <div class="history__res">{{ item.res }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: mapState(['history', 'historyIsOpen']),

    methods: {
        clearHistory() {
            this.$store.commit('clearHistory');
        },

        setExprFromHistory(expr) {
            this.$store.commit('setExprFromHistory', expr);
        }
    },
};
</script>

<style>
.history {
  height: 8.4em;
  overflow-y: scroll;
  border: 2px solid #030574;
  border-radius: 5px;
}

.history,
.buttons-container {
  margin: 2%;
  width: 90%;
}

.clearHistoryBtn {
  float: right;
  margin-right: 1em;
  background-color: #030574;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid rgb(27, 7, 51);
  border-radius: 6px;
}

.clearHistoryBtn:hover {
  background-color: #1316b6;
}

.history__title {
  background-color: #4447a8;
  line-height: 100%;
  text-align: left;
  font-weight: bold;
  padding-left: 1%;
  padding-top: 10px;
  color: #fff;
}

.history__item {
  display: flex;
  line-height: 150%;
}

.history__row {
  border-bottom: 1px solid #030574;
  height: 1.5em;
}

.history__time {
  background-color: #e7e7e7;
  width: 19%;
  padding-left: 1%;
}
.history__expr {
  background-color: #f0f0f0;
  width: 59%;
  padding-left: 1%;
  cursor: pointer;
}

.history__expr:hover {
  background-color: #e7e7e7;
}

.history__res {
  background-color: #dbdbdb;
  width: 19%;
  padding-left: 1%;
}
</style>
