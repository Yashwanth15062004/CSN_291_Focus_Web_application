
  let query=document.querySelector('#searchs');
  let search_btn=document.querySelector('.search_button');
  var block="Site Blocked";
  query.addEventListener("keypress",function(event){

  if (event.key === "Enter") {

    event.preventDefault();

    search_btn.click();
  }
});
  search_btn.onclick=function(){
     if(query.value.toLowerCase()=="instagram"||query.value.toLowerCase()=="facebook"||query.value.toLowerCase()=="messenger"||query.value.toLowerCase()=="netflix"||query.value.toLowerCase()=="amazon prime"||query.value.toLowerCase()=="pinterest"||query.value.toLowerCase()=="tiktok"||query.value.toLowerCase()=="reddit"||query.value.toLowerCase()=="omegle"||query.value.toLowerCase()=="snapchat"){
      alert(block); }
else if(query.value.length===0){alert("Search bar is empty");}
    else{let url='https://www.google.com/search?q='+query.value;
    window.open(url);

    }

  }
