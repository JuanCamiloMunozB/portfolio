import type { Lang } from '../i18n/ui';

export const SITE = {
  name: 'Juan Camilo Muñoz Barco',
  shortName: 'Juan Camilo Muñoz Barco',
  email: 'juancamuba.swe@gmail.com',
  github: 'https://github.com/JuanCamiloMunozB',
  linkedin: 'https://www.linkedin.com/in/juancamuba',
  /**
   * The CVs are Google Docs in Drive. Google's PDF export always renders the current
   * text of the Doc, so editing the Doc updates the download with no redeploy.
   * The Docs must stay shared as "Anyone with the link can view".
   */
  cvDoc: { en: '1guW3KFrS3hFyojRVZavJzMep2gSnSgrQ8TYCgTZtyhw', es: '1e13S2XsDYdDvPmiWX8XxwO1G9qf65Q9gR7e1CM---os' } as Record<Lang, string>,
  get cv(): Record<Lang, string> {
    return { en: cvPdf('en'), es: cvPdf('es') };
  },
};

/** PDF export of a CV Doc (always the current text; allows cross-origin fetch). */
export function cvPdf(lang: Lang) { return `https://docs.google.com/document/d/${SITE.cvDoc[lang]}/export?format=pdf`; }
/** Read-only preview of a CV Doc that can be embedded in an iframe. */
export function cvPreview(lang: Lang) { return `https://docs.google.com/document/d/${SITE.cvDoc[lang]}/preview`; }
/** File name used when the site saves the PDF. */
export function cvFileName(lang: Lang) { return `Juan-Camilo-Munoz-Barco-CV-${lang.toUpperCase()}.pdf`; }

/** Joins a path to the deploy base (/portfolio/). */
export function url(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return base + path.replace(/^\//, '');
}

/** Same page in a given language. Paths are written without the base and without /es/. */
export function localized(lang: Lang, path = '') {
  return url((lang === 'es' ? 'es/' : '') + path.replace(/^\//, ''));
}
