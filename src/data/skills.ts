import type { T } from '../i18n/ui';

/**
 * One card per real category, every item shown with its logo. Each area links to the
 * projects that prove it (slugs from projects.ts). The build fails if an item has no logo.
 */
export interface SkillArea { id: string; icon: string; title: T; tools: string[]; evidence: string[] }

export const skills: SkillArea[] = [
  {
    id: 'backend', icon: 'i-backend', title: { en: 'Backend, APIs and messaging', es: 'Backend, APIs y mensajería' },
    tools: ['Java', 'Spring Boot', 'TypeScript', 'NestJS', 'Node.js', 'Express', 'Python', 'FastAPI', 'Flask', 'Django', 'GraphQL', 'JWT', 'Kafka', 'RabbitMQ', 'AWS Lambda', 'Amazon SQS', 'Amazon SNS', 'Amazon EventBridge', 'AWS Cognito'],
    evidence: ['circleguard', 'irl-diagnostic', 'postgrados', 'jugandoando'],
  },
  {
    id: 'data', icon: 'i-data', title: { en: 'Data and storage', es: 'Datos y almacenamiento' },
    tools: ['PostgreSQL', 'MongoDB', 'Redis', 'Neo4j', 'Supabase', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon S3', 'AWS Glue', 'Amazon Athena', 'Amazon Redshift', 'Amazon Kinesis', 'AWS Lake Formation', 'BigQuery', 'Airflow', 'Dataflow', 'pandas'],
    evidence: ['circleguard', 'jugandoando', 'churn', 'bakery'],
  },
  {
    id: 'cloud', icon: 'i-cloud', title: { en: 'Cloud and DevOps', es: 'Nube y DevOps' },
    tools: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions', 'AWS', 'AWS IAM', 'Azure', 'Google Cloud', 'Vercel', 'Render', 'Linux', 'Prometheus', 'Grafana', 'Jaeger', 'Amazon CloudTrail'],
    evidence: ['circleguard', 'cloud-patterns', 'churn', 'irl-diagnostic'],
  },
  {
    id: 'quality', icon: 'i-quality', title: { en: 'Testing and quality', es: 'Pruebas y calidad' },
    tools: ['JUnit', 'Jest', 'Pytest', 'Postman', 'Locust', 'SonarQube', 'Trivy'],
    evidence: ['circleguard', 'postgrados', 'bakery'],
  },
  {
    id: 'ai', icon: 'i-ai', title: { en: 'AI and ML', es: 'IA y ML' },
    tools: ['scikit-learn', 'NumPy', 'Optuna', 'OpenCV', 'MediaPipe', 'Streamlit'],
    evidence: ['churn', 'ciencia-a-tu-tesis', 'activity-recognition'],
  },
  {
    id: 'frontend', icon: 'i-product', title: { en: 'Frontend', es: 'Frontend' },
    tools: ['React', 'Next.js', 'Tailwind CSS'],
    evidence: ['jugandoando', 'irl-diagnostic', 'bakery'],
  },
];
