'use strict'

//ЗАДАНИЕ: обрезать текст в 3-й колонке многоточием (щставить две сточки)
var textAbout = document.querySelectorAll('.main__table-text-about'); //Получаем все элементы с текстом из столбца "About"

const textAboutArr = []; //Объявляем массив, который будет содержать исходные тексты из столбца "About" таблицы 
var slicedTextAboutArr = []; //Объявляем массив, который будет содержать обрезанные тексты из столбца "About" таблицы с многоточием 

//заполняем массивы
for (let i = 0; i < textAbout.length; i++) {
    textAboutArr[i] = textAbout[i].innerText;

    slicedTextAboutArr[i] = textAbout[i].innerText.slice(0, 90); //Заполняем массив обрезанными текстами 
    textAbout[i].innerHTML = slicedTextAboutArr[i] + "  <span class='main__table-dot'> ...<span/>"; //Добавляем многоточие в конце */
}

//ЗАДАНИЕ:сортировка строк
var tableHead = document.querySelector('thead'); //получаем шапку таблицы
var tableHeadRow = tableHead.getElementsByTagName('th'); //Получаем ячейки из шапки таблицы

var tableBody = document.querySelector('tbody');        //получаем тело таблицы без шапки
var tableRows = tableBody.getElementsByTagName('tr');    //Получаем строки из тела таблицы 
var allTableCell = tableBody.getElementsByTagName('td'); //получаем все ячейки из тела таблицы

//Воспользуемся циклом forEach для перебора элементов (ячеек) в шапке таблицы и
// применения для каждого элемента функции
[].forEach.call(tableHeadRow, function (header, index) {
    header.addEventListener('click', function () { //навешиваем на каждую ячейку в шапке событие click
        sortColumn(index);  //вызываем функцию сортировки, в качестве параметра передаем текущий индекс столбца таблицы
    });
});

//функция сортировки
function sortColumn(index) {
    var newRows = Array.from(tableRows);  //создаем массив из строк таблицы
    newRows.sort(function (rowA, rowB) {     //применяем функцию для сортировки элементов массива
        //в качестве параметра передаем функцию, которая будет учитываться при сортировке массива
        const cellA = rowA.querySelectorAll('td')[index].innerHTML;
        const cellB = rowB.querySelectorAll('td')[index].innerHTML;

        //сравниваем две соседние ячейки в столбце, если вернется 1, т.е true, то элементы меняются местами
        switch (true) {
            case cellA > cellB: return 1;
            case cellA < cellB: return -1;
            case cellA === cellB: return 0;
        }
    });

    //добавляем новое содержимое (отсортированный столбец)
    newRows.forEach(function (newRow) {
        tableBody.appendChild(newRow);
    });
}

//ЗАДАНИЕ: вывести цвет вместо названия цвета
//в качестве параметра функция принимает ячейки из тела таблицы
//в цикле пробегаем по каждой ячейке и в соответствии с названием цвета выводим квадратик, показывающий цвет
function showColor(allTableCell) {
    for (let i = 0; i < allTableCell.length; i++) {
        if (allTableCell[i].innerText == 'red') allTableCell[i].innerHTML = '<span class="main__table-row_red"></span>';
        else if (allTableCell[i].innerText == 'brown') allTableCell[i].innerHTML = '<span class="main__table-row_brown"></span>';
        else if (allTableCell[i].innerText == 'blue') allTableCell[i].innerHTML = '<span class="main__table-row_blue"></span>';
        else if (allTableCell[i].innerText == 'green') allTableCell[i].innerHTML = '<span class="main__table-row_green"></span>';
    }
}
showColor(allTableCell);

var span = tableBody.getElementsByTagName('span'); //получаем все элементы span в теле таблицы
const allSpanArr = Array.from(span); //создаем массив из span-ов таблицы
var colorTextArr = []; //объявляем массив, который будет содержать текстовые названия цветов в соответствующем порядке

//пробегаем по каждому элементу в массиве 
//если span содержит соответствующий класс с цветом, то в массив добавляем этот текст
for (let cell of allSpanArr) {
    if (cell.classList.contains('main__table-row_red')) colorTextArr.push('red');
    else if (cell.classList.contains('main__table-row_brown')) colorTextArr.push('brown');
    else if (cell.classList.contains('main__table-row_blue')) colorTextArr.push('blue');
    else if (cell.classList.contains('main__table-row_green')) colorTextArr.push('green');
}

//ЗАДАНИЕ: выводить форму редактирования
var editingForm = document.querySelector('.editing-form');  //Получаем форму редактирования записи таблицы
var allInputs = document.getElementsByClassName('editing-form__input'); //Получение всех полей ввода формы
var formButton = document.querySelector('.editing-form__button'); //Получение кнопки формы
var exitCross = document.querySelector('.form-exit-container'); //Получаем блок, содержащий крестик для закрытия формы

//создаем массив из строк таблицы
const tableRowsArr = Array.from(tableRows);

//с помощью цикла forEach для каждой строки таблицы навешиваем событие двойного клика
[].forEach.call(tableRows, function (row, index) {
    row.addEventListener('dblclick', function () {
        selectRow(row);                         //вызывыем функцию выделения строки, в качестве параметра передаем индекс строки
        outputTextFromRowInInput(row, index);   //вызываем функцию, записывающую данные из выделенной строки в форму редактирования
        //(чтобы при открытии записи, форма не была пустой и была возможность редактировать запись)
    });

    //навешиваем на каждую строку событие клика
    row.addEventListener('click', function () {
        removeRowSelection(row);  //вызываем функцию, снимающую выделение со строки по клику по строке
    });

    //навешиваем на кнопку формы событие click
    formButton.addEventListener('click', function () {
        outputTextFromInputInRow(row, index);   //вызываем функцию, записывающую отредактироованные данные из формы редактирования в таблицу
    });
});

//функция, выделяющая строку
const selectRow = function (row) {
    row.classList.add('main__table-row_selected');  //каждой строке тобавлеям класс с цветом
    editingForm.classList.add('editing-form_visible'); //А также класс, показывающий форму редактирования

    //проходим по каждой строке таблицы и если есть выделенная, а пользователь при этом выделяет двойным 
    //кликом новую строку, снимает выделение со старой
    for (let i = 0; i < tableRowsArr.length; i++) {
        if (row != tableRowsArr[i] && tableRowsArr[i].classList.contains('main__table-row_selected'))
            tableRowsArr[i].classList.remove('main__table-row_selected');
    }
};

//функция, выводящая текст из записи таблицы в форму редактирования
const outputTextFromRowInInput = function (row, index) {
    //в каждый инпут выводим текст из соответствующей ячейки строки для редактирования
    for (let j = 0; j < allInputs.length; j++) {
        if (j != 2 && j != 3) allInputs[j].value = row.children[j].innerText;
        else if (j == 2) allInputs[j].value = textAboutArr[index]; //в столбец about полностью выводим текст из исходного массива без точек
        else if (j == 3) allInputs[j].value = colorTextArr[index]; //в столбец с цветом выводим соответствующий текст из массива сформированного ранее
    }
};

//Каждой строке навешиваем событие клика, так при клике будет сниматься выделение строки и 
//скрываться форма редактирования
const removeRowSelection = function (row) {
    row.classList.remove('main__table-row_selected');
    editingForm.classList.remove('editing-form_visible');
}

//Навешимаем на крестик событие клика, так при клике на него, форма будет закрыта
//также снимаем выделение со строки
exitCross.addEventListener('click', function () {
    editingForm.classList.remove('editing-form_visible');
    for (let row of tableRows) row.classList.remove('main__table-row_selected');
});

//Проверяем выделена ли строка
// и заменяем содержимое ячеек в строке таблицы соответствующими значениями из инпутов формы редактирования
//затем скрываем форму и убираем выделение
const outputTextFromInputInRow = function (row, index) {
    if (row.classList.contains('main__table-row_selected')) {

        for (let j = 0; j < allInputs.length; j++) {
            if (j != 2 && j != 3) row.children[j].innerHTML = allInputs[j].value;
            else if (j == 2 && allInputs[j].value.length > 90) {
                row.children[j].innerHTML = allInputs[j].value.slice(0, 90) + "  <span class='main__table-link'> ...<span/>";
            } else if (j == 3) {
                if (allInputs[j].value == 'red') row.children[j].innerHTML = '<span class="main__table-row_red"></span>';
                else if (allInputs[j].value == 'brown') row.children[j].innerHTML = '<span class="main__table-row_brown"></span>';
                else if (allInputs[j].value == 'blue') row.children[j].innerHTML = '<span class="main__table-row_blue"></span>';
                else if (allInputs[j].value == 'green') row.children[j].innerHTML = '<span class="main__table-row_green"></span>';
            } else row.children[j].innerHTML = allInputs[j].value;
        }
        textAboutArr[index] = allInputs[2].value;
        colorTextArr[index] = allInputs[3].value;
    }

    editingForm.classList.remove('editing-form_visible');
    row.classList.remove('main__table-row_selected');
};

//ЗАДАНИЕ: скрывать/показывать колонки таблицы
var hideElements = document.getElementsByClassName('table-pannel__elem_hide'); //получаем все элементы, по клику на которые будут скрываться столбцы
var showElement = document.querySelector('.table-pannel__elem_show');  //получаем элемент, по клику на который будут показываться столбцы

//функция, скрывающая соответсвующие столбцы
//в качестве параметров принимает все ячейки тела таблицы, ячейки из шапки таблицы 
//и стартовый индекс, с которого начнется цикл (шак равен 4, так будуд выютраться элементы из соответствующих столбцов)
function hideColumn(allTableCell, thRow, startIndex) {
    for (let i = startIndex; i < allTableCell.length; i += 4) {
        thRow[startIndex].classList.add('main__table-column_hide');
        allTableCell[i].classList.add('main__table-column_hide');
    }
}

//в цикле навешиваем каждому "скрывающему" элементу событие клика и вызываем функцию
for (let i = 0; i < hideElements.length; i++) {
    hideElements[i].addEventListener('click', () => hideColumn(allTableCell, tableHeadRow, i));
}

//функция, показывающая все скрытые столбцы
//в качестве параметров принимает все ячейки тела таблицы, ячейки из шапки таблицы 
//и стартовый индекс, с которого начнется цикл (шак равен 4, так будуд выютраться элементы из соответствующих столбцов)
function showAllColumn(allTableCell, thRow, startIndex) {
    for (let i = startIndex; i < allTableCell.length; i += 4) {
        thRow[startIndex].classList.remove('main__table-column_hide');
        allTableCell[i].classList.remove('main__table-column_hide');
    }
}

//в цикле навешиваем "показывающему" элементу событие клика и вызываем функцию
for (let i = 0; i < hideElements.length; i++) {
    showElement.addEventListener('click', () => showAllColumn(allTableCell, tableHeadRow, i));
}


