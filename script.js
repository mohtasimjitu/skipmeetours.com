const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

function typeWriter(el,text,speed=100){
    let i=0;el.textContent='';
    const type=()=>{
        if(i<text.length){el.textContent+=text.charAt(i);i++;setTimeout(type,speed)}
        else{el.classList.add('typing-complete')}
    };
    type();
}

const observeElements=(sel,cb,opts={})=>{
    const observer=new IntersectionObserver((entries)=>{
        entries.forEach(e=>{if(e.isIntersecting){cb(e.target);observer.unobserve(e.target)}});
    },{threshold:0.1,...opts});
    $$(sel).forEach(el=>observer.observe(el));
};

function animateSkillBars(){
    observeElements('.skill-card',(card)=>{
        const progress=card.querySelector('.skill-progress');
        const target=progress.dataset.progress;
        setTimeout(()=>{progress.style.width=target+'%'},200);
    });
}

function setupEntranceAnimations(){
    $$('.expertise-card').forEach((card,i)=>{
        card.style.opacity='0';card.style.transform='translateY(50px)';
        setTimeout(()=>{
            card.style.transition='all 0.8s cubic-bezier(0.175,0.885,0.32,1.275)';
            card.style.opacity='1';card.style.transform='translateY(0)';
        },300+(i*200));
    });
    $$('.skill-card').forEach((card,i)=>{
        card.style.opacity='0';card.style.transform='translateX(-50px)';
        observeElements('.skills-grid',()=>{
            setTimeout(()=>{
                card.style.transition='all 0.6s ease';
                card.style.opacity='1';card.style.transform='translateX(0)';
            },i*100);
        });
    });
    $$('.language-card').forEach((card,i)=>{
        card.style.opacity='0';card.style.transform='scale(0.5)';
        observeElements('.languages-container',()=>{
            setTimeout(()=>{
                card.style.transition='all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55)';
                card.style.opacity='1';card.style.transform='scale(1)';
            },400+(i*200));
        });
    });
    $$('.spec-badge').forEach((badge,i)=>{
        badge.style.opacity='0';badge.style.transform='translateY(-30px)';
        setTimeout(()=>{
            badge.style.transition='all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55)';
            badge.style.opacity='1';badge.style.transform='translateY(0)';
        },600+(i*150));
    });
}

function setupAvatarInteractions(){
    const avatar=$('.avatar');
    let rotation=0;
    avatar.addEventListener('click',function(){
        rotation+=360;
        this.style.transform=`rotate(${rotation}deg) scale(1.2)`;
        setTimeout(()=>{this.style.transform=`rotate(${rotation}deg) scale(1)`},300);
    });
}

function setup3DTilt(){
    $$('[data-tilt]').forEach(card=>{
        card.addEventListener('mousemove',(e)=>{
            const rect=card.getBoundingClientRect();
            const x=e.clientX-rect.left;const y=e.clientY-rect.top;
            const cX=rect.width/2;const cY=rect.height/2;
            const rX=(y-cY)/10;const rY=(cX-x)/10;
            card.style.transform=`perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-15px)`;
        });
        card.addEventListener('mouseleave',()=>{
            card.style.transform='perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

function createParticle(x,y,color){
    const p=document.createElement('div');
    p.style.cssText=`position:fixed;left:${x}px;top:${y}px;width:8px;height:8px;border-radius:50%;background:${color};pointer-events:none;z-index:9999;box-shadow:0 0 15px ${color}`;
    document.body.appendChild(p);
    const angle=Math.random()*Math.PI*2;const vel=2+Math.random()*3;
    let posX=x,posY=y,opacity=1;
    function animate(){
        posX+=Math.cos(angle)*vel;posY+=Math.sin(angle)*vel-2;opacity-=0.02;
        p.style.left=posX+'px';p.style.top=posY+'px';p.style.opacity=opacity;
        if(opacity>0)requestAnimationFrame(animate);else p.remove();
    }
    animate();
}

function setupSocialButtons(){
    $$('.social-btn').forEach(btn=>{
        btn.addEventListener('click',function(e){
            const colors=['#00d4ff','#7b2cbf','#ff006e'];
            for(let i=0;i<10;i++){
                setTimeout(()=>{
                    createParticle(e.clientX+(Math.random()-0.5)*30,e.clientY+(Math.random()-0.5)*30,colors[Math.floor(Math.random()*colors.length)]);
                },i*40);
            }
        });
    });
}

function setupCustomCursor(){
    const cursor=$('.custom-cursor');
    const follower=$('.cursor-follower');
    if(!cursor||!follower)return;
    let mouseX=0,mouseY=0,cursorX=0,cursorY=0,followerX=0,followerY=0;
    document.addEventListener('mousemove',(e)=>{mouseX=e.clientX;mouseY=e.clientY});
    function animate(){
        cursorX+=(mouseX-cursorX)*0.2;cursorY+=(mouseY-cursorY)*0.2;
        followerX+=(mouseX-followerX)*0.1;followerY+=(mouseY-followerY)*0.1;
        cursor.style.left=cursorX-6+'px';cursor.style.top=cursorY-6+'px';
        follower.style.left=followerX-20+'px';follower.style.top=followerY-20+'px';
        requestAnimationFrame(animate);
    }
    animate();
    $$('a, button, .expertise-card, .skill-card, .language-card, .spec-badge, .social-btn, .avatar').forEach(el=>{
        el.addEventListener('mouseenter',()=>{
            cursor.style.transform='scale(2)';follower.style.transform='scale(1.5)';follower.style.borderColor='#ff006e';
        });
        el.addEventListener('mouseleave',()=>{
            cursor.style.transform='scale(1)';follower.style.transform='scale(1)';follower.style.borderColor='#00d4ff';
        });
    });
}

function setupTitleAnimations(){
    $$('.title-letter').forEach((letter,i)=>{
        letter.style.opacity='0';letter.style.transform='translateY(-50px)';
        setTimeout(()=>{
            letter.style.transition='all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55)';
            letter.style.opacity='1';letter.style.transform='translateY(0)';
        },200+(i*100));
    });
}

function setupLanguageCards(){
    $$('.language-card').forEach(card=>{
        card.addEventListener('click',function(){
            const flag=this.querySelector('.flag');
            flag.style.transform='scale(1.5) rotate(360deg)';
            flag.style.transition='transform 0.8s ease';
            setTimeout(()=>{flag.style.transform=''},800);
        });
    });
}

function setupMagneticButtons(){
    $$('.social-btn').forEach(btn=>{
        btn.addEventListener('mousemove',(e)=>{
            const rect=btn.getBoundingClientRect();
            const x=e.clientX-rect.left-rect.width/2;
            const y=e.clientY-rect.top-rect.height/2;
            btn.style.transform=`translate(${x*0.2}px,${y*0.2}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave',()=>{
            btn.style.transform='translate(0,0) scale(1)';
        });
    });
}

function injectDynamicStyles(){
    const style=document.createElement('style');
    style.textContent=`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes rainbow{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}
        .typing-complete{border-right:2px solid #00d4ff;padding-right:5px;animation:blink 1s step-end infinite}
        @keyframes blink{50%{border-color:transparent}}
    `;
    document.head.appendChild(style);
}

function setupParallax(){
    window.addEventListener('scroll',()=>{
        const scrolled=window.pageYOffset;
        $$('.shape').forEach((shape,i)=>{
            const speed=(i+1)*0.05;
            shape.style.transform=`translateY(${scrolled*speed}px)`;
        });
    });
}

function setupGlitchEffect(){
    const title=$('.main-title');
    if(!title)return;
    setInterval(()=>{
        title.style.textShadow='2px 0 #ff006e,-2px 0 #00d4ff';
        setTimeout(()=>{title.style.textShadow='none'},50);
    },3000);
}

document.addEventListener('DOMContentLoaded',function(){
    injectDynamicStyles();
    const subtitle=$('.subtitle');
    typeWriter(subtitle,'Game Dev | Web Dev | App Dev',80);
    setupTitleAnimations();
    setupEntranceAnimations();
    animateSkillBars();
    setupAvatarInteractions();
    setup3DTilt();
    setupLanguageCards();
    setupSocialButtons();
    setupCustomCursor();
    setupMagneticButtons();
    setupParallax();
    setupGlitchEffect();
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
        anchor.addEventListener('click',function(e){
            e.preventDefault();
            const target=document.querySelector(this.getAttribute('href'));
            if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
        });
    });
});

if('IntersectionObserver' in window){
    const imgObs=new IntersectionObserver((entries)=>{
        entries.forEach(e=>{if(e.isIntersecting){e.target.src=e.target.dataset.src;imgObs.unobserve(e.target)}});
    });
    document.querySelectorAll('img[data-src]').forEach(img=>imgObs.observe(img));
}