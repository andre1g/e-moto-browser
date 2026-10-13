"""Validate editorial data and references using only the Python standard library."""
import json
import re
from pathlib import Path
from datetime import date
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
raw = (ROOT / 'data/catalog.js').read_text(encoding='utf-8')
catalog = json.loads(raw.split('window.CATALOG =', 1)[1].strip().removesuffix(';'))
date.fromisoformat(catalog['verifiedAt'])
sources = catalog['sources']
bikes = catalog['bikes']
assert bikes, 'Empty catalog'
assert len({b['id'] for b in bikes}) == len(bikes), 'Duplicate model IDs'
required_brands = {'Stark Future', 'Talaria', 'Sur-Ron', 'Arctic Leopard', '79bike', 'KTM'}
assert required_brands <= {b['brand'] for b in bikes}, 'Missing requested brand'
assert {b['category'] for b in bikes} == {'L1e', 'L3e'}, 'Missing class'
for source_id, source in sources.items():
    url = urlparse(source['url'])
    assert url.scheme == 'https' and url.netloc, f'Invalid URL: {source_id}'
    assert source['label'] and source['kind'] and source['country']
for b in bikes:
    assert re.fullmatch(r'[a-z0-9-]+', b['id']), f'Unsafe model ID: {b["id"]}'
    assert b['category'] in {'L1e', 'L3e'}
    assert b['market'] in {'IT', 'EU'}
    for key in ['brand', 'model', 'version', 'homologation', 'usage', 'priceNote', 'nominalNote', 'peakNote', 'weightNote', 'note']:
        assert isinstance(b[key], str) and b[key], f'Missing {key}: {b["id"]}'
    for key in ['price', 'nominal', 'peak', 'weight']:
        value = b[key]
        assert value is None or (type(value) in (int, float) and value > 0), f'Invalid {key}: {b["id"]}'
    assert b['category'] != 'L1e' or b['nominal'] is None or b['nominal'] <= 4, f'L1e nominal mismatch: {b["id"]}'
    assert b['sources'], f'No evidence: {b["id"]}'
    for source_id in [b['producer'], b['seller'], *b['sources']]:
        assert source_id in sources, f'Unknown source: {source_id}'
html = (ROOT / 'index.html').read_text(encoding='utf-8')
for file in ['styles.css', 'app.js', 'data/catalog.js']:
    assert (ROOT / file).is_file() and file in html
ids = re.findall(r'\bid="([^"]+)"', html)
assert len(ids) == len(set(ids)), 'Duplicate HTML IDs'
print(f'OK: {len(bikes)} versions, {len(set(b["brand"] for b in bikes))} brands, {len(sources)} sources; verified {catalog["verifiedAt"]}.')
