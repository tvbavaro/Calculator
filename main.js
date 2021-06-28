class Calculator {
    constructor() {
        this.currentWindow = document.querySelector('[data-current]');
        this.previousWindow = document.querySelector('[data-previous]');
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
        this.init();
        this.updateDisplay();
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
            if (this.operation) {
                this.currentOperand = this.compute(+this.currentOperand, +this.previousOperand, this.operation);
                this.previousOperand = '';
                this.operation = '';
                this.updateDisplay();
            }
        });
        document.querySelector('[data-clear]').addEventListener('click', () => {
            this.clear();
            this.updateDisplay();
        });
        document.querySelector('[data-delete]').addEventListener('click', () => {
            this.delete();
            this.updateDisplay();
        });
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
    }

    delete() {
        if (typeof (this.currentOperand) === 'number') {
            this.clear();
            return;
        }
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendNumber(number) {
        if (typeof (this.currentOperand) === 'number') {
            this.currentOperand = number;
            this.updateDisplay;
            return;
        } else if (number === '.' && this.currentOperand.includes('.')) {
            return;
        } else if ([...this.currentOperand][0] == 0 && number == 0 && [...this.currentOperand].length == 1) {
            return;
        }
        this.currentOperand += number;
    }

    chooseOperation(operation) {
        if (!this.currentOperand) {
            this.operation = operation;
        } else if (this.previousOperand && this.currentOperand) {
            this.previousOperand = this.compute(+this.currentOperand, +this.previousOperand, this.operation).toString();
            this.operation = operation;
            this.currentOperand = '';
        } else {
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
    }

    compute(current, previous, operation) {
        switch (operation) {
            case '+':
                return previous + current;
            case '-':
                return previous - current;
            case '/':
                return previous / current;
            case '*':
                return previous * current;
            default:
                return;
        }
    }

    formatDisplay(number) {
        if (number === '.') {
            this.currentOperand = `0${number}`;
            return `0${number}`;
        }

        return number.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(" ");
    }

    updateDisplay() {
        this.currentWindow.innerText = this.formatDisplay(this.currentOperand);
        this.previousWindow.innerText = `${this.previousOperand} ${this.operation}`;
    }
}

const calculator = new Calculator();



