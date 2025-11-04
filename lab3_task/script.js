// script.js
// Select nodes (DOM)
const displayEl = document.getElementById("display");
const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const keys = document.querySelectorAll(".btn");

let expression = "";
let lastResult = null; // hold last numeric result

// Helpers
function updateDisplay() {
  expressionEl.textContent = expression;
  resultEl.textContent =
    expression === "" ? "0" : simplifyForDisplay(expression);
}

function simplifyForDisplay(expr) {
  // show neat expression; if it ends with operator show as-is; else try to compute a preview
  try {
    const numeric = safeEval(expr);
    if (numeric !== null && !isNaN(numeric) && isFinite(numeric)) {
      // Show result but keep expression visible separately
      return numeric.toString();
    }
  } catch (e) {}
  return expr || "0";
}

// Map button inputs to real operators for evaluation
function toEvalString(expr) {
  return expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/%/g, "%");
}

// Safe evaluation: only allow digits, operators, parentheses, decimal and percent
function safeEval(expr) {
  if (!expr) return null;

  // Convert fancy operators to JS ones
  const jsExpr = toEvalString(expr);

  // Replace percent occurrences: "50%" => "(50/100)"
  const exprWithPercent = jsExpr.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

  // Allowed characters check
  if (!/^[0-9+\-*/().\s%]+$/.test(exprWithPercent)) {
    throw new Error("Invalid characters");
  }

  // Evaluate using Function (safer than eval, still check above)
  // Use parentheses to avoid accidental trailing expression issues
  const fn = new Function(`return (${exprWithPercent});`);
  const value = fn();

  // Round small floating errors
  if (typeof value === "number") {
    const rounded = Math.round((value + Number.EPSILON) * 1e12) / 1e12;
    return rounded;
  }
  return value;
}

// Button actions
function appendValue(val) {
  // Prevent multiple decimals in same number chunk
  if (val === ".") {
    // find last number token
    const parts = expression.split(/[\+\-\×\÷\*\/]/);
    const last = parts[parts.length - 1];
    if (last && last.includes(".")) return;
    if (last === "" && (expression === "" || /[+\-×÷]$/.test(expression))) {
      // start with 0.
      expression += "0";
    }
  }

  // If previous result displayed and user starts number -> reset expression
  if (
    lastResult !== null &&
    /^[0-9.]$/.test(val) &&
    expression === String(lastResult)
  ) {
    expression = "";
    lastResult = null;
  }

  expression += val;
  updateDisplay();
}

function applyOperator(op) {
  if (!expression && op === "-") {
    // allow negative numbers
    expression = "−";
    updateDisplay();
    return;
  }

  // If last char is operator, replace it
  if (/[+\-×÷]$/.test(expression) || /[+\-]$/.test(expression)) {
    expression = expression.slice(0, -1) + op;
  } else {
    expression += op;
  }
  updateDisplay();
}

function allClear() {
  expression = "";
  lastResult = null;
  updateDisplay();
}

function del() {
  if (!expression) return;
  expression = expression.slice(0, -1);
  updateDisplay();
}

function compute() {
  try {
    const value = safeEval(expression);
    if (value === null || isNaN(value)) return;
    lastResult = value;
    expression = String(value);
    updateDisplay();
  } catch (err) {
    // show error briefly
    resultEl.textContent = "Error";
    setTimeout(() => updateDisplay(), 700);
  }
}

// Wire up buttons
keys.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === "all-clear") {
      allClear();
      return;
    }
    if (action === "delete") {
      del();
      return;
    }
    if (action === "equals") {
      compute();
      return;
    }
    if (action === "percent") {
      // append percent operator as "%" to last number (we handle conversion in safeEval)
      if (expression && /[0-9.]$/.test(expression)) {
        expression += "%";
        updateDisplay();
      }
      return;
    }

    if (val) {
      // operator buttons contain × ÷ + - ; number buttons contain digits and dot
      if (/^[0-9.]$/.test(val)) {
        appendValue(val);
      } else {
        applyOperator(val);
      }
    }
  });
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  const key = e.key;

  if ((key >= "0" && key <= "9") || key === ".") {
    appendValue(key);
    e.preventDefault();
    return;
  }

  if (key === "+" || key === "-") {
    applyOperator(key === "-" ? "−" : "+");
    e.preventDefault();
    return;
  }

  if (key === "*" || key === "x" || key === "X") {
    applyOperator("×");
    e.preventDefault();
    return;
  }
  if (key === "/") {
    applyOperator("÷");
    e.preventDefault();
    return;
  }

  if (key === "Enter" || key === "=") {
    compute();
    e.preventDefault();
    return;
  }

  if (key === "Backspace") {
    del();
    e.preventDefault();
    return;
  }

  if (key === "Escape") {
    allClear();
    e.preventDefault();
    return;
  }

  if (key === "%") {
    // percent: append if last char numeric
    if (expression && /[0-9.]$/.test(expression)) {
      expression += "%";
      updateDisplay();
      e.preventDefault();
    }
    return;
  }
});

// initialize
updateDisplay();
