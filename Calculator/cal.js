const button = document.querySelectorAll(".btn");
let iDisp = document.getElementById("disp");

button.forEach(element => {
    element.addEventListener("click", () => {
        const bVal = element.textContent;
        console.log(bVal);
        if(bVal=="=")
        {
            evaluate();
        }
        else if(bVal=="C")
        {
            clear();
        }
        else
        {
            show(bVal);
        }
    })
});

const show = (bVal) => {
    iDisp.value+=bVal;
}

const evaluate = () => {
    if(iDisp.value.includes("x")){
        iDisp.value = iDisp.value.replace(/x/g,"*");
    }
    else if(iDisp.value.includes("÷")){
        iDisp.value = iDisp.value.replace(/÷/g,"/");  
    }
    const res = eval(iDisp.value);
    iDisp.value = res;
};

const clear = () => {
    iDisp.value = "";
};
btn2.addEventListener('click', ()=>{
    iDisp.value = iDisp.value.substring(0, iDisp.value.length - 1);
})