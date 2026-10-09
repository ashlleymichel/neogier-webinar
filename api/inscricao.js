const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxU8iYtKHJxX1C_CDgNTKw5jQ5luL8HW0MjkV7cJeTS84TuGpiVrNRo3t7Matxe5WEiSg/exec';

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ok: false});
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body || typeof body !== 'object') return res.status(400).json({ok: false});
    const payload = {};
    for (const [key, limit] of Object.entries({nome:150, empresa:150, email:254, cargo:150, pergunta:2000})) {
      if (body[key] !== undefined && typeof body[key] !== 'string') return res.status(400).json({ok: false});
      payload[key] = (body[key] || '').trim();
      if (payload[key].length > limit) return res.status(400).json({ok: false});
    }
    if (!payload.nome || !payload.empresa || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || !/^[a-f0-9-]{36}$/i.test(body.id || '')) {
      return res.status(400).json({ok: false});
    }
    payload.id = body.id;
    const response = await fetch(ENDPOINT, {
      method: 'POST', body: new URLSearchParams(payload),
      signal: AbortSignal.timeout(25000), redirect: 'follow'
    });
    if (!response.ok) return res.status(502).json({ok: false});
    const result = await response.json();
    if (result.ok !== true || result.id !== payload.id) return res.status(502).json({ok: false});
    return res.status(200).json({ok: true, id: payload.id});
  } catch {
    return res.status(502).json({ok: false});
  }
};
