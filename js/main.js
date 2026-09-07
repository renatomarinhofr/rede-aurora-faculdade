import { createApp, nextTick } from './vendor/vue.esm-browser.prod.js';
import { projects } from './modules/projects.js';
import { loadPreferences, saveFavorites, clearPreferences } from './modules/storage.js';
import { validate } from './modules/validation.js';
import { currentRoute, routeNames } from './modules/router.js';

const saved = loadPreferences();
createApp({
  data: () => ({ route: currentRoute(), projects, favorites: saved.favorites, status: saved.notice, query: '', category: '', menuOpen: false, highContrast: false, form: { name: '', email: '', project: '', consent: false }, errors: {} }),
  computed: {
    filteredProjects() {
      const query = this.query.trim().toLocaleLowerCase('pt-BR');
      return this.projects.filter((project) => (!this.category || project.id === this.category) && `${project.title} ${project.description}`.toLocaleLowerCase('pt-BR').includes(query));
    },
  },
  methods: {
    closeMenu() {
      this.menuOpen = false;
      this.$refs.menuButton.focus();
    },
    async navigate() {
      this.route = currentRoute();
      this.menuOpen = false;
      document.title = `${routeNames[this.route] || 'Página não encontrada'} — Rede Aurora`;
      await nextTick();
      this.$refs.main.focus();
      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    favorite(id) {
      this.favorites = this.favorites.includes(id) ? this.favorites.filter((value) => value !== id) : [...this.favorites, id];
      this.status = saveFavorites(this.favorites);
    },
    async submit() {
      this.errors = validate(this.form);
      await nextTick();
      if (Object.keys(this.errors).length) {
        this.status = 'Revise os campos indicados. Nenhum dado foi enviado.';
        document.getElementById(Object.keys(this.errors)[0]).focus();
      } else this.status = 'Cadastro de teste validado. Nenhum dado foi enviado ou armazenado.';
    },
    clear() {
      if (clearPreferences()) { this.favorites = []; this.status = 'Preferências removidas deste navegador.'; }
      else this.status = 'Não foi possível apagar as preferências. Verifique as permissões do navegador.';
      this.$refs.dialog.close();
    },
  },
  mounted() { window.addEventListener('hashchange', this.navigate); this.navigate(); },
  beforeUnmount() { window.removeEventListener('hashchange', this.navigate); },
}).mount('#app');
