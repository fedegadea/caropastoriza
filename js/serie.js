/* Página de galería por serie (oleo/grabado/digital). Usa window.SERIE. */
document.title = serieNombre(SERIE)[0] + serieNombre(SERIE).slice(1).toLowerCase() + ' — Carolina Pastoriza Hausmann';
CARO.promesa.then(d => pintar(d));
pintar(CARO.local);
function pintar (d) {
  const obras = obrasDe(d, SERIE);
  const conFicha = SERIE === 'oleo';
  document.getElementById('grilla').innerHTML = obras.map(o => `
    <figure class="pieza" ${'onclick="location.href=\'ficha?id=' + encodeURIComponent(o.id) + '\'"'}>
      <img src="${esc(o.img)}" alt="${esc(o.titulo)}" loading="lazy">
      ${SERIE !== 'oleo' ? `<figcaption>
        <div class="tit">${esc(o.titulo)}</div>
        ${SERIE === 'grabado' ? `<div class="meta">${esc(o.tecnica)}<br>${esc(o.medidas)}<br>${esc(o.ubicacion)}<br>${esc(o.anio)}</div>` : ''}
      </figcaption>` : ''}
    </figure>`).join('');
  const n = (d.textos.nombre || 'Carolina Pastoriza Hausmann').split(' ');
  document.getElementById('marca').innerHTML = n.map(x => '<em>' + esc(x) + '</em>').join('');
  document.getElementById('pieIg').href = 'https://instagram.com/' + encodeURIComponent(d.textos.instagram || 'carolinapastoriza');
  document.getElementById('pieNombre').textContent = '© ' + new Date().getFullYear() + ' ' + (d.textos.nombre || 'Carolina Pastoriza Hausmann');
}
