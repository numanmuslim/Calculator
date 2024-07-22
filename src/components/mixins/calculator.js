import { disable_btn_list, buttons, keyPressButtonList } from "./variables.js";
export default {
  data() {
    return {
      display: "0",
      upperDisplay: "",
      currentValue: "0",
      previousValue: "",
      operator: "",
      setDisplay: false,
      disable_btn: false,
      setDiplayAfterEqual: false,
      triggerUpperFunc: false,
      removeDisplayValue: false,
      history: [],
      disable_btn_list,
      buttons,
    };
  },
  methods: {
    handleKeyPress(event) {
      // console.log(event)
      if (keyPressButtonList.find((val) => val === event.key)) {
        if (event.key === "/") this.input("÷");
        else if (event.key === "*") this.input("×");
        else if (event.key === "-") this.input("−");
        else this.input(event.key);
      } else if (event.key === "Enter") this.input("=");
      else if (event.key === "Escape") this.input("C");
      else if (event.key === "Backspace") this.input("⌫");
      else {
      }
    },
    clearHistory() {
      this.history = [];
    },
    historyItemClick(ind) {
      this.upperDisplay = this.history[ind].expression;
      this.display = this.history[ind].result;
      this.currentValue = this.history[ind].currentValue;
      this.previousValue = this.history[ind].result;
      this.operator = this.history[ind].operator;
    },
    input(value) {
      if (this.display.includes(".") && value === ".") {
      } else if (!isNaN(value) || value === ".") {
        this.handleNumber(value);
      } else if (value === "C") {
        this.clearAll();
      } else if (value === "CE") {
        this.clearEntry();
      } else if (value === "⌫") {
        this.handleBackspace();
      } else if (value === "=") {
        this.calculate();
      } else if (value === "%") {
        this.handlePercentage();
      } else if (value === "⅟x") {
        this.handleReciprocal();
      } else if (value === "x²") {
        this.handleSquare();
      } else if (value === "²√x") {
        this.handleSquareRoot();
      } else if (value === "+/-") {
        this.toggleSign();
      } else {
        this.handleOperator(value);
      }
    },
    handleNumber(value) {
      if (this.setDisplay || this.setDiplayAfterEqual) this.clearAll();
      if (this.removeDisplayValue) this.clearEntry();
      if (this.display.length > 13) {
      } else if (this.display === "0" && value !== ".") {
        this.display = value;
      } else {
        this.display += value;
      }
      this.currentValue = this.display;
    },
    handleBackspace() {
      if (this.setDisplay || this.setDiplayAfterEqual) this.clearAll();
      else if(this.removeDisplayValue) this.clearEntry()
      else {
        this.display = this.display.slice(0, -1) || "0";
        this.currentValue = this.display;
      }
    },
    handlePercentage() {
      // this.display = String(parseFloat(this.display) / parseFloat(this.previousValue) * 100);
      if (this.operator === "÷" || this.operator === "×") {
        this.display = String(parseFloat(this.display) / 100);
        this.upperDisplay =
          this.previousValue + " " + this.operator + " " + this.display;
      } else if (this.operator === "+" || this.operator === "−") {
        this.display = String(
          (parseFloat(this.display) * parseFloat(this.previousValue + "0")) /
            100
        );
        this.upperDisplay =
          this.previousValue + " " + this.operator + " " + this.display;
      } else {
        this.display = "0";
        this.upperDisplay = this.display;
      }
      this.currentValue = this.display;
    },
    handleReciprocal() {
      this.upperDisplay = `${this.previousValue} ${
        this.operator
      } 1 / (${parseFloat(this.display)})`;
      if (this.display === "0") {
        this.display = "Cannot divide by zero";
        this.disable_btn = true;
        this.setDisplay = true;
      } else {
        this.display = String(1 / parseFloat(this.display));
        this.currentValue = this.display;
        this.triggerUpperFunc = true;
      }
    },
    handleSquare() {
      this.upperDisplay = `${this.previousValue} ${this.operator} sqr(${this.display})`;
      this.display = String(Math.pow(parseFloat(this.display), 2));
      this.currentValue = this.display;
      if (this.display === "Infinity") {
        this.display = "Overflow";
        this.setDisplay = true;
        this.disable_btn = true;
      } else {
        this.triggerUpperFunc = true;
      }
    },
    handleSquareRoot() {
      this.upperDisplay = `${this.previousValue} ${this.operator} √(${this.display})`;
      this.display = String(Math.sqrt(parseFloat(this.display)));
      this.currentValue = this.display;
      if (this.display === "NaN") {
        this.display = "Invalid Input";
        this.setDisplay = true;
        this.disable_btn = true;
      } else {
        this.triggerUpperFunc = true;
      }
    },
    toggleSign() {
      this.display = String(parseFloat(this.display) * -1);
      this.currentValue = this.display;
    },
    handleOperator(operator) {
      if (this.currentValue) {
        if (
          this.previousValue &&
          this.operator &&
          !this.setDiplayAfterEqual &&
          !this.removeDisplayValue
        ) {
          this.calculate();
        }
        this.operator = operator;
        this.previousValue = String(parseFloat(this.display));
        // this.currentValue = "0";
        // this.display = "0";
        this.removeDisplayValue = true;
      }
      this.operator = operator;
      this.upperDisplay = this.previousValue + " " + this.operator;
      this.setDiplayAfterEqual = false;
    },
    calculate() {
      if (this.previousValue && this.operator && this.currentValue) {
        if (this.disable_btn) return this.clearAll();
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        let result = 0;
        switch (this.operator) {
          case "+":
            result = prev + current;
            break;
          case "−":
            result = prev - current;
            break;
          case "×":
            result = prev * current;
            break;
          case "÷":
            result = prev / current;
            break;
        }
        result = parseFloat(result.toPrecision(14));
        this.upperDisplay = prev + " " + this.operator + " " + current + " =";
        if (String(result) === "NaN") {
          this.display = "Result is undefined";
          this.setDisplay = true;
          this.disable_btn = true;
        } else if (String(result) === "Infinity") {
          if (this.operator == "÷") this.display = "Cannot divide by zero";
          else this.display = "Overflow";
          this.setDisplay = true;
          this.disable_btn = true;
        } else {
          this.display = String(result);
          const historyEntry = {
            expression: `${prev} ${this.operator} ${current} =`,
            result: `${result}`,
            operator: this.operator,
            currentValue: current,
          };
          this.history.unshift(historyEntry);
        }
        this.setDiplayAfterEqual = true;
        this.previousValue = String(result);
      } else if (this.triggerUpperFunc) {
        if (this.disable_btn) return this.clearAll();
        this.upperDisplay = `${this.upperDisplay} =`;
        let result = parseFloat(this.display);
        result = parseFloat(result.toPrecision(14));
        const historyEntry = {
          expression: `${this.upperDisplay}`,
          result: `${result}`,
          operator: this.operator,
          currentValue: this.currentValue,
        };
        this.history.unshift(historyEntry);
        this.triggerUpperFunc = false;
        this.setDiplayAfterEqual = true;
        this.display = `${result}`;
      } else {
        if (this.disable_btn) return this.clearAll();
        let result = parseFloat(this.display);
        result = parseFloat(result.toPrecision(14));
        this.upperDisplay = `${result} =`;
        const historyEntry = {
          expression: `${result} =`,
          result: `${result}`,
          operator: this.operator,
          currentValue: this.currentValue,
        };
        this.history.unshift(historyEntry);
        this.display = `${result}`;
      }
    },
    clearAll() {
      if (this.setDisplay) {
        this.disable_btn = false;
        this.setDisplay = false;
      }
      this.display = "0";
      this.currentValue = "0";
      this.previousValue = "";
      this.operator = "";
      this.upperDisplay = "";
      this.setDiplayAfterEqual = false;
    },
    clearEntry() {
      if (this.setDisplay) this.clearAll();
      else {
        this.display = "0";
        this.currentValue = "0";
        if (this.upperDisplay[this.upperDisplay.length - 1] == "=")
          this.upperDisplay = "";
      }
      this.removeDisplayValue = false;
    },
  },
};
