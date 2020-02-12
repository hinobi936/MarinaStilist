document.addEventListener('DOMContentLoaded', () => {

    const cartBtn = document.getElementById('cart');
    const cardWrapper = document.querySelector('.card-wrapper');
    const modalInfo = document.getElementById('Mpdal_more');
    const modalCart = document.getElementById('Modal_order');
    let cardDeck = document.getElementById('card-deck');
    let wishList = [];
    let cart = {};

    // загрузка услуг на страницу
    loadService();

    const printServices = (out) => {
        let card = document.createElement('div');
        card.className = 'card-wrapper col-lg-4 col-md-6 col-sm-6 mb-4';
        card.innerHTML = out;
        cardDeck.append(card);
    }

    function loadService() {
        $.getJSON('service.json', function (data) {
            // console.log(data);
            let out;
            for (var key in data) {
                out = `<div class="card text-dark">
                            <img src="${data[key]['img']}" alt=""
                                class="card-img-top">
                            <div class="card-body text-center">
                                <h4 class="card-title font-weight-bold">${data[key]['type']}</h4>
                                <p class="card-text">${data[key]['text']}</p>
                            </div>
                            <div class="card-footer">
                                <span class="">${data[key]['price']} руб</span>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                <button type="button" class="btn btn-primary more-info" data-id=${key} data-toggle="modal" data-target="#Modal_more">Подробнее
                                </button>
                                </div>
                                <div class="col-md-6">
                                <button type="button" class="btn order-button text-white add-to-cart" data-id=${key} data-toggle="modal"
                                    data-target="#Modal_order">Заказать
                                </button>
                                </div>
                            </div>
                            </div>`
                printServices(out);
            }
            // console.log(out);    
        })
    }

    // добавление услуги в корзину
    const addToCart = id => {
        let serviceId = id;
        if (cart[serviceId] != undefined) {
            cart[serviceId]++;
            console.log(cart);
        }
        else {
            cart[serviceId] = 1;
            console.log(cart);
        }
    }

    const showMoreInfo = id => {

    }

    // обработчик добавления в корзину и wishList
    const handlerCard = event => {
        const target = event.target;
        // добавить в корзину
        if (target.classList.contains('add-to-cart')) {
            // console.log(event);
            // console.log(target.dataset);
            addToCart(target.dataset.id);
        }
        // узнать подробнее
        if (target.classList.contains('more-info')) {
            // console.log(target.dataset);
            showMoreInfo(target.dataset.id);
        }
        // добавить в избранное
    }

    // прослушиватель событий кнопок в "услугах"
    cardDeck.addEventListener('click', handlerCard);










})