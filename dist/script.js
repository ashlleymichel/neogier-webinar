'use strict';
const form = document.querySelector('#registration-form');
const button = form.querySelector('button[type="submit"]');
// Ativar somente depois de configurar a integração real de inscrições.
button.disabled = !form.dataset.endpoint;
form.addEventListener('input', event => event.target.removeAttribute('aria-invalid'));
form.addEventListener('submit', event => {
  event.preventDefault();
  for (const field of form.querySelectorAll('input, textarea')) {
    field.value = field.value.trim();
    field.removeAttribute('aria-invalid');
  }
  const invalid = [...form.querySelectorAll('input')].find(field => !field.checkValidity());
  if (invalid) {
    invalid.setAttribute('aria-invalid', 'true');
    invalid.reportValidity();
    invalid.focus();
    return;
  }
  // O envio e seus estados devem ser definidos junto à integração,
  // usando apenas mensagens aprovadas pelo responsável pela página.
});
