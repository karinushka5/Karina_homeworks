const form = document.forms.form;
const checkRadio = () => {
    let radio = document.querySelectorAll("[type=radio]");
    let flag = false;
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            flag = true;
        }
    }
    if (flag) return true;
    else return false;
}
const checkBox = () => {
    let agree = document.querySelectorAll("[type=checkbox]");
    let flag = false;
    if (agree[0].checked) {
        flag = true;
    }
    if (flag) return true;
    else return false;
}
const validateForm = (result) => {  //валидация формы
    try {
        let inputs = form.elements;
        let arr = [];
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type != "submit" && inputs[i].type != "select-one") {
                arr.push(inputs[i]);}
        }
        let check = arr.filter(validateInput);
        if (!check.length) { arr[0].focus(); }//фокус на первую ошибку 
        else {
            for (let err = 0; err < arr.length; err++) {
                if (arr.length != check.length) { // в случае равенства фокус не нужен
                    arr[check.length].focus();
                    arr[check.length].scrollIntoView();
                 }
            }
        }
        if (arr.length == check.length) {  
            //в check попадают правильно заполненные input, равенство с общим кол-вом input разрешает отправку формы
            return true;
        } else {
            return false;
        }
        return true; 
    }
    catch (EX) {
        return false;
    }
}
const validateInput = (element) => {  //валидация элемента
    let checker = true;
    if (element.target) {
        element = element.target;
    }
    const error = (message) => { //вывод ошибки
        if (element.parentNode.getElementsByTagName("span").length < 1) {
            let NewSpanElement = document.createElement("span");
            NewSpanElement.textContent = message;
            NewSpanElement.style.color = "red";
            NewSpanElement.style.marginLeft = "10px";
            element.parentElement.appendChild(NewSpanElement);
        }
        checker = false;  // Ошибка
    }
    if (element.type == "radio") {  // радиокнопки
        if (!checkRadio()) { error("Выберите размещение"); }
        else {
            let remove = element.parentNode.getElementsByTagName("span");
            if (remove.length >= 1) {
                element.parentElement.removeChild(remove[0]);
            };
        }
    }
    else {
        if (element.value.length != 0) {  //проверка на пустое поле
            let remove = element.parentElement.getElementsByTagName("span");
            if (remove.length >= 1 && element.type != "checkbox" && element.type != "submit") {
                element.style.border = "1px solid green"
                element.parentElement.removeChild(remove[0]);
            }
            switch (element.type) {
                case "text":
                    if (!/[a-zA-Zа-яА-Я']/.test(element.value) && element.name != 'clients') {  //проверка на буквы, test() возвращает true/false
                        element.style.border = "1px solid red";
                        error("Поле должно содержать буквы");
                    }
                    break;
                case "email":
                    if (!/.+@.+\..+/i.test(element.value)) {  //проверка на ('@','.')
                        element.style.border = "1px solid red";
                        error("Укажите email");
                    }
                    break;
            }
        } else {
            element.scrollIntoView();
            element.style.border = "1px solid red";
            error("Поле не заполнено");
        }
    }
    if (element.type == "checkbox") {  // радиокнопки
        if (!checkBox()) { error("Разрешите отзывы"); }
        else {
            let remove = element.parentNode.getElementsByTagName("span");
            if (remove.length >= 1) {
                element.parentNode.removeChild(remove[0]);
            }
        }
    }
    if (checker) {
        return true;
    } else {
        return false; // В фильтр не проходит
    }
}

const submitForm = (EO) => {  // отправка формы
    let form = EO.target; // объект события - форма
    EO.preventDefault();
    if (validateForm(form)) form.submit();
}
form.addEventListener('submit', submitForm);

for (let i = 0; i < form.elements.length; i++) {  //добавляем обработчики на заполнение
    if (form.elements[i].type == "radio") {
        form.elements[i].onclick = validateInput;
    } else {
        form.elements[i].onblur = validateInput;
    }
}