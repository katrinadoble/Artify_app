const screens = ['onboarding', 'profile', 'opportunities', 'application', 'prep', 'ready'];
const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function showScreen(name) {
  screens.forEach((screen) => {
    document.querySelector(`#screen-${screen}`).classList.toggle('hidden', screen !== name);
  });
  document.querySelectorAll('[data-screen]').forEach((button) => {
    button.classList.toggle('active', button.dataset.screen === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', (event) => {
  const screenButton = event.target.closest('[data-screen]');
  if (screenButton) {
    event.preventDefault();
    showScreen(screenButton.dataset.screen);
    return;
  }

  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;
  const action = actionButton.dataset.action;

  if (action === 'save') {
    actionButton.textContent = 'Saved ✓';
    actionButton.classList.add('saved');
    showToast('Saved to your opportunities');
  }
  if (action === 'dismiss') {
    actionButton.closest('.opportunity-card').style.opacity = '.45';
    showToast('We will show you fewer calls like this');
  }
  if (action === 'prepare' || action === 'write') {
    actionButton.closest('.requirement-row').classList.add('selected');
    actionButton.textContent = action === 'prepare' ? 'Selected ✓' : 'Added to your list ✓';
    showToast(action === 'prepare' ? 'Artify will prepare a first draft' : 'Added to your writing list');
  }
  if (action === 'submitted') {
    showToast('Demo complete. Your application is ready to submit.');
  }
  if (action === 'edit') {
    showToast('Draft editing is ready for your voice');
  }
  if (action === 'change') {
    showToast('Tell Artify what you would like to change');
  }
  if (action === 'upload') {
    showToast('Demo upload ready — your file will be analyzed by Artify');
  }
  if (action === 'website') {
    showToast('Website link added to your profile');
  }
});

document.querySelector('.close-banner')?.addEventListener('click', (event) => {
  event.currentTarget.closest('.agent-banner').remove();
});

document.querySelectorAll('.save-button').forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = '♥';
    showToast('Saved to your opportunities');
  });
});

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((filter) => filter.classList.remove('active'));
    button.classList.add('active');
    if (button.textContent.includes('Filter')) showToast('Filters are ready for your preferences');
  });
});
