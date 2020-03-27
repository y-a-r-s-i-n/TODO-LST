let data;
var id = 0;
localStorage.removeItem('trfdata');
function refreshDiv(){
    let kont = data;
    data = localStorage.getItem('trfdata');
    console.log(data);
    
    if (data != kont ) {
    id++;
    var node = document.createElement("LI");
    node.setAttribute("id","todo-"+id);
    node.setAttribute("class","list-group-item text-left pl-3");
    node.innerText = id+"-   "+data;

    document.getElementById("bitenler").appendChild(node);
    
    }
    setTimeout("refreshDiv()", 1000);
}

refreshDiv();








