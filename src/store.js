import { createStore } from 'vuex';
import Calculator from './components/Calculator.js';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],

    state: {
        calculator: new Calculator(),
        expression: "",
        operators: ["(", ")", "+", "-", "*", "/", "^", "√", "%"],
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        history: [],
        historyIsOpen: false,
        prevExprIndex: history.length,
        message: "Введите выражение",
        isAlert: false,
    },

    mutations: {
        updateExpression(state, expression) {
            state.expression = expression;
        },

        updateHistory(state, result) {
            let date = new Date().toLocaleTimeString(navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
            });

            if (state.history.length <= 15) {
                state.history.push({ time: date, expr: state.expression, res: result });
            } else {
                state.history.shift();
                state.history.push({ time: date, expr: state.expression, res: result });
            }
        },

        clearExpr(state) {
            state.expression = '';
        },

        clearHistory(state) {
            state.history = [];
        },

        setExprFromHistory(state, expr) {
            state.expression = expr;
        },

        resetExpression(state) {
            if (state.history.length != 0 && state.prevExprIndex >= 0) {
                state.expression = state.history[state.prevExprIndex].expr;
                state.prevExprIndex--;
                state.message = 'Введите выражение'
                state.isAlert = false;
            }
            else {
                state.message = 'История вычислений пуста'
                state.isAlert = true;
                return false
            }
        },

        openHistory(state) {
            if (state.history.length != 0) {
                state.historyIsOpen = !state.historyIsOpen;
            } else {
                state.message = 'История вычислений пуста';
            }
        },

        deleteLast(state) {
            state.expression = state.expression.slice(0, state.expression.length - 1)
        },

        changeExpr(state, input) {
            state.expression += input;
        }
    },

    actions: {
        calculate({ commit, state }) {
            let result = state.calculator.Calculate(state.expression).toString();

            if (isFinite(result)) {
                commit('updateHistory', result);

                state.message = "Введите выражение";
                state.isAlert = false;
                state.expression = result;
                state.prevExprIndex = state.history.length - 1;
            } else {
                state.expression = "";
                state.message = "Ошибка: неизвестное выражение";
                state.isAlert = true;
            }

            return false;
        }
    }
})

export default store;