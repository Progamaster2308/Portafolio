import Phaser from 'phaser';
import './styles.css';
import {PortfolioScene} from './scenes/PortfolioScene.js';
import {ui,buildCharacterSheet} from './ui.js';

buildCharacterSheet();

const game = new Phaser.Game({
  type:Phaser.AUTO,
  parent:'game',
  backgroundColor:'#101914',
  pixelArt:true,
  scale:{mode:Phaser.Scale.RESIZE,autoCenter:Phaser.Scale.CENTER_BOTH,width:'100%',height:'100%'},
  render:{antialias:false,powerPreference:'high-performance'},
  scene:[PortfolioScene]
});

document.getElementById('startButton').addEventListener('click',()=>{ui.intro.classList.add('hidden');game.scene.getScene('PortfolioScene').startAdventure()});
document.getElementById('characterButton').addEventListener('click',()=>ui.toggleSheet());
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>ui.close(button.dataset.close)));
window.addEventListener('keydown',event=>{if(event.key.toLowerCase()==='c'){event.preventDefault();ui.toggleSheet()}if(event.key==='Escape'){ui.modal.classList.add('hidden');ui.sheet.classList.add('hidden')}});

const activeScene=()=>game.scene.getScene('PortfolioScene');
const canUseGame=()=>activeScene().started&&ui.modal.classList.contains('hidden')&&ui.sheet.classList.contains('hidden');
let holdDelay;
let holdRepeat;

function stopTouchMove(){clearTimeout(holdDelay);clearInterval(holdRepeat)}
function touchMove(button){
  if(!canUseGame())return;
  const [dx,dy]=button.dataset.move.split(',').map(Number);
  activeScene().movePlayer(dx,dy);
  holdDelay=setTimeout(()=>{holdRepeat=setInterval(()=>{if(canUseGame())activeScene().movePlayer(dx,dy)},210)},380);
}

document.querySelectorAll('[data-move]').forEach(button=>{
  button.addEventListener('pointerdown',event=>{event.preventDefault();stopTouchMove();touchMove(button)});
  ['pointerup','pointercancel','pointerleave'].forEach(type=>button.addEventListener(type,stopTouchMove));
});
document.getElementById('touchAction').addEventListener('pointerdown',event=>{event.preventDefault();if(canUseGame())activeScene().touchAction()});
document.getElementById('touchCharacter').addEventListener('pointerdown',event=>{event.preventDefault();ui.toggleSheet()});

window.addEventListener('beforeunload',()=>game.destroy(true));
