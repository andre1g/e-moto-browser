/* Vanilla JS: nessuna dipendenza, nessuna richiesta di rete per avviare il catalogo. */
(() => {
  'use strict';
  const { bikes, sources, verifiedAt } = window.CATALOG;
  const byId = new Map(bikes.map(b => [b.id, b]));
  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const number = value => value == null ? '—' : new Intl.NumberFormat('it-IT', { maximumFractionDigits: 2 }).format(value);
  const euro = value => value == null ? 'Su richiesta' : new Intl.NumberFormat('it-IT', { style:'currency', currency:'EUR', maximumFractionDigits:0 }).format(value);
  const date = new Intl.DateTimeFormat('it-IT', { day:'numeric', month:'long', year:'numeric', timeZone:'Europe/Rome' }).format(new Date(verifiedAt + 'T12:00:00Z'));
  let category = 'all';
  let selected = new Set();
  try {
    const stored = JSON.parse(localStorage.getItem('emoto-selection') || '[]');
    if (Array.isArray(stored)) selected = new Set(stored.filter(id => byId.has(id)));
  } catch { /* La consultazione funziona anche con storage disabilitato. */ }

  function sourceLink(id, label) {
    const s = sources[id];
    return `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" title="${esc(s.kind)}">${esc(label || s.label)} ↗</a>`;
  }
  function visibleBikes() {
    const query = $('search').value.trim().toLocaleLowerCase('it');
    const sortKey = $('sort').value;
    return bikes.filter(b =>
      (category === 'all' || b.category === category) &&
      ($('brand').value === 'all' || b.brand === $('brand').value) &&
      ($('market').value === 'all' || b.market === $('market').value) &&
      ($('weight').value === 'all' || (b.weight != null && b.weight <= Number($('weight').value))) &&
      `${b.brand} ${b.model} ${b.version} ${b.usage}`.toLocaleLowerCase('it').includes(query)
    ).sort((a,b) => {
      if (sortKey !== 'brand') {
        if (a[sortKey] == null && b[sortKey] != null) return 1;
        if (a[sortKey] != null && b[sortKey] == null) return -1;
        if (a[sortKey] != null && b[sortKey] != null && a[sortKey] !== b[sortKey]) return sortKey === 'peak' ? b[sortKey]-a[sortKey] : a[sortKey]-b[sortKey];
      }
      return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`, 'it');
    });
  }
  function card(b) {
    return `<article class="card ${selected.has(b.id) ? 'selected' : ''}" data-id="${esc(b.id)}">
      <div class="card-top"><span class="badge ${b.category === 'L3e' ? 'l3' : ''}">${esc(b.category)}</span><span class="market">${b.market === 'IT' ? 'IT · canale italiano' : 'EU · canale europeo'}</span></div>
      <p class="brand-name">${esc(b.brand)}</p><h4>${esc(b.model)}</h4><p class="usage">${esc(b.version)}<br>${esc(b.usage)}</p>
      <div class="price">${b.id === 'stark-ex' ? '<small>da </small>' : ''}${euro(b.price)}</div><p class="price-note">${esc(b.priceNote)}</p>
      <dl class="specs"><div><dt>NOMINALE</dt><dd>${number(b.nominal)} <small>kW</small></dd></div><div><dt>PICCO DICHIARATO</dt><dd>${number(b.peak)} <small>kW</small></dd></div><div><dt>PESO</dt><dd>${number(b.weight)} <small>kg</small></dd></div></dl>
      <p class="context">${esc(b.note)}</p>
      <details><summary>Versione, dati e fonti</summary><p><strong>Omologazione:</strong> ${esc(b.homologation)}</p><p><strong>Nominale:</strong> ${esc(b.nominalNote)}</p><p><strong>Picco:</strong> ${esc(b.peakNote)}</p><p><strong>Peso:</strong> ${esc(b.weightNote)}</p><p><strong>Canale:</strong> ${esc(sources[b.seller].kind)}.</p><p>Fonti consultate il ${esc(date)}.</p><div class="source-links">${[...new Set([b.producer,b.seller,...b.sources])].map(id => sourceLink(id)).join('')}</div></details>
      <div class="card-links">${sourceLink(b.producer,'Produttore')}${sourceLink(b.seller,b.market === 'IT' ? 'Canale Italia' : 'Canale Europa')}</div>
      <label class="compare-label"><input type="checkbox" data-compare="${esc(b.id)}" ${selected.has(b.id) ? 'checked' : ''}> Confronta <span class="sr-only">${esc(b.brand + ' ' + b.model + ' ' + b.version)}</span></label>
    </article>`;
  }
  function renderCatalog() {
    const visible = visibleBikes();
    $('results').textContent = `${visible.length} di ${bikes.length} versioni · dati consultati il ${date}${$('weight').value !== 'all' ? ' · pesi non verificati esclusi dal filtro' : ''}`;
    $('catalog-groups').innerHTML = visible.length ? ['L1e','L3e'].map(cls => {
      const rows = visible.filter(b => b.category === cls);
      return rows.length ? `<section aria-label="Catalogo ${cls}"><div class="group-header"><h3>${cls} <span class="muted">/ ${cls === 'L1e' ? 'Ciclomotori' : 'Motocicli'}</span></h3><p>${rows.length} versioni · ${cls === 'L1e' ? '45 km/h in configurazione stradale' : 'Versione stradale documentata'}</p></div><div class="grid">${rows.map(card).join('')}</div></section>` : '';
    }).join('') : '<div class="empty"><strong>Nessuna moto con questi filtri.</strong><p>Prova un altro marchio o azzera i filtri.</p></div>';
    $('compare-visible').disabled = visible.length === 0;
  }
  function renderComparison() {
    const rows = bikes.filter(b => selected.has(b.id));
    $('comparison-body').innerHTML = rows.length ? rows.map(b => `<tr><td><strong>${esc(b.brand)} ${esc(b.model)}</strong><small>${esc(b.version)}</small><br><button type="button" data-remove="${esc(b.id)}" aria-label="Rimuovi ${esc(b.brand + ' ' + b.model)} dal confronto">Rimuovi</button></td><td>${esc(b.category)}</td><td>${b.price == null ? '—' : number(b.price)}<br><small>${esc(b.priceNote)}</small></td><td>${number(b.nominal)}<br><small>${esc(b.nominalNote)}</small></td><td>${number(b.peak)}<br><small>${esc(b.peakNote)}</small></td><td>${number(b.weight)}<br><small>${esc(b.weightNote)}</small></td><td>${esc(b.note)}<br>${sourceLink(b.producer,'Produttore')} · ${sourceLink(b.seller,'Acquisto')}<br>${b.sources.map(id => sourceLink(id)).join('<br>')}</td></tr>`).join('') : '<tr><td colspan="7">Seleziona le moto dalle schede oppure premi “Confronta risultati”.</td></tr>';
    $('comparison-status').textContent = rows.length ? `${rows.length} moto selezionate. La selezione resta disponibile cambiando filtri.` : 'Il tuo confronto parte da qui.';
    $('selection-count').textContent = rows.length;
    $('nav-count').textContent = rows.length;
    $('selection-bar').hidden = rows.length === 0;
    $('export').disabled = rows.length === 0;
    $('clear-selection').disabled = rows.length === 0;
  }
  function saveSelection() {
    try { localStorage.setItem('emoto-selection', JSON.stringify([...selected])); } catch { /* Storage opzionale. */ }
    document.querySelectorAll('[data-compare]').forEach(input => {
      input.checked = selected.has(input.dataset.compare);
      input.closest('.card').classList.toggle('selected', input.checked);
    });
    renderComparison();
  }
  document.querySelectorAll('[data-class]').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.class;
    document.querySelectorAll('[data-class]').forEach(btn => btn.setAttribute('aria-pressed', String(btn === button)));
    renderCatalog();
  }));
  ['brand','market','weight','sort'].forEach(id => $(id).addEventListener('change', renderCatalog));
  $('search').addEventListener('input', renderCatalog);
  $('reset').addEventListener('click', () => {
    category = 'all'; $('search').value = '';
    ['brand','market','weight'].forEach(id => $(id).value = 'all'); $('sort').value = 'brand';
    document.querySelectorAll('[data-class]').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.class === 'all')));
    renderCatalog();
  });
  $('catalog-groups').addEventListener('change', event => {
    const id = event.target.dataset.compare;
    if (!byId.has(id)) return;
    if (event.target.checked) selected.add(id); else selected.delete(id);
    saveSelection();
  });
  $('comparison-body').addEventListener('click', event => {
    const button = event.target.closest('[data-remove]');
    if (!button) return;
    const row = button.closest('tr');
    const nextFocus = row.nextElementSibling?.querySelector('button') || row.previousElementSibling?.querySelector('button');
    const nextId = nextFocus?.dataset.remove;
    selected.delete(button.dataset.remove); saveSelection();
    const nextButton = nextId ? document.querySelector(`[data-remove="${nextId}"]`) : $('compare-visible');
    nextButton?.focus();
  });
  $('compare-visible').addEventListener('click', () => { visibleBikes().forEach(b => selected.add(b.id)); saveSelection(); });
  $('clear-selection').addEventListener('click', () => { selected.clear(); saveSelection(); $('compare-visible').focus(); });
  $('export').addEventListener('click', () => {
    const headers = ['Marchio','Modello','Versione','Classe','Prezzo EUR','Nota prezzo','Nominale kW','Nota nominale','Picco dichiarato kW','Nota picco','Peso kg','Nota peso','Omologazione','Contesto','Produttore','Acquisto','Stato canale','Fonti','Data consultazione'];
    const cells = bikes.filter(b => selected.has(b.id)).map(b => [b.brand,b.model,b.version,b.category,b.price,b.priceNote,b.nominal,b.nominalNote,b.peak,b.peakNote,b.weight,b.weightNote,b.homologation,b.note,sources[b.producer].url,sources[b.seller].url,sources[b.seller].kind,b.sources.map(id => sources[id].url).join(' | '),verifiedAt]);
    const csvCell = v => '"' + (typeof v === 'number' ? number(v) : String(v ?? '')).replace(/"/g,'""') + '"';
    const csv = '\uFEFF' + [headers,...cells].map(row => row.map(csvCell).join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8;'}));
    const a = document.createElement('a'); a.href = url; a.download = `e-moto-confronto-${verifiedAt}.csv`; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $('model-count').textContent = bikes.length;
  $('brand-count').textContent = new Set(bikes.map(b => b.brand)).size;
  $('verified-date').textContent = date;
  document.querySelectorAll('.date-copy').forEach(el => el.textContent = date);
  [...new Set(bikes.map(b => b.brand))].sort((a,b) => a.localeCompare(b,'it')).forEach(brand => {
    const option = document.createElement('option'); option.value = brand; option.textContent = brand; $('brand').append(option);
  });
  renderCatalog(); renderComparison();
})();
