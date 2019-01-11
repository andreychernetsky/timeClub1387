function initCalendar() {
    let calendarConfig = {
        title: '',
        cells: [],
    };
    let container = document.querySelector('.calendar-container');
    if (!container) return;

    let dayInfo = container.querySelector('.info');
    let calendarW = container.querySelector('.calendar');

    if (calendarW) {
        calendarW.innerHTML = '';
    }

    if (dayInfo) {
        dayInfo.innerHTML = '';
    }

    let monthName = [
        'Январь', 'Февраль', 'Март',
        'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь',
        'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    let notes = getNotes();

    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let daysInMonth = monthDays(date);
    let currentDay = date.getDate();
    let beforeMonthDays = new Date(date.getFullYear(), month).getDay();
    let lastDayBeforeMoth = monthDays(new Date(date.getFullYear(), month - 1));

    beforeMonthDays = (beforeMonthDays ? beforeMonthDays : 7) - 1;
    calendarConfig.title = `${monthName[month]} ${year}`;

    for (let i = 0; i < beforeMonthDays; i++) {
        let day = lastDayBeforeMoth - i;
        let dayConfig = {
            day: day,
            date: new Date(Date.UTC(year, month, 0 - i)),
            current: false,
        };
        dayConfig.notes = getNotesCell(dayConfig);
        calendarConfig.cells.unshift(dayConfig);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        let dayConfig = {
            day: i,
            current: currentDay === i,
            date: new Date(Date.UTC(year, month, i)),
        };
        dayConfig.notes = getNotesCell(dayConfig);
        calendarConfig.cells.push(dayConfig);
    }

    if (calendarConfig.cells.length % 7 !== 0) {
        let steps = 7 - calendarConfig.cells.length % 7;
        for (let i = 0; i < steps; i++) {
            let dayConfig = {
                day: i + 1,
                date: new Date(Date.UTC(year, month + 1, i + 1)),
                current: false,
            };
            dayConfig.notes = getNotesCell(dayConfig);

            calendarConfig.cells.push(dayConfig);
        }
    }

    showTable(calendarConfig);

    function showTable(config) {
        let table = document.createElement('table');
        addClass(table, 'table-calendar');

        let tr = document.createElement('tr');
        for (
            let counter = 0,
                length = config.cells.length;
            counter < length; counter++
        ) {
            let cell = config.cells[counter];
            if (counter % 7 === 0) {
                table.appendChild(tr);
                tr = document.createElement('tr');
            }

            let td = document.createElement('td');
            cell.current && addClass(td, 'current');
            cell.current && openDay(cell);
            td.innerHTML = getCellHtml(cell);
            td.addEventListener('click', (e) => openDay(cell));
            td.addEventListener('dblclick', (e) => setDate(cell));

            tr.appendChild(td);
        }
        table.appendChild(tr);
        calendarW.appendChild(table);
    }

    function getCellHtml(cell) {
        let list = cell && cell.notes && cell.notes.reduce((a, b) => a += `<li></li>`, '');

        return `<div class="day">${cell.day}</div><ul class="notesContainer">${list || ''}</ul>`;
    }

    function monthDays(date) {
        let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return d.getDate();
    }

    function addClass(target, className) {
        target && className && target.classList.add(className);
    }

    function removeClass(target, className) {
        target && className && target.classList.remove(className);
    }

    function getNotesCell(cell) {
        return notes.filter((note) => {
            let date = note.date.split('-');
            let newDate = new Date(Date.UTC(date[0], date[1] - 1, date[2]));
            return newDate.toString() === cell.date.toString();
        })
    }

    calendarConfig.cells.forEach(cell => cell);

    function openDay(cell) {
        if (dayInfo) {
            dayInfo.innerHTML = '';
            const list = document.createElement('ul');
            cell.notes.forEach((note) => {
                list.appendChild(createNote(note));
            });

            function createNote(note) {
                const item = createElement('li');
                item.classList.add('item');
                addClass(item, 'item');

                const title = createElement('div');
                addClass(title, 'title');
                title.innerText = note.title;

                const date = createElement('div');
                addClass(date, 'date');
                date.innerText = note.date;

                const description = createElement('description');
                addClass(description, 'description');
                description.innerText = note.description;

                item.appendChild(title);
                item.appendChild(date);
                item.appendChild(description);

                return item;

            }

            dayInfo.appendChild(list);
        }
    }

    function createElement(node) {
        return document.createElement(node);
    }

    function setDate(cell) {
        let input = document.querySelector('#date');
        console.log(cell.date.toISOString().substr(0, 10),cell.date);
        input.value = cell.date.toISOString().substr(0, 10);
    }
}
