Salida literal del corrector v4 (rúbrica v3) sobre casos/excelente — corrida A, 10/09/2026, conversación nueva.

REPOSITORIO EVALUADO: caso-excelente
FECHA DE CORRECCIÓN: 2026-09-10
RÚBRICA: v3

| Dimensión | Ancla | Puntaje | Evidencia citada | Justificación (2 líneas máx) |
|---|---|---|---|---|
| D1 · Sistema completo y funcionando (30) | N4 | 30 | prompts/system_prompt.md — "Sos el clasificador de reclamos de AgroSur Insumos, una distribuidora de insumos agropecuarios del sur de Santa Fe." | Seis piezas del contrato, herramienta real (csv→JSON) en las tres corridas, formato consistente en v2 (corridas 2 y 3), L2/L3 justificados y regla de corte de QA explícita. |
| D2 · Proceso documentado (25) | N4 | 25 | DECISIONES.md — "Ninguna de las dos me convenció en el tiempo que tenía. Lo dejé sin resolver y lo documenté" | 8 iteraciones fechadas con antes/después y error textual citado; falla de reclamos mezclados queda abierta con hipótesis y próximo paso. |
| D3 · Formato y reproducibilidad (15) | N4 | 15 | corridas/corrida-3.md — "Salida, tal como salió — completa, las 13 filas" | Estructura exacta, entrada versionada en `corridas/entradas/`, modelo y temperatura declarados en cada corrida. |
| D4 · Análisis económico (15) | N4 | 15 | README.md — "Al 10× de volumen (400 reclamos/semana) el costo anual sigue siendo USD 1,30 — irrelevante." | Tokens, precio con fecha, proyección semanal/anual, elección de modelo comparada (DECISIONES.md 05/09) y decisión de recorte de contexto. |
| D5 · Gobierno y riesgo (15) | N4 | 15 | README.md — "El cuerpo del mail entra como dato delimitado dentro del csv, nunca como instrucción." | Permisos concretos por sistema, 4 fallas con consecuencia y mitigación, firma nombrada, y riesgo de inyección con defensa declarada (no verificada). |

NOTA FINAL: 100/100

BANDERAS: ninguna

NO LEÍDO: ninguno

UNA SUGERENCIA CONCRETA: En D5, probar adversarialmente la defensa contra prompt injection en el cuerpo del reclamo (hoy declarada como "no verificada"), ya que es la única pieza de gobierno que quedó en diseño sin ejercitar.
