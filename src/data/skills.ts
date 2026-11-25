import type { T } from '../i18n/ui';

/** Each area links to the projects that prove it (slugs from projects.ts). */
export interface SkillArea { id: string; icon: string; title: T; tools: string[]; evidence: string[] }

export const skills: SkillArea[] = [
  {
    id: 'backend', icon: 'i-backend', title: { en: 'Backend and APIs', es: 'Backend y APIs' },
    tools: ['Java', 'Spring Boot', 'TypeScript', 'NestJS', 'Node.js', 'Express', 'Python', 'Flask', 'FastAPI', 'Django', 'REST', 'GraphQL', 'WebSockets', 'JWT'],
    evidence: ['jugandoando', 'postgrados', 'irl-diagnostic', 'bakery'],
  },
  {
    id: 'data', icon: 'i-data', title: { en: 'Data', es: 'Datos' },
    tools: ['PostgreSQL', 'MongoDB', 'Supabase', 'BigQuery', 'Airflow', 'Dataflow', 'pandas', 'Redis', 'Neo4j', 'data-quality checks', 'drift monitoring'],
    evidence: ['churn', 'ciencia-a-tu-tesis', 'circleguard', 'activity-recognition'],
  },
  {
    id: 'ai', icon: 'i-ai', title: { en: 'AI and machine learning', es: 'IA y machine learning' },
    tools: ['scikit-learn', 'XGBoost', 'Optuna', 'SHAP', 'pandas', 'NumPy', 'OpenCV', 'MediaPipe', 'Streamlit', 'model serving', 'bias audits', 'explainability', 'drift monitoring', 'retrieval and reranking', 'computer vision'],
    evidence: ['churn', 'activity-recognition', 'ciencia-a-tu-tesis'],
  },
  {
    id: 'distributed', icon: 'i-distributed', title: { en: 'Distributed systems', es: 'Sistemas distribuidos' },
    tools: ['microservices', 'Kafka', 'RabbitMQ', 'circuit breaker', 'CQRS', 'API gateway', 'service discovery', 'hexagonal architecture', 'event-driven design', 'state machines'],
    evidence: ['circleguard', 'cloud-patterns', 'postgrados', 'irl-diagnostic'],
  },
  {
    id: 'cloud', icon: 'i-cloud', title: { en: 'Cloud and DevOps', es: 'Nube y DevOps' },
    tools: ['Docker', 'GitHub Actions', 'Kubernetes', 'Terraform', 'Jenkins', 'AWS', 'Google Cloud', 'Azure', 'Prometheus', 'Grafana', 'Jaeger', 'SonarQube', 'Trivy', 'Linux'],
    evidence: ['circleguard', 'cloud-patterns', 'churn'],
  },
  {
    id: 'product', icon: 'i-product', title: { en: 'Full stack and product', es: 'Full stack y producto' },
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'role-based access', 'non-technical clients'],
    evidence: ['irl-diagnostic', 'bakery', 'jugandoando'],
  },
  {
    id: 'agile', icon: 'i-agile', title: { en: 'Ways of working', es: 'Formas de trabajo' },
    tools: ['Scrum', 'Kanban', 'requirements (IEEE 830)', 'user stories (Gherkin)', 'sprint planning', 'client communication'],
    evidence: ['postgrados', 'irl-diagnostic', 'bakery'],
  },
  {
    id: 'quality', icon: 'i-quality', title: { en: 'Quality', es: 'Calidad' },
    tools: ['JUnit', 'Jest', 'Pytest', 'Postman', 'Newman', 'Locust', 'JaCoCo'],
    evidence: ['postgrados', 'circleguard', 'bakery'],
  },
];
