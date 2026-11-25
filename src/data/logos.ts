/** One place to find a tool's logo: Simple Icons (CC0) first, then the Devicon marks in brand-icons.ts. */
import * as si from 'simple-icons';
import { BRAND } from './brand-icons';

const SLUG: Record<string, string> = {
  'Spring Boot': 'springboot', TypeScript: 'typescript', NestJS: 'nestjs', 'Node.js': 'nodedotjs',
  Express: 'express', Python: 'python', Flask: 'flask', FastAPI: 'fastapi', Django: 'django', GraphQL: 'graphql',
  JWT: 'jsonwebtokens', React: 'react', 'Next.js': 'nextdotjs', 'Tailwind CSS': 'tailwindcss', PostgreSQL: 'postgresql',
  MongoDB: 'mongodb', Supabase: 'supabase', BigQuery: 'googlebigquery', Airflow: 'apacheairflow', Dataflow: 'googledataflow',
  pandas: 'pandas', Redis: 'redis', Neo4j: 'neo4j', Kafka: 'apachekafka', RabbitMQ: 'rabbitmq', Docker: 'docker',
  'GitHub Actions': 'githubactions', Kubernetes: 'kubernetes', Terraform: 'terraform', Jenkins: 'jenkins',
  'Google Cloud': 'googlecloud', 'Cloud Run': 'googlecloud', Prometheus: 'prometheus', Grafana: 'grafana', Jaeger: 'jaeger',
  SonarQube: 'sonarqubeserver', Trivy: 'trivy', Linux: 'linux', JUnit: 'junit5', Jest: 'jest', Pytest: 'pytest',
  Postman: 'postman', Locust: 'locust', 'scikit-learn': 'scikitlearn', Optuna: 'optuna', NumPy: 'numpy', OpenCV: 'opencv',
  MediaPipe: 'mediapipe', Streamlit: 'streamlit', Vercel: 'vercel',
};
const ALIAS: Record<string, string> = { 'AWS Cognito': 'AWS' };
const bySlug: Record<string, string> = Object.fromEntries(Object.values(si).filter((x: any) => x && x.slug).map((x: any) => [x.slug, x.path]));

export function logo(name: string): { viewBox: string; d: string } | null {
  const brand = BRAND[name] ?? BRAND[ALIAS[name] ?? ''];
  if (brand) return brand;
  const path = SLUG[name] && bySlug[SLUG[name]];
  return path ? { viewBox: '0 0 24 24', d: path } : null;
}
