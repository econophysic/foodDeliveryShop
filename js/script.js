window.addEventListener('DOMContentLoaded',()=> {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    const hideTabContent = () => {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    };

    const showTabContent = (i = 0) => {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

// Timer

//      const deadline = '2021-12-12' ;
    const fakeTime = (24*60*60*1000);// One days
    const deadline = Date.now() + fakeTime ;

    function getTimeRemaining(endtime) {
        const t = (endtime) - new Date(),
            days = Math.floor( (t/(1000*60*60*24))),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else return num;
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    const openModal = ()=>{
        /*
            modal.classList.add('show');
            modal.classList.remove('hide');
            */
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';

        clearInterval(modalTimeID);// modal auto show ="off"
    };

    modalTrigger.forEach(btn=>{
        btn.addEventListener('click', openModal);
    });

    const closeModal = ()=>{
        modal.classList.toggle('show');
        /*
modal.classList.add('hide');
modal.classList.remove('show');
*/
        document.body.style.overflow = '';//default
    };

    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click',(e)=>{
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown',(e)=>{
        //console.log(e.code);
        if (e.code === "Escape" && modal.classList.contains('show')) closeModal();
    });

    // const modalTimeID = setTimeout(openModal,5000);

    const showModalByScroll = ()=>{
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight){
            openModal();

            window.removeEventListener('scroll', showModalByScroll);//once show modal
        }
    }

    window.addEventListener('scroll',showModalByScroll);


    //Класы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){ //convert to UAH
            this.price *= +this.transfer;
        }

        render(){          // render html
            const element = document.createElement('div');

            if (this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else{
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `                
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);

        }
    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.\n' +
        '                    Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и' +
        ' высоким качеством!',
        10,
        '.menu .container'

    ).render();

    new MenuCard(
        'img/tabs/elite.jpg',
        "elite",
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. ' +
        'Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        '.menu .container'
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения,'+
        'молоко из миндаля, овса, кокоса или гречки, правильное количество белков'+
        'за счет тофу и импортных вегетарианских стейков.',
        11,
        '.menu .container'
    ).render();



});