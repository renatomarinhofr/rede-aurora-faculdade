export const routeNames = { inicio: 'Início', projetos: 'Projetos', cadastro: 'Participar' };
export function currentRoute() {
  const value = location.hash.replace(/^#\/?/, '') || 'inicio';
  return Object.hasOwn(routeNames, value) ? value : 'nao-encontrada';
}
