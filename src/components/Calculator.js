export default class Calculator {
    priorities = {
        '(': 0,
        ')': 1,
        '+': 2,
        '-': 3,
        '*': 4,
        '/': 4,
        '^': 5,
        '√': 5,
        '%': 5,
    }

    operations = {
        ')': (a, b) => a * b,
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '^': (a, b) => Math.pow(a, b),
        '√': a => Math.sqrt(a),
        '%': (a, b) => a * b / 100,
    }

    Calculate(input) {
        try {
            let output = this._getExpression(input);
            let result = this._counting(output);
            return result;
        } catch (e) {
            return e.message
        }
    }

    _getExpression(input) {
        let output = '';
        let stack = [];
        try {
            for (let i = 0; i < input.length; i++) {
                if (this._isDelimeter(input[i])) continue;

                if (!isNaN(parseInt(input[i]))) {
                    while (!this._isDelimeter(input[i]) && !this._isOperator(input[i])) {
                        output += input[i];
                        i++;

                        if (i == input.length) break;
                    }
                    output += ' ';
                }

                //console.log(`checking ${input[i]} isOperator: ${this._isOperator(input[i])}`)
                if (this._isOperator(input[i])) {

                    if (input[i] == '(') {
                        stack.push(input[i]);
                    } else if (input[i] == ')') {
                        let temp = stack.pop();

                        while (temp != '(') {
                            output += `${temp} `;
                            temp = stack.pop();
                        }
                        stack.push(input[i]);
                    } else {
                        if (stack.length > 0) {
                            if (this._getPriority(input[i]) <= this._getPriority(stack[stack.length-1])) {
                                output += `${stack.pop()} `;
                            }
                        }

                        stack.push(input[i]);
                    }
                }
            }

            while (stack.length > 0) {
                output += `${stack.pop()} `;
            }
            return output;
        } catch (e) {
            return e;
        }
    }

    _counting(input) {
        try {
            let result = 0;
            let stack = [];
            console.log(input);
    
            for (let i = 0; i < input.length; i++) {

                if (this._isDelimeter(input[i])) continue;

                if (!isNaN(parseInt(input[i]))) {
                    let a = '';
    
                    while (!this._isDelimeter(input[i]) && !this._isOperator(input[i])) {
                        a += input[i];
                        i++;
    
                        if (i == input.length) break;
                    }
                    stack.push(+a);
                    i--

                } else if (this._isOperator(input[i])) {

                    if(input[i] === ')' && stack.length == 1) {
                        return stack[0];
                    }

                    if ( input[i] === '√') {
                        let a = stack.pop();
                        result = this.operations[input[i]](a);
                        stack.push(result);
                    } else if(input[i] == '%' && (input[i+1] == '-'|| input[i+2] == '-')) {
                        let a = stack.pop();
                        let b = stack.pop();

                        let persentage = this.operations[input[i]](b, a);
                        result = b - persentage;

                        stack.push(result);
                    } else {
                        let a = stack.pop();
                        let b = stack.pop();
                        console.log(b, input[i], a)
        
                        result = this.operations[input[i]](b, a);
        
                        stack.push(result);
                    }
    
                }
            }
            return stack[0];
        } catch(e) {
            return e
        }
        
    }

    _isDelimeter(ch) {
        if (ch == ' ') return true;
        else return false;
    }

    _isOperator(ch) {
        return Object.prototype.hasOwnProperty.call(this.priorities, ch) 
    }
    _getPriority(ch) {
            return this.priorities[ch];
    }
}