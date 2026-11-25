import type { T } from '../i18n/ui';

export interface Cert { name: T; issuer: string; date: T; scene: string; sceneLabel: T; url: string }

export const certs: Cert[] = [
  {
    name: { en: 'Cloud Architecting', es: 'Cloud Architecting' }, issuer: 'AWS Academy', date: { en: 'Nov 2026', es: 'Nov. 2026' }, scene: 'c-architect', url: 'https://www.credly.com/badges/8c95a271-7147-4dc5-93e6-e80bbb4a9e7d',
    sceneLabel: { en: 'Load balancer, app servers and database assemble inside a cloud.', es: 'Balanceador, servidores y base de datos se ensamblan dentro de una nube.' },
  },
  {
    name: { en: 'Cloud Computing Foundations', es: 'Cloud Computing Foundations' }, issuer: 'Google Cloud', date: { en: 'Oct 2026', es: 'Oct. 2026' }, scene: 'c-scale', url: 'https://www.credly.com/badges/6c2760bf-2c7d-48ac-bde6-9ba3d0a0050c',
    sceneLabel: { en: 'Virtual machines start one by one as load grows.', es: 'Las máquinas virtuales arrancan una a una a medida que crece la carga.' },
  },
  {
    name: { en: 'Introduction to MongoDB', es: 'Introduction to MongoDB' }, issuer: 'MongoDB University', date: { en: 'Apr 2025', es: 'Abr. 2025' }, scene: 'c-docs', url: 'https://learn.mongodb.com/c/YR4DK7D-QD-lcxlYsAhrYQ',
    sceneLabel: { en: 'JSON documents fly into a collection.', es: 'Documentos JSON entran volando a una colección.' },
  },
  {
    name: { en: 'Scrum Foundation Professional', es: 'Scrum Foundation Professional' }, issuer: 'CertiProf', date: { en: 'Feb 2024', es: 'Feb. 2024' }, scene: 'c-board', url: 'https://www.credly.com/badges/140c39bb-e956-4795-a520-7745281d65b1',
    sceneLabel: { en: 'A card moves across a board from to do to done.', es: 'Una tarjeta cruza un tablero de por hacer a hecho.' },
  },
];
