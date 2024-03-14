const input = document.querySelector("input");

const qrcode = document.querySelector("#qrcode");

document.addEventListener("keypress", (e) =>{
    let vlrQrcode = input.value;
    if(!vlrQrcode){
        alert("Insira uma URL ou texto para gerar o qrCode!");
        return;
    }

    if(e.key === "Enter"){
        genQRCode();
    }
});

function genQRCode(){
    if(!input.value) return;
    qrcode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x200&data=${input.value}`;
    input.value = "";

}




