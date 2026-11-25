import type { T } from '../i18n/ui';

export type Layer = 'ui' | 'api' | 'events' | 'data' | 'insights' | 'cloud';

export interface Metric { value: number; decimals?: number; suffix?: string; label: T }
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
export interface Stat { value: number; decimals?: number; suffix?: string; prefix?: string; of?: number; label: T }
export interface Decision { title: T; chose: T; why: T; cost: T }

export interface CaseStudy {
  role: T;
  goal: T;
  diagram: { w?: number; h: number; nodes: DNode[]; edges: DEdge[]; caption: T; desc: T };
  decisions: Decision[];
  stats?: Stat[];
  notes?: T[];
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
  inProgress?: boolean;
  case?: CaseStudy;
}

const same = (s: string): T => ({ en: s, es: s });

export const projects: Project[] = [
  // ---------- Featured: full case studies ----------
  {
    slug: 'circleguard',
    title: same('CircleGuard'),
    caption: { en: 'Contact tracing that keeps names private.', es: 'Rastreo de contactos que protege los nombres.' },
    period: { en: 'May to Jun 2026', es: 'May. a jun. 2026' },
    year: 2026,
    tier: 'featured',
    scene: 'circleguard',
    sceneLabel: { en: 'A case spreads through a contact graph while a lock keeps names private.', es: 'Un caso se propaga por un grafo de contactos mientras un candado protege los nombres.' },
    metric: { value: 2588, label: { en: 'load-test requests, 0 failures', es: 'peticiones de carga, 0 fallos' } },
    tags: ['Java', 'Spring Boot', 'Kafka', 'Neo4j', 'Kubernetes', 'Terraform'],
    repo: 'https://github.com/JuanCamiloMunozB/circle-guard-public',
    case: {
      role: { en: 'Site Reliability Engineer: built and changed microservices and patterns, the CI/CD pipeline, Kubernetes and the first Terraform infrastructure', es: 'Site Reliability Engineer: desarrollo de microservicios y patrones, pipeline de CI/CD, Kubernetes y la primera infraestructura con Terraform' },
      goal: {
        en: 'A university needs to trace contacts on campus and control entry with QR codes, without exposing who is sick. Course project for Software Engineering V.',
        es: 'Una universidad necesita rastrear contactos en el campus y controlar el acceso con códigos QR, sin exponer quién está enfermo. Proyecto del curso Ingeniería de Software V.',
      },
      diagram: {
        w: 880,
        h: 420,
        nodes: [
          { id: 'device', kind: 'node', stereo: 'device', name: { en: 'client device', es: 'dispositivo' }, x: 10, y: 130, w: 150, h: 150 },
          { id: 'ldap', kind: 'node', stereo: 'server', name: 'LDAP', x: 10, y: 320, w: 150, h: 70 },
          { id: 'azure', kind: 'node', stereo: 'cloud', name: 'Azure', x: 200, y: 10, w: 670, h: 400 },
          { id: 'aks', kind: 'node', stereo: 'executionEnvironment', name: 'Kubernetes (AKS)', x: 215, y: 70, w: 640, h: 325 },
          { id: 'client', stereo: 'client', name: { en: 'client app', es: 'app cliente' }, x: 16, y: 200, w: 132 },
          { id: 'gateway', stereo: 'service', name: 'gateway', x: 230, y: 135, w: 145 },
          { id: 'form', stereo: 'service', name: 'form', x: 385, y: 135, w: 145 },
          { id: 'auth', stereo: 'service', name: 'auth', x: 540, y: 135, w: 145 },
          { id: 'identity', stereo: 'service', name: 'identity', x: 695, y: 135, w: 145 },
          { id: 'redis', stereo: 'cache', name: 'Redis', x: 230, y: 225, w: 145 },
          { id: 'promotion', stereo: 'service', name: 'promotion', x: 385, y: 225, w: 145 },
          { id: 'kafka', stereo: 'broker', name: 'Kafka', x: 540, y: 225, w: 145, hot: true },
          { id: 'vault', stereo: 'vault', name: 'PostgreSQL', x: 695, y: 225, w: 145 },
          { id: 'neo4j', stereo: 'graph db', name: 'Neo4j', x: 385, y: 315, w: 145 },
          { id: 'notification', stereo: 'service', name: 'notification', x: 540, y: 315, w: 145 },
        ],
        edges: [
          { kind: 'path', d: 'M150 265 H200', label: 'HTTPS', lx: 152, ly: 258 },
          { kind: 'path', d: 'M150 355 H200', label: 'LDAP', lx: 156, ly: 348 },
          { kind: 'dep', arrow: false, d: 'M148 226 H178 V122 H767', label: 'REST', lx: 640, ly: 117 },
          { d: 'M302 122 V133' }, { d: 'M457 122 V133' }, { d: 'M612 122 V133' }, { d: 'M767 122 V133' },
          { d: 'M302 187 V223' }, { d: 'M767 187 V223' }, { d: 'M457 277 V313' },
          { kind: 'event', d: 'M457 187 V223', label: 'event', lx: 463, ly: 210 },
          { kind: 'event', d: 'M530 251 H538' },
          { kind: 'event', d: 'M612 277 V313', label: 'consume', lx: 618, ly: 300 },
        ],
        caption: { en: 'Deployment view: the client device talks to the services running in Kubernetes on Azure. Amber dashed lines are events.', es: 'Vista de despliegue: el dispositivo cliente habla con los servicios que corren en Kubernetes sobre Azure. Las líneas ámbar punteadas son eventos.' },
        desc: {
          en: 'A client device runs the client app, which calls the gateway, form, auth and identity services over REST. All services run in a Kubernetes cluster (AKS) on Azure. Identity keeps real names in a PostgreSQL vault, gateway reads entry status from Redis, form answers reach the promotion service, which walks the contact graph in Neo4j and publishes status changes to Kafka for the notification service. The cluster reaches the university LDAP server for sign-in.',
          es: 'Un dispositivo cliente ejecuta la app, que llama por REST a los servicios gateway, form, auth e identity. Todos corren en un clúster Kubernetes (AKS) en Azure. Identity guarda los nombres reales en una bóveda PostgreSQL, gateway lee el estado de acceso desde Redis, las respuestas de form llegan a promotion, que recorre el grafo de contactos en Neo4j y publica cambios de estado en Kafka para el servicio de notificaciones. El clúster consulta el servidor LDAP de la universidad para iniciar sesión.',
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
          title: { en: 'Build on my machine, deploy to the cloud only when it counts', es: 'Compilar en local, desplegar en la nube solo cuando importa' },
          chose: { en: 'Jenkins builds locally with Kaniko; only stage and master deploy to Azure Kubernetes (AKS), provisioned with Terraform.', es: 'Jenkins compila en local con Kaniko; solo stage y master despliegan a Azure Kubernetes (AKS), aprovisionado con Terraform.' },
          why: { en: 'The student cloud budget and VM quota could not hold the services and the build agents at the same time.', es: 'El presupuesto estudiantil de nube y la cuota de máquinas no alcanzaban para los servicios y los agentes de compilación a la vez.' },
          cost: { en: 'Someone switches the cluster on before a stage or master build and off after it, and every build depends on one workstation.', es: 'Alguien enciende el clúster antes de un build de stage o master y lo apaga después, y cada build depende de un solo equipo.' },
        },
      ],
      stats: [
        { value: 2588, label: { en: 'load-test requests (Locust)', es: 'peticiones de carga (Locust)' } },
        { value: 0, label: { en: 'failed requests', es: 'peticiones fallidas' } },
        { value: 80, suffix: '%', of: 100, label: { en: 'JaCoCo coverage gate', es: 'umbral de cobertura JaCoCo' } },
        { value: 8, label: { en: 'Java services', es: 'servicios en Java' } },
      ],
      notes: [
        { en: 'Quality gates in the pipeline: SonarQube and Trivy.', es: 'Puertas de calidad en el pipeline: SonarQube y Trivy.' },
        { en: 'Circuit breaker (Resilience4j) on calls between services.', es: 'Circuit breaker (Resilience4j) en las llamadas entre servicios.' },
      ],
      stack: ['Java', 'Spring Boot', 'Kafka', 'Neo4j', 'PostgreSQL', 'Redis', 'LDAP', 'Kubernetes', 'Jenkins', 'Terraform', 'Azure', 'SonarQube', 'Trivy', 'Locust'],
      next: [
        { en: 'Move the cluster start and stop into the pipeline, so a build never waits on a person.', es: 'Llevar el encendido y apagado del clúster al pipeline, para que ningún build espere a una persona.' },
      ],
    },
  },
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
    slug: 'irl-diagnostic',
    title: { en: 'IRL Diagnostic System', es: 'Sistema de Diagnóstico IRL' },
    caption: { en: 'Innovation readiness, scored in 6 dimensions.', es: 'Madurez de la innovación, medida en 6 dimensiones.' },
    period: { en: 'Feb to Nov 2026', es: 'Feb. a nov. 2026' },
    year: 2026,
    tier: 'featured',
    scene: 'irl',
    sceneLabel: { en: 'A six-axis readiness radar grows and its weakest axis links to a service.', es: 'Un radar de seis ejes crece y su eje más débil se conecta con un servicio.' },
    metric: { value: 23, label: { en: 'user stories in the backlog', es: 'historias de usuario en el backlog' } },
    tags: ['NestJS', 'React', 'TypeScript', 'AWS Cognito'],
    live: 'https://sistema-diagnostico-irl-api.vercel.app',
    case: {
      role: { en: 'Lead Developer and main contact with the client and advisor', es: 'Desarrollador líder y contacto principal con el cliente y el asesor' },
      goal: {
        en: "Help the INNLAB innovation center measure how ready a team's innovation is, across the six dimensions of the KTH Innovation Readiness Level, and point each gap to a service INNLAB offers.",
        es: 'Ayudar al centro de innovación INNLAB a medir qué tan madura está la innovación de un equipo, en las seis dimensiones del KTH Innovation Readiness Level, y conectar cada brecha con un servicio de INNLAB.',
      },
      diagram: {
        w: 780,
        h: 330,
        nodes: [
          { id: 'browser', kind: 'node', stereo: 'device', name: { en: 'browser', es: 'navegador' }, x: 10, y: 100, w: 160, h: 140 },
          { id: 'vercel', kind: 'node', stereo: 'cloud', name: 'Vercel', x: 220, y: 10, w: 370, h: 310 },
          { id: 'aws', kind: 'node', stereo: 'cloud', name: 'AWS', x: 600, y: 10, w: 150, h: 120 },
          { id: 'web', stereo: 'client', name: 'React', x: 18, y: 170, w: 140 },
          { id: 'rest', stereo: 'adapter', name: 'REST', x: 235, y: 170, w: 120 },
          { id: 'scoring', stereo: 'domain', name: { en: 'scoring model', es: 'modelo de puntaje' }, x: 380, y: 80, w: 195 },
          { id: 'gap', stereo: 'domain', name: { en: 'gap analysis', es: 'análisis de brechas' }, x: 380, y: 200, w: 200 },
          { id: 'cognito', stereo: 'service', name: 'Cognito', x: 608, y: 68, w: 130 },
          { id: 'catalog', stereo: 'catalog', name: { en: 'INNLAB services', es: 'servicios INNLAB' }, x: 600, y: 210, w: 175 },
        ],
        edges: [
          { kind: 'path', d: 'M170 130 H220', label: 'HTTPS', lx: 173, ly: 123 },
          { kind: 'assembly', req: [158, 196], prov: [235, 196], at: [205, 196], label: 'REST API', lx: 168, ly: 222 },
          { d: 'M355 186 H367 V106 H378' }, { d: 'M355 206 H367 V226 H378' },
          { d: 'M295 222 V305 H594 V94 H606', label: 'auth', lx: 400, ly: 301 },
          { d: 'M580 236 H598' },
        ],
        caption: { en: 'Hexagonal core on Vercel: the scoring model and gap analysis depend on nothing; the REST adapter and AWS Cognito plug in from outside.', es: 'Núcleo hexagonal en Vercel: el modelo de puntaje y el análisis de brechas no dependen de nada; el adaptador REST y AWS Cognito se conectan desde afuera.' },
        desc: {
          en: 'A browser runs the React client, which uses the REST API provided by the adapter on Vercel. The adapter calls the domain components, the scoring model and the gap analysis, and asks AWS Cognito to authenticate users. The gap analysis uses the INNLAB services catalog.',
          es: 'Un navegador ejecuta el cliente React, que usa la API REST provista por el adaptador en Vercel. El adaptador llama a los componentes de dominio, el modelo de puntaje y el análisis de brechas, y pide a AWS Cognito autenticar a los usuarios. El análisis de brechas usa el catálogo de servicios de INNLAB.',
        },
      },
      decisions: [
        {
          title: { en: 'Hexagonal architecture', es: 'Arquitectura hexagonal' },
          chose: { en: 'The scoring model and gap analysis live in a core that depends on nothing; frameworks plug in through ports.', es: 'El modelo de puntaje y el análisis de brechas viven en un núcleo que no depende de nada; los frameworks se conectan por puertos.' },
          why: { en: 'The scoring rules will change with INNLAB, and they should be testable without a database or a web server.', es: 'Las reglas de puntaje cambiarán con INNLAB, y deben poder probarse sin base de datos ni servidor web.' },
          cost: { en: 'More files and indirection before the first feature works.', es: 'Más archivos e indirección antes de que funcione la primera funcionalidad.' },
        },
        {
          title: { en: 'Requirements before code', es: 'Requisitos antes del código' },
          chose: { en: 'An IEEE 830 SRS and Gherkin user stories, agreed with the client and the advisor.', es: 'Un SRS IEEE 830 e historias de usuario en Gherkin, acordadas con el cliente y el asesor.' },
          why: { en: 'Everyone signs off on the same behavior, and each story becomes a test.', es: 'Todos aprueban el mismo comportamiento, y cada historia se convierte en una prueba.' },
          cost: { en: 'Weeks of writing before the first line of code.', es: 'Semanas de escritura antes de la primera línea de código.' },
        },
        {
          title: { en: 'Managed sign-in', es: 'Inicio de sesión gestionado' },
          chose: { en: 'AWS Cognito instead of building authentication.', es: 'AWS Cognito en lugar de construir la autenticación.' },
          why: { en: 'Security-critical code we do not have to write or maintain.', es: 'Código crítico de seguridad que no tenemos que escribir ni mantener.' },
          cost: { en: 'Tied to AWS for user accounts.', es: 'Dependencia de AWS para las cuentas de usuario.' },
        },
      ],
      stats: [
        { value: 6, label: { en: 'readiness dimensions scored', es: 'dimensiones de madurez evaluadas' } },
        { value: 23, label: { en: 'user stories in the backlog', es: 'historias de usuario en el backlog' } },
      ],
      notes: [
        { en: 'IEEE 830 SRS and Gherkin user stories agreed with the client.', es: 'SRS IEEE 830 e historias en Gherkin acordadas con el cliente.' },
      ],
      stack: ['NestJS', 'React', 'TypeScript', 'AWS Cognito', 'Vercel'],
      next: [{ en: 'Add a view where INNLAB compares the readiness of many teams over time.', es: 'Agregar una vista donde INNLAB compare la madurez de muchos equipos en el tiempo.' }],
    },
  },
  {
    slug: 'postgrados',
    title: same('Postgrados'),
    caption: { en: 'A planning lifecycle that replaces spreadsheets.', es: 'Un ciclo de planeación que reemplaza hojas de cálculo.' },
    period: { en: 'Feb to Jun 2026', es: 'Feb. a jun. 2026' },
    year: 2026,
    tier: 'featured',
    scene: 'postgrados',
    sceneLabel: { en: "A task leaves a spreadsheet and moves through a state machine to a finished state.", es: 'Una tarea sale de una hoja de cálculo y avanza por una máquina de estados hasta terminar.' },
    metric: { value: 80.88, decimals: 2, suffix: '%', label: { en: 'test coverage on my components', es: 'cobertura de pruebas en mis componentes' } },
    tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
    privateRepo: true,
    case: {
      role: { en: 'Full-stack developer; Scrum Master for one sprint', es: 'Desarrollador full stack; Scrum Master durante un sprint' },
      goal: {
        en: "Replace spreadsheet coordination at the university's graduate office with one system for academic planning.",
        es: 'Reemplazar la coordinación por hojas de cálculo en la oficina de posgrados de la universidad con un solo sistema de planeación académica.',
      },
      diagram: {
        w: 810,
        h: 260,
        nodes: [
          { id: 'browser', kind: 'node', stereo: 'device', name: { en: 'browser', es: 'navegador' }, x: 10, y: 50, w: 150, h: 140 },
          { id: 'jvm', kind: 'node', stereo: 'executionEnvironment', name: 'JVM (Spring Boot)', x: 210, y: 10, w: 400, h: 240 },
          { id: 'db', kind: 'node', stereo: 'database server', name: 'PostgreSQL', x: 650, y: 50, w: 150, h: 120 },
          { id: 'web', stereo: 'client', name: 'React', x: 18, y: 120, w: 132 },
          { id: 'api', stereo: 'service', name: { en: 'planning API', es: 'API de planeación' }, x: 225, y: 80, w: 185 },
          { id: 'sm', stereo: 'state machine', name: { en: 'plan lifecycle', es: 'ciclo del plan' }, x: 425, y: 80, w: 165 },
          { id: 'ev', stereo: 'event', name: { en: 'transition events', es: 'eventos de transición' }, x: 225, y: 170, w: 215, hot: true },
        ],
        edges: [
          { kind: 'path', d: 'M160 90 H210', label: 'HTTPS', lx: 163, ly: 83 },
          { kind: 'path', d: 'M610 100 H650', label: 'JDBC', lx: 613, ly: 93 },
          { d: 'M150 146 H190 V106 H223', label: 'REST', lx: 172, ly: 163 },
          { d: 'M410 106 H423' },
          { kind: 'event', d: 'M507 132 V196 H442', label: 'publish', lx: 513, ly: 168 },
        ],
        caption: { en: 'Deployment view: the planning API and its state machine run on the JVM; plans persist in PostgreSQL.', es: 'Vista de despliegue: la API de planeación y su máquina de estados corren en la JVM; los planes se guardan en PostgreSQL.' },
        desc: {
          en: 'A browser runs the React client, which calls the planning API over REST. The API and the plan lifecycle state machine run on the JVM with Spring Boot; every transition publishes an event. Plans are stored on a PostgreSQL database server.',
          es: 'Un navegador ejecuta el cliente React, que llama a la API de planeación por REST. La API y la máquina de estados del ciclo del plan corren en la JVM con Spring Boot; cada transición publica un evento. Los planes se guardan en un servidor de base de datos PostgreSQL.',
        },
      },
      decisions: [
        {
          title: { en: 'The lifecycle is a state machine', es: 'El ciclo de vida es una máquina de estados' },
          chose: { en: 'Each plan has one explicit state, and only allowed transitions can change it.', es: 'Cada plan tiene un estado explícito, y solo las transiciones permitidas pueden cambiarlo.' },
          why: { en: 'With spreadsheets nobody knew where a plan stood; now the system cannot reach an invalid state.', es: 'Con hojas de cálculo nadie sabía en qué punto estaba un plan; ahora el sistema no puede llegar a un estado inválido.' },
          cost: { en: 'A new step in the process means changing the model, not just a cell.', es: 'Un paso nuevo en el proceso implica cambiar el modelo, no solo una celda.' },
        },
        {
          title: { en: 'Transitions are idempotent', es: 'Las transiciones son idempotentes' },
          chose: { en: 'Repeating the same transition request leaves the plan exactly as the first one did.', es: 'Repetir la misma solicitud de transición deja el plan exactamente como la primera.' },
          why: { en: 'Double clicks and retries cannot duplicate effects.', es: 'Los dobles clics y los reintentos no duplican efectos.' },
          cost: { en: 'Each transition has to check what was already applied.', es: 'Cada transición debe verificar qué se aplicó antes.' },
        },
        {
          title: { en: 'Transitions publish events', es: 'Las transiciones publican eventos' },
          chose: { en: 'Event-driven transitions; other parts of the system react without being called directly.', es: 'Transiciones orientadas a eventos; otras partes del sistema reaccionan sin ser llamadas directamente.' },
          why: { en: 'New reactions can be added without touching the state machine.', es: 'Se pueden agregar reacciones nuevas sin tocar la máquina de estados.' },
          cost: { en: 'A flow is harder to trace than a direct call.', es: 'Un flujo es más difícil de rastrear que una llamada directa.' },
        },
      ],
      stats: [
        { value: 80.88, decimals: 2, suffix: '%', of: 100, label: { en: 'test coverage on my components (JUnit)', es: 'cobertura de pruebas en mis componentes (JUnit)' } },
        { value: 3, label: { en: 'sprints delivered', es: 'sprints entregados' } },
        { value: 1, label: { en: 'sprint as Scrum Master', es: 'sprint como Scrum Master' } },
      ],
      stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'JUnit'],
      next: [{ en: 'Add an audit view of every transition, so the office can see who changed what.', es: 'Agregar una vista de auditoría de cada transición, para que la oficina vea quién cambió qué.' }],
    },
  },
  {
    slug: 'jugandoando',
    title: same('JugandoAndo'),
    caption: { en: 'E-commerce with live notifications.', es: 'Comercio electrónico con notificaciones en vivo.' },
    period: { en: 'Feb to Jun 2025', es: 'Feb. a jun. 2025' },
    year: 2025,
    tier: 'featured',
    scene: 'jugandoando',
    sceneLabel: { en: 'Products drop into a cart and a live notification pops up.', es: 'Los productos caen en un carrito y aparece una notificación en vivo.' },
    metric: { value: 80, label: { en: 'REST endpoints, approximately', es: 'endpoints REST, aproximadamente' } },
    tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'WebSockets'],
    repo: 'https://github.com/JuanCamiloMunozB/Ecommerce-backend',
    repo2: 'https://github.com/JuanCamiloMunozB/Ecommerce-frontend',
    case: {
      role: { en: 'Full stack, backend focus', es: 'Full stack, con foco en backend' },
      goal: {
        en: 'An online store with catalog, cart, orders and promotions, where admins and customers sign in differently.',
        es: 'Una tienda en línea con catálogo, carrito, pedidos y promociones, donde administradores y clientes inician sesión de forma distinta.',
      },
      diagram: {
        w: 800,
        h: 345,
        nodes: [
          { id: 'browser', kind: 'node', stereo: 'device', name: { en: 'browser', es: 'navegador' }, x: 10, y: 90, w: 150, h: 150 },
          { id: 'jvm', kind: 'node', stereo: 'executionEnvironment', name: 'JVM (Spring Boot)', x: 210, y: 10, w: 330, h: 320 },
          { id: 'files', kind: 'node', stereo: 'storage', name: { en: 'file storage', es: 'archivos' }, x: 580, y: 10, w: 200, h: 100 },
          { id: 'db', kind: 'node', stereo: 'database server', name: 'PostgreSQL', x: 580, y: 170, w: 200, h: 150 },
          { id: 'web', stereo: 'client', name: 'React', x: 18, y: 160, w: 132 },
          { id: 'api', stereo: 'service', name: { en: 'store API', es: 'API de la tienda' }, x: 225, y: 90, w: 190 },
          { id: 'ws', stereo: 'pub/sub', name: { en: 'notifications', es: 'notificaciones' }, x: 225, y: 240, w: 190, hot: true },
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
        caption: { en: 'Deployment view: one JVM serves the store API and pushes notifications; files and data live on their own nodes.', es: 'Vista de despliegue: una JVM sirve la API de la tienda y envía notificaciones; archivos y datos viven en sus propios nodos.' },
        desc: {
          en: 'A browser runs the React client, which signs in with JWT for customers or a session for admins and calls the store API. The API runs on the JVM with Spring Boot, stores uploads on separate file storage, keeps 17 tables on a PostgreSQL server and publishes notifications that are pushed back to the browser over WebSockets.',
          es: 'Un navegador ejecuta el cliente React, que inicia sesión con JWT para clientes o con sesión para administradores y llama a la API de la tienda. La API corre en la JVM con Spring Boot, guarda los archivos en un almacenamiento aparte, mantiene 17 tablas en un servidor PostgreSQL y publica notificaciones que vuelven al navegador por WebSockets.',
        },
      },
      decisions: [
        {
          title: { en: 'Two sign-in chains', es: 'Dos cadenas de autenticación' },
          chose: { en: 'Stateless JWT for customers, a server session for admins.', es: 'JWT sin estado para clientes, sesión de servidor para administradores.' },
          why: { en: 'Customer traffic scales without shared state, and admin access can be revoked at once.', es: 'El tráfico de clientes escala sin estado compartido, y el acceso de administradores se puede revocar de inmediato.' },
          cost: { en: 'Two security configurations to maintain and test.', es: 'Dos configuraciones de seguridad que mantener y probar.' },
        },
        {
          title: { en: 'Uploads apart from transactions', es: 'Archivos aparte de las transacciones' },
          chose: { en: 'File uploads are stored outside the database write of an order or product.', es: 'Los archivos se guardan fuera de la escritura en base de datos de un pedido o producto.' },
          why: { en: 'A slow or failed upload never holds a database transaction open.', es: 'Una carga lenta o fallida nunca deja una transacción abierta.' },
          cost: { en: 'Orphan files can appear and need cleaning.', es: 'Pueden quedar archivos huérfanos que hay que limpiar.' },
        },
        {
          title: { en: 'Notifications by publish and subscribe', es: 'Notificaciones por publicación y suscripción' },
          chose: { en: 'Events published once and pushed to subscribed clients over WebSockets.', es: 'Eventos publicados una vez y enviados a los clientes suscritos por WebSockets.' },
          why: { en: 'Users see order and promotion changes without refreshing.', es: 'Los usuarios ven cambios de pedidos y promociones sin recargar.' },
          cost: { en: 'Long-lived connections to manage on the server.', es: 'Conexiones de larga duración que gestionar en el servidor.' },
        },
      ],
      stats: [
        { value: 80, prefix: '~', label: { en: 'REST endpoints', es: 'endpoints REST' } },
        { value: 17, label: { en: 'PostgreSQL tables', es: 'tablas en PostgreSQL' } },
        { value: 2, label: { en: 'authentication chains', es: 'cadenas de autenticación' } },
      ],
      stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'WebSockets', 'JWT'],
      next: [{ en: 'Move notifications to a message broker so the API can run as several instances.', es: 'Llevar las notificaciones a un broker de mensajes para que la API pueda correr en varias instancias.' }],
    },
  },

  // ---------- More projects ----------
  {
    slug: 'ciencia-a-tu-tesis', title: same('Ciencia a tu tesis'),
    caption: { en: 'Paper search for theses, measured before tuned.', es: 'Búsqueda de artículos para tesis, medida antes de ajustarla.' },
    period: { en: 'Oct 2026', es: 'Oct. 2026' }, year: 2026, tier: 'more', scene: 'ciencia',
    sceneLabel: { en: 'Search results get reranked and the best one rises to the top.', es: 'Los resultados se reordenan y el mejor sube al primer lugar.' },
    metric: { value: 0.9, decimals: 3, label: { en: 'MRR@10, baseline 0.640', es: 'MRR@10, base 0,640' } },
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
    caption: { en: 'Accounting and reports for a real bakery.', es: 'Contabilidad y reportes para una panadería real.' },
    period: { en: 'Sep to Nov 2025', es: 'Sep. a nov. 2025' }, year: 2025, tier: 'more', scene: 'bakery',
    sceneLabel: { en: 'Daily sales stack up into a monthly report.', es: 'Las ventas diarias se acumulan en un reporte mensual.' },
    metric: { value: 48, label: { en: 'endpoints, 17 test files', es: 'endpoints, 17 archivos de prueba' } },
    tags: ['NestJS', 'Next.js', 'PostgreSQL', 'Supabase'], repo: 'https://github.com/JuanCamiloMunozB/Sistema-Contable-Panaderia-Backend',
  },
  {
    slug: 'cloud-patterns', title: { en: 'Cloud patterns and CI/CD', es: 'Patrones de nube y CI/CD' },
    caption: { en: 'Kafka, a circuit breaker and a release pipeline.', es: 'Kafka, un circuit breaker y un pipeline de entrega.' },
    period: { en: 'Mar to Apr 2026', es: 'Mar. a abr. 2026' }, year: 2026, tier: 'more', scene: 'pipeline',
    sceneLabel: { en: 'Three services pass build and test stages and ship as versioned images.', es: 'Tres servicios pasan etapas de compilación y prueba y se publican como imágenes versionadas.' },
    metric: { value: 3, label: { en: 'services in my pipeline (Go, Node.js, Java)', es: 'servicios en mi pipeline (Go, Node.js, Java)' } },
    tags: ['Kafka', 'GitHub Actions', 'GHCR', 'Go'], repo: 'https://github.com/JuanCamiloMunozB/microservices-demo-pipeline',
  },

  // ---------- Smaller builds ----------
  { slug: 'library', title: { en: 'Microservices library', es: 'Biblioteca en microservicios' }, caption: { en: '4 services talking over RabbitMQ.', es: '4 servicios conectados por RabbitMQ.' }, period: same(''), year: 2026, tier: 'bonus', scene: 'b-library', sceneLabel: same(''), tags: ['Spring Boot', 'OpenFeign', 'RabbitMQ', 'Keycloak'], repo: 'https://github.com/JuanCamiloMunozB/biblioteca-microservicios' },
  { slug: 'sportexpert', title: same('SportExpert'), caption: { en: 'Bayesian inference in layers.', es: 'Inferencia bayesiana por capas.' }, period: same(''), year: 2025, tier: 'bonus', scene: 'b-bayes', sceneLabel: same(''), tags: ['Flask', 'Python'], repo: 'https://github.com/JuanCamiloMunozB/SportExpert-Flask' },
  { slug: 'task-manager', title: { en: 'Task manager', es: 'Gestor de tareas' }, caption: { en: 'A tested, containerized API.', es: 'Una API probada y en contenedores.' }, period: same(''), year: 2026, tier: 'bonus', scene: 'b-tasks', sceneLabel: same(''), tags: ['Node.js', 'Express', 'MongoDB', 'Jest', 'Docker'], repo: 'https://github.com/JuanCamiloMunozB/gestion-tareas-node-' },
  { slug: 'trackademic', title: same('Trackademic'), caption: { en: 'Polyglot persistence: one app, several databases.', es: 'Persistencia políglota: una app, varias bases de datos.' }, period: same(''), year: 2025, tier: 'bonus', scene: 'b-poly', sceneLabel: same(''), tags: ['Spring Boot', 'PostgreSQL', 'MongoDB'], repo: 'https://github.com/JuanCamiloMunozB/Trackademic' },
  { slug: 'secure-login', title: { en: 'Secure login', es: 'Login seguro' }, caption: { en: 'Hashed passwords and signed tokens.', es: 'Contraseñas con hash y tokens firmados.' }, period: same(''), year: 2026, tier: 'bonus', scene: 'b-lock', sceneLabel: same(''), tags: ['PBKDF2', 'JWT'], repo: 'https://github.com/JuanCamiloMunozB/login-crypto' },
];

export const featured = projects.filter((p) => p.tier === 'featured');
export const more = projects.filter((p) => p.tier === 'more');
export const bonus = projects.filter((p) => p.tier === 'bonus');
