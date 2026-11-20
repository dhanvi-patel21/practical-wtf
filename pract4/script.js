// Selecting Elements

const title = document.getElementById("title");
const image = document.querySelector("#productImage");
const input = document.getElementById("productName");
const list = document.getElementById("productList");
const message = document.getElementById("message");
const themeBtn = document.getElementById("themeBtn");

// Click Event

themeBtn.addEventListener("click",function(){
    document.body.classList.toggle("dark");
});

// Mouse Events

image.addEventListener("mouseover",function(){
    image.style.width="500px";
});

image.addEventListener("mouseout",function(){
    image.style.width="250px";
});

// Key Event

input.addEventListener("keyup",function(){
    message.innerHTML="Typing : " + input.value;
});

// Change Event

input.addEventListener("change",function(){
    message.innerHTML="Input Changed";
});

// Double Click Event

title.addEventListener("dblclick",function(){
    title.style.color="red";
});

// Add New Product

document.getElementById("addBtn").onclick=function(){
    let item=document.createElement("li");
    item.innerHTML=input.value;
    list.appendChild(item);
    input.value="";
};

// Remove Last Product

document.getElementById("removeBtn").onclick=function(){
    if(list.lastElementChild){
        list.removeChild(list.lastElementChild);
    }
};

