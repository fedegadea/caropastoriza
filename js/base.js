/* Carga de datos: primero el seed local (instantáneo), después la nube.
   La nube es la verdad cuando existe (lo que Carolina edita en /admin). */
const CARO_API = 'https://soul-ecommlab.com/api/caro';
window.CARO = (function () {
  const local = { obras: SEED.obras, textos: SEED.textos };
  const promesa = fetch(CARO_API + '/data', { cache: 'no-store' })
    .then(r => r.json())
    .then(d => ({
      obras: (Array.isArray(d.obras) && d.obras.length) ? d.obras : local.obras,
      textos: Object.assign({}, local.textos, d.textos || {})
    }))
    .catch(() => local);
  return { local, promesa };
})();
function esc (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function serieNombre (s) { return { oleo: 'OLEO', grabado: 'GRABADO', digital: 'DIGITAL' }[s] || s; }
function obrasDe (datos, serie) { return datos.obras.filter(o => o.serie === serie && !o.oculta); }
