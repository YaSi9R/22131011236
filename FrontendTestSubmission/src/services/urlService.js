export function createShortUrls(inputs) {
  const stored = JSON.parse(localStorage.getItem("shortened") || "[]");
  const now = Date.now();
  const result = inputs.map(({ longUrl, validity, customCode }) => {
    let code = customCode || Math.random().toString(36).substring(2, 8);
    while (stored.some(u => u.shortCode === code)) {
      code = Math.random().toString(36).substring(2, 8);
    }
    const expiresAt = now + (validity || 30) * 60000;
    const obj = { id: Date.now() + code, longUrl, shortCode: code, createdAt: now, expiresAt, clickCount: 0, clicks: [] };
    stored.push(obj);
    return obj;
  });
  localStorage.setItem("shortened", JSON.stringify(stored));
  return result;
}

export function getShortUrls() {
  return JSON.parse(localStorage.getItem("shortened") || "[]");
}

export function addClick(code, ref, loc) {
  const list = getShortUrls();
  const u = list.find(item => item.shortCode === code);
  if (u) {
    u.clicks.push({ time: Date.now(), referrer: ref, location: loc });
    u.clickCount++;
    localStorage.setItem("shortened", JSON.stringify(list));
  }
}
