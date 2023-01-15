// динамическое создание формы
const formDef = [
    {p: "Для внесения вашего сайта в каталог, заполните форму:", name: "title"},
    {label:"Разработчики:", type:"text",name:"devs", required:"true", class:"test"},
    {label:"Название сайта:", type:"text", name:"name_site", required:"true",class:"test"},
    {label:"URL сайта:", type:"text",name:"site",required:"true",class:"form-test"},
    {label:"Дата запуска сайта:",type:"date",name:"date",required:"true",class:"test"},
    {label:"Посетителей в сутки:",type:"number",name:"clients",required:"true",class:"test"},
    {label:"E-mail для связи:",type:"email",name:"e-mail",required:"true",class:"test"},
    {label:"Рубрика каталога:",type:"select",name:"name_select",
    variants:[{value:"1",text:"здоровье"},{value:"2",text:"уют"}, {value:"3",text:"бытовая техника"}],
    class:"select"},
    {label:"Размещение:",type:"radio",name:"place",
    variants:[{value:"1",text:"бесплатное "},{value:"2",text:"платное"},{value:"3",text:"VIP"}],
    class:"radio"},
    {label:"Разрешить отзывы",type:"checkbox",name:"agree_comm",checked:"true",class:"checkbox"},
    {label:"Описание сайта:",type:"textarea",name:"desc",class:"test"},
    {caption:"Опубликовать",type:"submit"}
];
    const form= document.forms.FORM;
    const getForm = (form, formDef) => {
        formDef.forEach(element => {
            if(element.p) {
                let p = document.createElement('p');
                p.textContent = element.p;
                p.name = element.name;
                form.appendChild(p);
            }
            if(element.type=="text" || element.type=="email") {
                let formLabel = document.createElement('label');
                let formInput = document.createElement('input');
                form.appendChild(document.createElement('br'));
                formLabel.textContent = element.label;
                formInput.type = element.type;
                formInput.name = element.name;
                formInput.required = element.required;
                formInput.classList.add('test');
                
                form.appendChild(formLabel);
                form.appendChild(formInput);
                form.appendChild(document.createElement('br'));
            }
            if (element.type =='select') {
                let formLabel = document.createElement('label');
                formLabel.textContent = element.label;
                formLabel.classList.add('label_select');
                let newTag=document.createElement('select');
                newTag.name = element.name;
                newTag.id = 'select';
                element.variants.forEach(el => {
                    // Перебор массива variants
                    let variant = document.createElement('option');
                    variant.value = el.value;
                    variant.textContent = el.text;
                    newTag.appendChild(variant);
                })
                form.appendChild(formLabel);
                form.appendChild(newTag);
                form.appendChild(document.createElement('br'));
            }
            if (element.type =='radio') {
                let formLabel = document.createElement('label');
                formLabel.textContent = element.label;
                form.appendChild(formLabel);
                element.variants.forEach(el => {
                    // Перебор массива variants
                    let newTag=document.createElement('input');
                    newTag.name = element.name;
                    newTag.type = 'radio';
                    newTag.value = el.value;
                    newTag.classList.add('radio');
                    form.appendChild(newTag);
                    let text = document.createElement('label');
                    text.textContent = el.text;
                    form.appendChild(text);
                })
                form.appendChild(document.createElement('br'));
            }
            if (element.type == 'checkbox') {
                let formLabel = document.createElement('label');
                formLabel.textContent = element.label;
                form.appendChild(formLabel);
                let newTag=document.createElement('input');
                newTag.name = element.name;
                newTag.type = 'checkbox';
                newTag.id = 'checkbox';
                form.appendChild(newTag);
                form.appendChild(document.createElement('br'));
            }
            if (element.type == 'textarea') {
                let formLabel = document.createElement('label');
                formLabel.textContent = element.label;
                form.appendChild(formLabel);
                let newTag=document.createElement('textarea');
                newTag.name = element.name;
                form.appendChild(newTag);
                form.appendChild(document.createElement('br'));
            }
            if (element.type == 'submit') {
                let newTag=document.createElement('input');
                newTag.value = element.caption;
                newTag.type = 'submit';
                form.appendChild(newTag);
                form.appendChild(document.createElement('br'));
            }
        })
        
}
getForm(form, formDef)
