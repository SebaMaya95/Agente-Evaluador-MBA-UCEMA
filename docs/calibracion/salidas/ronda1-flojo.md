Salida literal del corrector v3 sobre casos/flojo — 10/09/2026, conversación nueva.

REPOSITORIO EVALUADO: caso-flojo
FECHA DE CORRECCIÓN: 2026-09-10
RÚBRICA: v2

| Dimensión | Ancla | Puntaje | Evidencia citada | Justificación (2 líneas máx) |
|---|---|---|---|---|
| D1 · Sistema completo y funcionando (30) | N1 | 7,5 | prompts/ — falta user_prompt.md; README.md — "Falta conectarlo con la casilla de mail para que sea automático. Ahora hay que pegarle los reclamos a mano." | Solo existe system_prompt.md (sin restricciones ni ejemplos ni formato fijo), no hay herramienta/conector real ni mención de supervisión L0–L4. |
| D2 · Proceso documentado (25) | N1 | 6,25 | DECISIONES.md — "Fui probando distintos prompts hasta que encontré uno que funcionaba bien." | Narrativa genérica sin error textual, sin versiones del prompt ni fechas; podría haberse escrito sin construir nada. |
| D3 · Formato y reproducibilidad (15) | N0 | 0 | corridas/ — solo 2 de 3 archivos (falta corrida-3.md); corridas/corrida-2.md — "también anduvo bien. Clasificó todo correctamente." sin entrada, salida ni fecha | Estructura incompleta (falta user_prompt.md y una corrida) más ninguna corrida con fecha; ambiguo entre N2 y N0, se toma N0 por los dos elementos obligatorios faltantes. |
| D4 · Análisis económico (15) | N0 | 0 | README.md — ningún archivo del repositorio menciona costo, tokens o precio | No hay mención de costo en ningún documento del repositorio. |
| D5 · Gobierno y riesgo (15) | N0 | 0 | DECISIONES.md — ningún archivo menciona permisos, riesgos ni supervisión | No se menciona permisos, riesgos ni quién audita las salidas en ningún archivo. |

NOTA FINAL: 14/100

BANDERAS: ESTRUCTURA ROTA — faltan prompts/user_prompt.md y corridas/corrida-3.md (dos archivos obligatorios ausentes) · INFLADO — corridas/corrida-2.md afirma "Clasificó todo correctamente" sin mostrar entrada ni salida que lo respalden

NO LEÍDO: ninguno

UNA SUGERENCIA CONCRETA: En D4, agregar tokens de entrada/salida por corrida, precio unitario con fuente y una proyección semanal/anual, ya que hoy no existe ninguna mención de costo en el repositorio.
