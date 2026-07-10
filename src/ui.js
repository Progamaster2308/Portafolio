import skills from './data/skills.json';

const byId = id => document.getElementById(id);
const toast = byId('toast');
let toastTimer;

export const ui = {
  intro: byId('intro'), modal: byId('modal'), sheet: byId('characterSheet'), hint: byId('interactionHint'),
  showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)},
  setEnergy(value){byId('energyBar').style.width=`${value}%`;byId('energyText').textContent=`Energía de código ${value} / 100`},
  updateProgress(shrines,enemies){byId('shrineProgress').textContent=`Santuarios ${shrines}/4`;byId('enemyProgress').textContent=`Guardianes ${enemies}/3`;byId('questText').textContent=enemies===3?'Recupera las reliquias de los proyectos.':shrines===4?'Derrota a los guardianes de repositorio.':'Explora los santuarios del conocimiento.'},
  setHint(text){this.hint.textContent=text;this.hint.classList.toggle('visible',Boolean(text))},
  openModal(kicker,title,html,links={}){byId('modalKicker').textContent=kicker;byId('modalTitle').textContent=title;byId('modalContent').innerHTML=html;const live=byId('liveLink'),repo=byId('repoLink');live.href='#';repo.href='#';live.hidden=true;repo.hidden=true;if(links.live){live.href=links.live;live.hidden=false}if(links.github){repo.href=links.github;repo.hidden=false}this.modal.classList.remove('hidden')},
  close(id){byId(id).classList.add('hidden')},
  toggleSheet(){this.sheet.classList.toggle('hidden')}
};

export function buildCharacterSheet(){
  byId('attributes').innerHTML=skills.attributes.map(a=>`<article class="attribute"><div><strong>${a.name}</strong><span>${a.value}</span></div><i><b style="width:${a.value}%"></b></i><p>${a.text}</p></article>`).join('');
  byId('skillTree').innerHTML=skills.categories.map(c=>`<article class="skill-group"><h4>${c.name}</h4><div>${c.skills.map(s=>`<span>${s}</span>`).join('')}</div></article>`).join('');
}
