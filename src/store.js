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
    },

    mutations: {
        updateExpression(state, expression) {
            state.expression = expression;
        },

        calculate(state) {
            let result = state.calculator.Calculate(state.expression).toString();

            if (isFinite(result)) {
                let date = new Date().toLocaleDateString("ru", {
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                });

                if (state.history.length <= 15) {
                    state.history.push({ time: date, expr: state.expression, res: result });
                } else {
                    state.history.shift();
                    state.history.push({ time: date, expr: state.expression, res: result });
                }

                state.message = "Введите выражение";
                state.expression = result;
                state.prevExprIndex = state.history.length - 1;
            } else {
                state.expression = "";
                state.message = "Ошибка: неизвестное выражение";
            }

            return false;
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
            }
            else {
                state.message = 'История вычислений пуста'
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
            state.expression = state.expression.slice(0, state.expression.length -1)
        },

        changeExpr(state, input) {
            state.expression += input;
        }
    }
})

export default store;