document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart");
  const cardWrapper = document.querySelector(".card-wrapper");
  const modalInfo = document.getElementById("Modal_more");
  const modalContent = document.querySelector("modal-content");
  const modalCart = document.getElementById("Modal_cart");
  const cartList = document.querySelector(".cart-list");
  let cardDeck = document.getElementById("card-deck");
  const cartCounter = document.getElementById("cartCounter");
  const orderButton = document.getElementsByClassName("add-to-cart");
  let wishList = [];
  let cart = {};

  // console.log(cartList);

  // загрузка услуг на страницу
  loadService();
  checkCart();
  checkCount();

  const printServices = (out) => {
    let card = document.createElement("div");
    card.className = "card-wrapper col-lg-4 col-md-6 col-sm-6 mb-4";
    card.innerHTML = out;
    cardDeck.append(card);
    console.log();
    // checkCart();
  };

  function loadService() {
    $.getJSON("service.json", function (data) {
      // console.log(data);
      let out;
      for (var key in data) {
        out = `<div class="card text-dark">
                  <img src="${data[key]["img"]}" alt=""
                      class="card-img-top">
                  <div class="card-body text-center">
                      <h4 class="card-title font-weight-bold">${
                        data[key]["type"]
                      }</h4>
                  </div>
                  <div class="card-footer">
                      <span class="">${data[key]["price"]} руб</span>
                  </div>
                  <div class="row">
                      <div class="col-md-6">
                      <button type="button" class="btn btn-more more-info" data-id=${key} 
                      data-toggle="modal" data-target="#Modal_more">Подробнее
                      </button>
                      </div>
                      <div class="col-md-6">
                      <button type="button" class="btn order-button add-to-cart 
                      ${
                        cart.hasOwnProperty(key) ? "order-active" : ""
                      }" data-id=${key}>
                      ${
                        cart.hasOwnProperty(key) ? "В корзине" : "Заказать"
                      }</button>
                      </div>
                  </div>
              </div>`;
        printServices(out);
        // console.log(key);
      }
    });
  }

  const addToCart = (id) => {
    // добавление услуги в корзину
    let serviceId = id;
    if (cart[serviceId] != undefined) {
      cart[serviceId]++;
      // console.log(cart);
    } else {
      cart[serviceId] = 1;
      // console.log(cart);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const showMoreInfo = (id) => {
    let out;
    $.getJSON("service.json", function (data) {
      out = `<div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">${data[id].type}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-5">
                    <div id="fotorama" class="fotorama" data-nav="thumbs">
                      <img src="${data[id].img}" alt="">
                      <img src="${data[id].img}" alt="">
                      <img src="${data[id].img}" alt="">
                      <img src="${data[id].img}" alt="">
                    </div>
                  </div>
                  <div class="col-md-7">
                    <p>${data[id].description}</p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-id=${id}>Оставить заявку</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->`;
      console.log(out);
      modalInfo.innerHTML = out;
    });
  };

  const changeButtonAdd = (target) => {
    // console.log(target.style);
    target.textContent = "В корзине";
    target.style.backgroundColor = "#777777";
    target.style.color = "#fff";
    target.classList.add("order-active");
  };

  function checkCount() {
    // подсчет количества в корзине
    cartCounter.textContent = Object.keys(cart).length;
  }

  const handlerCard = (event) => {
    // обработчик добавления в корзину и wishList
    const target = event.target;
    // добавить в корзину
    if (target.classList.contains("add-to-cart")) {
      // console.log(event);
      // console.log(target.dataset);
      addToCart(target.dataset.id);
      changeButtonAdd(target);
      checkCount();
    }
    if (target.classList.contains("more-info")) {
      // узнать подробнее
      // console.log(target.dataset);
      showMoreInfo(target.dataset.id);
    }
    // добавить в избранное
  };

  function checkCart() {
    // проверка наличия корзины в localStorage
    if (localStorage.getItem("cart") == null) {
      return;
    }
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  function printCart(out) {
    let cartOut = "";
    cartOut = document.createElement("div");
    cartOut.className = "list-item";
    cartOut.innerHTML = out;
    console.log(cartList);
    cartList.append(cartOut);
    // checkCart();
  }

  const openModal = (event) => {
    // прочитать карточки из local storage
    // console.log(cart);
    cartList.textContent = "";
    let out = "";
    $.getJSON("service.json", function (data) {
      // console.log(data);
      for (var key in cart) {
        out = `<img src="${data[key].img}" alt="${data[key].type}">
        <div class="info">
          <div class="list-item type">
            <span>${data[key].type}</span>
          </div>
          <div class="count-price">
            <div class="list-item count">
              <button class="minus">&ndash;</button>
              <input type="number" maxlength="2" value="${cart[key]}">
              <button class="plus">+</button>
            </div>
            <div class="list-item price">${data[key].price * cart[key]}</div>
          </div>
        </div>`;
        console.log(out);
        printCart(out);
      }
    });

    //написать открывашку окна
    modalCart.style.display = "block";
    // modalCart.style.opacity = "100%";
  };

  const closeModal = (event) => {
    //написать открывашку окна
    let close = event.target;
    if (
      close.classList.contains("popup") ||
      close.classList.contains("popup-close")
    ) {
      // modalCart.style.opacity = "0%";
      modalCart.style.display = "none";
    }
  };

  // прослушиватель событий кнопок в "услугах"
  cardDeck.addEventListener("click", handlerCard);

  cartBtn.addEventListener("click", openModal);

  modalCart.addEventListener("click", closeModal);
});
