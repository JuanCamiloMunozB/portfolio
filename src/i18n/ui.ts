export type Lang = 'en' | 'es';
export const LANGS: Lang[] = ['en', 'es'];

/** Bilingual text. Every user-facing string on the site is one of these. */
export type T = { en: string; es: string };

export const ui = {
  skip: { en: 'Skip to content', es: 'Saltar al contenido' },
  navWork: { en: 'Work', es: 'Proyectos' },
  navSkills: { en: 'Skills', es: 'Habilidades' },
  navAbout: { en: 'About', es: 'Sobre mí' },
  navContact: { en: 'Contact', es: 'Contacto' },
  themeLight: { en: 'Light', es: 'Claro' },
  themeDark: { en: 'Dark', es: 'Oscuro' },
  themeLabel: { en: 'Switch color theme', es: 'Cambiar tema de color' },
  toLight: { en: 'Switch to light theme', es: 'Cambiar a tema claro' },
  toDark: { en: 'Switch to dark theme', es: 'Cambiar a tema oscuro' },
  viewCv: { en: 'View CV', es: 'Ver CV' },
  cvTitle: { en: 'Curriculum vitae', es: 'Hoja de vida' },
  cvLead: { en: 'Read it here, or download the PDF. It is always the latest version.', es: 'Léela aquí o descarga el PDF. Siempre es la versión más reciente.' },
  cvOpenDocs: { en: 'Open in Google Docs', es: 'Abrir en Google Docs' },
  cvLoading: { en: 'Loading the CV...', es: 'Cargando la hoja de vida...' },
  dlStart: { en: 'Requesting the PDF', es: 'Solicitando el PDF' },
  dlDone: { en: 'Saved', es: 'Guardado' },
  dlFallback: { en: 'Your browser is downloading it', es: 'Tu navegador lo está descargando' },
  dlBusy: { en: 'Downloading...', es: 'Descargando...' },
  langSwitch: { en: 'Leer en español', es: 'Read in English' },
  cv: { en: 'CV', es: 'CV' },
  downloadCv: { en: 'Download CV', es: 'Descargar CV' },
  cvOther: { en: 'CV en español', es: 'CV in English' },
  seeWork: { en: 'View Projects', es: 'Ver proyectos' },
  emailMe: { en: 'Email me', es: 'Escríbeme' },
  homeLabel: { en: 'Juan Camilo Muñoz Barco, home', es: 'Juan Camilo Muñoz Barco, inicio' },

  roleLine: { en: 'Backend & Distributed Systems Engineer / Final-Year Software Engineering Student', es: 'Desarrollador backend y de sistemas distribuidos / Estudiante de último año de Ingeniería de Sistemas' },
  buildLine: { en: 'I architect resilient backend services, event-driven pipelines and automated cloud infrastructure, built with Clean Architecture, DDD and automated tests.', es: 'Diseño servicios backend resilientes, pipelines orientados a eventos e infraestructura de nube automatizada, construidos con Clean Architecture, DDD y pruebas automatizadas.' },
  stackLabel: { en: 'Core stack', es: 'Stack principal' },
  available: { en: 'Open to internships from 2027-1', es: 'Disponible para práctica desde 2027-1' },
  sceneLabel: {
    en: 'Animated system map: a CI/CD conveyor deploys containers into the cloud; the API, services and AI publish to an event bus; the database feeds an ETL pipeline into a data lake that trains the AI; an ops monitor watches it all.',
    es: 'Mapa animado del sistema: un transportador de CI/CD despliega contenedores en la nube; la API, los servicios y la IA publican en un bus de eventos; la base de datos alimenta un pipeline ETL hacia un lago de datos que entrena la IA; un monitor de operación lo vigila todo.',
  },
  sceneHint: { en: 'Select a layer to inspect stack', es: 'Selecciona una capa para ver su stack' },

  workTitle: { en: 'Selected work', es: 'Proyectos destacados' },
  moreTitle: { en: 'More projects', es: 'Más proyectos' },
  bonusTitle: { en: 'Smaller builds', es: 'Proyectos pequeños' },
  inProgress: { en: 'In progress', es: 'En curso' },
  building: { en: 'Currently building', es: 'En construcción' },
  buildingText: {
    en: 'A data-intensive system for a problem from my own life, fed by large external data sources. Details coming.',
    es: 'Un sistema intensivo en datos para un problema de mi propia vida, alimentado por grandes fuentes de datos externas. Pronto más detalles.',
  },
  readCase: { en: 'Read the case study', es: 'Leer el caso' },
  repo: { en: 'Repository', es: 'Repositorio' },
  privateRepo: { en: 'Private repository', es: 'Repositorio privado' },
  live: { en: 'Live app', es: 'App en línea' },

  skillsTitle: { en: 'What I work with', es: 'Con qué trabajo' },
  seenIn: { en: 'Used in', es: 'Usado en' },

  aboutTitle: { en: 'About me', es: 'Sobre mí' },
  aboutText: {
    en: 'I work mostly on the backend: service boundaries, data models and how services talk to each other. My strongest side is architecture and system design: choosing a modular monolith or services, synchronous calls or events, and writing down what each choice costs. Next I want to go deeper into data and AI engineering: pipelines, storage at scale and serving models, where backend work meets what the market is asking for.',
    es: 'Trabajo sobre todo en el backend: los límites entre servicios, los modelos de datos y cómo se comunican los servicios. Mi lado más fuerte es la arquitectura y el diseño de sistemas: elegir entre un monolito modular o servicios, llamadas síncronas o eventos, y dejar escrito lo que cuesta cada opción. Ahora quiero profundizar en ingeniería de datos e IA: pipelines, almacenamiento a escala y servir modelos, donde el trabajo de backend se cruza con lo que pide el mercado.',
  },
  gpa: { en: 'GPA out of 5.0', es: 'promedio sobre 5,0' },
  deans: { en: "semesters on the Dean's List", es: 'semestres en el Cuadro de Honor' },
  english: { en: 'English level', es: 'nivel de inglés' },
  projectsCount: { en: 'projects in this portfolio', es: 'proyectos en este portafolio' },
  certsTitle: { en: 'Courses and credentials', es: 'Cursos y credenciales' },

  contactTitle: { en: "Let's talk.", es: '¿Hablamos?' },
  contactCta: { en: 'Send a request.', es: 'Envía una petición.' },
  bootProjects: { en: '{n} case studies loaded', es: '{n} casos de estudio cargados' },
  bootIntern: { en: 'Internship: 6+ months, remote or on-site', es: 'Práctica: 6+ meses, remota o presencial' },
  bootBuild: { en: 'Building a data-intensive side project', es: 'Construyendo un proyecto propio intensivo en datos' },
  contactText: { en: 'Internship from 2027-1: 6 months or more, remote, hybrid or on site. Open to staying longer.', es: 'Práctica desde 2027-1: 6 meses o más, remota, híbrida o presencial. Abierto a quedarme por más tiempo.' },
  certsVerify: { en: 'Verify credential', es: 'Verificar credencial' },
  copyEmail: { en: 'Copy email', es: 'Copiar correo' },
  copied: { en: 'Copied', es: 'Copiado' },
  emailSubject: { en: 'Internship opportunity', es: 'Oportunidad de práctica' },

  // case study
  csGoal: { en: 'Problem and goal', es: 'Problema y objetivo' },
  csArch: { en: 'Architecture', es: 'Arquitectura' },
  csDecisions: { en: 'Decisions and trade-offs', es: 'Decisiones y trade-offs' },
  csChose: { en: 'Chose', es: 'Elegí' },
  csWhy: { en: 'Why', es: 'Por qué' },
  csCost: { en: 'Cost', es: 'Costo' },
  csStack: { en: 'Stack', es: 'Stack' },
  csResults: { en: 'Results', es: 'Resultados' },
  csTransitions: { en: 'State transitions', es: 'Transiciones de estado' },
  ttFrom: { en: 'From', es: 'Desde' },
  ttEvent: { en: 'Event', es: 'Evento' },
  ttTo: { en: 'To', es: 'Hacia' },
  ttNoop: { en: 'no-op', es: 'sin cambio' },
  csNext: { en: "What I'd do next", es: 'Qué haría después' },
  csRole: { en: 'My role', es: 'Mi rol' },
  csTeam: { en: 'Team', es: 'Equipo' },
  csPeriod: { en: 'Period', es: 'Periodo' },
  csAsk: { en: 'Ask me about this project', es: 'Pregúntame por este proyecto' },
  csNextTrack: { en: 'Next project', es: 'Siguiente proyecto' },
  csBack: { en: 'All projects', es: 'Todos los proyectos' },
  tbc: { en: 'to confirm', es: 'por confirmar' },

  notFoundTitle: { en: '404: route not found', es: '404: ruta no encontrada' },
  notFoundText: { en: 'This page does not exist. The rest of the system is fine.', es: 'Esta página no existe. El resto del sistema está bien.' },
  goHome: { en: 'Go home', es: 'Ir al inicio' },

  metaDescription: {
    en: 'Juan Camilo Muñoz Barco, final-year Software Engineering student. Backend, data and cloud projects explained by their decisions. Open to internships from 2027-1.',
    es: 'Juan Camilo Muñoz Barco, estudiante de último año de Ingeniería de Sistemas. Proyectos de backend, datos y nube explicados por sus decisiones. Disponible para práctica desde 2027-1.',
  },
} satisfies Record<string, T>;

export const t = (key: keyof typeof ui, lang: Lang) => ui[key][lang];

/** Escapes HTML and turns `code` spans into <code> elements. */
export function fmt(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/`([^`]+)`/g, '<code>$1</code>');
}
export const tx = (text: T, lang: Lang) => text[lang];

/** Numbers follow each language: 2,588 and 0.837 in English, 2.588 and 0,837 in Spanish. */
export function num(value: number, lang: Lang, decimals = 0) {
  return new Intl.NumberFormat(lang === 'es' ? 'es-CO' : 'en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}
