# User prompt — una corrida semanal

```
Clasificá los reclamos de la semana según tu system prompt.

ARCHIVO DE ENTRADA: reclamos_[AAAA-MM-DD].csv
COLUMNAS: id, fecha, cliente, asunto, cuerpo

Leé el archivo completo. Devolvé únicamente el array JSON con un objeto por
cada fila del archivo, en el mismo orden. Nada más.
```

## Variante descartada (v1)

```
Clasificame estos reclamos por tema y urgencia, y decime a quién mandarlos.
```

No la uso más: sin decir "únicamente el array JSON" el agente devolvía el JSON precedido por un párrafo tipo "Acá va la clasificación de los reclamos de la semana:", lo que rompía el pegado en la planilla. La corrida 1 tiene esa salida tal como salió.
