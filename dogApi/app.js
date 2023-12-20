const select = document.getElementById("breeds");
const container = document.getElementById("container");

fetch("https://dog.ceo/api/breeds/list/all")
  .then((response) => response.json())
  .then((data) => {

    //L'oggetto che ottengo dall'api ha tante proprietà, ma a noi interessa la prop 'message'
    const obj = data.message;        
    Object.keys(obj).forEach((key) => {
      if (obj[key].length == 0) {
        createOption(key);
      } else {
        console.log(key);
        obj[key].forEach((element) => {    //se la chiave ha almeno un elemento subordinato allora lo mostriamo
          createOption(`${element} ${key}`);
        });
      }
    })
    caricaDati(select.value); //inseriamo qui caricaDati per avere le immagini già di fedault e non solo in caso di evento change.
  })

//adesso creo un eventListener che gestisce l'evento 'change' (cioè il cambio di selezione degli elementi)
//tramite una funzione 'caricaDati' in base alla razza di cane selezionata, mostriamo l'immagine

select.addEventListener('change', (e)=>{
  while(container.firstChild){
      container.removeChild(container.firstChild); //quando seleziono una razza di cani, rimuovo tutti gli elementi. 
  }  // successivamente verranno caricate le immagini della razza scelta con caricaDati
  
  console.log(e.target.value);
  caricaDati(e.target.value);
})

//creo una funzione che inserisce i nomi dei cani nella select
function createOption(value){
  const option = document.createElement("option");
  option.value=value;
  option.appendChild(document.createTextNode(value));
  select.appendChild(option);
}


function caricaDati(breed){
  if(breed=='') return;

  fetch(`https://dog.ceo/api/breed/${breed}/images`)
  .then(response => response.json())
  .then(data => {
    console.log(data);   
    generaCard(data.message); //questa funzione genera le immagini
  });
}

function generaCard(photos){
  photos.sort(()=> Math.random()-0.5);   //mettiamo le immagini in modo casuale e ogni volta che aggiorno la pagina cambia al disposizione delle immagini
  photos.forEach(photo => {
    const card= document.createElement("div");
    card.className="rounded-xl shadow-xl text-xl bg-white h-[200px] w-[200px] bg-cover";
    card.style.backgroundImage=`url(${photo})`;
    container.appendChild(card);
    
  });

}


