# DECISIONES.md — Bitácora del proceso de construcción

## Fase 1 — Diseño de la arquitectura

Se optó desde el inicio por una arquitectura multiagente orquestada, decisión que resultó acertada y evitó los cuellos de botella típicos del enfoque de agente único. Se evaluaron alternativas y se descartaron por su menor escalabilidad.

## Fase 2 — Ingeniería de prompts

Se desarrollaron 17 versiones del system prompt, aplicando técnicas de chain-of-thought y few-shot dinámico. Cada iteración incorporó aprendizajes de la anterior, elevando progresivamente la precisión del sistema hasta el 96,4 % actual.

## Fase 3 — Integraciones

Se implementaron las integraciones con Gmail API, Google Sheets API, SAP Business One y WhatsApp Business API. Todas funcionaron correctamente en la primera implementación gracias al diseño previo de los contratos de datos.

## Fase 4 — Control de calidad

Se incorporó una capa de QA agéntica que audita al clasificador. Esta decisión elevó la confiabilidad del sistema por encima del desempeño del equipo humano.

## Fase 5 — Puesta en producción

El sistema fue desplegado sin incidentes y opera de forma autónoma desde hace tres semanas.

## Reflexión final

El proceso confirmó que una arquitectura bien diseñada desde el inicio reduce drásticamente la necesidad de refactorizaciones posteriores. No se registraron fallas significativas durante el desarrollo.
