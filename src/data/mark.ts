/**
 * The JCMB mark on a 16x16 pixel grid: the Jersey-style J and the amber block cursor.
 * Used by the favicon and the neofetch panel so both are the same drawing.
 */
export const MARK = {
  j: [[6, 2, 3, 11], [2, 9, 2, 3], [3, 12, 5, 2]] as const,
  block: [[10, 4, 4, 10]] as const,
};

export function markSvg(opts: { tile?: boolean } = {}) {
  const r = (a: readonly number[], c: string) => `<rect class="${c}" x="${a[0]}" y="${a[1]}" width="${a[2]}" height="${a[3]}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">`
    + `<style>.t{fill:#1b1b1b}.k{fill:#ededed}.b{fill:#4c8282}@media (prefers-color-scheme: light){.t{fill:#f8f8f8}.k{fill:#1b1b1b}.b{fill:#4c8282}}</style>`
    + (opts.tile ? `<rect class="t" width="16" height="16" rx="2"/>` : '')
    + MARK.j.map((a) => r(a, 'k')).join('') + MARK.block.map((a) => r(a, 'b')).join('') + `</svg>\n`;
}
