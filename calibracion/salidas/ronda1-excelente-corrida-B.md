Salida literal del corrector v3 sobre casos/excelente — corrida B, 10/09/2026, conversación nueva, entrada idéntica a la corrida A.

REPOSITORIO EVALUADO: caso-excelente
FECHA DE CORRECCIÓN: 2026-09-10
RÚBRICA: v2

| Dimensión | Ancla | Puntaje | Evidencia citada | Justificación (2 líneas máx) |
|---|---|---|---|---|
| D1 · Sistema completo y funcionando (30) | N4 | 30 | README.md — "Elegí L3 y no L2 porque revisar de a uno antes de escribir no me ahorra nada frente a revisar la tabla completa después" | Seis piezas en system_prompt.md v2, herramienta real (csv) en las tres corridas, formato de 5 campos consistente, L0–L4 justificado por paso y firma nombrada. |
| D2 · Proceso documentado (25) | N4 | 25 | DECISIONES.md — "Reclamos con dos problemas / Sin resolver, ~8 % de los casos / Campo categoria_secundaria opcional" | 3+ iteraciones fechadas con antes/después y error textual citado, dos recortes de alcance, y fallas abiertas con hipótesis, sin maquillaje. |
| D3 · Formato y reproducibilidad (15) | N2 | 7,5 | corridas/corrida-2.md — "no las pego para no inflar el archivo... El JSON completo está en la hoja Reclamos_AGENTE" | Estructura y metadatos exactos, pero las tres corridas admiten salida resumida/no literal → techo N2 por la regla dura de D3. |
| D4 · Análisis económico (15) | N1 | 3,75 | README.md — "el liviano clasificó igual que el grande en 39 de 40 y cuesta 15 veces menos" | Afirmación sin artefacto: DECISIONES.md solo registra una prueba de 15 casos (14/15 categorías, 13/15 urgencias) → INFLADO, baja a N1 pese a que la sección formal de costos es correcta. |
| D5 · Gobierno y riesgo (15) | N4 | 15 | README.md — "no lo probé adversarialmente; es una defensa de diseño, no verificada. Lo anoto como pendiente" | Permiso exacto por sistema, 5 fallas con consecuencia y mitigación, riesgo de inyección declarado con defensa no verificada, firma nombrada. |

NOTA FINAL: 81/100

BANDERAS: INFLADO — README.md, sección "Qué aprendí": "el liviano clasificó igual que el grande en 39 de 40" — ningún archivo respalda ese número; DECISIONES.md (05/09/2026) documenta una prueba de 15 casos con 14/15 categorías y 13/15 urgencias, no 39/40. Afecta D4.

NO LEÍDO: ninguno

UNA SUGERENCIA CONCRETA: Corregir en README.md la cifra "39 de 40" para que coincida con la prueba real de 15 casos documentada en DECISIONES.md (o citar directamente esa prueba), lo que devolvería D4 a N4.
