const colorMap: Record<string, string> = {
  '30': '#000',    // black
  '31': '#e55',    // red
  '32': '#4a9',    // green
  '33': '#eb5',    // yellow
  '34': '#4a9eff', // blue
  '35': '#d6a',    // magenta
  '36': '#4db',    // cyan
  '37': '#ddd',    // white
  '90': '#888',    // bright black (gray)
  '91': '#f77',    // bright red
  '92': '#6c6',    // bright green
  '93': '#fd6',    // bright yellow
  '94': '#6bf',    // bright blue
  '95': '#f8f',    // bright magenta
  '96': '#6dd',    // bright cyan
  '97': '#fff',    // bright white
};

export const ansiToHtml = (text: string): string => {
  // HTMLエスケープ
  let result = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // ANSIエスケープを検出してspanに変換
  result = result.replace(/\x1b\[(\d+)m/g, (_, code) => {
    if (code === '0') return '</span>';
    const color = colorMap[code];
    if (color) return `<span style="color: ${color}">`;
    return '';
  });

  return result;
};
