# Grid UI Browser Calculator

A fully featured, visually polished browser calculator built with vanilla HTML5, CSS Grid, and dynamic event-driven JavaScript. This application performs multi-step arithmetic chains with precision state memory tracking.

## 🚀 Architectural Milestones & Features
* **CSS Grid Blueprinting:** Utilizing custom `display: grid` mappings with strategic grid column span intervals to craft a symmetrical button layout.
* **Calculation State Engine:** Managing memory buffers (`firstOperand`, `secondOperand`, `currentOperator`) to process consecutive continuous calculations sequentially without losing data trace.
* **Keyboard Interface Layer:** Intercepting browser window keypress indicators (`keydown`) to enable fluid numpad and functional modifier execution via physical hardware inputs.
* **Edge-Case Validation:** Catching application vulnerabilities including zero-division exceptions and decimal duplication logic filters.

## 🕹️ Input Manual
1. **Interactive Controls:** Left-click on any on-screen button module.
2. **Numpad Execution:** Input figures using standard keys (`0`-`9`, `.`), operators (`+`, `-`, `*`, `/`), and evaluate using `Enter` or `=`.
3. **Control Overrides:** Tap `Backspace` to delete input data strings or click `Escape` to wipe memory indexes entirely.