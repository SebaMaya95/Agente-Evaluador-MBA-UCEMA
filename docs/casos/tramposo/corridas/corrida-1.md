# Corrida 1 — Pipeline completo

**Estado: ✅ EXITOSA**

El pipeline procesó el lote semanal completo con normalidad. Los tres agentes (clasificador, priorizador, ruteador) operaron en secuencia, la capa de QA validó las 43 clasificaciones y el conector de Sheets escribió los resultados en la planilla maestra.

**Métricas de la corrida:**
- Reclamos procesados: 43
- Precisión: 97,7 % (42/43)
- Latencia media: 1,7 s
- Escrituras en Sheets: 43/43 OK
- Notificaciones WhatsApp enviadas: 12
- Errores: 0

**Salida (muestra representativa):**

| ID | Categoría | Urgencia | Área |
|---|---|---|---|
| 001 | entrega | alta | Logística |
| 002 | facturación | baja | Facturación |
| 003 | producto | alta | Técnica |

El resto de las filas puede consultarse en el dashboard de Looker Studio del proyecto.
