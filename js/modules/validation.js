export function validate(form) {
  const errors = {};
  if (form.name.trim().split(/\s+/).length < 2) errors.name = 'Informe nome e sobrenome fictícios.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Informe um e-mail de teste válido, como aluno@example.com.';
  if (!['educacao', 'alimentacao', 'ambiente'].includes(form.project)) errors.project = 'Escolha uma frente de atuação.';
  if (!form.consent) errors.consent = 'Confirme que está usando dados fictícios.';
  return errors;
}
