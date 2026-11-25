import type { T } from '../i18n/ui';

export type Layer = 'ui' | 'api' | 'events' | 'data' | 'insights' | 'cloud';

export interface Metric { value: number; decimals?: number; suffix?: string; label: T }
/** Text may use `backticks` for code terms; they render as <code>. */
export interface DNode { id: string; name: string | T; stereo?: string; x: number; y: number; w?: number; h?: number; kind?: 'node' | 'component' | 'artifact'; hot?: boolean }
export interface DEdge {
  kind?: 'path' | 'dep' | 'event' | 'assembly';
  /** false for a trunk line that splits into several arrows */
  arrow?: boolean;
  d?: string; label?: string; lx?: number; ly?: number;
  /** assembly only: requiring side, providing side and the ball's center */
  req?: [number, number]; prov?: [number, number]; at?: [number, number];
}
/** A result shown as a number; `of` draws a filled bar against that maximum. */
export interface Stat { value: number; decimals?: number; suffix?: string; prefix?: string; of?: number; label: T; /** a real quality gate: shows PASS */ gate?: boolean }
export interface Transition { from: string; event: T; to: string; noop?: boolean }
export interface Decision { title: T; chose: T; why: T; cost: T }

export interface CaseStudy {
  role: T;
  goal: T;
  diagram: { w?: number; h: number; nodes: DNode[]; edges: DEdge[]; caption: T; desc: T };
  decisions: Decision[];
  stats?: Stat[];
  notes?: T[];
  /** State-transition table shown when the code itself is private */
  transitions?: Transition[];
  /** Optional screenshot, e.g. a dashboard (path under /public) */
  figure?: { src: string; alt: T; caption: T };
  stack: string[];
  next: T[];
  /** Facts the owner still has to confirm; shown as a marked placeholder. */
  pending?: T[];
}

export interface Project {
  slug: string;
  title: T;
  caption: T;
  period: T;
  year: number;
  tier: 'featured' | 'more' | 'bonus';
  scene: string;
  sceneLabel: T;
  metric?: Metric;
  tags: string[];
  repo?: string;
  repo2?: string;
  live?: string;
  privateRepo?: boolean;
  liveLabel?: T;
  inProgress?: boolean;
  case?: CaseStudy;
}

const same = (s: string): T => ({ en: s, es: s });

export const projects: Project[] = [
  // ---------- Featured: full case studies ----------
  {
    slug: 'circleguard',
    title: same('CircleGuard'),
    caption: { en: 'Contact tracing that keeps names private, on Kubernetes.', es: 'Rastreo de contactos que protege los nombres, sobre Kubernetes.' },
    period: { en: 'May to Jun 2026', es: 'May. a jun. 2026' },
    year: 2026,
    tier: 'featured',
    scene: 'circleguard',
    sceneLabel: { en: 'A case spreads through a contact graph while a lock keeps names private.', es: 'Un caso se propaga por un grafo de contactos mientras un candado protege los nombres.' },
    metric: { value: 12, suffix: ' ms', label: { en: 'p95 latency at 50 concurrent users, 0 failures', es: 'latencia p95 con 50 usuarios concurrentes, 0 fallos' } },
    tags: ['Java', 'Spring Boot', 'Kafka', 'Kubernetes', 'Terraform'],
    repo: 'https://github.com/JuanCamiloMunozB/circle-guard-public',
    case: {
      role: { en: 'DevOps engineer: the Jenkins pipelines, Kubernetes manifests, Terraform for Azure Kubernetes, the circuit breaker and the test suite', es: 'Ingeniero DevOps: los pipelines de Jenkins, los manifiestos de Kubernetes, Terraform para Azure Kubernetes, el circuit breaker y la suite de pruebas' },
      goal: {
        en: 'A university needs to trace contacts on campus and control entry with QR codes without exposing who is sick. Eight Spring Boot services run on Kubernetes, with names kept in one isolated vault. Course project for Software Engineering V.',
        es: 'Una universidad necesita rastrear contactos en el campus y controlar el acceso con códigos QR sin exponer quién está enfermo. Ocho servicios Spring Boot corren sobre Kubernetes, con los nombres en una sola bóveda aislada. Proyecto del curso Ingeniería de Software V.',
      },
      diagram: {
        w: 975,
        h: 520,
        nodes: [
          { id: 'device', kind: 'node', stereo: 'device', name: { en: 'client device', es: 'dispositivo' }, x: 10, y: 150, w: 150, h: 150 },
          { id: 'ldap', kind: 'node', stereo: 'server', name: 'LDAP', x: 10, y: 340, w: 150, h: 70 },
          { id: 'azure', kind: 'node', stereo: 'cloud', name: 'Azure', x: 200, y: 10, w: 765, h: 500 },
          { id: 'aks', kind: 'node', stereo: 'executionEnvironment', name: 'Kubernetes (AKS)', x: 215, y: 70, w: 735, h: 425 },
          { id: 'client', stereo: 'client', name: { en: 'client app', es: 'app cliente' }, x: 16, y: 220, w: 132 },
          { id: 'gateway', stereo: 'service', name: 'gateway', x: 230, y: 155, w: 145 },
          { id: 'form', stereo: 'service', name: 'form', x: 415, y: 155, w: 145 },
          { id: 'auth', stereo: 'service', name: 'auth', x: 600, y: 155, w: 145 },
          { id: 'identity', stereo: 'service', name: 'identity', x: 785, y: 155, w: 145 },
          { id: 'dashboard', stereo: 'service', name: 'dashboard', x: 230, y: 245, w: 145 },
          { id: 'promotion', stereo: 'service', name: 'promotion', x: 415, y: 245, w: 145 },
          { id: 'kafka', stereo: 'broker', name: 'Kafka', x: 600, y: 245, w: 145, hot: true },
          { id: 'pg', stereo: 'database', name: 'PostgreSQL', x: 785, y: 245, w: 145 },
          { id: 'redis', stereo: 'cache', name: 'Redis', x: 230, y: 335, w: 145 },
          { id: 'neo4j', stereo: 'graph db', name: 'Neo4j', x: 415, y: 335, w: 145 },
          { id: 'notification', stereo: 'service', name: 'notification', x: 600, y: 335, w: 145 },
          { id: 'file', stereo: 'service', name: 'file', x: 785, y: 335, w: 145 },
          { id: 'metrics', stereo: 'monitoring', name: 'Prometheus, Grafana', x: 230, y: 425, w: 330 },
          { id: 'jaeger', stereo: 'tracing', name: 'Jaeger', x: 600, y: 425, w: 145 },
        ],
        edges: [
          { kind: 'path', d: 'M150 285 H200', label: 'HTTPS', lx: 152, ly: 278 },
          { kind: 'path', d: 'M150 375 H200', label: 'LDAP', lx: 156, ly: 368 },
          { kind: 'dep', arrow: false, d: 'M148 246 H185 V130 H857', label: 'REST', lx: 760, ly: 125 },
          { d: 'M302 130 V153' }, { d: 'M487 130 V153' }, { d: 'M672 130 V153' }, { d: 'M857 130 V153' },
          { d: 'M230 181 H222 V361 H228' },
          { d: 'M857 207 V243' },
          { d: 'M375 271 H413' },
          { d: 'M302 297 V316 H857 V299' },
          { kind: 'event', d: 'M487 207 V243', label: 'event', lx: 493, ly: 230 },
          { kind: 'event', d: 'M560 271 H598' },
          { d: 'M487 297 V333' },
          { kind: 'event', d: 'M672 297 V333', label: 'consume', lx: 678, ly: 329 },
        ],
        caption: { en: 'Deployment view: all 8 services and their data stores run in Kubernetes on Azure, with metrics and traces collected in the cluster. Amber dashed lines are events.', es: 'Vista de despliegue: los 8 servicios y sus almacenes de datos corren en Kubernetes sobre Azure, con métricas y trazas recogidas en el clúster. Las líneas ámbar punteadas son eventos.' },
        desc: {
          en: 'A client device runs the client app, which calls the gateway, form, auth and identity services over REST. All eight services run in a Kubernetes cluster (AKS) on Azure. Identity keeps real names in PostgreSQL, gateway reads entry status from Redis, the dashboard reads the promotion service and its own PostgreSQL data, form answers reach the promotion service, which walks the contact graph in Neo4j and publishes status changes to Kafka for the notification service. A file service stores documents. Prometheus, Grafana and Jaeger collect metrics and traces. The cluster reaches the university LDAP server for sign-in.',
          es: 'Un dispositivo cliente ejecuta la app, que llama por REST a los servicios gateway, form, auth e identity. Los ocho servicios corren en un clúster Kubernetes (AKS) en Azure. Identity guarda los nombres reales en PostgreSQL, gateway lee el estado de acceso desde Redis, el dashboard consulta el servicio promotion y sus propios datos en PostgreSQL, las respuestas de form llegan a promotion, que recorre el grafo de contactos en Neo4j y publica cambios de estado en Kafka para el servicio de notificaciones. Un servicio de archivos guarda documentos. Prometheus, Grafana y Jaeger recogen métricas y trazas. El clúster consulta el servidor LDAP de la universidad para iniciar sesión.',
        },
      },
      decisions: [
        {
          title: { en: 'Contacts live in a graph', es: 'Los contactos viven en un grafo' },
          chose: { en: 'Neo4j for the contact network, PostgreSQL for everything else.', es: 'Neo4j para la red de contactos, PostgreSQL para todo lo demás.' },
          why: { en: 'Finding everyone a few contacts away from a case is a graph walk, which is slow and awkward as recursive SQL.', es: 'Encontrar a todos los que están a pocos contactos de un caso es recorrer un grafo, algo lento e incómodo con SQL recursivo.' },
          cost: { en: 'A second database to run, back up and keep in sync.', es: 'Una segunda base de datos que operar, respaldar y mantener sincronizada.' },
        },
        {
          title: { en: 'Names stay in one vault', es: 'Los nombres se quedan en una bóveda' },
          chose: { en: 'An identity service that maps real names to salted hashes; the other services only see anonymous IDs.', es: 'Un servicio de identidad que traduce nombres reales a hashes con sal; los demás servicios solo ven IDs anónimos.' },
          why: { en: 'A leak in any other service exposes no one.', es: 'Una fuga en cualquier otro servicio no expone a nadie.' },
          cost: { en: 'Every flow that needs a real name has to go through one service.', es: 'Todo flujo que necesite un nombre real tiene que pasar por un solo servicio.' },
        },
        {
          title: { en: 'Builds stay off the cluster', es: 'Los builds quedan fuera del clúster' },
          chose: { en: 'Jenkins builds images with Kaniko on a build agent outside the cluster; only `stage` and `master` deploy to Azure Kubernetes, provisioned with Terraform.', es: 'Jenkins construye las imágenes con Kaniko en un agente fuera del clúster; solo `stage` y `master` despliegan a Azure Kubernetes, aprovisionado con Terraform.' },
          why: { en: 'The student cloud budget and VM quota could not hold the eight services and the build agents at the same time.', es: 'El presupuesto estudiantil de nube y la cuota de máquinas no alcanzaban para los ocho servicios y los agentes de compilación a la vez.' },
          cost: { en: 'The cluster is switched on before a `stage` or `master` build and off after it, and every build depends on one agent.', es: 'El clúster se enciende antes de un build de `stage` o `master` y se apaga después, y cada build depende de un solo agente.' },
        },
        {
          title: { en: 'Metrics, traces and alerts in the cluster', es: 'Métricas, trazas y alertas en el clúster' },
          chose: { en: 'Prometheus and Grafana for metrics, Jaeger for traces across services, and six alert rules: service down, restart loop, high latency, high error rate, circuit breaker open and JVM heap.', es: 'Prometheus y Grafana para métricas, Jaeger para trazas entre servicios y seis reglas de alerta: servicio caído, reinicios en bucle, latencia alta, tasa de errores alta, circuit breaker abierto y heap de la JVM.' },
          why: { en: 'With eight services, a slow request has to be traced across them, and a tripped circuit breaker has to be visible before users notice.', es: 'Con ocho servicios, una petición lenta hay que seguirla entre ellos, y un circuit breaker abierto tiene que verse antes de que lo noten los usuarios.' },
          cost: { en: 'The monitoring stack takes part of the same small cluster the services need.', es: 'El stack de monitoreo ocupa parte del mismo clúster pequeño que necesitan los servicios.' },
        },
      ],
      stats: [
        { value: 12, suffix: ' ms', label: { en: 'p95 latency, 50 users (Locust)', es: 'latencia p95, 50 usuarios (Locust)' } },
        { value: 21, suffix: ' ms', label: { en: 'p99 latency', es: 'latencia p99' } },
        { value: 22, label: { en: 'requests per second', es: 'peticiones por segundo' } },
        { value: 0, gate: true, label: { en: 'failed requests', es: 'peticiones fallidas' } },
        { value: 80, suffix: '%', of: 100, gate: true, label: { en: 'line coverage gate (JaCoCo)', es: 'umbral de cobertura (JaCoCo)' } },
      ],
      notes: [
        { en: 'Quality gates in the pipeline: SonarQube, Trivy and an OWASP ZAP baseline scan.', es: 'Puertas de calidad en el pipeline: SonarQube, Trivy y un escaneo base de OWASP ZAP.' },
        { en: 'Circuit breaker (Resilience4j) on calls between services.', es: 'Circuit breaker (Resilience4j) en las llamadas entre servicios.' },
      ],
      stack: ['Java', 'Spring Boot', 'Kafka', 'Neo4j', 'PostgreSQL', 'Redis', 'LDAP', 'Kubernetes', 'Jenkins', 'Terraform', 'Azure', 'Prometheus', 'Grafana', 'Jaeger', 'SonarQube', 'Trivy', 'Locust'],
      next: [
        { en: 'Move the cluster start and stop into the pipeline, so a build never waits on a person.', es: 'Llevar el encendido y apagado del clúster al pipeline, para que ningún build espere a una persona.' },
      ],
    },
  },
  {
    slug: 'irl-diagnostic',
    title: { en: 'IRL Diagnostic System', es: 'Sistema de Diagnóstico IRL' },
    caption: { en: 'A modular monolith that scores innovation readiness for INNLAB.', es: 'Un monolito modular que evalúa la madurez de la innovación para INNLAB.' },
    period: { en: 'Feb to Nov 2026', es: 'Feb. a nov. 2026' },
    year: 2026,
    tier: 'featured',
    scene: 'irl',
    sceneLabel: { en: 'A six-axis readiness radar grows and its weakest axis links to a service.', es: 'Un radar de seis ejes crece y su eje más débil se conecta con un servicio.' },
    metric: { value: 100, suffix: '%', label: { en: 'routing accuracy: 46 of 46 acceptance cases', es: 'precisión del enrutamiento: 46 de 46 casos de aceptación' } },
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'React'],
    repo: 'https://github.com/JManuel2004/sistema-diagnostico-irl',
    live: 'https://sistema-diagnostico-irl-api.vercel.app',
    liveLabel: { en: 'Live app (Spanish)', es: 'App en línea' },
    case: {
      role: { en: 'Lead developer and product owner: ran the meetings with INNLAB and the advisor', es: 'Desarrollador líder y product owner: dirigí las reuniones con INNLAB y el asesor' },
      goal: {
        en: "Help the INNLAB innovation center measure how ready a team's innovation is, across the six dimensions of the KTH Innovation Readiness Level, and route each gap to a service INNLAB offers. Degree project.",
        es: 'Ayudar al centro de innovación INNLAB a medir qué tan madura está la innovación de un equipo, en las seis dimensiones del KTH Innovation Readiness Level, y dirigir cada brecha a un servicio de INNLAB. Proyecto de grado.',
      },
      diagram: {
        w: 860,
        h: 370,
        nodes: [
          { id: 'vercel', kind: 'node', stereo: 'cloud', name: 'Vercel', x: 10, y: 10, w: 150, h: 80 },
          { id: 'browser', kind: 'node', stereo: 'device', name: { en: 'browser', es: 'navegador' }, x: 10, y: 130, w: 150, h: 140 },
          { id: 'docker', kind: 'node', stereo: 'executionEnvironment', name: 'NestJS on Fastify', x: 210, y: 10, w: 460, h: 345 },
          { id: 'aws', kind: 'node', stereo: 'cloud', name: 'AWS', x: 700, y: 10, w: 150, h: 115 },
          { id: 'db', kind: 'node', stereo: 'database server', name: 'PostgreSQL 16', x: 700, y: 215, w: 150, h: 100 },
          { id: 'web', stereo: 'client', name: 'React', x: 18, y: 190, w: 134 },
          { id: 'rest', stereo: 'adapter', name: 'REST', x: 225, y: 190, w: 120 },
          { id: 'core', stereo: 'domain', name: { en: '5 modules', es: '5 módulos' }, x: 400, y: 90, w: 200 },
          { id: 'events', stereo: 'in-process', name: { en: 'domain events', es: 'eventos de dominio' }, x: 400, y: 180, w: 200, hot: true },
          { id: 'orm', stereo: 'adapter', name: 'TypeORM', x: 400, y: 270, w: 200 },
          { id: 'identity', stereo: 'adapter', name: 'identity', x: 225, y: 280, w: 120 },
          { id: 'cognito', stereo: 'service', name: 'Cognito', x: 710, y: 62, w: 120 },
        ],
        edges: [
          { kind: 'path', d: 'M80 90 V130', label: 'HTTPS', lx: 86, ly: 114 },
          { kind: 'path', d: 'M160 175 H210', label: 'HTTPS', lx: 163, ly: 168 },
          { kind: 'assembly', req: [152, 216], prov: [225, 216], at: [196, 216], label: 'REST API', lx: 160, ly: 252 },
          { d: 'M285 190 V76 H460 V88' },
          { d: 'M400 296 H372 V116 H398' },
          { kind: 'event', d: 'M500 142 V178', label: 'publish', lx: 506, ly: 164 },
          { d: 'M285 242 V278' },
          { d: 'M600 296 H698', label: 'SQL', lx: 628, ly: 290 },
          { d: 'M285 332 V346 H685 V88 H708', label: 'JWKS', lx: 440, ly: 341 },
        ],
        caption: { en: 'Hexagonal modular monolith: adapters plug into a core of 5 modules that imports no framework; modules react to each other through in-process domain events.', es: 'Monolito modular hexagonal: los adaptadores se conectan a un núcleo de 5 módulos que no importa ningún framework; los módulos reaccionan entre sí con eventos de dominio en proceso.' },
        desc: {
          en: 'Vercel serves the React app to the browser. The app calls a REST adapter in a NestJS on Fastify service. The REST adapter drives the core, five modules (diagnosis, initiative, routing, roadmap, reporting) whose domain and application layers import no framework. Modules publish in-process domain events to each other. A TypeORM adapter implements the core repository ports against PostgreSQL 16. An identity adapter verifies sign-in tokens issued by AWS Cognito through the INNLAB single sign-on.',
          es: 'Vercel sirve la app React al navegador. La app llama a un adaptador REST en un servicio NestJS sobre Fastify. El adaptador REST maneja el núcleo, cinco módulos (diagnosis, initiative, routing, roadmap, reporting) cuyas capas de dominio y aplicación no importan ningún framework. Los módulos se publican eventos de dominio en proceso. Un adaptador TypeORM implementa los puertos de repositorio contra PostgreSQL 16. Un adaptador de identidad verifica los tokens emitidos por AWS Cognito a través del inicio de sesión único de INNLAB.',
        },
      },
      decisions: [
        {
          title: { en: 'A modular monolith, one module per bounded context', es: 'Un monolito modular, un módulo por contexto delimitado' },
          chose: { en: 'One NestJS deployable with a module per context (`diagnosis`, `initiative`, `routing`, `roadmap`) plus shared contexts, instead of separate services.', es: 'Un solo desplegable NestJS con un módulo por contexto (`diagnosis`, `initiative`, `routing`, `roadmap`) más contextos compartidos, en lugar de servicios separados.' },
          why: { en: 'One team, one database and one deployment, but a domain that splits cleanly. A module may only read another through what it exports, never its ORM entities.', es: 'Un equipo, una base de datos y un despliegue, pero un dominio que se divide limpio. Un módulo solo puede leer a otro por lo que este exporta, nunca sus entidades del ORM.' },
          cost: { en: 'The boundaries are enforced by lint rules (`eslint-plugin-boundaries`), not by process isolation, and the whole system scales as one unit.', es: 'Los límites los hacen cumplir reglas de lint (`eslint-plugin-boundaries`), no el aislamiento de procesos, y todo el sistema escala como una unidad.' },
        },
        {
          title: { en: 'A core that imports no framework', es: 'Un núcleo que no importa ningún framework' },
          chose: { en: 'Domain and application layers are plain TypeScript: use cases receive ports in their constructors and are wired to NestJS by a factory provider. ESLint forbids framework and IO packages there.', es: 'Las capas de dominio y aplicación son TypeScript plano: los casos de uso reciben puertos en el constructor y se conectan a NestJS con un proveedor de fábrica. ESLint prohíbe ahí paquetes de framework y de IO.' },
          why: { en: 'Scoring rules change with INNLAB; unit tests build use cases with `new` and plain stubs, without booting the framework or a database.', es: 'Las reglas de puntaje cambian con INNLAB; las pruebas unitarias crean los casos de uso con `new` y stubs simples, sin arrancar el framework ni la base de datos.' },
          cost: { en: 'Every new use case has to be registered by hand with its dependencies; a missing one fails at boot.', es: 'Cada caso de uso nuevo se registra a mano con sus dependencias; si falta una, falla al arrancar.' },
        },
        {
          title: { en: 'Modules talk through in-process events', es: 'Los módulos se hablan con eventos en proceso' },
          chose: { en: 'The module where a fact happens publishes a domain event after its transaction; interested modules run their own use case. Synchronous and in process, with idempotent listeners.', es: 'El módulo donde ocurre un hecho publica un evento de dominio después de su transacción; los módulos interesados ejecutan su propio caso de uso. Síncrono y en proceso, con listeners idempotentes.' },
          why: { en: 'A hand-built orchestrator would make `diagnosis` depend on `routing` and `roadmap`. The volume and topology did not need a queue.', es: 'Un orquestador hecho a mano haría que `diagnosis` dependiera de `routing` y `roadmap`. El volumen y la topología no necesitaban una cola.' },
          cost: { en: 'No broker means no retries: a failing listener is logged, and its work is not redone automatically.', es: 'Sin broker no hay reintentos: un listener que falla queda registrado y su trabajo no se repite solo.' },
        },
        {
          title: { en: 'Sign-in through the INNLAB single sign-on', es: 'Inicio de sesión con el SSO de INNLAB' },
          chose: { en: 'Users sign in through INNLAB, with tokens issued by AWS Cognito; an identity adapter verifies them and keeps Cognito out of the core.', es: 'Los usuarios inician sesión con INNLAB, con tokens emitidos por AWS Cognito; un adaptador de identidad los verifica y mantiene a Cognito fuera del núcleo.' },
          why: { en: 'No passwords stored in the system, and the same accounts INNLAB already uses.', es: 'Ninguna contraseña guardada en el sistema, y las mismas cuentas que INNLAB ya usa.' },
          cost: { en: 'Local development needs INNLAB and Cognito, or the sign-in simulator built for that.', es: 'El desarrollo local necesita INNLAB y Cognito, o el simulador de inicio de sesión construido para eso.' },
        },
      ],
      stats: [
        { value: 46, of: 46, gate: true, label: { en: 'acceptance cases passed: best-fit service out of 12', es: 'casos de aceptación superados: mejor servicio entre 12' } },
        { value: 88.5, decimals: 1, of: 100, label: { en: 'usability score (SUS), 5 expert users', es: 'puntaje de usabilidad (SUS), 5 usuarios expertos' } },
        { value: 9, label: { en: 'roadmap dependency rules, property-tested', es: 'reglas de dependencia del roadmap, con pruebas de propiedades' } },
        { value: 20, label: { en: 'functional requirements from client meetings I led', es: 'requisitos funcionales de reuniones que dirigí' } },
      ],
      notes: [
        { en: 'Requirements as an IEEE 830 SRS and Gherkin user stories, agreed with the client.', es: 'Requisitos como SRS IEEE 830 e historias de usuario en Gherkin, acordados con el cliente.' },
        { en: 'The 52 usability findings became interface and report improvements within 3 days.', es: 'Los 52 hallazgos de usabilidad se convirtieron en mejoras de la interfaz y del reporte en 3 días.' },
      ],
      stack: ['NestJS', 'Fastify', 'TypeORM', 'PostgreSQL', 'TypeScript', 'React', 'AWS Cognito', 'Docker', 'Vercel'],
      next: [{ en: 'Add a view where INNLAB compares the readiness of many teams over time.', es: 'Agregar una vista donde INNLAB compare la madurez de muchos equipos en el tiempo.' }],
    },
  },
  {
    slug: 'postgrados',
    title: same('Postgrados'),
    caption: { en: 'A planning lifecycle that replaces spreadsheets, as an idempotent state machine.', es: 'Un ciclo de planeación que reemplaza hojas de cálculo, como máquina de estados idempotente.' },
    period: { en: 'Feb to Jun 2026', es: 'Feb. a jun. 2026' },
    year: 2026,
    tier: 'featured',
    scene: 'postgrados',
    sceneLabel: { en: 'A task leaves a spreadsheet and moves through a state machine to a finished state.', es: 'Una tarea sale de una hoja de cálculo y avanza por una máquina de estados hasta terminar.' },
    metric: { value: 81, suffix: '%', label: { en: 'branch coverage on the plan editor, above the repo threshold', es: 'cobertura de ramas en el editor del plan, sobre el umbral del repositorio' } },
    tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
    privateRepo: true,
    case: {
      role: { en: 'Full-stack developer; Scrum Master for one sprint', es: 'Desarrollador full stack; Scrum Master durante un sprint' },
      goal: {
        en: "Replace spreadsheet coordination at the university's graduate office with one system for academic planning, where every plan has a clear, persisted state.",
        es: 'Reemplazar la coordinación por hojas de cálculo en la oficina de posgrados de la universidad con un solo sistema de planeación académica, donde cada plan tiene un estado claro y persistido.',
      },
      diagram: {
        w: 810,
        h: 270,
        nodes: [
          { id: 'browser', kind: 'node', stereo: 'device', name: { en: 'browser', es: 'navegador' }, x: 10, y: 50, w: 150, h: 140 },
          { id: 'jvm', kind: 'node', stereo: 'executionEnvironment', name: 'JVM (Spring Boot)', x: 210, y: 10, w: 400, h: 250 },
          { id: 'db', kind: 'node', stereo: 'database server', name: 'PostgreSQL', x: 650, y: 50, w: 150, h: 120 },
          { id: 'web', stereo: 'client', name: 'React', x: 18, y: 120, w: 132 },
          { id: 'api', stereo: 'service', name: { en: 'planning API', es: 'API de planeación' }, x: 225, y: 80, w: 185 },
          { id: 'actions', stereo: 'use case', name: { en: 'export, notify', es: 'exportar, notificar' }, x: 225, y: 180, w: 195 },
          { id: 'sm', stereo: 'state machine', name: { en: 'plan lifecycle', es: 'ciclo del plan' }, x: 425, y: 80, w: 165, hot: true },
        ],
        edges: [
          { kind: 'path', d: 'M160 90 H210', label: 'HTTPS', lx: 163, ly: 83 },
          { kind: 'path', d: 'M610 100 H650', label: 'JDBC', lx: 613, ly: 93 },
          { d: 'M150 146 H190 V106 H223', label: 'REST', lx: 172, ly: 163 },
          { d: 'M317 132 V178' },
          { kind: 'event', d: 'M420 206 H507 V134', label: 'in-process event', lx: 426, ly: 226 },
        ],
        caption: { en: 'Deployment view: lifecycle events stay in process; the state machine moves a plan only after the export or notification succeeded.', es: 'Vista de despliegue: los eventos del ciclo se quedan en proceso; la máquina de estados mueve un plan solo después de que la exportación o la notificación tuvo éxito.' },
        desc: {
          en: 'A browser runs the React client, which calls the planning API over REST. Export and notification use cases run in the same Spring Boot application and, when they succeed, send an in-process event to the plan lifecycle state machine. Plans and their states are stored in PostgreSQL.',
          es: 'Un navegador ejecuta el cliente React, que llama a la API de planeación por REST. Los casos de uso de exportación y notificación corren en la misma aplicación Spring Boot y, cuando tienen éxito, envían un evento en proceso a la máquina de estados del ciclo del plan. Los planes y sus estados se guardan en PostgreSQL.',
        },
      },
      decisions: [
        {
          title: { en: 'The lifecycle is a state machine', es: 'El ciclo de vida es una máquina de estados' },
          chose: { en: 'A plan is `CREATED`, `DRAFT` or `EMITTED`, and a transition engine is the only code that can change it.', es: 'Un plan está en `CREATED`, `DRAFT` o `EMITTED`, y un motor de transiciones es el único código que puede cambiarlo.' },
          why: { en: 'With spreadsheets nobody knew where a plan stood; now the stored state is the single answer.', es: 'Con hojas de cálculo nadie sabía en qué punto estaba un plan; ahora el estado guardado es la única respuesta.' },
          cost: { en: 'A new step in the process means a new event and new rows in the transition table.', es: 'Un paso nuevo en el proceso implica un evento nuevo y filas nuevas en la tabla de transiciones.' },
        },
        {
          title: { en: 'Events drive transitions, after the action succeeds', es: 'Los eventos mueven las transiciones, después de que la acción tiene éxito' },
          chose: { en: 'Business actions raise lifecycle events (`EXPORT_SUCCESS`, `STUDENTS_NOTIFICATION_SENT`) that the state machine consumes in process. No broker.', es: 'Las acciones de negocio generan eventos del ciclo (`EXPORT_SUCCESS`, `STUDENTS_NOTIFICATION_SENT`) que la máquina de estados consume en proceso. Sin broker.' },
          why: { en: 'The stored state never claims an export or a notification that failed.', es: 'El estado guardado nunca afirma una exportación o notificación que falló.' },
          cost: { en: 'Every new action has to raise its event, or the plan silently stays where it was.', es: 'Cada acción nueva tiene que generar su evento, o el plan se queda donde estaba sin aviso.' },
        },
        {
          title: { en: 'Repeated events change nothing', es: 'Los eventos repetidos no cambian nada' },
          chose: { en: 'An event that does not apply to the current state is a no-op: exporting a plan that is already `DRAFT` or `EMITTED` leaves it as it is.', es: 'Un evento que no aplica al estado actual no hace nada: exportar un plan que ya está en `DRAFT` o `EMITTED` lo deja como está.' },
          why: { en: 'Double clicks and repeated exports cannot move a plan backwards or twice.', es: 'Los dobles clics y las exportaciones repetidas no pueden mover un plan hacia atrás ni dos veces.' },
          cost: { en: 'The table has to list every state and event pair explicitly, including the ones that do nothing.', es: 'La tabla tiene que listar explícitamente cada par de estado y evento, incluidos los que no hacen nada.' },
        },
      ],
      transitions: [
        { from: 'CREATED', event: { en: '`EXPORT_SUCCESS`', es: '`EXPORT_SUCCESS`' }, to: 'DRAFT' },
        { from: 'CREATED', event: { en: 'sent to the director or professors', es: 'enviado al director o a los profesores' }, to: 'DRAFT' },
        { from: 'DRAFT', event: { en: '`EXPORT_SUCCESS`', es: '`EXPORT_SUCCESS`' }, to: 'DRAFT', noop: true },
        { from: 'DRAFT', event: { en: '`STUDENTS_NOTIFICATION_SENT`, all students notified', es: '`STUDENTS_NOTIFICATION_SENT`, todos los estudiantes notificados' }, to: 'EMITTED' },
        { from: 'EMITTED', event: { en: '`EXPORT_SUCCESS`', es: '`EXPORT_SUCCESS`' }, to: 'EMITTED', noop: true },
      ],
      stats: [
        { value: 81, suffix: '%', of: 100, gate: true, label: { en: 'branch coverage on the plan editor, above the repository threshold', es: 'cobertura de ramas en el editor del plan, sobre el umbral del repositorio' } },
        { value: 3, label: { en: 'states, every transition guarded', es: 'estados, cada transición protegida' } },
      ],
      notes: [
        { en: 'The UI marks unsaved local edits as `LOCAL_PENDING`, separate from the persisted state, and blocks navigation until they are saved or discarded.', es: 'La interfaz marca las ediciones locales sin guardar como `LOCAL_PENDING`, separadas del estado persistido, y bloquea la navegación hasta guardarlas o descartarlas.' },
      ],
      stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'JUnit'],
      next: [{ en: 'Add an audit view of every transition, so the office can see who changed what.', es: 'Agregar una vista de auditoría de cada transición, para que la oficina vea quién cambió qué.' }],
    },
  },
  {
    slug: 'jugandoando',
    title: same('JugandoAndo'),
    caption: { en: 'E-commerce API built to scale out, and what still pins it to one instance.', es: 'API de comercio electrónico pensada para escalar, y lo que aún la ata a una instancia.' },
    period: { en: 'Feb to Jun 2025', es: 'Feb. a jun. 2025' },
    year: 2025,
    tier: 'featured',
    scene: 'jugandoando',
    sceneLabel: { en: 'Products drop into a cart and a live notification pops up.', es: 'Los productos caen en un carrito y aparece una notificación en vivo.' },
    metric: { value: 80, label: { en: 'REST endpoints over 17 PostgreSQL tables', es: 'endpoints REST sobre 17 tablas de PostgreSQL' } },
    tags: ['Java', 'Spring Boot', 'React', 'WebSockets'],
    repo: 'https://github.com/JuanCamiloMunozB/Ecommerce-backend',
    repo2: 'https://github.com/JuanCamiloMunozB/Ecommerce-frontend',
    case: {
      role: { en: 'Full stack: backend and frontend', es: 'Full stack: backend y frontend' },
      goal: {
        en: 'An online store with catalog, cart, orders and promotions, where admins and customers sign in differently and see changes live.',
        es: 'Una tienda en línea con catálogo, carrito, pedidos y promociones, donde administradores y clientes inician sesión de forma distinta y ven los cambios en vivo.',
      },
      diagram: {
        w: 800,
        h: 345,
        nodes: [
          { id: 'browser', kind: 'node', stereo: 'device', name: { en: 'browser', es: 'navegador' }, x: 10, y: 90, w: 150, h: 150 },
          { id: 'jvm', kind: 'node', stereo: 'executionEnvironment', name: 'JVM (Spring Boot)', x: 210, y: 10, w: 330, h: 320 },
          { id: 'files', kind: 'node', stereo: 'local disk', name: 'uploads/', x: 580, y: 10, w: 200, h: 100 },
          { id: 'db', kind: 'node', stereo: 'database server', name: 'PostgreSQL', x: 580, y: 170, w: 200, h: 150 },
          { id: 'web', stereo: 'client', name: 'React', x: 18, y: 160, w: 132 },
          { id: 'api', stereo: 'service', name: { en: 'store API', es: 'API de la tienda' }, x: 225, y: 90, w: 190 },
          { id: 'ws', stereo: 'in-memory', name: { en: 'WebSocket sessions', es: 'sesiones WebSocket' }, x: 225, y: 240, w: 190, hot: true },
          { id: 'schema', kind: 'artifact', stereo: 'schema', name: { en: '17 tables', es: '17 tablas' }, x: 595, y: 245, w: 160 },
        ],
        edges: [
          { kind: 'path', d: 'M160 140 H210', label: 'HTTPS', lx: 163, ly: 133 },
          { kind: 'path', d: 'M540 240 H580', label: 'JDBC', lx: 543, ly: 233 },
          { d: 'M150 186 H190 V116 H223', label: 'JWT, session', lx: 228, ly: 168 },
          { d: 'M415 100 H560 V60 H578', label: 'upload', lx: 440, ly: 94 },
          { kind: 'event', d: 'M320 142 V238', label: 'publish', lx: 326, ly: 205 },
          { kind: 'event', d: 'M223 266 H84 V214', label: 'push', lx: 120, ly: 262 },
        ],
        caption: { en: 'Deployment view: the API itself is stateless, but WebSocket sessions live in this JVM and uploads on its local disk, so it runs as one instance.', es: 'Vista de despliegue: la API en sí no guarda estado, pero las sesiones WebSocket viven en esta JVM y los archivos en su disco local, así que corre como una sola instancia.' },
        desc: {
          en: 'A browser runs the React client, which signs in with JWT for customers or a session for admins and calls the store API. The API runs on the JVM with Spring Boot, keeps 17 tables in PostgreSQL, writes uploads to a local uploads folder and pushes notifications to WebSocket sessions held in the same JVM.',
          es: 'Un navegador ejecuta el cliente React, que inicia sesión con JWT para clientes o con sesión para administradores y llama a la API de la tienda. La API corre en la JVM con Spring Boot, mantiene 17 tablas en PostgreSQL, escribe los archivos en una carpeta local y envía notificaciones a sesiones WebSocket guardadas en la misma JVM.',
        },
      },
      decisions: [
        {
          title: { en: 'Stateless JWT for customers, sessions for admins', es: 'JWT sin estado para clientes, sesiones para administradores' },
          chose: { en: 'Two security chains: stateless JWT on `/api/**`, a server session with form login for the admin panel.', es: 'Dos cadenas de seguridad: JWT sin estado en `/api/**` y una sesión de servidor con formulario para el panel de administración.' },
          why: { en: 'The design intent was a customer API that could run as several instances behind a load balancer, while admin access can be revoked at once.', es: 'La intención de diseño era una API de clientes que pudiera correr en varias instancias detrás de un balanceador, mientras el acceso de administradores se puede revocar de inmediato.' },
          cost: { en: 'Two security configurations to maintain, and the stateless API alone did not make the system stateless (see the next two decisions).', es: 'Dos configuraciones de seguridad que mantener, y la API sin estado no bastó para que el sistema no guardara estado (ver las dos decisiones siguientes).' },
        },
        {
          title: { en: 'Live notifications over raw WebSockets', es: 'Notificaciones en vivo con WebSockets directos' },
          chose: { en: 'A Spring WebSocket handler (`@EnableWebSocket`) that keeps open sessions in memory and pushes order and promotion events to them.', es: 'Un manejador WebSocket de Spring (`@EnableWebSocket`) que guarda las sesiones abiertas en memoria y les envía eventos de pedidos y promociones.' },
          why: { en: 'Customers and admins see changes without refreshing, with no extra infrastructure.', es: 'Clientes y administradores ven los cambios sin recargar, sin infraestructura adicional.' },
          cost: { en: 'Sessions live in one JVM: a second instance would never reach the clients connected to the first. This is what pins the API to one instance.', es: 'Las sesiones viven en una JVM: una segunda instancia nunca llegaría a los clientes conectados a la primera. Esto es lo que ata la API a una sola instancia.' },
        },
        {
          title: { en: 'Uploads apart from transactions', es: 'Archivos aparte de las transacciones' },
          chose: { en: 'Product images are written to a local `uploads/` folder, outside the database write of an order or product.', es: 'Las imágenes de productos se escriben en una carpeta local `uploads/`, fuera de la escritura en base de datos de un pedido o producto.' },
          why: { en: 'A slow or failed upload never holds a database transaction open.', es: 'Una carga lenta o fallida nunca deja una transacción abierta.' },
          cost: { en: 'Orphan files can appear, and a local disk is one more thing a second instance would not share.', es: 'Pueden quedar archivos huérfanos, y un disco local es otra cosa que una segunda instancia no compartiría.' },
        },
      ],
      stats: [
        { value: 80, label: { en: 'REST endpoints', es: 'endpoints REST' } },
        { value: 2, label: { en: 'auth chains: stateless JWT and admin sessions', es: 'cadenas de autenticación: JWT sin estado y sesiones de administrador' } },
        { value: 17, label: { en: 'PostgreSQL tables', es: 'tablas en PostgreSQL' } },
      ],
      stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'WebSockets', 'JWT'],
      next: [{ en: 'Move notifications to a message broker and uploads to object storage, so the API can run as several instances.', es: 'Llevar las notificaciones a un broker de mensajes y los archivos a almacenamiento de objetos, para que la API pueda correr en varias instancias.' }],
    },
  },

  // ---------- More projects ----------
  {
    slug: 'churn',
    title: { en: 'Churn prediction and monitoring', es: 'Predicción y monitoreo de abandono' },
    caption: { en: 'A churn model with drift alerts.', es: 'Un modelo de abandono con alertas de deriva.' },
    period: { en: 'Aug to Sep 2026', es: 'Ago. a sep. 2026' },
    year: 2026,
    tier: 'featured',
    scene: 'churn',
    sceneLabel: { en: 'A quality line drops below the threshold and an alert bell rings.', es: 'Una línea de calidad cae bajo el umbral y suena una alarma.' },
    metric: { value: 0.837, decimals: 3, label: { en: 'AUC', es: 'AUC' } },
    tags: ['Python', 'Airflow', 'BigQuery', 'Cloud Run', 'FastAPI'],
    repo: 'https://github.com/JuanCamiloMunozB/computacion-nube-ia',
    case: {
      role: { en: 'Team member', es: 'Integrante del equipo' },
      goal: {
        en: 'Predict which customers are about to leave, check that the model treats genders fairly, and keep watching its quality after release.',
        es: 'Predecir qué clientes están por irse, verificar que el modelo trate a los géneros de forma justa y seguir vigilando su calidad después de publicarlo.',
      },
      diagram: {
        w: 760,
        h: 330,
        nodes: [
          { id: 'gcp', kind: 'node', stereo: 'cloud', name: 'Google Cloud', x: 230, y: 10, w: 520, h: 310 },
          { id: 'run', kind: 'node', stereo: 'executionEnvironment', name: 'Cloud Run', x: 450, y: 70, w: 280, h: 125 },
          { id: 'audit', stereo: 'SHAP', name: { en: 'bias audit', es: 'auditoría de sesgo' }, x: 10, y: 20, w: 190 },
          { id: 'train', stereo: 'job', name: 'XGBoost, Optuna', x: 10, y: 120, w: 190 },
          { id: 'dash', stereo: 'dashboard', name: 'Streamlit', x: 10, y: 254, w: 190 },
          { id: 'bq', stereo: 'warehouse', name: 'BigQuery', x: 250, y: 80, w: 170 },
          { id: 'api', stereo: 'service', name: 'FastAPI', x: 465, y: 130, w: 150 },
          { id: 'airflow', stereo: 'scheduler', name: 'Airflow', x: 250, y: 220, w: 170 },
          { id: 'alert', stereo: 'alert', name: { en: 'calibrated alert', es: 'alerta calibrada' }, x: 450, y: 220, w: 200, hot: true },
        ],
        edges: [
          { d: 'M105 72 V118' },
          { d: 'M200 140 H225 V106 H248', label: 'read', lx: 196, ly: 101 },
          { d: 'M105 172 V205 H440 V156 H463', label: 'model', lx: 290, ly: 201 },
          { d: 'M200 288 H225 V304 H700 V162 H617', label: 'REST', lx: 330, ly: 300 },
          { d: 'M335 218 V134', label: 'batches', lx: 341, ly: 190 },
          { kind: 'event', d: 'M420 246 H448' },
        ],
        caption: { en: 'Deployment view: training and the dashboard sit outside; data, serving and monitoring run on Google Cloud.', es: 'Vista de despliegue: el entrenamiento y el tablero quedan afuera; datos, servicio y monitoreo corren en Google Cloud.' },
        desc: {
          en: 'A training job with XGBoost and Optuna reads data from BigQuery, is audited for bias with SHAP, and deploys the model to a FastAPI service on Cloud Run. A Streamlit dashboard calls that API. Airflow pulls new batches from BigQuery and raises a calibrated alert when quality drops.',
          es: 'Un trabajo de entrenamiento con XGBoost y Optuna lee datos de BigQuery, se audita por sesgo con SHAP y despliega el modelo en un servicio FastAPI en Cloud Run. Un tablero en Streamlit llama a esa API. Airflow toma lotes nuevos de BigQuery y lanza una alerta calibrada cuando la calidad cae.',
        },
      },
      decisions: [
        {
          title: { en: 'Pick the model by bias and cost, not only by score', es: 'Elegir el modelo por sesgo y costo, no solo por puntaje' },
          chose: { en: 'Three candidate models compared on gender bias and on the business cost of their errors.', es: 'Tres modelos candidatos comparados por sesgo de género y por el costo de negocio de sus errores.' },
          why: { en: 'A model that is accurate on average can still be unfair to one group, or miss the customers that matter most.', es: 'Un modelo preciso en promedio puede ser injusto con un grupo, o fallar justo con los clientes que más importan.' },
          cost: { en: 'More evaluation work before choosing.', es: 'Más trabajo de evaluación antes de elegir.' },
        },
        {
          title: { en: 'A calibrated alert, not a fixed threshold', es: 'Una alerta calibrada, no un umbral fijo' },
          chose: { en: 'An alert calibrated on past batches, run by Airflow on every new batch.', es: 'Una alerta calibrada con lotes anteriores, que Airflow ejecuta en cada lote nuevo.' },
          why: { en: 'Across 10 batches (703 synthetic records), it caught a quality drop that the fixed threshold missed.', es: 'En 10 lotes (703 registros sintéticos) detectó una caída de calidad que el umbral fijo no vio.' },
          cost: { en: 'It needs a calibration step and enough history to calibrate on.', es: 'Requiere un paso de calibración y suficiente historia para calibrar.' },
        },
        {
          title: { en: 'Serve it as an API', es: 'Servirlo como API' },
          chose: { en: 'FastAPI in a container on Cloud Run.', es: 'FastAPI en un contenedor en Cloud Run.' },
          why: { en: 'Any product can ask for a prediction, and the service scales to zero when idle.', es: 'Cualquier producto puede pedir una predicción, y el servicio escala a cero cuando no se usa.' },
          cost: { en: 'Cold starts on the first request after a quiet period.', es: 'Arranques en frío en la primera petición tras un periodo sin uso.' },
        },
      ],
      stats: [
        { value: 0.837, decimals: 3, of: 1, label: { en: 'AUC', es: 'AUC' } },
        { value: 0.786, decimals: 3, of: 1, label: { en: 'recall', es: 'recall' } },
        { value: 3, label: { en: 'models compared by bias and cost', es: 'modelos comparados por sesgo y costo' } },
        { value: 10, label: { en: 'batches monitored', es: 'lotes monitoreados' } },
      ],
      notes: [
        { en: 'The calibrated alert caught a quality drop the fixed threshold missed (703 synthetic records).', es: 'La alerta calibrada detectó una caída de calidad que el umbral fijo no vio (703 registros sintéticos).' },
      ],
      stack: ['Python', 'XGBoost', 'Optuna', 'SHAP', 'FastAPI', 'Cloud Run', 'Airflow', 'BigQuery', 'Streamlit'],
      next: [{ en: 'Retrain automatically when the alert fires, with the bias audit as a release gate.', es: 'Reentrenar automáticamente cuando se dispare la alerta, con la auditoría de sesgo como puerta de publicación.' }],
    },
  },
  {
    slug: 'ciencia-a-tu-tesis', title: same('Ciencia a tu tesis'),
    caption: { en: 'Paper search for theses, measured before tuned.', es: 'Búsqueda de artículos para tesis, medida antes de ajustarla.' },
    period: { en: 'Oct 2026', es: 'Oct. 2026' }, year: 2026, tier: 'more', scene: 'ciencia',
    sceneLabel: { en: 'A query searches 108k papers, then a reranker moves the most relevant result to first place.', es: 'Una consulta busca en 108k artículos y luego un reranker sube el resultado más relevante al primer lugar.' },
    metric: { value: 0.9, decimals: 2, label: { en: 'MRR@10, baseline 0.64', es: 'MRR@10, base 0,64' } },
    tags: ['Python', 'OpenAlex', 'SciELO'], repo: 'https://github.com/Sebas41/SistemaRecomendador',
  },
  {
    slug: 'activity-recognition', title: { en: 'Activity recognition from video', es: 'Reconocimiento de actividades en video' },
    caption: { en: 'Video turned into motion features.', es: 'Video convertido en rasgos de movimiento.' },
    period: { en: 'Oct to Nov 2025', es: 'Oct. a nov. 2025' }, year: 2025, tier: 'more', scene: 'har',
    sceneLabel: { en: 'A stick figure moves while its joints are tracked.', es: 'Una figura se mueve mientras se siguen sus articulaciones.' },
    metric: { value: 0.935, decimals: 3, label: { en: 'macro F1, target 0.85', es: 'F1 macro, meta 0,85' } },
    tags: ['Python', 'MediaPipe', 'OpenCV', 'scikit-learn'], repo: 'https://github.com/JuanCamiloMunozB/IA1_VideoActivityRecognition_ICESI_2025_2',
  },
  {
    slug: 'bakery', title: { en: 'Bakery accounting system', es: 'Sistema contable para panadería' },
    caption: { en: 'Accounting and reports, built for a bakery client.', es: 'Contabilidad y reportes, construido para una panadería cliente.' },
    period: { en: 'Sep to Nov 2025', es: 'Sep. a nov. 2025' }, year: 2025, tier: 'more', scene: 'bakery',
    sceneLabel: { en: 'Daily sales stack up into a monthly report.', es: 'Las ventas diarias se acumulan en un reporte mensual.' },
    metric: { value: 48, label: { en: 'endpoints, 17 test files', es: 'endpoints, 17 archivos de prueba' } },
    tags: ['NestJS', 'Next.js', 'PostgreSQL', 'Supabase'], repo: 'https://github.com/JuanCamiloMunozB/Sistema-Contable-Panaderia-Backend',
  },
  {
    slug: 'cloud-patterns', title: { en: 'Cloud patterns and CI/CD', es: 'Patrones de nube y CI/CD' },
    caption: { en: 'Kafka, a circuit breaker and a release pipeline.', es: 'Kafka, un circuit breaker y un pipeline de entrega.' },
    period: { en: 'Mar to Apr 2026', es: 'Mar. a abr. 2026' }, year: 2026, tier: 'more', scene: 'pipeline',
    sceneLabel: { en: 'Go, Node.js and Java services pass build, test and push stages and land as container images.', es: 'Servicios en Go, Node.js y Java pasan las etapas de compilación, prueba y publicación y quedan como imágenes de contenedor.' },
    metric: { value: 3, label: { en: 'services in my pipeline (Go, Node.js, Java)', es: 'servicios en mi pipeline (Go, Node.js, Java)' } },
    tags: ['Kafka', 'GitHub Actions', 'GHCR', 'Go'], repo: 'https://github.com/JuanCamiloMunozB/microservices-demo-pipeline',
  },

  // ---------- Smaller builds ----------
  { slug: 'library', title: { en: 'Microservices library', es: 'Biblioteca en microservicios' }, caption: { en: '4 services talking over RabbitMQ.', es: '4 servicios conectados por RabbitMQ.' }, period: same(''), year: 2026, tier: 'bonus', scene: 'b-library', sceneLabel: same(''), tags: ['Spring Boot', 'OpenFeign', 'RabbitMQ', 'Keycloak'], repo: 'https://github.com/JuanCamiloMunozB/biblioteca-microservicios' },
  { slug: 'sportexpert', title: same('SportExpert'), caption: { en: 'An expert system with layered Bayesian inference.', es: 'Un sistema experto con inferencia bayesiana por capas.' }, period: same(''), year: 2025, tier: 'bonus', scene: 'b-bayes', sceneLabel: same(''), tags: ['Flask', 'Python'], repo: 'https://github.com/JuanCamiloMunozB/SportExpert-Flask' },
  { slug: 'task-manager', title: { en: 'Task manager', es: 'Gestor de tareas' }, caption: { en: 'A tested, containerized API.', es: 'Una API probada y en contenedores.' }, period: same(''), year: 2026, tier: 'bonus', scene: 'b-tasks', sceneLabel: same(''), tags: ['Node.js', 'Express', 'MongoDB', 'Jest', 'Docker'], repo: 'https://github.com/JuanCamiloMunozB/gestion-tareas-node-' },
  { slug: 'trackademic', title: same('Trackademic'), caption: { en: 'Polyglot persistence: one app, several databases.', es: 'Persistencia políglota: una app, varias bases de datos.' }, period: same(''), year: 2025, tier: 'bonus', scene: 'b-poly', sceneLabel: same(''), tags: ['Spring Boot', 'PostgreSQL', 'MongoDB'], repo: 'https://github.com/JuanCamiloMunozB/Trackademic' },
  { slug: 'secure-login', title: { en: 'Secure login', es: 'Login seguro' }, caption: { en: 'Hashed passwords and signed tokens.', es: 'Contraseñas con hash y tokens firmados.' }, period: same(''), year: 2026, tier: 'bonus', scene: 'b-lock', sceneLabel: same(''), tags: ['PBKDF2', 'JWT'], repo: 'https://github.com/JuanCamiloMunozB/login-crypto' },
];

export const featured = projects.filter((p) => p.tier === 'featured');
export const withCase = projects.filter((p) => p.case);
export const more = projects.filter((p) => p.tier === 'more');
export const bonus = projects.filter((p) => p.tier === 'bonus');
