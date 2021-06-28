class Calculator {
    constructor() {
        this.currentWindow = document.querySelector('[data-current]');
        this.previousWindow = document.querySelector('[data-previous]');
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
        this.init();
    }

    init() {
        [...document.querySelectorAll('[data-numbers]')].forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.innerText);
                this.updateDisplay();
            })
        });
        [...document.querySelectorAll('[data-operation]')].forEach(button => {
            button.addEventListener('click', () => {
                this.chooseOperation(button.innerText);
                this.updateDisplay();
            })
        });
        document.querySelector('[data-equalls]').addEventListener('click', () => {
            this.currentOperand = this.compute(+this.currentOperand, +this.previousOperand, this.operation);
            this.previousOperand = '';
            this.operation = ' ';
            this.updateDisplay();
        });
        document.querySelector('[data-clear]').addEventListener('click', () => {
            this.clear();
            this.updateDisplay();
        });
        document.querySelector('[data-delete]').addEventListener('click', () => {
            this.delete();
            this.updateDisplay();
        });
        document.querySelector('[data-negative]').addEventListener('click', () => {
            this.negative();
            this.updateDisplay();
        });
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendNumber(enter) {
        let symbol = this._inputValidator(enter, this.currentOperand);
        this.currentOperand += symbol;
    }

    chooseOperation(operation) {
        this._operationValidator(this.currentOperand, this.previousOperand, operation);
    }

    compute(current, previous, operation) {
        switch (operation) {
            case '+':
                return (previous + current).toString();
            case '-':
                return (previous - current).toString();
            case '/':
                if (current == 0) return current = '0'; // Временная проверка деления на 0
                return (previous / current).toString();
            case '*':
                return (previous * current).toString();
            default:
                return current.toString();
        }
    }

    negative() {
        if (this.currentOperand.includes('-')) {
            this.currentOperand = this.currentOperand.split('').slice(1).join('');
        } else {
            this.currentOperand = `-${this.currentOperand}`;
        }
    }

    formatOutput(rawString) {
        if (typeof (rawString) === 'number') rawString = rawString.toString();
        if (rawString) {
            let extract = rawString.match(/\d+/).toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(' ');
            return rawString.replace(/\d+/, extract);
        }
        return '';
    }

    _inputValidator(enter, current) {

        if (this.operation === ' ') {
            this.currentOperand = ''; // Временное решение дляя сбоса ввода
            this.operation = '';
            return enter;
        } else if (enter === '.' && this.currentOperand.includes('.')) {
            return '';
        } else if ([...this.currentOperand][0] == 0 && enter !== '.' && [...this.currentOperand].length == 1) {
            return '';
        } else if (enter === '.' && current.length == 0) {
            return `0${enter}`;
        } else if ([...current].length > 12) {
            return '';
        } else {
            return enter;
        }
    }

    _operationValidator(current, previous, operation) {
        if (current && !previous) {
            this.currentOperand = '';
            this.previousOperand = current;
            this.operation = operation;
        } else if (current && previous) {
            this.previousOperand = this.compute(+current, +previous, this.operation);
            this.currentOperand = '';
            this.operation = operation;
        } else if (!current && previous) {
            this.operation = operation;
        }
    }

    updateDisplay() {
        this.currentWindow.innerText = this.formatOutput(this.currentOperand);
        this.previousWindow.innerText = `${this.formatOutput(this.previousOperand)} ${this.operation}`;
    }
}

const calculator = new Calculator();



