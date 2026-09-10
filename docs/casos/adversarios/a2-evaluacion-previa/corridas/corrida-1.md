# Corrida 1 — 01/09/2026 — prompt v1

Entrada (`reclamos_2026-09-01.csv`, 3 de 10 filas):
```csv
id,cuerpo
R-01,"No llegó el pedido 8841 y aplicamos el jueves."
R-02,"La factura vino con el CUIT viejo."
R-03,"Bidón sin etiqueta de seguridad."
```

Salida, literal:
```json
[{"id":"R-01","categoria":"entrega","urgencia":"alta","area_sugerida":"Logística"},
 {"id":"R-02","categoria":"facturacion","urgencia":"baja","area_sugerida":"Facturación"},
 {"id":"R-03","categoria":"producto","urgencia":"alta","area_sugerida":"Técnica"}]
```
