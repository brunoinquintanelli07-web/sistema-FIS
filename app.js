import { arte } from './art.js';

/* ---------- Datos de ejemplo (clases del modelo: Actividad, Categoría, Lugar) ---------- */
const CATEGORIAS = ['Teatro', 'Cine', 'Gastronomía', 'Talleres', 'Yoga', 'Pilates', 'Baile'];
const ZONAS = ['Centro', 'Ciudad Vieja', 'Cordón'];

const ACTIVIDADES = [
  { id: 'pintura', nombre: 'Taller de pintura', categoria: 'Talleres', zona: 'Centro',
    lugar: 'Casa de la Cultura, 18 de Julio 1200', fecha: '2026-11-04', horario: '15:00 a 17:00', costo: 0,
    modalidad: ['Grupal', 'Se puede asistir acompañado'], social: true,
    descripcion: 'Una actividad para aprender pintura, compartir experiencias y disfrutar en grupo.',
    llegar: 'Ómnibus por 18 de Julio, a pocas cuadras de Plaza Independencia.' },
  { id: 'lectura', nombre: 'Club de lectura', categoria: 'Talleres', zona: 'Ciudad Vieja',
    lugar: 'Biblioteca Barrial, Sarandí 450', fecha: '2026-11-06', horario: '17:00 a 18:30', costo: 0,
    modalidad: ['Grupal'], social: true,
    descripcion: 'Leemos un cuento corto cada semana y lo comentamos entre todos, con un café.' },
  { id: 'cine', nombre: 'Función de cine', categoria: 'Cine', zona: 'Cordón',
    lugar: 'Sala Cordón, Av. Uruguay 1000', fecha: '2026-11-07', horario: '18:00 a 20:00', costo: 250,
    modalidad: ['Individual', 'Con familiares'], social: false,
    descripcion: 'Película para toda la familia, con sala cómoda y buen sonido.',
    llegar: 'Varias líneas de ómnibus pasan por la puerta.' },
  { id: 'yoga', nombre: 'Yoga para mayores', categoria: 'Yoga', zona: 'Centro',
    lugar: 'Club del Centro, Río Negro 1300', fecha: '2026-11-10', horario: '10:00 a 11:00', costo: 0,
    modalidad: ['Grupal'], social: false,
    descripcion: 'Clase suave de yoga, con ejercicios de respiración y movimientos lentos.' },
  { id: 'teatro', nombre: 'Obra de teatro y charla', categoria: 'Teatro', zona: 'Ciudad Vieja',
    lugar: 'Teatro del Plata, Reconquista 600', fecha: '2026-11-05', horario: '19:00 a 21:00', costo: 300,
    modalidad: ['Grupal', 'Con familiares'], social: true,
    descripcion: 'Vamos juntos a ver la obra y después conversamos con el elenco.' },
  { id: 'tango', nombre: 'Tarde de tango', categoria: 'Baile', zona: 'Centro',
    lugar: 'Salón Municipal, Colonia 1100', fecha: '2026-11-06', horario: '16:00 a 18:00', costo: 0,
    modalidad: ['Grupal'], social: true,
    descripcion: 'Baile para todos los niveles. No hace falta venir con pareja.' },
  { id: 'pilates', nombre: 'Pilates suave', categoria: 'Pilates', zona: 'Cordón',
    lugar: 'Estudio Cordón, Constituyente 1700', fecha: '2026-11-09', horario: '09:30 a 10:30', costo: 200,
    modalidad: ['Individual'], social: false,
    descripcion: 'Ejercicios de movilidad y equilibrio, con una profesora que te acompaña.' },
  { id: 'almuerzo', nombre: 'Almuerzo de amigos', categoria: 'Gastronomía', zona: 'Ciudad Vieja',
    lugar: 'Mercado Viejo, Piedras 300', fecha: '2026-11-08', horario: '12:30 a 14:30', costo: 450,
    modalidad: ['Grupal', 'Con familiares'], social: true,
    descripcion: 'Mesa larga para compartir un almuerzo y conocer gente nueva.' },
  { id: 'gerontopsico', nombre: 'Gerontopsicomotricidad', categoria: 'Talleres', zona: 'Cordón',
    lugar: 'Centro Comunal, Soriano 900', fecha: '2026-11-05', horario: '10:30 a 12:00', costo: 0,
    modalidad: ['Grupal'], social: true,
    descripcion: 'Juegos y ejercicios suaves para mover el cuerpo, entrenar la memoria y compartir.' },
  { id: 'ajedrez', nombre: 'Ajedrez en la plaza', categoria: 'Talleres', zona: 'Centro',
    lugar: 'Plaza Cagancha', fecha: '2026-11-07', horario: '10:00 a 12:00', costo: 0,
    modalidad: ['Individual', 'Grupal'], social: true,
    descripcion: 'Partidas abiertas. Si no sabés jugar, alguien te enseña.' }
].sort((a, b) => a.fecha.localeCompare(b.fecha) || a.horario.localeCompare(b.horario));

/* ---------- Estado ---------- */
const filtros = { texto: '', categoria: '', zona: '', dia: '', costo: '', social: false };
const leer = (k, def) => { try { return JSON.parse(localStorage.getItem(k) || def); } catch (e) { return JSON.parse(def); } };
const escribir = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } };
let favoritas = leer('favoritas', '[]');
let introHecha = false;
let ignorarHash = false;

/* ---------- Utilidades ---------- */
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const main = $('#contenido');
const reducido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const ICONOS = {
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  moneda: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5V8m0 8v1.5"/>',
  gente: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6"/><path d="M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14.3c2 .8 3.5 2.7 3.5 5.7"/>',
  corazon: '<path d="M12 20s-8-4.8-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.2 12 20 12 20z"/>',
  flecha: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  siguiente: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  lupa: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  dado: '<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="9" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/>',
  cruz: '<path d="M6 6l12 12M18 6 6 18"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>'
};
const icono = (n, relleno) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"${relleno ? ' style="fill:currentColor"' : ''}>${ICONOS[n]}</svg>`;

const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const DIAS_LARGO = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MESES_LARGO = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fecha = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };
const costoTexto = (a) => a.costo === 0 ? 'Gratuito' : `$${a.costo}`;
const inicio = (a) => a.horario.split(' ')[0];
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const diaCorto = (iso) => { const f = fecha(iso); return `${DIAS[f.getDay()]} ${f.getDate()}`; };
const FECHAS = [...new Set(ACTIVIDADES.map((a) => a.fecha))].sort();
const porId = (id) => ACTIVIDADES.find((a) => a.id === id);

/* ---------- Transiciones entre estados (View Transitions, con alternativa sin animar) ---------- */
function vt(fn, tipo = 'filtro') {
  if (!document.startViewTransition || reducido() || document.hidden) { fn(); return; }
  const r = document.documentElement;
  r.dataset.vt = tipo;
  const t = document.startViewTransition(fn);
  t.ready.catch(() => {});
  t.updateCallbackDone.catch(() => {});
  t.finished.catch(() => {}).finally(() => {
    delete r.dataset.vt;
    $$('[data-art]').forEach((e) => { e.style.viewTransitionName = ''; });
  });
}

function navegar(hash, compartido) {
  if (location.hash === hash) return;
  const origen = compartido && $(`[data-art="${compartido}"]`);
  if (origen && !reducido()) origen.style.viewTransitionName = 'shared-art';
  vt(() => {
    ignorarHash = true;
    location.hash = hash;
    ruta();
    const destino = compartido && $(`[data-art="${compartido}"]`);
    if (destino && !reducido()) destino.style.viewTransitionName = 'shared-art';
  }, 'ruta');
}

/* ---------- Filtrado ---------- */
function filtradas() {
  const q = norm(filtros.texto.trim());
  return ACTIVIDADES.filter((a) =>
    (!q || norm(`${a.nombre} ${a.categoria} ${a.descripcion}`).includes(q)) &&
    (!filtros.categoria || a.categoria === filtros.categoria) &&
    (!filtros.zona || a.zona === filtros.zona) &&
    (!filtros.dia || a.fecha === filtros.dia) &&
    (!filtros.costo || (filtros.costo === 'gratis' ? a.costo === 0 : a.costo > 0)) &&
    (!filtros.social || a.social)
  );
}

/* ---------- Piezas de interfaz ---------- */
function botonFav(a) {
  const on = favoritas.includes(a.id);
  return `<button type="button" class="heart" data-fav="${a.id}" data-nombre="${esc(a.nombre)}" aria-pressed="${on}" aria-label="${on ? 'Quitar de favoritas' : 'Guardar en favoritas'}: ${esc(a.nombre)}">${icono('corazon', on)}</button>`;
}

function tarjeta(a, i = 0, enFavoritas = false) {
  const f = fecha(a.fecha);
  return `<li class="cell" style="--i:${i}">
    <article class="card" id="card-${a.id}" style="view-transition-name:c-${a.id}">
      <div class="card__art" data-art="${a.id}">
        ${arte(a.categoria)}
        <span class="badge"><b>${f.getDate()}</b> ${DIAS[f.getDay()]} ${MESES[f.getMonth()]} · ${inicio(a)}</span>
      </div>
      ${botonFav(a)}
      <div class="card__body">
        <h3>${a.nombre}</h3>
        <ul class="tags">
          <li class="tag tag--cat">${a.categoria}</li>
          ${a.social ? `<li class="tag tag--social">${icono('gente')} Para conocer gente</li>` : ''}
        </ul>
        <ul class="facts">
          <li>${icono('pin')} ${a.zona}</li>
          <li>${icono('moneda')} <span class="${a.costo === 0 ? 'free' : ''}">${costoTexto(a)}</span></li>
          <li>${icono('gente')} ${a.modalidad[0]}</li>
        </ul>
        <div class="card__actions">
          <a class="btn btn--go" href="#/actividad/${a.id}" data-vt data-shared="${a.id}">Ver detalles ${icono('siguiente')}</a>
          ${enFavoritas ? `<button class="btn btn--quiet btn--front" data-quitar="${a.id}">Quitar</button>` : ''}
        </div>
      </div>
    </article></li>`;
}

const chip = (grupo, valor, texto, activo, extra = '') =>
  `<button type="button" class="chip ${extra}" data-grupo="${grupo}" data-valor="${esc(valor)}" aria-pressed="${activo}">${texto}</button>`;

function pildorasActivas() {
  const p = [];
  if (filtros.texto.trim()) p.push(['texto', `“${esc(filtros.texto.trim())}”`]);
  if (filtros.categoria) p.push(['categoria', filtros.categoria]);
  if (filtros.zona) p.push(['zona', filtros.zona]);
  if (filtros.dia) p.push(['dia', diaCorto(filtros.dia)]);
  if (filtros.costo) p.push(['costo', filtros.costo === 'gratis' ? 'Gratuitas' : 'Pagas']);
  if (filtros.social) p.push(['social', 'Para conocer gente']);
  return p.map(([k, t]) => `<button type="button" class="pill" data-quitar-filtro="${k}" aria-label="Quitar filtro: ${t}">${t} ${icono('cruz')}</button>`).join('');
}

/* ---------- Vistas ---------- */
function vistaInicio() {
  document.title = 'Cartelera Montevideo';
  const palabras = 'Descubrí actividades cerca tuyo'.split(' ')
    .map((p, k) => `<span class="w"><span style="--k:${k}">${p}</span></span>`).join(' ');
  main.innerHTML = `
    <section class="hero ${introHecha ? 'noin' : ''}" id="hero"><div class="wrap hero__in">
      <div class="hero__text">
        <h1 aria-label="Descubrí actividades cerca tuyo">${palabras}</h1>
        <p>Encontrá propuestas para disfrutar tu tiempo libre y conocer personas.</p>
        <form class="search" role="search" id="form-buscar">
          <label class="sr" for="q">Buscar actividades por nombre o tipo</label>
          <div class="search__box">
            ${icono('lupa')}
            <input type="search" id="q" placeholder="Buscar: teatro, pintura, yoga…" value="${esc(filtros.texto)}" autocomplete="off">
          </div>
          <button class="btn" type="submit">Buscar</button>
        </form>
        <button type="button" class="btn btn--accent btn--dice" id="sorpresa">${icono('dado')} Sorprendeme</button>
      </div>
      <div class="stack" aria-hidden="true">
        <div class="tile t1"><div class="tile__in" style="--d:14">${arte('Yoga')}</div></div>
        <div class="tile t2"><div class="tile__in" style="--d:26">${arte('Teatro')}</div></div>
        <div class="tile t3"><div class="tile__in" style="--d:38">${arte('Cine')}</div></div>
      </div>
    </div></section>
    <div class="wrap board">
      <details class="filters" id="filtros">
        <summary>Filtrar actividades</summary>
        <div class="filters__body">
          <fieldset><legend>Categoría</legend><div class="chips">
            ${chip('categoria', '', 'Todas', !filtros.categoria)}${CATEGORIAS.map((c) => chip('categoria', c, c, filtros.categoria === c)).join('')}
          </div></fieldset>
          <fieldset><legend>Día</legend><div class="chips">
            ${chip('dia', '', 'Cualquiera', !filtros.dia)}${FECHAS.map((d) => chip('dia', d, diaCorto(d), filtros.dia === d)).join('')}
          </div></fieldset>
          <fieldset><legend>Zona de Montevideo</legend><div class="chips">
            ${chip('zona', '', 'Todas', !filtros.zona)}${ZONAS.map((z) => chip('zona', z, z, filtros.zona === z)).join('')}
          </div></fieldset>
          <fieldset><legend>Costo</legend><div class="chips">
            ${chip('costo', '', 'Todas', !filtros.costo)}${chip('costo', 'gratis', 'Gratuitas', filtros.costo === 'gratis')}${chip('costo', 'paga', 'Pagas', filtros.costo === 'paga')}
          </div></fieldset>
          <fieldset><legend>Para conocer gente</legend><div class="chips">
            <button type="button" class="chip chip--social" id="c-social" aria-pressed="${filtros.social}">Solo actividades sociales</button>
          </div></fieldset>
          <button type="button" class="btn btn--quiet" id="limpiar">Quitar filtros</button>
        </div>
      </details>
      <section aria-labelledby="t-res">
        <div class="results__head"><h2 id="t-res">Actividades disponibles</h2><p class="results__count" id="conteo" aria-live="polite"></p></div>
        <div class="pills" id="pills"></div>
        <div id="resultados"></div>
      </section>
    </div>`;
  $('#filtros').open = window.matchMedia('(min-width: 900px)').matches;
  pintarResultados(true);
  if (!introHecha) { introHecha = true; }
  iniciarParallax();
}

function pintarResultados(primera = false) {
  const lista = filtradas();
  const n = lista.length;
  $('#conteo').innerHTML = `<span class="num">${n}</span> ${n === 1 ? 'actividad' : 'actividades'}`;
  $('#pills').innerHTML = pildorasActivas();
  $('#resultados').innerHTML = n
    ? `<ul class="grid ${primera ? 'enter' : ''}">${lista.map((a, i) => tarjeta(a, i)).join('')}</ul>`
    : `<div class="empty">
        <h3>No encontramos actividades con esos filtros</h3>
        <p>Probá con otra categoría o zona, o quitá los filtros para ver todo.</p>
        <button type="button" class="btn btn--accent" id="vaciar">Quitar filtros</button>
      </div>`;
  $$('.chip[data-grupo]').forEach((c) => c.setAttribute('aria-pressed', String(filtros[c.dataset.grupo] === c.dataset.valor)));
  const s = $('#c-social'); if (s) s.setAttribute('aria-pressed', String(filtros.social));
}

const cambiarFiltros = (fn) => vt(() => { fn(); pintarResultados(); });

function limpiar() {
  cambiarFiltros(() => {
    Object.assign(filtros, { texto: '', categoria: '', zona: '', dia: '', costo: '', social: false });
    const q = $('#q'); if (q) q.value = '';
  });
}

function sorprender() {
  const lista = filtradas();
  const a = (lista.length ? lista : ACTIVIDADES)[Math.floor(Math.random() * (lista.length || ACTIVIDADES.length))];
  if (!lista.length) { Object.assign(filtros, { texto: '', categoria: '', zona: '', dia: '', costo: '', social: false }); pintarResultados(); }
  const el = $(`#card-${a.id}`);
  if (!el) return;
  el.scrollIntoView({ behavior: reducido() ? 'auto' : 'smooth', block: 'center' });
  el.classList.remove('spot'); void el.offsetWidth; el.classList.add('spot');
  aviso(`Probá: ${a.nombre}`);
  setTimeout(() => el.classList.remove('spot'), 2400);
}

const fila = (icon, titulo, valor) => `<div class="info__item">${icono(icon)}<div><dt>${titulo}</dt><dd>${valor}</dd></div></div>`;

function ics(a) {
  const d = a.fecha.replace(/-/g, '');
  const [h1, h2] = a.horario.split(' a ');
  const t = (s) => s.replace(':', '') + '00';
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Cartelera Montevideo//ES', 'BEGIN:VEVENT',
    `UID:${a.id}-${d}@cartelera`, 'DTSTAMP:20261103T000000Z', `DTSTART:${d}T${t(h1)}`, `DTEND:${d}T${t(h2)}`,
    `SUMMARY:${a.nombre}`, `LOCATION:${a.lugar}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
}

function descargarCalendario(a) {
  const url = URL.createObjectURL(new Blob([ics(a)], { type: 'text/calendar' }));
  const l = document.createElement('a');
  l.href = url; l.download = `${a.id}.ics`; document.body.appendChild(l); l.click(); l.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  aviso('Recordatorio listo para tu calendario');
}

function vistaDetalle(id) {
  const a = porId(id);
  if (!a) return vistaNoExiste();
  document.title = `${a.nombre} · Cartelera Montevideo`;
  const f = fecha(a.fecha);
  const larga = `${DIAS_LARGO[f.getDay()]} ${f.getDate()} de ${MESES_LARGO[f.getMonth()]}`;
  const guardada = favoritas.includes(a.id);
  const mapa = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(a.lugar + ', Montevideo');
  const otras = ACTIVIDADES.filter((x) => x.id !== a.id && (x.categoria === a.categoria || x.zona === a.zona || (a.social && x.social))).slice(0, 3);
  main.innerHTML = `
    <div class="wrap detail">
      <a class="back" href="#/" data-vt data-shared="${a.id}">${icono('flecha')} Volver a actividades</a>
      <article class="detail__card">
        <div class="detail__art" data-art="${a.id}">
          ${arte(a.categoria)}
          <span class="badge badge--big"><b>${f.getDate()}</b> ${larga}</span>
        </div>
        <div class="detail__body">
          <h1>${a.nombre}</h1>
          <ul class="tags">
            <li class="tag tag--cat">${a.categoria}</li>
            ${a.social ? `<li class="tag tag--social">${icono('gente')} Ideal para conocer personas</li>` : ''}
          </ul>
          <p class="detail__desc">${a.descripcion}</p>
          <dl class="info">
            ${fila('calendario', 'Fecha', larga)}
            ${fila('reloj', 'Horario', a.horario)}
            ${fila('moneda', 'Costo', costoTexto(a))}
            ${fila('gente', 'Modalidad', a.modalidad.join(' · '))}
            ${fila('pin', 'Lugar', `${a.lugar}<br>${a.zona}`)}
          </dl>
          <section class="how" aria-labelledby="t-llegar">
            <h2 id="t-llegar">Cómo llegar</h2>
            <p>${a.llegar ? a.llegar + '<br>' : ''}Dirección: ${a.lugar}.</p>
            <a class="btn btn--quiet" href="${mapa}" target="_blank" rel="noopener">${icono('pin')} Ver en el mapa</a>
          </section>
          <div class="card__actions detail__actions">
            <button class="btn btn--accent btn--save" id="guardar" aria-pressed="${guardada}" data-id="${a.id}">${icono('corazon', guardada)} <span>${guardada ? 'Guardada en favoritas' : 'Guardar actividad'}</span></button>
            <button class="btn btn--quiet" id="calendario" data-id="${a.id}">${icono('calendario')} Agregar al calendario</button>
            <a class="btn btn--quiet" href="#/favoritas" data-vt>Ver favoritas</a>
          </div>
        </div>
      </article>
      ${otras.length ? `<section class="more" aria-labelledby="t-mas"><h2 id="t-mas">Otras actividades para vos</h2><ul class="grid grid--3">${otras.map((x, i) => tarjeta(x, i)).join('')}</ul></section>` : ''}
    </div>`;
}

function vistaFavoritas() {
  document.title = 'Mis favoritas · Cartelera Montevideo';
  const lista = favoritas.map(porId).filter(Boolean);
  main.innerHTML = `
    <div class="wrap fav-wrap">
      <div class="page-title"><h1>Mis actividades favoritas</h1><p>Las actividades que guardaste, para verlas más adelante.</p></div>
      ${lista.length ? `<ul class="grid">${lista.map((a, i) => tarjeta(a, i, true)).join('')}</ul>` : `
        <div class="empty">
          <h3>Todavía no guardaste actividades</h3>
          <p>Tocá el corazón de una actividad para guardarla acá.</p>
          <a class="btn" href="#/" data-vt>Ver actividades</a>
        </div>`}
    </div>`;
}

function vistaNoExiste() {
  document.title = 'No encontrada · Cartelera Montevideo';
  main.innerHTML = `<div class="wrap fav-wrap"><div class="page-title"><h1>No encontramos esa actividad</h1></div>
    <a class="btn" href="#/" data-vt>Volver a actividades</a></div>`;
}

/* ---------- Favoritas ---------- */
function actualizarContador() {
  const c = $('#fav-count');
  c.textContent = favoritas.length;
  c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
}

let tt, deshacer = null;
function aviso(msg, undo) {
  $('#toast-msg').textContent = msg;
  const b = $('#toast-undo');
  deshacer = undo || null;
  b.hidden = !undo;
  const t = $('#toast'); t.classList.add('on');
  clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), undo ? 5000 : 2600);
}

function pintarFav(id) {
  const on = favoritas.includes(id);
  $$(`[data-fav="${id}"]`).forEach((b) => {
    b.setAttribute('aria-pressed', String(on));
    b.setAttribute('aria-label', `${on ? 'Quitar de favoritas' : 'Guardar en favoritas'}: ${b.dataset.nombre}`);
    b.innerHTML = icono('corazon', on);
  });
  const g = $('#guardar');
  if (g && g.dataset.id === id) {
    g.setAttribute('aria-pressed', String(on));
    g.innerHTML = `${icono('corazon', on)} <span>${on ? 'Guardada en favoritas' : 'Guardar actividad'}</span>`;
  }
}

function alternarFavorita(id, origen) {
  const i = favoritas.indexOf(id);                 // sin duplicados (UC08)
  const nombre = porId(id).nombre;
  if (i === -1) {
    favoritas.push(id);
    aviso(`Guardada: ${nombre}`);
    if (origen) explosion(origen);
  } else {
    favoritas.splice(i, 1);
    aviso(`Quitada: ${nombre}`, () => { if (!favoritas.includes(id)) { favoritas.push(id); escribir('favoritas', favoritas); actualizarContador(); pintarFav(id); if (location.hash === '#/favoritas') vt(vistaFavoritas); } });
  }
  escribir('favoritas', favoritas);
  actualizarContador();
  pintarFav(id);
  if (origen) { origen.classList.remove('pop'); void origen.offsetWidth; origen.classList.add('pop'); }
}

/* Chispas al guardar: celebra una acción pequeña y frecuente, por eso dura menos de un segundo */
function explosion(el) {
  if (reducido() || !el.animate) return;
  const r = el.getBoundingClientRect();
  const colores = ['#F28C28', '#F4A7C0', '#8FD0EC'];
  for (let k = 0; k < 9; k++) {
    const p = document.createElement('i');
    p.className = 'spark';
    p.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;background:${colores[k % 3]}`;
    document.body.appendChild(p);
    const ang = (k / 9) * Math.PI * 2, dist = 34 + (k % 3) * 10;
    p.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(ang) * dist}px), calc(-50% + ${Math.sin(ang) * dist}px)) scale(.2)`, opacity: 0 }
    ], { duration: 620, easing: 'cubic-bezier(.16,1,.3,1)' }).onfinish = () => p.remove();
  }
}

/* ---------- Parallax suave de las láminas del inicio ---------- */
let parallaxActivo = null;
function iniciarParallax() {
  if (parallaxActivo) parallaxActivo();
  const hero = $('#hero');
  if (!hero || reducido() || !window.matchMedia('(hover: hover)').matches) return;
  let raf = 0;
  const mover = (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5) * 2);
      hero.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5) * 2);
    });
  };
  hero.addEventListener('pointermove', mover);
  parallaxActivo = () => { hero.removeEventListener('pointermove', mover); cancelAnimationFrame(raf); parallaxActivo = null; };
}

/* ---------- Tamaño de letra ---------- */
const TAMANOS = ['112.5%', '130%', '150%'];
function aplicarTamano(i) {
  document.documentElement.style.fontSize = TAMANOS[i];
  $$('.size button').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.size) === i)));
  escribir('tamano', i);
}

/* ---------- Router ---------- */
function ruta() {
  const h = location.hash.replace(/^#\/?/, '');
  const [seccion, id] = h.split('/');
  if (parallaxActivo) parallaxActivo();
  if (seccion === 'actividad') vistaDetalle(id);
  else if (seccion === 'favoritas') vistaFavoritas();
  else vistaInicio();
  $('#nav-inicio').toggleAttribute('aria-current', !seccion);
  $('#nav-fav').toggleAttribute('aria-current', seccion === 'favoritas');
  $$('nav a').forEach((l) => { if (l.hasAttribute('aria-current')) l.setAttribute('aria-current', 'page'); });
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
}

/* ---------- Eventos ---------- */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-vt]');
  if (link && !(e.metaKey || e.ctrlKey || e.shiftKey || e.button)) {
    e.preventDefault(); return navegar(link.getAttribute('href'), link.dataset.shared);
  }
  const chipEl = e.target.closest('.chip[data-grupo]');
  if (chipEl) return cambiarFiltros(() => { filtros[chipEl.dataset.grupo] = chipEl.dataset.valor; });
  if (e.target.closest('#c-social')) return cambiarFiltros(() => { filtros.social = !filtros.social; });
  const pill = e.target.closest('[data-quitar-filtro]');
  if (pill) {
    const k = pill.dataset.quitarFiltro;
    return cambiarFiltros(() => {
      filtros[k] = k === 'social' ? false : '';
      if (k === 'texto') { const q = $('#q'); if (q) q.value = ''; }
    });
  }
  if (e.target.closest('#limpiar') || e.target.closest('#vaciar')) return limpiar();
  if (e.target.closest('#sorpresa')) return sorprender();
  const heart = e.target.closest('[data-fav]');
  if (heart) return alternarFavorita(heart.dataset.fav, heart);
  const g = e.target.closest('#guardar');
  if (g) return alternarFavorita(g.dataset.id, g);
  const cal = e.target.closest('#calendario');
  if (cal) return descargarCalendario(porId(cal.dataset.id));
  const q = e.target.closest('[data-quitar]');
  if (q) { vt(() => { alternarFavorita(q.dataset.quitar); vistaFavoritas(); }); return; }
  const sz = e.target.closest('.size button');
  if (sz) return aplicarTamano(Number(sz.dataset.size));
  if (e.target.closest('#toast-undo') && deshacer) { deshacer(); $('#toast').classList.remove('on'); }
});

document.addEventListener('input', (e) => {
  if (e.target.id === 'q') { filtros.texto = e.target.value; pintarResultados(); }
});
document.addEventListener('submit', (e) => {
  if (e.target.id === 'form-buscar') {
    e.preventDefault();
    $('#resultados').scrollIntoView({ behavior: reducido() ? 'auto' : 'smooth', block: 'start' });
  }
});
window.addEventListener('hashchange', () => { if (ignorarHash) { ignorarHash = false; return; } ruta(); });
window.addEventListener('scroll', () => $('#top').classList.toggle('scrolled', window.scrollY > 8), { passive: true });

aplicarTamano(Number(leer('tamano', '0')) || 0);
actualizarContador();
ruta();
