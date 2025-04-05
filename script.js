const inputListener = document.querySelectorAll('input');

let rangeShadowX = '10px';
let rangeShadowY = '10px';
let radioDifShadow = '5px';
let radioExpShadow = '0px';
let pickerColorShadow = '#000000';
let opacity = '0.75';
let inOutSet = '';
let boxShadow = 'box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75)';

function hexToRGB(hex, opac) {
    // Eliminar el símbolo # (si existe)
    hex = hex.replace('#', '');
    
    // Verificar si es un formato abreviado (ejemplo: #FFF)
    let r, g, b;
    if (hex.length === 3) {
        r = parseInt(hex.substring(0, 1).repeat(2), 16);
        g = parseInt(hex.substring(1, 2).repeat(2), 16);
        b = parseInt(hex.substring(2, 3).repeat(2), 16);
    } else {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    }
    
    return `rgb(${r}, ${g}, ${b}, ${opac})`;
}

inputListener.forEach(input => {
    input.addEventListener('input', (e) => {
        switch(input.name){
            case 'rangeShadowX':
                rangeShadowX = `${input.value}px`;
                break;
            case 'rangeShadowY':
                rangeShadowY = `${input.value}px`;
                break;
            case 'radioDifShadow':
                radioDifShadow = `${input.value}px`;
                break;
            case 'radioExpShadow':
                radioExpShadow = `${input.value}px`;
                break;
            case 'pickerColorShadow':
                pickerColorShadow = input.value;
                break;
            case 'opacity':
                opacity = input.value;
                break;
            case 'pickerColorBg':
                shadowBox.style.backgroundColor = input.value;
                break;            
        }
        
        boxShadow = `${inOutSet}${rangeShadowX} ${rangeShadowY} ${radioDifShadow} ${radioExpShadow} ${hexToRGB(pickerColorShadow, opacity)}`;
        
        document.querySelector('.shadow-box').style.boxShadow = boxShadow;
        document.getElementById('previewTextBoxShadow').textContent = boxShadow;

        const spanRange = document.getElementById(input.name);
        spanRange.textContent = input.value;
    });
});

const switchBtn = document.querySelector('.bg-btn-in-out-set');
switchBtn.addEventListener('click', (e) => {

    let boxShadowUp = document.querySelector('.shadow-box').style.boxShadow;
    let previewUp = document.querySelector('.previewTextBoxShadow').textContent;

    if(switchBtn.style.justifyContent === 'left'){
        switchBtn.style.justifyContent = 'right';
        document.querySelector('.text-in-out-set').textContent = 'inset';

        document.querySelector('.shadow-box').style.boxShadow = `inset ${boxShadowUp}`;
        document.querySelector('.previewTextBoxShadow').textContent = `inset ${previewUp}`;
    }else{
        switchBtn.style.justifyContent = 'left';
        document.querySelector('.text-in-out-set').textContent = 'outset';

        document.querySelector('.shadow-box').style.boxShadow = boxShadowUp.replace('inset', '');
        document.getElementById('previewTextBoxShadow').textContent = previewUp.replace('inset', '');
    }
});

const fig01 = document.querySelector('.fig-01');
const fig02 = document.querySelector('.fig-02');

fig01.addEventListener('click', (e) => {
    shadowBox.style.borderRadius = '50%';
});
fig02.addEventListener('click', (e) => {
    shadowBox.style.borderRadius = '0%';
});

const img = document.querySelector('.img-copy');

img.addEventListener('click', (e) => {
    let previewTextBoxShadow = document.querySelector('.previewTextBoxShadow');
    navigator.clipboard.writeText(`box-shadow: ${previewTextBoxShadow.textContent}`).then(() => {
        document.querySelector('.txtCopied').textContent = 'Copiado!';
        document.querySelector('.txtCopied').style.opacity = '1';
        document.querySelector('.txtCopied').style.transition = 'opacity .5s ease-in-out';
        setTimeout(() => {
            document.querySelector('.txtCopied').style.opacity = '0';
            document.querySelector('.txtCopied').style.transition = 'opacity 1s ease-in-out';
        }, 1000);
    }).catch(err => {
        document.querySelector('.txtCopied').style.color = 'red';
        document.querySelector('.txtCopied').textContent = 'El código NO pudo ser copiado, intenta nuevamente';
        document.querySelector('.txtCopied').style.opacity = '1';
        document.querySelector('.txtCopied').style.transition = 'opacity .5s ease-in-out';
    });
});