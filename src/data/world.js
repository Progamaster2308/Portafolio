export const WORLD = {cols: 30, rows: 18, tile: 64};

export const shrines = [
  {x:5,y:3,title:'Memoria del erudito',icon:'✦',text:'Bryan aprende con rapidez, retiene información técnica y la convierte en conocimiento que el equipo puede reutilizar.'},
  {x:13,y:7,title:'Estandarte del líder',icon:'♜',text:'Lidera equipos con objetivos claros, comunicación directa y confianza en las capacidades de cada integrante.'},
  {x:21,y:14,title:'Balanza del estratega',icon:'⚖',text:'Designa tareas específicas considerando prioridad, alcance y fortalezas para mantener un flujo de trabajo sostenible.'},
  {x:27,y:6,title:'Juramento profesional',icon:'◆',text:'Asume cada entrega como un compromiso: anticipa riesgos, comunica avances y da seguimiento hasta lograr un resultado estable.'}
];

export const enemyBlueprints = [
  {id:'golem',name:'Gólem de la Deuda Técnica',kind:'golem',x:10,y:11,hp:4,project:'frieren-delivery',color:0x6f786d},
  {id:'necromancer',name:'Nigromante del Alcance',kind:'mage',x:18,y:5,hp:5,project:'dandadan-express',color:0x594064},
  {id:'dragon',name:'Draco del Caos',kind:'dragon',x:26,y:13,hp:6,project:'chickencitos',color:0x7b4038}
];
