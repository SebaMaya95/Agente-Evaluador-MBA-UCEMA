# Corrida 2

- **Fecha:** 02/09/2026, 08:40
- **Prompt:** system v2 · user v2
- **Modelo:** liviano (gama mini), temperatura 0
- **Entrada:** `reclamos_2026-09-01.csv`, 15 filas
- **Resultado:** ✅ formato correcto. Queda 1 desacuerdo de urgencia.

## Entrada (extracto literal, 4 de 15 filas)

```csv
id,fecha,cliente,asunto,cuerpo
R-04,2026-09-01,CLIENTE_2,Faltante,"Del pedido 9012 faltaron 2 bidones de glifosato. El remito dice 10 y llegaron 8."
R-05,2026-09-01,CLIENTE_9,Consulta dosis,"El técnico nos dijo 1.2 l/ha y en la etiqueta dice 0.8. ¿Cuál va? Aplicamos el jueves."
R-07,2026-09-02,CLIENTE_7,Domicilio,"Sigo esperando el cambio de domicilio de facturación. Van 3 semanas."
R-09,2026-09-03,CLIENTE_15,Cultivo,"Aplicamos el herbicida que nos vendieron y se nos quemó el lote de soja. 40 hectáreas. Vamos a pedir asesoramiento legal."
```

## Salida, tal como salió

```json
[
  {"id":"R-04","categoria":"entrega","urgencia":"media","area_sugerida":"Logística","justificacion":"Faltante de 2 bidones contra remito del pedido 9012."},
  {"id":"R-05","categoria":"producto","urgencia":"alta","area_sugerida":"Técnica","justificacion":"Contradicción de dosis entre asesor y etiqueta con aplicación programada para el jueves."},
  {"id":"R-07","categoria":"facturacion","urgencia":"alta","area_sugerida":"Facturación","justificacion":"Cambio de domicilio pendiente hace 3 semanas, con reiteración del cliente."},
  {"id":"R-09","categoria":"producto","urgencia":"alta","area_sugerida":"Legales","justificacion":"Daño a 40 ha de soja atribuido al herbicida, con mención de asesoramiento legal."}
]
```

(Las 11 filas restantes salieron con el mismo formato; no las pego para no inflar el archivo. El JSON completo está en la hoja `Reclamos_AGENTE`, fila 13 a 27.)

## Revisión humana

| Reclamo | Agente | Yo | ¿Coincide? |
|---|---|---|---|
| R-04 | entrega / media / Logística | entrega / media / Logística | Sí |
| R-05 | producto / alta / Técnica | producto / alta / Técnica | Sí |
| **R-07** | facturacion / **alta** / Facturación | facturacion / **baja** / Facturación | **No** |
| R-09 | producto / alta / Legales | producto / alta / Legales | Sí |

**R-07** es el caso de urgencia por tono que la v2 debía arreglar. Bajó respecto de la corrida 1 (ya no lo dispara la puntuación), pero la reiteración —"van 3 semanas"— se la sigue leyendo como impacto. Es un caso genuinamente de borde: la restricción dice "impacto operativo", y tres semanas de demora *es* un problema, solo que no operativo. No cambié el prompt por esto; lo dejé anotado.

Ruteo a Legales en R-09: correcto, y disparado por la regla dura, no por criterio del modelo. Ese es el ruteo que corre en L2 — no salió de la hoja espejo hasta que lo aprobé.
