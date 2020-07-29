let x = 4;
let note= [1,2,3,4,5];
for(let i=1;i<=x;i++){
    note[i] = document.getElementById("note"+i);
}

note.map(not =>{
    not.onclick(()=>{
        console.log("Clicked");
    });
});