Salida literal del corrector v3 sobre casos/excelente — corrida A, 10/09/2026, conversación nueva.

REPOSITORIO EVALUADO: caso-excelente
FECHA DE CORRECCIÓN: 2026-09-10
RÚBRICA: v2

| Dimensión | Ancla | Puntaje | Evidencia citada | Justificación (2 líneas máx) |
|---|---|---|---|---|
| D1 · Sistema completo y funcionando (30) | N2 | 15 | corridas/corrida-1.md — "¡Claro! Acá va la clasificación de los reclamos de la semana del 25 de agosto" | Contrato (6/6 piezas) y supervisión (L0–L3 + firma) superan N3, pero las tres corridas no respetan el mismo formato campo por campo (corrida-1 con texto envolvente); ambiguo entre N2 y N3, se toma N2. |
| D2 · Proceso documentado (25) | N4 | 25 | DECISIONES.md — "Reclamos con dos problemas / Sin resolver, ~8 % de los casos / Campo categoria_secundaria opcional" | Iteraciones fechadas con error textual y antes/después, recortes de alcance explicados, y falla abierta sin maquillaje con hipótesis. |
| D3 · Formato y reproducibilidad (15) | N2 | 7,5 | corridas/corrida-2.md — "no las pego para no inflar el archivo. El JSON completo está en la hoja Reclamos_AGENTE, fila 13 a 27" | El propio trabajo admite que las salidas son extractos parciales, no literales completas; regla dura de D3 fija techo N2 aunque el resto de la estructura sea impecable. |
| D4 · Análisis económico (15) | N1 | 3,75 | README.md — "el liviano clasificó igual que el grande en 39 de 40 y cuesta 15 veces menos" | INFLADO: ningún archivo mide 40 casos liviano-vs-frontier; DECISIONES.md (05/09) solo documenta 15 casos, cada modelo comparado contra el humano, no entre sí. |
| D5 · Gobierno y riesgo (15) | N4 | 15 | README.md — "El cuerpo del mail entra como dato delimitado dentro del csv, nunca como instrucción" | Permisos por sistema, ≥3 fallas con consecuencia/mitigación, checklist de revisión y firma nombrada, más riesgo de inyección con defensa declarada. |

NOTA FINAL: 66/100

BANDERAS: INFLADO — README.md, "el liviano clasificó igual que el grande en 39 de 40 y cuesta 15 veces menos" (sección "Qué aprendí"); no existe en el repositorio ningún archivo que mida acuerdo liviano-frontier sobre 40 casos — el único test real (DECISIONES.md, entrada del 05/09) cubre 15 reclamos y compara cada modelo contra el criterio humano, no uno contra otro → D4 bajado a N1.

NO LEÍDO: ninguno

UNA SUGERENCIA CONCRETA: correr y documentar (o retirar) una comparación real liviano-vs-frontier sobre los 40 reclamos citados en README.md, ya que hoy esa cifra no tiene artefacto que la respalde y es lo único que hunde D4 de N4 a N1.
