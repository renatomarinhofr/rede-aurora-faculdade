const key = 'rede-aurora:preferencias:v1';
export function loadPreferences() {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || 'null');
    if (!parsed) return { favorites: [], notice: '' };
    if (parsed.version !== 1 || !Array.isArray(parsed.favorites)) throw new Error('Formato inválido');
    return { favorites: parsed.favorites.filter((id) => ['educacao', 'alimentacao', 'ambiente'].includes(id)), notice: '' };
  } catch {
    return { favorites: [], notice: 'Não foi possível recuperar as preferências. A aplicação continua disponível nesta sessão.' };
  }
}
export function saveFavorites(favorites) {
  try {
    localStorage.setItem(key, JSON.stringify({ version: 1, favorites }));
    return 'Preferências salvas neste navegador.';
  } catch {
    return 'Armazenamento indisponível. Sua seleção vale somente nesta sessão.';
  }
}
export function clearPreferences() {
  try { localStorage.removeItem(key); return true; } catch { return false; }
}
