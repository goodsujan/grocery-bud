// Create Counter Component
export function createCounter(itemsArray) {
    const totalTasks = itemsArray.length;
    const completedTasks = itemsArray.filter((item) => item.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    const counterDiv = document.createElement("div");
    counterDiv.className = "counter-container";

    counterDiv.innerHTML = `
    <div class="counter-card">
      <div class="counter-item total">
        <div class="counter-icon">📋</div>
        <div class="counter-info">
          <div class="counter-label">Total Tasks</div>
          <div class="counter-value">${totalTasks}</div>
        </div>
      </div>
      <div class="counter-divider"></div>
      <div class="counter-item completed">
        <div class="counter-icon">✅</div>
        <div class="counter-info">
          <div class="counter-label">Completed</div>
          <div class="counter-value">${completedTasks}</div>
        </div>
      </div>
      <div class="counter-divider"></div>
      <div class="counter-item pending">
        <div class="counter-icon">⏳</div>
        <div class="counter-info">
          <div class="counter-label">Pending</div>
          <div class="counter-value">${pendingTasks}</div>
        </div>
      </div>
    </div>
  `;

    return counterDiv;
}
