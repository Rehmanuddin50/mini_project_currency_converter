const base="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button")
const fromC=document.querySelector(".from select");
const toC=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let select of dropdown){
    for(code in contrylist){
       let newoption=document.createElement("option");
       newoption.innerText=code;
       newoption.value=code;
       if(select.name=="from"&& code=="USD"){
        newoption.selected="selected";
       }else if(select.name=="to"&& code=="INR"){
        newoption.selected="selected";
       }
       select.append(newoption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })

}
const updateFlag=(element)=>{
   let code=element.value;
   let CODE=contrylist[code];
   let newsrc=`https://flagsapi.com/${CODE}/flat/64.png` ;
   let img=element.parentElement.querySelector("img");
   img.src=newsrc;
}
button.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("form input");
    let amvalue=amount.value;
    console.log(amvalue);
    // console.log(fromC.value,toC.value)
    const URL=`${base}/${fromC.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate =data[fromC.value.toLowerCase()][toC.value.toLowerCase()];
    let finalAmount=amvalue*rate;
    msg.innerText=`${amvalue}${fromC.value}=${finalAmount}${toC.value}`;
    
    console.log(rate)
})
