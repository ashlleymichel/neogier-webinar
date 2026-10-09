'use strict';
const form = document.querySelector('#registration-form');
const button = form.querySelector('button[type="submit"]');
const status = document.querySelector('#form-status');
let pending = null;
let sending = false;
button.disabled = !form.dataset.endpoint;
form.addEventListener('input', event => event.target.removeAttribute('aria-invalid'));
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending || !form.dataset.endpoint) return;
  status.hidden = true;
  for (const field of form.querySelectorAll('input, textarea')) {
    field.value = field.value.trim();
    field.removeAttribute('aria-invalid');
  }
  const invalid = [...form.querySelectorAll('input, textarea')].find(field => !field.checkValidity());
  if (invalid) {
    invalid.setAttribute('aria-invalid', 'true');
    invalid.reportValidity();
    invalid.focus();
    return;
  }
  const data = Object.fromEntries(new FormData(form));
  const signature = JSON.stringify(data);
  if (!pending || pending.signature !== signature) pending = {signature, id: crypto.randomUUID()};
  sending = true;
  button.disabled = true;
  form.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(form.dataset.endpoint, {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...data, id: pending.id}), signal: AbortSignal.timeout(65000)
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true || result.id !== pending.id) throw new Error('unconfirmed');
    status.textContent = 'Inscrição concluída!';
    status.dataset.state = 'success';
    form.reset();
    pending = null;
  } catch {
    status.textContent = 'Não foi possível confirmar sua inscrição. Tente novamente.';
    status.dataset.state = 'error';
  } finally {
    sending = false;
    button.disabled = false;
    form.removeAttribute('aria-busy');
    status.hidden = false;
    status.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest'});
  }
});
