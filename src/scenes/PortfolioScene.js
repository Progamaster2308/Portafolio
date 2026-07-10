import Phaser from 'phaser';
import projects from '../data/projects.json';
import {WORLD,shrines,enemyBlueprints} from '../data/world.js';
import {ui} from '../ui.js';

const key=(x,y)=>`${x},${y}`;

export class PortfolioScene extends Phaser.Scene{
  constructor(){super('PortfolioScene');this.started=false;this.moving=false;this.energy=100;this.visited=new Set();this.defeated=new Set();this.opened=new Set();}

  create(){
    this.buildTextures();this.buildWorld();this.buildAtmosphere();this.createActors();this.createInput();this.createMinimap();
    this.cameras.main.setBounds(0,0,WORLD.cols*WORLD.tile,WORLD.rows*WORLD.tile).setZoom(1.05).startFollow(this.player,true,.08,.08);
    ui.updateProgress(0,0);ui.setEnergy(100);this.refreshFog();
  }

  startAdventure(){this.started=true;this.input.keyboard.enabled=true;ui.showToast('La travesía ha comenzado. Explora hacia el este.');}

  buildTextures(){
    const g=this.make.graphics({add:false});
    g.fillStyle(0x506b50).fillRect(0,0,64,64);g.fillStyle(0x60785a,.55).fillRect(0,0,32,32);g.fillRect(32,32,32,32);g.fillStyle(0x3c5943,.65).fillRect(9,15,4,7);g.fillRect(47,42,6,4);g.fillStyle(0x8b9168,.45).fillRect(24,52,8,3);g.generateTexture('ground',64,64);g.clear();
    g.fillStyle(0x466346).fillRect(0,0,64,64);g.fillStyle(0x567552).fillRect(0,0,64,5);g.fillRect(0,31,64,4);g.fillStyle(0x36543d).fillRect(8,11,4,9);g.fillRect(45,44,5,12);g.fillRect(25,52,3,8);g.fillStyle(0x789264).fillRect(11,8,3,5);g.fillRect(48,40,3,5);g.generateTexture('grass-rich',64,64);g.clear();
    g.fillStyle(0x8c7654).fillRect(0,0,64,64);g.fillStyle(0xa18a61).fillRect(0,0,64,7);g.fillRect(0,31,64,5);g.fillStyle(0x705f49).fillRect(7,13,15,5);g.fillRect(39,45,18,4);g.fillRect(26,24,8,3);g.fillStyle(0xb39a6b).fillRect(15,52,10,4);g.fillRect(45,17,7,3);g.generateTexture('dirt',64,64);g.clear();
    g.fillStyle(0x6f746c).fillRect(0,0,64,64);g.fillStyle(0x858a7f).fillRect(2,2,28,27);g.fillRect(34,2,28,27);g.fillRect(2,34,18,28);g.fillRect(24,34,38,28);g.fillStyle(0x505750).fillRect(0,29,64,5);g.fillRect(30,0,4,31);g.fillRect(20,34,4,30);g.fillStyle(0x9a9b88).fillRect(7,7,13,3);g.fillRect(40,39,14,3);g.generateTexture('stone',64,64);g.clear();
    g.fillStyle(0x315f69).fillRect(0,0,64,64);g.fillStyle(0x417b7e).fillRect(0,8,35,5);g.fillRect(24,32,40,5);g.fillRect(0,53,28,4);g.fillStyle(0x70a09a).fillRect(9,11,16,2);g.fillRect(39,35,17,2);g.fillStyle(0x234c59).fillRect(46,16,10,3);g.fillRect(8,42,13,3);g.generateTexture('water',64,64);g.clear();
    g.fillStyle(0x29442e).fillRect(28,23,5,34);g.fillStyle(0x385c39).fillRect(20,18,24,28);g.fillStyle(0x4f7446).fillRect(14,23,36,18);g.fillStyle(0x668653).fillRect(19,14,9,9);g.fillRect(36,16,10,10);g.fillStyle(0x243928).fillRect(17,38,29,7);g.fillStyle(0x65462c).fillRect(29,42,7,21);g.generateTexture('tree',64,64);g.clear();
    g.fillStyle(0x59615b).fillRect(16,33,34,19);g.fillStyle(0x737b70).fillRect(22,25,22,11);g.fillStyle(0x8b8f7d).fillRect(25,27,12,5);g.fillStyle(0x414b46).fillRect(18,46,28,7);g.fillStyle(0x738663).fillRect(13,49,8,5);g.generateTexture('rock',64,64);g.clear();
    g.fillStyle(0x3f633f).fillRect(29,31,3,22);g.fillRect(21,38,3,15);g.fillRect(39,35,3,17);g.fillStyle(0xb7c878).fillRect(17,34,8,7);g.fillStyle(0xe0c36a).fillRect(36,30,9,8);g.fillStyle(0x9f789a).fillRect(27,25,9,8);g.generateTexture('wildflowers',64,64);g.clear();
    g.fillStyle(0x242a28).fillRect(14,12,36,43);g.fillStyle(0x667269).fillRect(18,9,13,12);g.fillRect(34,7,13,15);g.fillStyle(0x899589).fillRect(20,12,8,6);g.fillRect(36,10,8,7);g.fillStyle(0x57635c).fillRect(10,24,12,23);g.fillRect(44,23,11,24);g.fillRect(20,21,26,28);g.fillStyle(0x9ed8be).fillRect(25,27,5,4);g.fillRect(37,27,5,4);g.fillRect(30,38,8,4);g.fillStyle(0x39433d).fillRect(20,49,11,10);g.fillRect(36,49,11,10);g.generateTexture('golem',64,64);g.clear();
    g.fillStyle(0x1e1723).fillRect(16,17,34,40);g.fillStyle(0x53345f).fillRect(21,8,24,13);g.fillRect(15,21,34,30);g.fillStyle(0x30223a).fillRect(23,15,20,16);g.fillStyle(0xb8aa91).fillRect(27,19,12,10);g.fillStyle(0xc965ef).fillRect(28,21,3,3);g.fillRect(36,21,3,3);g.fillStyle(0x7a4a8d).fillRect(10,31,10,8);g.fillRect(47,31,8,8);g.fillStyle(0x6a4931).fillRect(53,12,4,45);g.fillStyle(0x9f67c0).fillRect(49,8,12,9);g.fillStyle(0xd896ff).fillRect(53,10,4,4);g.fillStyle(0x161118).fillRect(17,51,14,8);g.fillRect(36,51,14,8);g.generateTexture('mage',64,64);g.clear();
    g.fillStyle(0x321d1b).fillRect(17,20,35,31);g.fillStyle(0x8e453b).fillRect(19,18,30,31);g.fillStyle(0xb75a47).fillRect(7,15,14,26);g.fillRect(47,14,12,27);g.fillStyle(0x6f302d).fillRect(3,10,8,23);g.fillRect(57,9,6,24);g.fillStyle(0xb6634d).fillRect(41,12,14,17);g.fillStyle(0xe7bb62).fillRect(47,17,4,4);g.fillStyle(0xe0b16a).fillRect(25,28,5,5);g.fillRect(37,29,5,5);g.fillStyle(0xefe0b3).fillRect(46,27,8,3);g.fillStyle(0x592724).fillRect(19,49,11,10);g.fillRect(38,49,11,10);g.generateTexture('dragon',64,64);g.clear();
    g.fillStyle(0x1c1716).fillRect(23,5,20,9);g.fillStyle(0x3a2925).fillRect(19,9,27,8);g.fillStyle(0xc79272).fillRect(23,14,20,13);g.fillStyle(0x2b211f).fillRect(22,14,5,6);g.fillRect(39,14,5,6);g.fillStyle(0x18201d).fillRect(27,20,3,3);g.fillRect(37,20,3,3);g.fillStyle(0x8b2730).fillRect(15,28,37,27);g.fillStyle(0x879599).fillRect(21,27,25,23);g.fillStyle(0xc5d0cd).fillRect(24,29,19,8);g.fillStyle(0x4b5b5d).fillRect(27,38,13,12);g.fillStyle(0xd5ae5d).fillRect(21,39,25,4);g.fillStyle(0x2f3535).fillRect(19,50,12,10);g.fillRect(37,50,12,10);g.fillStyle(0xd6d4c2).fillRect(50,17,4,35);g.fillStyle(0xf1e5bf).fillRect(49,13,6,7);g.fillStyle(0xb98c3c).fillRect(45,35,14,4);g.generateTexture('hero',64,64);g.clear();
    g.fillStyle(0x4a2f1d).fillRoundedRect(8,23,48,31,4);g.fillStyle(0xa07d3b).fillRect(8,20,48,9);g.fillRect(27,20,10,34);g.fillStyle(0xf1d780).fillCircle(32,36,4);g.generateTexture('chest',64,64);g.clear();
    g.fillStyle(0x6c6957).fillRect(15,27,34,30);g.fillStyle(0x9c9878).fillRect(20,12,24,21);g.fillStyle(0x8dc9b6).fillCircle(32,23,7);g.generateTexture('shrine',64,64);g.destroy();
  }

  buildWorld(){
    this.worldLayer=this.add.layer();this.blocked=new Set();
    for(let y=0;y<WORLD.rows;y++)for(let x=0;x<WORLD.cols;x++){
      const texture=this.tileTexture(x,y);const tile=this.add.image(x*64+32,y*64+32,texture);if(texture==='ground'||texture==='grass-rich')tile.setTint(this.terrainTint(x,y));this.worldLayer.add(tile);
      if(texture==='water'){this.blocked.add(key(x,y));continue}
      const border=x===0||y===0||x===WORLD.cols-1||y===WORLD.rows-1;
      if(border||((x*7+y*13)%29===0&&x>3&&texture!=='dirt'&&texture!=='stone'))this.addObstacle(x,y);
      else if((x*11+y*17)%23===0&&(texture==='ground'||texture==='grass-rich'))this.worldLayer.add(this.add.image(x*64+32,y*64+32,'wildflowers').setDepth(2));
      else if((x*19+y*5)%41===0&&texture==='ground')this.worldLayer.add(this.add.image(x*64+32,y*64+32,'rock').setScale(.55).setDepth(2));
    }
  }

  tileTexture(x,y){
    if(x>=23&&x<=27&&y>=2&&y<=4&&!(x===23&&y===2)&&!(x===27&&y===4))return 'water';
    if(x>=13&&x<=19&&y>=1&&y<=3)return 'stone';
    const westRoad=x>=1&&x<=11&&(y===9||y===8&&x>=8);
    const northRoad=x>=10&&x<=21&&y===Math.max(5,9-Math.floor((x-10)/3));
    const eastRoad=x>=19&&x<=28&&y===5+Math.floor((x-19)/3);
    const southRoad=x>=13&&x<=22&&y===8+Math.floor((x-13)*7/9);
    if(westRoad||northRoad||eastRoad||southRoad)return 'dirt';
    return (x*13+y*7)%5===0?'grass-rich':'ground';
  }

  terrainTint(x,y){const n=(x*31+y*19)%7;return [0xd2e0c2,0xbfd2b7,0xd7dab1,0xc2d4b8,0xaec8ad,0xd8cfaa,0xc7d8bc][n];}
  addObstacle(x,y){this.blocked.add(key(x,y));const texture=(x*3+y*5)%7===0?'rock':'tree';const sprite=this.add.image(x*64+32,y*64+32,texture).setDepth(4);if(texture==='rock')sprite.setScale(.88);this.worldLayer.add(sprite);}

  buildAtmosphere(){
    const ruins=this.add.graphics().setDepth(2);ruins.fillStyle(0x777160,.55);for(let i=0;i<12;i++){const x=(i*173+230)%1800,y=(i*271+170)%1000;ruins.fillRect(x,y,10+(i%3)*8,40+(i%4)*12)}
    const particles=this.add.particles(0,0,'ground',{x:{min:0,max:WORLD.cols*64},y:{min:0,max:WORLD.rows*64},scale:{start:.045,end:0},alpha:{start:.22,end:0},speedY:{min:-10,max:-24},speedX:{min:-5,max:7},lifespan:5000,frequency:180,blendMode:'ADD'}).setDepth(20);
    this.fog=this.add.graphics().setDepth(18).setBlendMode(Phaser.BlendModes.MULTIPLY);particles.setScrollFactor(1);
  }

  createActors(){
    this.shrineObjects=shrines.map(s=>({...s,sprite:this.add.image(s.x*64+32,s.y*64+32,'shrine').setDepth(6).setInteractive({useHandCursor:true})}));
    this.shrineObjects.forEach(s=>s.sprite.on('pointerdown',()=>this.interactShrine(s)));
    this.projectChests=projects.map(p=>{const locked=!p.public;return {...p,locked,sprite:this.add.image(p.x*64+32,p.y*64+32,'chest').setDepth(6).setAlpha(locked ? .45 : 1).setTint(locked ? 0x85857d : 0xffd779).setInteractive({useHandCursor:true})}});
    this.projectChests.forEach(p=>p.sprite.on('pointerdown',()=>this.openProject(p)));
    this.enemies=enemyBlueprints.map(e=>{const enemy={...e,maxHp:e.hp,state:'IDLE',gridX:e.x,gridY:e.y,lastPatrol:this.time.now+Phaser.Math.Between(900,2200)};enemy.sprite=this.add.image(e.x*64+32,e.y*64+32,e.kind).setDepth(8).setInteractive({useHandCursor:true});enemy.barBg=this.add.rectangle(e.x*64+32,e.y*64-5,50,6,0x160d0d).setDepth(9);enemy.bar=this.add.rectangle(e.x*64+7,e.y*64-5,50,4,0xa64c3f).setOrigin(0,.5).setDepth(10);enemy.sprite.on('pointerdown',()=>this.attackEnemy(enemy));return enemy});
    this.playerGrid={x:2,y:9};this.player=this.add.image(2*64+32,9*64+32,'hero').setDepth(12);
    this.playerLight=this.add.circle(this.player.x,this.player.y,185,0xffe6a0,.2).setDepth(2).setBlendMode('ADD');
  }

  createInput(){
    this.cursors=this.input.keyboard.createCursorKeys();this.keys=this.input.keyboard.addKeys('W,A,S,D,E');
    this.input.keyboard.on('keydown',event=>{if(!this.started||!ui.modal.classList.contains('hidden')||!ui.sheet.classList.contains('hidden'))return;const k=event.key.toLowerCase();const movement={w:[0,-1],arrowup:[0,-1],s:[0,1],arrowdown:[0,1],a:[-1,0],arrowleft:[-1,0],d:[1,0],arrowright:[1,0]};if(movement[k])this.movePlayer(...movement[k]);if(k==='e')this.interactNearest()});
  }

  movePlayer(dx,dy){
    if(this.moving)return;const nx=this.playerGrid.x+dx,ny=this.playerGrid.y+dy;if(this.blocked.has(key(nx,ny))||this.enemyAt(nx,ny)){ui.showToast('El sendero está bloqueado.');return}
    this.moving=true;this.playerGrid={x:nx,y:ny};this.player.setFlipX(dx<0);this.tweens.add({targets:[this.player,this.playerLight],x:nx*64+32,y:ny*64+32,duration:180,ease:'Sine.easeInOut',onComplete:()=>{this.moving=false;this.afterMove()}});
  }

  afterMove(){this.energy=Math.min(100,this.energy+1);ui.setEnergy(this.energy);this.updateHint();this.refreshFog();this.renderMinimap();}
  enemyAt(x,y){return this.enemies.find(e=>e.state!=='DYING'&&e.gridX===x&&e.gridY===y)}
  distance(o){return Math.abs(o.x-this.playerGrid.x)+Math.abs(o.y-this.playerGrid.y)}
  interactNearest(){const chest=this.projectChests.find(p=>this.distance(p)<=1);const shrine=this.shrineObjects.find(s=>this.distance(s)<=1);if(chest)return this.openProject(chest);if(shrine)return this.interactShrine(shrine);ui.showToast('Acércate a un altar o cofre para interactuar.')}
  touchAction(){const enemy=this.enemies.find(e=>e.state!=='DYING'&&this.distance({x:e.gridX,y:e.gridY})<=2);if(enemy)return this.attackEnemy(enemy);this.interactNearest()}

  interactShrine(shrine){if(this.distance(shrine)>1){ui.showToast('El santuario está demasiado lejos.');return}this.visited.add(shrine.title);this.tweens.add({targets:shrine.sprite,scale:1.18,yoyo:true,duration:220});ui.openModal('SANTUARIO DEL CONOCIMIENTO',shrine.title,`<p>${shrine.text}</p><p class="insight">Aptitud registrada en el grimorio de Bryan.</p>`);this.updateProgress()}

  attackEnemy(enemy){
    if(enemy.state==='DYING'||!this.started)return;if(this.distance({x:enemy.gridX,y:enemy.gridY})>2){ui.showToast('Acércate al guardián para iniciar el ataque.');this.cameras.main.pan(enemy.sprite.x,enemy.sprite.y,350);return}
    if(this.energy<12){ui.showToast('La energía de código necesita recuperarse.');return}enemy.state='AGGRO';this.energy-=12;ui.setEnergy(this.energy);
    const origin={x:this.player.x,y:this.player.y};this.tweens.add({targets:this.player,x:enemy.sprite.x+(this.player.x<enemy.sprite.x?-38:38),y:enemy.sprite.y,duration:130,yoyo:true,onYoyo:()=>{enemy.hp--;enemy.bar.scaleX=enemy.hp/enemy.maxHp;this.emitImpact(enemy.sprite.x,enemy.sprite.y);this.cameras.main.shake(90,.006);if(enemy.hp<=0)this.killEnemy(enemy)},onComplete:()=>this.player.setPosition(origin.x,origin.y)});
  }

  emitImpact(x,y){const burst=this.add.particles(x,y,'ground',{speed:{min:70,max:170},angle:{min:0,max:360},scale:{start:.11,end:0},tint:[0xe4bd6d,0x9d4938,0xf1dfad],lifespan:500,quantity:18,emitting:false}).setDepth(22);burst.explode(18);this.time.delayedCall(600,()=>burst.destroy())}
  killEnemy(enemy){enemy.state='DYING';this.defeated.add(enemy.id);enemy.bar.destroy();enemy.barBg.destroy();this.tweens.add({targets:enemy.sprite,alpha:0,scale:1.7,angle:35,duration:430,onComplete:()=>{enemy.sprite.destroy();const project=this.projectChests.find(p=>p.id===enemy.project);project.locked=false;project.sprite.setAlpha(1).setTint(0xffdc82);this.tweens.add({targets:project.sprite,y:project.sprite.y-9,yoyo:true,repeat:-1,duration:850});ui.showToast(`${enemy.name} ha caído. Su reliquia está activa.`);this.updateProgress();this.renderMinimap()}})}

  openProject(project){
    if(this.distance(project)>1){ui.showToast('Acércate al cofre para inspeccionarlo.');return}if(project.locked){const guardian=this.enemies.find(e=>e.project===project.id);ui.showToast(`${guardian?.name||'Un guardián'} mantiene sellada esta reliquia.`);return}this.opened.add(project.id);const tags=project.technologies.map(t=>`<span class="tech-rune">${t}</span>`).join('');ui.openModal(project.type.toUpperCase(),project.name,`<div class="project-preview" style="--accent:${project.accent}"><span>${project.public?'PROYECTO EMPRESARIAL':'PROYECTO DESBLOQUEADO'}</span><strong>${project.name}</strong></div><p>${project.description}</p><div class="tech-list">${tags}</div>`,{live:project.live,github:project.github});this.updateProgress()}

  updateHint(){const nearEnemy=this.enemies.find(e=>e.state!=='DYING'&&this.distance({x:e.gridX,y:e.gridY})<=2);const nearChest=this.projectChests.find(p=>this.distance(p)<=1);const nearShrine=this.shrineObjects.find(s=>this.distance(s)<=1);ui.setHint(nearEnemy?'CLIC · ATACAR GUARDIÁN':nearChest?'E · ABRIR PROYECTO':nearShrine?'E · LEER SANTUARIO':'')}
  updateProgress(){ui.updateProgress(this.visited.size,this.defeated.size);this.updateHint();this.renderMinimap()}
  refreshFog(){this.fog.clear().fillStyle(0x17231d,.3).fillRect(0,0,WORLD.cols*64,WORLD.rows*64);this.fog.fillStyle(0xffffff,1).fillCircle(this.player.x,this.player.y,340)}

  createMinimap(){this.minimap=document.getElementById('minimap');this.mctx=this.minimap.getContext('2d');this.renderMinimap()}
  renderMinimap(){if(!this.mctx)return;const c=this.mctx,w=this.minimap.width,h=this.minimap.height,sx=w/WORLD.cols,sy=h/WORLD.rows;c.fillStyle='#101813';c.fillRect(0,0,w,h);c.strokeStyle='rgba(201,180,120,.13)';for(let x=0;x<w;x+=sx)c.strokeRect(x,0,sx,h);shrines.forEach(s=>{c.fillStyle=this.visited.has(s.title)?'#ddc477':'#62796d';c.fillRect(s.x*sx-2,s.y*sy-2,4,4)});this.projectChests.forEach(p=>{c.fillStyle=this.opened.has(p.id)?'#f2d37b':'#9c7a41';c.fillRect(p.x*sx-2,p.y*sy-2,5,5)});this.enemies.filter(e=>e.state!=='DYING').forEach(e=>{c.fillStyle='#a34b42';c.fillRect(e.gridX*sx-2,e.gridY*sy-2,5,5)});c.fillStyle='#f7eee0';c.beginPath();c.arc(this.playerGrid.x*sx,this.playerGrid.y*sy,3,0,7);c.fill()}

  patrolEnemies(time){
    this.enemies.forEach(enemy=>{if(enemy.state!=='IDLE'||time<enemy.lastPatrol||this.distance({x:enemy.gridX,y:enemy.gridY})<4)return;enemy.lastPatrol=time+Phaser.Math.Between(1600,2900);const directions=Phaser.Utils.Array.Shuffle([[1,0],[-1,0],[0,1],[0,-1]]);const next=directions.map(([dx,dy])=>({x:enemy.gridX+dx,y:enemy.gridY+dy})).find(p=>!this.blocked.has(key(p.x,p.y))&&!this.enemyAt(p.x,p.y));if(!next)return;enemy.gridX=next.x;enemy.gridY=next.y;this.tweens.add({targets:enemy.sprite,x:next.x*64+32,y:next.y*64+32,duration:420,ease:'Sine.easeInOut'});this.tweens.add({targets:enemy.barBg,x:next.x*64+32,y:next.y*64-5,duration:420,ease:'Sine.easeInOut'});this.tweens.add({targets:enemy.bar,x:next.x*64+7,y:next.y*64-5,duration:420,ease:'Sine.easeInOut'})})
  }

  update(time){if(!this.started)return;this.playerLight.alpha=.17+Math.sin(time/260)*.035;this.energy=Math.min(100,this.energy+.012);const shown=Math.floor(this.energy);if(shown!==this.lastEnergyShown&&shown%2===0){this.lastEnergyShown=shown;ui.setEnergy(shown)}this.patrolEnemies(time);}
}
