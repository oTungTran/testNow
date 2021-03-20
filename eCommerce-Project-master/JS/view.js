const view = {};
// khởi tạo, chèn html header footer vào thẻ body.
document.getElementsByTagName("BODY")[0].innerHTML = component.headerAndFooter;

view.userRole = (user) => {
    if (model.currentUser) {
        modal_login = document.getElementById("modal_login");
        modal_login.parentNode.removeChild(modal_login);

        document
            .getElementById("dropDownProfile")
            .setAttribute("onclick", "view.setScreenBtn('profilePage')");
        document
            .getElementById("directProfilePage")
            .setAttribute("onclick", "view.setScreenBtn('profilePage')");

        document.getElementById("dropdownlogin").classList.add("dropdown");

        let userName = document.getElementsByClassName("userName");
        for (let a of userName) {
            a.innerHTML = model.currentUser.name;
        }

        //đoạn này tính discount cho user
    } else {
        console.log("not login");
    }
};

view.setActiveScreen = async(screenName, otherInfo) => {
    console.log(screenName, otherInfo);
    const main = document.getElementById("mainContainer");

    if (model.currentUser) {
        await model.getCurrentUserData(model.currentUser.email);
    }
    view.loadTotalCart();
    view.loadSubCategory();
    view.searchProduct();

    switch (screenName) {
        case "homePage":
            main.innerHTML = component.homePage;

            view.loadingScreen("block");
            await view.showHomePage();
            view.loadingScreen("none");

            break;
            x;
        case "productPage":
            main.innerHTML = component.productPage;

            view.loadingScreen("block");
            await view.showProductPage(otherInfo);
            view.loadingScreen("none");
            break;
        case "detailProduct":
            main.innerHTML = component.detailProduct;

            view.loadingScreen("block");
            await view.showDetailProduct(otherInfo);
            view.loadingScreen("none");

            break;
        case "profilePage":
            main.innerHTML = component.profilePage;

            view.loadingScreen("block");
            view.showProfilePage();
            view.loadingScreen("none");
            break;

        case "checkoutPage":
            main.innerHTML = component.checkoutPage;

            view.loadingScreen("block");
            await view.showCheckoutPage();
            view.loadingScreen("none");
            view.loadTotalCart();
            break;
        case "billPage":
            main.innerHTML = component.billPage;
            break;
        case "aboutUs":
            main.innerHTML = component.aboutUs;
            break;
        case "contact":
            main.innerHTML = component.contact;
    }
};

view.login = (e) => {
    e.preventDefault();

    let loginForm = document.getElementById("loginForm");
    let data = {
        email: loginForm.email.value,
        password: loginForm.password.value,
    };
    controller.login(data);
};

view.register = (e) => {
    e.preventDefault();
    let option = document.getElementsByTagName("option");

    let registerForm = document.getElementById("registerForm");
    let data = {
        name: registerForm.name.value,
        phone: registerForm.phone.value,
        email: registerForm.email.value,
        address: registerForm.address.value,
        dob: registerForm.dob.value,
        password: registerForm.password.value,
        confirmPw: registerForm.confirmPw.value,
    };

    for (let i = 0; i < option.length; i++) {
        if (option[i].selected == true) {
            if (option[i].value != "") {
                data.gender = option[i].value;
                view.setErrorMessage("gender-error", "");
            } else {
                view.setErrorMessage("gender-error", "Please choose the Gender");
            }
        }
    }

    controller.register(data);
};

view.sendResetPassword = () => {
    const auth = firebase.auth();
    const email = document.getElementById("confirmEmail").value;

    if (controller.validateEmail(emailAddress.value)) {
        auth
            .sendPasswordResetEmail(email)
            .then(function() {
                alert("Please check your email!");
            })
            .catch(function(error) {
                // An error happened.
                console.log("Error updating password for user");
                console.log(error);
            });
    } else {
        alert("Please Enter Your Email Address!");
    }
};

//==========================================HOME =================================================================================================================================
// đoạn này show sản phẩm ở trang chủ
view.showHomePage = async() => {
    let newItem = document.getElementsByClassName("newItem");
    let topItem = document.getElementsByClassName("topItem");
    let newProductData = await view.getNewProductData();
    let topSellerProductData = await view.getTopSellerProductData();
    // đoạn này xử lí xem show ra bnh sản phẩm

    // đoạn này load ra sp new và bestSeller
    for (let i = 0; i < 8; i++) {
        newItem[i].innerHTML += view.htmlItemProduct(newProductData[i]);
        topItem[i].innerHTML += view.htmlItemProduct(topSellerProductData[i]);
    }
};

// function này get ra sp mới.
view.getNewProductData = async() => {
    let data = await model.getProductsData();
    let newData = data.sort((a, b) =>
        a.inCart < b.inCart ? 1 : b.inCart < a.inCart ? -1 : 0
    );
    return newData;
};

// function này xử lí dữ liệu để lấy ra sp bán nhiều nhất.
view.getTopSellerProductData = async() => {
    let dataProduct = model.productData;
    let dataOrder = await model.getCollectionData("orders");

    let dataProductTopPerform = [];
    let unique = [];
    let enableUnique = [];
    let flag = {};
    // vòng for này để lấy tất cả sp có trong các order
    for (let i = 0; i < dataOrder.length; i++) {
        //console.log(data[i].items);
        for (let j = 0; j < dataOrder[i].items.length; j++) {
            //console.log(data[i].items[j]);
            dataProductTopPerform.push(dataOrder[i].items[j]);
        }
    }
    // đoạn này lọc ra sp trùng
    dataProductTopPerform.forEach((elm) => {
        if (!flag[elm.id]) {
            flag[elm.id] = true;
            unique.push(elm);
        } else {
            unique.forEach((item) => {
                if (item.id === elm.id) {
                    item.inCart = item.inCart + elm.inCart;
                }
            });
        }
    });
    // console.log(unique);
    // check xem sp trong unipue hiện tại có enable k.
    for (let i = 0; i < dataProduct.length; i++) {
        for (item of unique) {
            if (dataProduct[i].id === item.id) {
                enableUnique.push(item);
            }
        }
    }
    return enableUnique.sort((a, b) =>
        a.inCart < b.inCart ? 1 : b.inCart < a.inCart ? -1 : 0
    );
};

view.htmlItemProduct = (data) => {
    const html = `
        <div class="item_chose" onclick ="view.setScreenBtn('detailProduct/${data.id}')">
            <div class="item_img" >
                <a ><img style="height: 250px; width:250px" src="${data.img[0]}" class="img-fluid" alt="https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png"></a>
            </div>
            <div class="item_title"><a >${data.name}</a></div>
            <div class="item_price">${data.price} $</div>
        </div>
        <div class="buy_now">
            <a>
                <button onclick="view.addCart('${data.id}',1,false)" type="button" class="addCartBtn btn btn-danger">ADD TO CART</button>
            </a>
        </div>`;
    return html;
};

//function này thêm sp vừa đc chọn vào giỏ hàng.
view.addCart = async(id, num, multi = true) => {
    let data = await model.getProductDataById(id);
    data = data[0];
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    flag = true;
    if (num !== 0) {
        if (data.availableQuantity !== 0) {
            if (cartItems != null) {
                if (cartItems[data.id] == undefined) {
                    data.inCart = num;
                    cartItems = {
                        ...cartItems,
                        [data.id]: data,
                    };
                } else {
                    if (data.availableQuantity < cartItems[data.id].inCart) {
                        alert("The number of available products is not sufficient!");
                        flag = false;
                    } else {
                        if (multi) {
                            cartItems[data.id].inCart = num;
                        } else {
                            cartItems[data.id].inCart += num;
                        }
                    }
                }
            } else {
                data.inCart = num;
                cartItems = {
                    [data.id]: data,
                };
            }
        } else {
            alert("This Item out of stock");
            flag = false;
        }
    } else {
        alert("Invalid Quantity");
        flag = false;
    }

    if (flag) {
        localStorage.setItem("productInCart", JSON.stringify(cartItems));
        view.setTotalCart(cartItems);
    }
};

//productPage==============================================================================================================================
view.showProductPage = async(category) => {
    let dataCategory = await model.getCollectionData("categories");

    // load ra filter bằng brandName và logo
    view.loadViewByCategory(dataCategory);

    let data = undefined;

    if (category === "all") {
        data = await model.getProductsData(category);
        document.getElementById(category).checked = true;
    } else {
        data = await model.getProductsDataByCategory(category);
        document.getElementById(category).checked = true;
    }

    let productList = document.getElementById("productList");
    let colum = document.getElementsByClassName("col-sm");
    let row = Math.ceil(data.length / 3);

    productList.innerHTML = "";
    for (let i = 0; i < row; i++) {
        productList.innerHTML += `
        <div class="row">
            <div class="itemColum col-sm">
            </div>
            <div class="itemColum col-sm">
            </div>
            <div class="itemColum col-sm">
            </div>
        </div>`;
    }

    for (let i = 0; i < data.length; i++) {
        colum[i].innerHTML += view.htmlItemProduct(data[i]);
    }

    view.loadMoreItem(6, 6);
};

// function này load ra mấy cái filter theo category á.
view.loadViewByCategory = (data) => {
    let categoryLogo = document.getElementById("categoryLogo");
    let categoryName = document.getElementById("categoryName");
    categoryLogo.innerHTML = "";
    categoryName.innerHTML = `
        <input id='all' onclick="view.setScreenBtn('productPage/all')" type="radio" >
        <label for="all">All</label><br>`;
    for (let i = 0; i < data.length; i++) {
        const { brand, logo } = data[i];
        categoryName.innerHTML += `
        <input id="${brand.toLowerCase()}" onclick="view.showProductPage('${brand.toLowerCase()}')"  type="radio" >
        <label for="iphone">${data[i].brand.toUpperCase()}</label><br>`;
        categoryLogo.innerHTML += `<li onclick="view.showProductPage('${brand}')"><img src="${logo}" alt=""></li>`;
    }
};

// function này chỉ cho phép loaded item đc hiển thị, còn lại ẩn, khi ấn vào view more sẽ load ra loading item nữa, cho đến hết
view.loadMoreItem = (loaded, loading) => {
    const viewMoreBtn = document.getElementById("viewMoreBtn");
    var items = Array.from(document.getElementsByClassName("itemColum"));
    maxItems = loaded;
    loadItems = loading;
    hiddenClass = "hiddenStyle";
    hiddenItems = Array.from(document.getElementsByClassName("hiddenStyle"));

    items.forEach(function(item, index) {
        if (index > maxItems - 1) {
            item.style.display = "none";
            item.classList.add("hiddenStyle");
        }
    });
    // đoạn này tham khảo nên đ hiểu lắm
    viewMoreBtn.addEventListener("click", function() {
        [].forEach.call(
            document.querySelectorAll("." + hiddenClass),
            function(item, index) {
                if (index < loadItems) {
                    item.classList.remove(hiddenClass);
                    item.style.display = "block";
                    if (document.querySelectorAll("." + hiddenClass).length === 0) {
                        viewMoreBtn.style.display = "none";
                    }
                }
            }
        );
    });
    if (document.querySelectorAll("." + hiddenClass).length === 0) {
        viewMoreBtn.style.display = "none";
    }
};

// function này show ra detail Product trong trang của Ng dùng
view.showDetailProduct = async(id) => {
    let productId = id;

    let dataArray = await model.getProductDataById(productId);
    let data = dataArray[0];
    let dataDetail = data.detail;

    const { video, des } = data;
    const wrapperDetail = document.getElementById("wrapperDetail");
    const descriptionDetail = document.getElementById("descriptionDetail");

    wrapperDetail.innerHTML = view.htmlDetailProduct(data, dataDetail);
    view.setAvailableStatusProduct(data);

    // đoạn này load ra video,word mô tả sản phẩm
    descriptionDetail.innerHTML = `
        <h3>DESCRIPTION OF PRODUCT</h3>
        <div class="description_infor">
            ${video}
            <p> ${des}</p>
        </div>`;

    let itemRelate = document.getElementsByClassName("itemRelate");
    let dataRelateProduct = await model.getProductsDataByCategory(data.category);
    console.log(dataRelateProduct);
    for (let i = 0; i < dataRelateProduct.length; i++) {
        itemRelate[i].innerHTML += view.htmlItemProduct(dataRelateProduct[i]);
    }
};

//function này để xét trạng thái của sản phẩm còn hàng/hết hàng trong Detail Product.
view.setAvailableStatusProduct = (data) => {
    if (data.availableQuantity !== 0) {
        return (document.getElementById(
            "statusDetail"
        ).innerHTML = `${data.availableQuantity} <small> PRODUCTS LEFT</small>`);
    } else {
        document.getElementById("addBtn").removeAttribute("onclick");
        document.getElementById("addBtn").style.opacity = "0.5";
        return (document.getElementById("statusDetail").innerHTML = "Out of Stock");
    }
};
view.htmlDetailProduct = (data, dataDetail) => {
    const html = `
    <div class="show_img col-md-6">
        <div class="preview-img tab-content">
            <div class="tab-pane active" id="img-1"><img src="${data.img[0]}" alt="">
            </div>
            <div class="tab-pane" id="img-2"><img src="${data.img[1]}" alt="">
            </div>
            <div class="tab-pane" id="img-3"><img src="${data.img[2]}" alt="">
            </div>
            <div class="tab-pane" id="img-4"><img src="${data.img[3]}" alt="">
            </div>
        </div>
        <ul class="list_img_product nav nav-tabs">
            <li class="active">
                <a data-target="#img-1" data-toggle="tab"><img src="${data.img[0]}" alt=""></a>
            </li>
            <li>
                <a data-target="#img-2" data-toggle="tab"><img src="${data.img[1]}" alt=""></a>
            </li>
            <li>
                <a data-target="#img-3" data-toggle="tab"><img src="${data.img[2]}" alt=""></a>
            </li>
            <li>
                <a data-target="#img-4" data-toggle="tab"><img src="${data.img[3]}" alt=""></a>
            </li>
        </ul>
        </div>
        <div class="infor_product col-md-6">
        <h3 class="product_name">${data.name}</h3>
        <div class="product_price">
            <h3>$ ${data.price}</h3>
        </div>
        <div class="specifications">
            <h4>SPECIFICATIONS</h4>
            <table class="table table-borderless">
                <tbody>
                    <tr>
                        <th>Screen:</th>
                        <td>${dataDetail.display}</td>
                    </tr>
                    <tr>
                        <th>Operating system:</th>
                        <td>${dataDetail.os}</td>
                    </tr>
                    <tr>
                        <th>Rear camera:</th>
                        <td>${dataDetail.rearCam}</td>
                    </tr>
                    <tr>
                        <th>Front camera:</th>
                        <td>${dataDetail.frontCam}</td>
                    </tr>
                    <tr>
                        <th>CPU:</th>
                        <td>${dataDetail.chip}</td>
                    </tr>
                    <tr>
                        <th>RAM:</th>
                        <td>${dataDetail.ram}</td>
                    </tr>
                    <tr>
                        <th>Internal Memory:</th>
                        <td>${dataDetail.capacity} GB</td>
                    </tr>
                    <tr>
                        <th>Battery Capacity:</th>
                        <td>${dataDetail.battery} mAh</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="status_product">
            <table class="table table-borderless">
                <tbody>
                    <tr>
                        <th>Status:</th>
                        <td id="statusDetail"> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="add_to_cart">
            <button id="addBtn" onclick="view.addCart('${data.id}',1)" type="button" class="btn btn-danger">ADD TO CART</button>
        </div>
    </div>
    `;
    return html;
};

// function này tính tổng tiền trong giỏ hàng
view.setTotalCart = () => {
    let productInCart = JSON.parse(localStorage.getItem("productInCart"));
    if (productInCart) {
        productInCart = Object.values(productInCart);
        let total = 0;
        for (let item of productInCart) {
            total += item.price * item.inCart;
        }
        localStorage.setItem("totalCart", total);
        view.loadTotalCart();
    }
};

// đoạn này show ra total sp đag có trong giỏ hàng
view.loadTotalCart = () => {
    let cartTotalSpan = document.querySelectorAll(".cartTotal");
    let cartTotal = localStorage.getItem("totalCart");
    if (cartTotal) {
        cartTotal = parseInt(cartTotal);
        for (let i = 0; i < cartTotalSpan.length; i++) {
            cartTotal == 0 ?
                (cartTotalSpan[i].textContent = `$ 0`) :
                (cartTotalSpan[i].textContent = `$ ${cartTotal}`);
        }
    }
    view.loadSubCart();
};

//đoạn này tính discount cho user
view.setDiscountTotal = (cartTotal) => {
    let discountTotal = function(n) {
        return (discountTotal = Math.round((cartTotal * (100 - n)) / 100));
    };
    let a = 0;
    let memberShip = parseInt(model.currentUser.memberShip);
    if (model.currentUser) {
        if (memberShip < 5000) {
            document.getElementById("discountPercent").textContent = "(0.5 %)";
            a = discountTotal(0.5);
        } else if (memberShip > 5000 && memberShip < 50000) {
            document.getElementById("discountPercent").textContent = "(2.5 %)";
            a = discountTotal(2.5);
        } else if (memberShip > 50000 && memberShip < 100000) {
            a = discountTotal(5);
            document.getElementById("discountPercent").textContent = "(5 %)";
        } else if (memberShip > 100000) {
            a = discountTotal(7.5);
            document.getElementById("discountPercent").textContent = "(7.5 %)";
        }
    }
    return a;
};

// load ra cái giỏ hànng nhỏ lúc hover vào
view.loadSubCart = () => {
    let subCartItem = document.getElementById("subCartItem");
    let productInCart = JSON.parse(localStorage.getItem("productInCart"));
    subCartItem.innerHTML = "";
    if (productInCart) {
        productInCart = Object.values(productInCart);
        if (productInCart !== 0) {
            let i = 0;
            for (item of productInCart) {
                subCartItem.innerHTML += `
            <a class="dropdown-item" href="#">
                <div class="header_infor_order">
                    <img src="${item.img[0]}" alt="">
                    <span class="item-name">${item.name}</span><br>
                    <span class="item-price">$ ${item.price}</span>
                    <span class="item-quantity">Quantity : <small>${
                      item.inCart
                    }</small></span>
                </div>
                <div class="header_delete_product">
                    <i onclick="view.removeItemInCart(${i++})" class="fas fa-trash-alt"></i>
                </div>
            </a>`;
            }
        }
    } else {
        subCartItem.innerHTML = `Cart Is Empty!`;
    }
};

view.loadSubCategory = async() => {
    let subCategoryDropdown = document.getElementById("subCategoryDropdown");
    let data = await model.getCollectionData("categories");

    data.sort((a, b) => (a.brand > b.brand ? 1 : b.brand > a.brand ? -1 : 0));
    subCategoryDropdown.innerHTML = "";
    for (let item of data) {
        subCategoryDropdown.innerHTML += `<li><a onclick="view.setScreenBtn('productPage/${item.brand.toLowerCase()}')" class="dropdown-item" >${
      item.brand
    }</a></li>`;
    }

    let dropdropdownitem = document.getElementsByClassName("dropdown-item");

    for (let i = 0; i < dropdropdownitem.length; i++) {
        dropdropdownitem[i].addEventListener("click", () => {
            document.getElementById("navItemDropdown").removeAttribute("onclick");
        });
    }

    document
        .getElementById("navItemDropdown")
        .setAttribute("onclick", "view.setScreenBtn('productPage/all');");
};

view.redirectToProductPage = (category) => {
    document.getElementById("app").innerHTML = "";
    view.setActiveScreen("productPage");
    view.showProductPage(category);
};

//CHECKOUTPAGE=============================================================================================================================

view.showCheckoutPage = (e) => {
    const userData = model.currentUser;
    const deleteItem = document.getElementsByClassName("deleteItem");
    const quantityItem = document.getElementsByClassName("quantityItem");
    let totalCart = parseInt(localStorage.getItem("totalCart"));
    let productInCart = JSON.parse(localStorage.getItem("productInCart"));
    let tbodyCartItem = document.getElementById("tbodyCartItem");
    let defaultAddress = document.getElementById("defaultAddress");
    let paypalBtn = document.getElementById("paypalBtn");
    let discountTotal = document.getElementById("discountTotal");
    if (productInCart) {
        productInCart = Object.values(productInCart);
        tbodyCartItem.innerHTML = "";
        // show ra list sản phẩm trong giỏ hàng
        for (let item of productInCart) {
            tbodyCartItem.innerHTML += view.htmlCartItem(item);
        }
    } else {
        document.getElementById("cashBtn").classList.add("disableddiv");
        document.getElementById("paypalBtn").classList.add("disableddiv");
        tbodyCartItem.innerHTML = `Cart is Empty!`;
    }

    // // lắng nghe sự kiện thay đổi value Quantity vặ sự kiện Delete Item trong giỏ hàng
    for (let i = 0; i < quantityItem.length; i++) {
        quantityItem[i].addEventListener("change", async(e) => {
            let num = Number(quantityItem[i].value);
            console.log(productInCart[i].availableQuantity);
            if (!isNaN(num)) {
                if (num !== 0 && num <= productInCart[i].availableQuantity) {
                    await view.addCart(productInCart[i].id, num);
                    view.showCheckoutPage();
                } else {
                    alert("Invalid Quantity");
                    view.showCheckoutPage();
                }
            }
        });
        deleteItem[i].addEventListener("click", (e) => {
            console.log("huan");
            view.removeItemInCart(i);
            e.preventDefault();
            view.showCheckoutPage(e);
        });
    }
    // đoạn này check xem login chưa để hiển thị form địa chỉ.
    if (model.currentUser) {
        // đoạn này hiển thị total sau khi discount.
        if (totalCart) {
            totalCart = view.setDiscountTotal(totalCart);
            discountTotal.textContent = `$ ` + totalCart;
        }
        //load ra address của user.
        defaultAddress.innerHTML = view.htmlDefaultAddressForm(userData);
        view.removeSuggestLogin();
    } else {
        defaultAddress.style.display = "none";
        document.getElementById("otherAddress").style.display = "block";
        document.querySelector(".shipTo").style.display = "none";
        discountTotal.textContent = `$ ` + totalCart;
    }

    let createBill = {
        createOrder: function(data, actions) {
            // This function sets up the details of the transaction, including the amount and line item details.
            if (totalCart) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: totalCart,
                        },
                    }, ],
                });
            } else {
                alert("error");
            }
        },
        onApprove: function(data, actions) {
            // This function captures the funds from the transaction.
            return actions.order.capture().then(function(details) {
                // This function shows a transaction success message to your buyer.
                console.log(details);
                alert(
                    "Transaction completed by " +
                    details.payer.name.given_name +
                    "huan" +
                    details.txn_id
                );
                view.createBill("paypal");
            });
        },
    };
    // đoạn này render ra nút thanh toán bằng paypal
    paypalBtn.innerHTML = "";
    paypal.Buttons(createBill).render(paypalBtn);
};

// function này ẩn/hiện form otherAddress.
var a = 0;

function otherAddress() {
    let otherAddress = document.getElementById("otherAddress");
    let defaultAddress = document.getElementById("defaultAddress");
    if (a == 0) {
        otherAddress.style.display = "block";
        otherAddress.classList.add("chooseAddress");
        defaultAddress.classList.remove("chooseAddress");
        defaultAddress.classList.add("disableddiv");
        a = 1;
    } else {
        otherAddress.style.display = "none";
        defaultAddress.classList.remove("disableddiv");
        otherAddress.classList.remove("chooseAddress");
        defaultAddress.classList.add("chooseAddress");
        a = 0;
    }
}

view.paymentBtn = (value) => {
    let cashBtn = document.getElementById("cashBtn");
    let paypalBtn = document.getElementById("paypalBtn");

    if (value == "cash") {
        cashBtn.style.display = "block";
        paypalBtn.style.display = "none";
    } else {
        paypalBtn.style.display = "block";
        cashBtn.style.display = "none";
    }
};

view.htmlDefaultAddressForm = (data) => {
    html = `
    <div class="section_title">
    <h3 class="title">BILLING ADDRESS</h3>
    </div>
    <div class="form_group">
        <input class="input" type="text" name="name" placeholder="Name" value="${data.name}" required>
    </div>
    <div class="form_group">
        <input class="input" type="email" name="email" placeholder="Email" value="${data.email}" required>
    </div>
    <div class="form_group">
        <input class="input" type="text" name="address" placeholder="" value="${data.address}" required>
    </div>
    <div class="form_group">
        <input class="input" type="tel" name="phone" placeholder="Telephone" value="${data.phone}" required>
    </div>`;
    return html;
};

view.htmlCartItem = (data) => {
    let html = `
    <tr>
        <td class="scroll_table_img"><img src="${data.img[0]}" alt=""></td>
        <td class="scroll_table_name">${data.name}</td>
        <td class="scroll_table_quantity"><input class="quantityItem" type="number" placeholder="" min="1" value="${
          data.inCart
        }"></td>
        <td class="scroll_table_price">$ ${data.price * data.inCart}</td>
        <td ><a class="deleteItem"><i class="fas fa-trash-alt"></i></a></td>
    </tr>`;
    return html;
};

view.removeItemInCart = (indexRemove) => {
    let productInCart = localStorage.getItem("productInCart");
    productInCart = JSON.parse(productInCart);
    productInCart = Object.values(productInCart);
    productInCart.splice(indexRemove, 1);
    localStorage.setItem("productInCart", JSON.stringify(productInCart));
    view.setTotalCart();
};

view.htmlBill = (data) => {
    let html = `
    <div class="main_bill">
            <div class="infor_invoice">
                <div class="infor_invoice_left">
                    <span>Invoice to:</span>
                    <p class="customer_name">${data.name}</p>
                    <p class="customer_address">${data.address}, ${
    data.city
  }.</p>
                </div>
                <div class="infor_invoice_right">
                    <h2>AMOUNT</h2>
                    <h3 class="grandtotal_bill">
                        <p>$</p>
                        ${data.total}
                    </h3>
                    <p class="bill_id">Invoice# <span>${data.id}</span></p>
                    <p class="bill_date">Date <span${formatDate(
                      data.createAt
                    )}</span></p>
                </div>
            </div>
            <div class="main_item">
                <div class="bill_title_item">
                    <table>
                        <tbody class="item_bill_title">
                            <tr>
                                <td class="product_title_bill">Product</td>
                                <td class="quantity_title_bill">Quantity</td>
                                <td class="price_title_bill">Price</td>
                                <td class="total_title_bill">Total</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="bill_item">
                    <table>
                        <tbody id="tbodyBill">
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="price_bill">
                <p class="subtotal_bill">SUB TOTAL <span>${
                  data.total
                }$</span></p>
                <p class="price_ship_bill">SHIPPING <span>3$</span></p>
                <p class="grandtotal_price_bill">GRAND TOTAL <span>${
                  Number(data.total) + 3
                }$</span></p>
            </div>
            <div class="payment_method_bill">
                <h4>PAYMENT METHOD</h4>
                <div class="infor_payment">
                    <ul>
                        <li>
                            <h1>${data.methodPayment.toUpperCase()}</h1>
                            <p>${data.email}</p>
                        </li>
                        <li>
                            <h1>Bank account </h1>
                            <p>123-321-123-321</p>
                        </li>
                        <li>
                            <h1>Cheque</h1>
                            <p>Information here</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    return html;
};

// function này dựa vào thuộc tính checked để để lấy về địa chỉ để tạo đơn hàng
view.getAddressForm = () => {
    if (!model.currentUser) {
        document.getElementById("defaultAddress").classList.remove("chooseAddress");
        document.getElementById("otherAddress").classList.add("chooseAddress");
    }
    const chooseAddress = document.getElementsByClassName("chooseAddress")[0];
    const noteBill = document.getElementById("noteBill");
    let addressToAdd = {
        name: chooseAddress.name.value,
        email: chooseAddress.email.value,
        address: chooseAddress.address.value,
        phone: chooseAddress.phone.value,
        note: noteBill.value,
    };
    console.log(addressToAdd);
    if (controller.addressForm(addressToAdd)) {
        return addressToAdd;
    }
};

view.createBill = async(methodPayment) => {
    let address = view.getAddressForm();
    let productInCart = JSON.parse(localStorage.getItem("productInCart"));
    let cartTotal = localStorage.getItem("totalCart");
    let randomId = Math.floor(Math.random() * 1000000);

    if (address) {
        if (productInCart) {
            productInCart = Object.values(productInCart);
            let billData = {
                ...address,
                id: "BTEC" + randomId,
                items: [...productInCart],
                createAt: new Date().toISOString(),
                methodPayment: methodPayment,
                status: "wait",
                total: cartTotal,
            };

            if (model.currentUser) {
                billData.totalDiscount = view.setDiscountTotal(cartTotal);
            }

            if (methodPayment == "cash") {
                if (confirm("Do You Want Create This Order?")) {
                    await model.newBill(billData);
                }
            } else {
                await model.newBill(billData);
            }

            if (model.currentUser) {
                model.updateUserData(billData.email, billData.total);
            }
            view.removeLocalStorage();
            view.showBill(billData);
            console.log("2");
        } else {
            alert("Cart Is Empty");
        }
    }
};

view.showBill = async(data) => {
    console.log("1");
    await view.setActiveScreen("billPage");
    console.log("2");
    let dataItem = data.items;
    let listItem = document.getElementById("listItem");
    let grandTotal = document.getElementById("grandTotal");

    document.getElementById(
        "confirmEmail"
    ).innerHTML = `A confirmation email has been sent:<p>${data.email}</p>`;
    document.getElementById("inforOrder").innerHTML = `
    <h5>INFORMATION ORDERS</h5>
    <span>${data.name}</span>
    <span>${data.email}</span>
    <span>${data.phone}</span>`;

    document.getElementById("inforAddress").innerHTML = `
    <h5>INFORMATION ADDRESS</h5>
    <span>${data.name}</span>
    <span>${data.address}</span>
    <span>${data.phone}</span> `;

    document.getElementById(
        "paymentMethod"
    ).innerHTML = `Payment by ${data.methodPayment.toUpperCase()}`;
    document.getElementById(
        "billId"
    ).innerHTML = `<span>ORDER: #</span>${data.id}`;

    listItem.innerHTML = "";
    for (let item of dataItem) {
        listItem.innerHTML += view.htmlItemBill(item);
    }
    document.getElementById("total").textContent = `${data.total}`;

    if (model.currentUser) {
        grandTotal.textContent = `${data.totalDiscount}`;
    } else {
        grandTotal.textContent = `${data.total}`;
    }

    window.onbeforeunload = () => {
        view.setScreenBtn("homePage");
    };
};

view.htmlItemBill = (data) => {
    html = `
    <li  class="list_order">
            <div class="img_bill"><img src="${data.img[0]}" alt=""></div>
            <div class="infor_product_bill">
                <p>${data.name}</p>
                <p>x<span>${data.inCart}</span></p>
            </div>
            <div class="total_price_bill">
                <p>$<span>${data.price * data.inCart}</span></p>
            </div>
        </li>
    `;
    return html;
};

// Profile Page======================================================================================================================
view.showProfilePage = async() => {
    let dataOrders = await model.getOrdersDatabyId(model.currentUser.email);
    let listOrders = document.getElementById("listOrders");

    // document.querySelectorAll(".username").innerHTML = model.currentUser.name;
    console.log(document.querySelectorAll("username"));
    let avatar = (document.getElementById("userAvt").src =
        model.currentUser.avatar);

    document.getElementById("v-pills-order-tab").addEventListener("click", () => {
        listOrders.innerHTML = "";
        document.getElementById(
            "numberOrder"
        ).textContent = `(${dataOrders.length} Orders)`;
        let i = 0;
        // đoạn này show ra item orders
        for (item of dataOrders) {
            listOrders.innerHTML += `
            <tr class=" item  itemColum">
                <td>
                    <a href="" onclick="view.showOrder(${i++})" data-toggle="modal" data-target="#show_detail_order">#${
        item.id
      }</a>
                </td> 
                <td>${formatDate(item.createAt)}</td>
                <td>${item.note}</td>
                <td>$ ${item.total}</td>
                <td>${item.status}</td>
            </tr>`;
        }
        view.loadMoreItem(3, 3);
    });
};

view.showOrder = (index) => {
    let data = model.Orderdata[index];
    console.log(data);
    let orderItem = data.items;
    let detailModal = document.getElementById("show_detail_order");
    detailModal.style = "block";
    // load ra detail order
    detailModal.innerHTML = view.htmlOrder(data);

    // load ra item cua order
    for (item of orderItem) {
        document.getElementById("itemOrder").innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>$ ${item.price}</td>
            <td>${item.inCart}</td>
            <td>$0</td>
            <td>$${item.price * item.inCart}</td>
        </tr>
        `;
    }
};

view.htmlOrder = (data) => {
    html = `
    <div class=" modal-dialog modal_edit ">
        <div class=" modal-content modal_color ">
            <div class="modal-header modal_header_color ">
                <h5 class="modal-title " id="detail_order">STATUS ORDER:<span>Delivered</span></h5>
            </div>
            <div class=" modal-body ">
                <div class="popup_detail_order container ">
                    <h2>DETAIL ORDER: <span>#${data.id}</span></h2>
                    <p>Order date: <span>${formatDate(data.createAt)}</span></p>
                    <div class="infor_detail_order container-fluid ">
                        <div class="row ">
                            <div class="detail_infor_order col ">
                                <ul>
                                    <li>
                                        <p>RECEIVER'S ADDRESS</p>
                                    </li>
                                    <li class="infor_cus ">
                                        <h1>${data.id.toUpperCase()}</h1>
                                        <h2>Address:
                                            <Span>${data.address}</Span>
                                        </h2>
                                        <h2>Phone Number:<span>${
                                          data.phone
                                        }</span></h2>
                                    </li>
                                </ul>
                            </div>
                            <div class="detail_infor_order col ">
                                <ul>
                                    <li>
                                        <p>FORM OF DELIVERY</p>
                                    </li>
                                    <li class="infor_cus ">
                                        <p>FREESHIP</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="detail_infor_order col ">
                                <ul>
                                    <li>
                                        <p>PAYMENT METHOD</p>
                                    </li>
                                    <li class="infor_cus ">
                                        <p>${data.methodPayment.toUpperCase()}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <table class="modal_tbl table ">
                        <thead>
                            <tr>
                                <th class="modal_prd ">PRODUCTS</th>
                                <th class="modal_prd_inf ">PRICE</th>
                                <th class="modal_prd_inf ">QUANTITY</th>
                                <th class="modal_prd_inf ">SALE</th>
                                <th class="modal_prd_inf ">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody id ="itemOrder">
                            <!-- JS CODE-->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal_footer modal-footer ">
                <button type="button " class="btn btn-dark" data-dismiss="modal">CONFIRM</button>
            </div>
        </div>
    </div>
    `;
    return html;
};

// End Profile Page

// function Search========================================================================================================================
view.searchProduct = () => {
    let suggestRcmt = document.getElementById("searchrecmt");
    const inputSearch = document.getElementById("inputSearch");
    inputSearch.addEventListener("input", (e) => {
        let keySearch = e.target.value;
        if (keySearch) {
            view.filterByName(keySearch);
            suggestRcmt.style.display = "block";
        } else {
            suggestRcmt.style.display = "none";
        }
    });
    document.getElementById("app").addEventListener("click", () => {
        suggestRcmt.style.display = "none";
    });
};
view.filterByName = (keyValue) => {
    // lọc theo tên và category
    let data = model.productData.filter((item) => {
        return (
            item.name.toLowerCase().includes(keyValue.toLowerCase()) ||
            item.category.toLowerCase().includes(keyValue.toLowerCase())
        );
    });

    //sắp xếp alphabet
    data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    view.showListSearch(data, keyValue);
};

view.showListSearch = (data, keyValue) => {
    const resultSearch = document.getElementById("resultSearch");
    let a = data.length;
    resultSearch.innerHTML = "";

    if (keyValue.length > 0) {
        if (a == 0) {
            resultSearch.innerHTML = `<li><a>${keyValue}</a></li>`;
        } else if (a > 0 && a < 5) {
            resultSearch.innerHTML = `<li><a>${keyValue}</a></li>`;
            for (let i = 0; i < a; i++) {
                resultSearch.innerHTML += `<li><a onclick="view.setScreenBtn('detailProduct/${data[i].id}')">${data[i].name}</a></li>`;
            }
        } else if (a > 5) {
            resultSearch.innerHTML = `<li><a>${keyValue}</a></li>`;
            for (let i = 0; i < 5; i++) {
                resultSearch.innerHTML += `<li><a onclick="view.setScreenBtn('detailProduct/${data[i].id}')">${data[i].name}</a></li>`;
            }
        }
    } else {
        resultSearch.innerHTML = "";
    }

    if (a && model.currentLocationScreen == "productPage") {
        document.getElementById("searchBtn").addEventListener("click", (e) => {
            e.preventDefault();
            // view.setActiveScreen('productPage')
            view.showProductPage("search", data);
        });
    }
};

view.setScreenBtn = async(value) => {
    window.location.hash = value;
    const { screenName, otherInfo } = view.handlePatchName(window.location.hash);

    view.setActiveScreen(screenName, otherInfo);
    //   location.reload();
};

view.handlePatchName = (path) => {
    console.log(path);
    const pathName = path.slice(1);
    const pathArray = pathName.split("/");

    const screenName = pathArray[0];
    const otherInfo = pathArray[1];

    return { screenName, otherInfo };
};

view.signOutButton = () => {
    if (confirm("Are you sure?")) {
        firebase.auth().signOut();
        view.setScreenBtn("homePage");

        window.location.reload();
    }
};

// function này bắt lỗi xem ng dùng có nhập sai ngày ( giá trị nhập vào lớn hơn thời điểm hiện tại)
view.checkInvalidDate = (inputDate) => {
    let inpDate = new Date(inputDate);
    let currDate = new Date();
    if (inpDate.setHours(0, 0, 0, 0) >= currDate.setHours(0, 0, 0, 0)) {
        return view.setErrorMessage("dob-error", "Invalid Date");
    } else {
        return true;
    }
};

view.setErrorMessage = (elementId, content) => {
    document.getElementById(elementId).innerText = content;
};

//function này remove cart , total cart sau khi đã thanh toán.
view.removeLocalStorage = () => {
    localStorage.removeItem("totalCart");
    localStorage.removeItem("productInCart");
};

view.removeSuggestLogin = () => {
    try {
        let suggestLogin = document.querySelector("#modal_suggessted_login");
        suggestLogin.parentNode.removeChild(suggestLogin);
    } catch (err) {}
};

function formatDate(input) {
    var date = new Date(input);
    return [
        ("0" + date.getDate()).slice(-2),
        ("0" + (date.getMonth() + 1)).slice(-2),
        date.getFullYear(),
    ].join("/");
}

function changePassword() {
    if (a == 0) {
        document.getElementById("changePassword").style.display = "block";
        a = 1;
    } else {
        document.getElementById("changePassword").style.display = "none";
        a = 0;
    }
}

view.loadingScreen = (value) => {
    document.getElementById("loading").style.display = value;
};

// (function () {
//   view.setScreenBtn("homePage");
// })();