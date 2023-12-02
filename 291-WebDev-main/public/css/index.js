var activities=[
    'get a coffee',
    'talk to ur old friends',
    'try new games',
    'draw an art!',
    'cook your favourite food',
    'hangout with your friends',
    'Go on a dinner date',
    'Recall your childhood memories',
    'learn guitar',
    'play chess',
    'Learn a new language that was on the cards for long',
  'Watch your favorite movie again and again',
  'Enjoy a warm sunbath early in the morning',
  'Make a playlist of your favorite songs from last year',
  'Get into a cleaning spree around the house',
  'Play video game with your child',
  'Embark on a new fitness regime to be followed every day',
  'Write a letter to your pen friend',
  'Do self-care as much as you can such as manicures, trendy haircuts, and fruit facials',
  'Have a guided meditation session to relax and rejuvenate',
  'Play with your pet and experience cuddling from your furry friend',
  'Make a cocktail with fresh fruits and yummy whipped cream',
  'Arrange a barbeque party at the house lawn and spend time with your loved ones',
  'Bake designer chocolate cakes and cookies',
  'Play hide and seek with your toddler',
  'Learn a new dance form',
  'Binge watch a new web series that your friend was talking about',
  'Brew a hot cappuccino and relax on the couch',
  'Take in nature and go for a walk',
  'Organizing your closet',
  'Rearrange the furniture of the house',
  'Buy new curtains for your living room',
  'Call your friend and indulge in guilt-free talking for hours',
  'Do some tricky puzzle and word search',
  'Plan for a potluck party, a real fun and frolic time with friends with good food and wine on the table',
  'Visit an art gallery or magic show',
  'Have a movie night at home',
  'Do some bottle painting with acrylic colors',
  'Visit a vineyard and do a local wine tasting',
  'Play court games like badminton or lawn tennis',
  'Invite friends for an afternoon tea and snacks party',
  'Have a karaoke night with your best friends',
  'Create a collage with old pictures of college mates',
  'Make a to-do list for the next vacation with family',
  'Arrange a sleepover with best pals at home',
  'Have a cooking contest amongst friends and declare the winner',
  'Go for swimming and river rafting',
  'Create a photo frame together to put on some crazy pictures of you all',
  'Play a computer game together and announce the winner',
  'Make a spontaneous road trip',
  'Arrange a fashion show at home',
  'Visit a local event happening nearby',
  'Have a poetry writing competition',
  'Plan for some other friend’s surprise birthday party',
  'Make paper airplanes and throw them on each other',
  'Color an old T-shirt together with some crazy shades',
  'Do tongue twister exercise and see who wins',
  'Get into a movie marathon one after the other',
  ]
  function randactivity(){
  var randomnumber= Math.floor(Math.random()*(activities.length));
  document.getElementById('activity').innerHTML=activities[randomnumber].bold().big();
  }







  let submit=document.querySelector(".submit");
  let notesElem=document.querySelector('.notes');
  let title=document.getElementById('text');
  let desc=document.getElementById('desc');
  let notes=JSON.parse(localStorage.getItem("notes"));
  if(notes){
      notes.forEach(element => {
          addNotes(element);
      });
  }
  submit.addEventListener("click", (e)=>{
      e.preventDefault();
      addNotes();
  })
  function addNotes(obj) {
      let card=document.createElement("div");
      card.classList.add("card");
      let titleval=title.value;
      let descVal=desc.value;
      if(obj){
          titleval=obj.title;
          descVal=obj.desc;
      }
       if(titleval){
          card.innerHTML=`<h3>${titleval}</h3>
                                      <p class="ptag">${descVal}</p>
                               <button class="del"><img id="del" src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/82-512.png"/></button>`;
          notesElem.appendChild(card);
          updateLs();
       }
      let del=card.querySelector(".del");
      del.addEventListener('click', ()=>{
          card.remove();
          updateLs();
  })
  }
  function updateLs() {
      let card=document.querySelectorAll(".card");
      let arr=[];
      card.forEach(element => {
          arr.push({
              title:element.children[0].innerText,
              desc:element.children[1].innerText
          })
      });
      localStorage.setItem("notes", JSON.stringify(arr));
  }
