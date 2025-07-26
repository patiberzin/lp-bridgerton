const firstForm = document.getElementById('first-form');
const secondForm = document.getElementById('second-form');
const forms = [firstForm, secondForm];
let currentFormIndex = 0;

const btnNext = document.querySelector('.btn-next');
const btnBefore = document.querySelector('.btn-before');
const btnBuy = document.querySelector('.btn-buy');

// Nova seleção de método de pagamento
const paymentOptions = document.querySelectorAll('.container-pay ul li');

paymentOptions.forEach(option => {
  option.addEventListener('click', () => {
    // Remove a classe 'selected' de todos
    paymentOptions.forEach(opt => opt.classList.remove('selected'));
    // Adiciona a classe 'selected' no clicado
    option.classList.add('selected');
  });
});

function updateFormVisibility() {
  // mostra só o formulário atual
  forms.forEach((form, index) => {
    if(index === currentFormIndex) {
      form.classList.add('active');
    } else {
      form.classList.remove('active');
    }
  });

  // atualiza as bolinhas
  document.querySelectorAll('.progress-dots .dot').forEach(dot => dot.classList.remove('active'));

  const dots = forms[currentFormIndex].querySelectorAll('.progress-dots .dot');
  dots.forEach((dot, idx) => {
    if(idx === currentFormIndex) dot.classList.add('active');
  });

  // ativa listeners de focus/blur nos inputs do form atual
  setupInputActiveClasses();
}

function setupInputActiveClasses() {
  // remove listeners antigos antes (por segurança)
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.onfocus = null;
      input.onblur = null;
      input.classList.remove('active');
    });
  });

  // adiciona listeners só no form atual
  const currentInputs = forms[currentFormIndex].querySelectorAll('input');
  currentInputs.forEach(input => {
    input.addEventListener('focus', () => input.classList.add('active'));
    input.addEventListener('blur', () => input.classList.remove('active'));
  });
}

// eventos dos botões
btnNext?.addEventListener('click', e => {
  e.preventDefault();
  if(currentFormIndex < forms.length - 1) {
    currentFormIndex++;
    updateFormVisibility();
  }
});

btnBefore?.addEventListener('click', e => {
  e.preventDefault();
  if(currentFormIndex > 0) {
    currentFormIndex--;
    updateFormVisibility();
  }
});

btnBuy?.addEventListener('click', e => {
  e.preventDefault();
  alert('Compra finalizada com sucesso! Agradecemos a sua preferência.');
});

// inicializa tudo
updateFormVisibility();
