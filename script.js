const inputListener = document.querySelectorAll('input');
const shadowBox = document.querySelector('.shadow-box');
let rangeShadowX = '0px';
let rangeShadowY = '0px';
let radioDifShadow = '0px';
let radioExpShadow = '0px';
let pickerColorShadow = '#FFFFFF';
let opacity = '0.5';
let inOutSet = '';

function hexToRGB(hex, opac) {
    // Eliminar el símbolo # si existe
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
        
        let txtBoxShadow = `${inOutSet}${rangeShadowX} ${rangeShadowY} ${radioDifShadow} ${radioExpShadow} ${hexToRGB(pickerColorShadow, opacity)}`;

        shadowBox.style.boxShadow = txtBoxShadow;
        document.getElementById('previewTextBoxShadow').textContent = `box-shadow: ${txtBoxShadow}`;

        const spanRange = document.getElementById(input.name);
        spanRange.textContent = input.value;

        const img = document.createElement('img');
        img.src = 'copy.png';
        img.style.width = '25px';
        img.style.height = '25px';
        img.style.marginLeft = '5px';
        img.style.cursor = 'pointer';
        img.alt = 'Icono para copiar al porta papeles el código de la propiedad box-shadow en CSS';
        document.getElementById('previewTextBoxShadow').appendChild(img);
        img.addEventListener('click', (e) => {
            navigator.clipboard.writeText(`box-shadow: ${txtBoxShadow};`).then(() => {
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
    });
});

const btnInOutSet = document.querySelector('.btn-in-out-set');
btnInOutSet.addEventListener('click', (e) => {
    console.log('clic en botón')
});
const fig01 = document.querySelector('.fig-01');
const fig02 = document.querySelector('.fig-02');

fig01.addEventListener('click', (e) => {
    shadowBox.style.borderRadius = '50%';
});
fig02.addEventListener('click', (e) => {
    shadowBox.style.borderRadius = '0%';
});

