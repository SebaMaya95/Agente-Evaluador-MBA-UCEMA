Salida literal del corrector v4 (rúbrica v3) sobre casos/excelente — corrida B, 10/09/2026, conversación nueva, entrada idéntica a la corrida A.

REPOSITORIO EVALUADO: caso-excelente
FECHA DE CORRECCIÓN: 2026-09-10
RÚBRICA: v3

| Dimensión | Ancla | Puntaje | Evidencia citada | Justificación (2 líneas máx) |
|---|---|---|---|---|
| D1 · Sistema completo y funcionando (30) | N4 | 30 | prompts/system_prompt.md — "Un array JSON, un objeto por reclamo, con exactamente estos cinco campos y en este orden" · README.md — "Elegí L3 y no L2 porque revisar de a uno antes de escribir no me ahorra nada" | Seis piezas del contrato, tool real (csv→JSON) en las 3 corridas, L0–L4 con firma y criterio propio sobre el nivel de supervisión elegido. |
| D2 · Proceso documentado (25) | N4 | 25 | DECISIONES.md — "Reclamos con dos problemas / Sin resolver, ~8 % de los casos / Campo categoria_secundaria opcional" | Más de 6 iteraciones fechadas con antes/después textual, error citado y corrida↔versión trazable, más una falla abierta con hipótesis. |
| D3 · Formato y reproducibilidad (15) | N4 | 15 | corridas/corrida-3.md — "Se pega completa y sin editar: es la corrida que sirve de referencia literal del formato." | Estructura exacta; corrida 3 trae entrada y salida literales completas, las otras dos son extractos identificados como tales; modelo/temperatura y csv versionados. |
| D4 · Análisis económico (15) | N4 | 15 | README.md — "2.350 × 0,15/1M + 780 × 0,60/1M = USD 0,00082" · README.md — "Al 10× de volumen (400 reclamos/semana) el costo anual sigue siendo USD 1,30" | Tokens, precio con fecha, proyección semanal/anual y comparación empírica contra el frontier (14/15 vs 14/15), más análisis explícito a 10× volumen. |
| D5 · Gobierno y riesgo (15) | N4 | 15 | README.md — "El cuerpo del mail entra como dato delimitado dentro del csv, nunca como instrucción. No lo probé adversarialmente" | Permisos exactos por sistema, más de 3 fallas con consecuencia y mitigación, QA de 3 pasos, firma nombrada, y riesgo de inyección con defensa declarada. |

NOTA FINAL: 100/100

BANDERAS: ninguna

NO LEÍDO: ninguno

UNA SUGERENCIA CONCRETA: Probar adversarialmente la defensa contra texto inyectado en el cuerpo del reclamo (D5), hoy declarada como "no verificada" en el propio README.
