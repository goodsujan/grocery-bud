// Create Inline Notification Component
let notificationTimeout;
let autoHideCallback = null;

export function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.inline-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Clear existing timeout
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `inline-notification inline-notification-${type}`;

    // Choose icon based on type
    let icon = '';
    if (type === 'success') icon = '✅';
    if (type === 'delete') icon = '🗑️';
    if (type === 'edit') icon = '✏️';
    if (type === 'error') icon = '❌';

    notification.innerHTML = `
    <div class="inline-notification-content">
      <span class="inline-notification-icon">${icon}</span>
      <span class="inline-notification-message">${message}</span>
    </div>
  `;

    return notification;
}

export function clearNotification() {
    const existingNotification = document.querySelector('.inline-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }
}

export function setAutoHideCallback(callback) {
    autoHideCallback = callback;
}

export function autoHideNotification() {
    notificationTimeout = setTimeout(() => {
        clearNotification();
        if (autoHideCallback) {
            autoHideCallback();
        }
    }, 3000);
}
