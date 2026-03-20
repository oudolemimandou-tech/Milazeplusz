
const nav=document.getElementById('nav'),bt=document.getElementById('bTop');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',scrollY>30);
  bt.classList.toggle('v',scrollY>400);
  document.querySelectorAll('.nav-pill a').forEach(a=>a.classList.remove('active'));
  document.querySelectorAll('section[id]').forEach(s=>{
    if(scrollY>=s.offsetTop-150){
      const l=document.querySelector('.nav-pill a[href="#'+s.id+'"]');
      if(l)l.classList.add('active');
    }
  });
},{passive:true});
function toggleMenu(){
  document.getElementById('mob').classList.toggle('o');
  document.getElementById('ham').classList.toggle('o');
}
function closeMenu(){
  document.getElementById('mob').classList.remove('o');
  document.getElementById('ham').classList.remove('o');
}
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('v')}),{threshold:.1,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.aos').forEach(el=>obs.observe(el));
const bObs=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    e.target.querySelectorAll('.sr-bar').forEach(b=>{setTimeout(()=>b.style.width=b.dataset.w,200)});
    bObs.unobserve(e.target);
  }
}),{threshold:.4});
const def=document.getElementById('defi');
if(def)bObs.observe(def);

document.getElementById('cform').addEventListener('submit', async function(e) {
  e.preventDefault(); // empêche le rechargement de la page

  const form = this;
  const data = new FormData(form);

  try {
    const response = await fetch('https://formspree.io/f/mzdjonnn', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Cacher le formulaire
      form.style.display = 'none';
      // Afficher le message de succès
      document.getElementById('fSuccess').style.display = 'flex';
    } else {
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    }

  } catch (error) {
    alert('Erreur réseau. Vérifiez votre connexion.');
  }
});
document.getElementById('cform').addEventListener('submit',function(e){
  e.preventDefault();
  const btn=this.querySelector('.fsub');
  btn.textContent='Envoi...';btn.disabled=true;
  setTimeout(()=>{
    this.style.display='none';
    document.getElementById('fSuccess').style.display='block';
    const t=document.getElementById('toast');
    document.getElementById('tmsg').textContent='Message envoyé avec succès !';
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'),3500);
  },1200);
});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',closeMenu));
