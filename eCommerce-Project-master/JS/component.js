const component = {};

component.headerAndFooter = `
<div id="app">
    <header class="header fixed-top">
    <!-- Topbar-->
        <div class="top_header topbar topbar-dark bg-dark">
            <ul class="title_top_header nav">
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fas fa-mobile-alt"></i><span> 0387798072</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="far fa-envelope"></i><span> BTECSTORE@FPT.EDU.VN</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fas fa-map-marker-alt"></i><span> 107 Nguyen Phong Sac, Dich
                            Vong Hau, Cau Giay, Ha Noi.</span></a>
                </li>
            </ul>
        </div>
        <div class="main_header navbar-sticky">
            <div class="title_main_header navbar navbar-expand-lg navbar-light">
                <div class="main_header_title container">
                    <a onclick ="view.setScreenBtn('homePage')" class="logo_img navbar-brand d-none d-sm-block mr-3 flex-shrink-0" ><img
                            src="img/logoshop.png" alt=""></a>
                    <a class="logo_img_rps navbar-brand d-sm-none mr-2" href="index.html"><img src="img/logoshop.png"
                            alt=""></a>
                    <!---search--->
                    <div class="search_box input-group-overlay d-none d-lg-flex mx-4">
                        <input id="inputSearch" class="form-control" type="text" placeholder="Search" aria-label="Search">
                        <a id="searchBtn" class="search_btn"><i class="fas fa-search"></i></a>
                        <div id="searchrecmt" class="search_recmt">
                            <ul id="resultSearch">
                                <!-- JS-->
                            </ul>
                        </div>
                    </div>
                    <!--end search-->
                    <div class="header_funtion navbar-toolbar d-flex flex-shrink-0 align-items-center drop_down">
                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarCollapse"><span><i class="fas fa-bars"></i></span></button>
                        <div id="profile" class="header_funtion_title navbar-tool-icon-box">
                        <a ><i class="far fa-heart" data-toggle="modal" ></i><span class="navbar-tool-tooltip"></span></a>
                        </div>
                        <div id="dropdownlogin" class="header_funtion_title navbar-tool-icon-box "  >
                            <a id="directProfilePage"  data-toggle="modal" data-target="#modal_login">
                                <i class="far fa-user"></i>
                                <p class="navbar-tool d-none d-lg-flex"><span class="navbar-tool-tooltip">
                                    <small class="userName">Hello, Sign in</small></br>MY ACCOUNT</span>
                                </p>
                            </a>
                            <!-- show_funtion_login -->
                            <div class="show_funtion_login dropdown-menu" aria-labelledby="dropdownLogin">
                                <a id="dropDownProfile" class="dropdown-item"  ><i class="fas fa-user-circle"></i> MY ACCOUNT</a>
                                <a class="dropdown-item" onclick="view.signOutButton()"><i class="fas fa-sign-out-alt"></i> LOGOUT</a>
                            </div>
                            <!--end show_funtion_login -->
                        </div>
                        <div class="header_funtion_title header_cart navbar-tool-icon-box dropdown">
                                <a onclick="view.setScreenBtn('checkoutPage')" id="dropdownCart"><i class="fab fa-opencart"></i>
                                    <p class="navbar-tool d-none d-lg-flex "><span class="navbar-tool-tooltip"><small>My Cart</small></br><span class="cartTotal">0</span></p>
                                </a>
                            <div class="show_cart_header dropdown-menu" aria-labelledby="dropdownCart">
                                
                                <div id="subCartItem" class="header_product">
                                    <!-- JS CODE -->
                                </div>
                                <div class="header_checkout">
                                    <ul>
                                        <li class="header_total">GRAND TOTAL : <span class="cartTotal">0</span></li>
                                        <li class="header_funtion_checkout"><a ><button onclick="view.setScreenBtn('checkoutPage')" type="" class="btn btn-danger">CHECKOUT</button></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main_nav_show navbar navbar-expand-lg navbar-light navbar-stuck-menu mt-n2 pt-0 pb-2">
            <div class="main_nav container">
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <!-- Search-->
                    <div class="input-group-overlay d-lg-none my-3">
                        <div class="input-group-prepend-overlay"><span class="input-group-text"><i
                                    class="czi-search"></i></span></div>
                        <input class="form-control prepended-form-control" type="text" placeholder="Search...">
                    </div>
                    <!-- Primary menu-->
                    <ul class="main_nav_title navbar-nav">
                        <li onclick ="view.setScreenBtn('homePage')" class=" nav-item"><a class="nav-link" >Home</a></li>
                        <li id="navItemDropdown" onclick ="view.setScreenBtn('productPage/all')" class="nav-item dropdown"><a class="nav-link dropdown-toggle" 
                                data-toggle="dropdown">Products</a>
                            <ul id="subCategoryDropdown" class="dropdown-menu">
                                <!-- JS CODE -->
                            </ul>
                        </li>
                        <li class="nav-item"><a class="nav-link" onclick ="view.setScreenBtn('contact')">Contact</a>
                        </li>
                        <li class="nav-item"><a class="nav-link" href="#">Service</a></li>
                        <li class="nav-item"><a class="nav-link" onclick ="view.setScreenBtn('aboutUs')">About Us</a></li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
    </header>

    <!-- div Loading -->
    <div id="loading" style=" display: none;">
        <div class="overLay"></div>
        <div class="loader"></div>
    </div>

    <!-- Modal login-->
    <div class="modal fade" id="modal_login" tabindex="-1" aria-labelledby="LoginLabel"
        aria-hidden="true">
        <div class=" modal-dialog modal_login_edit">
            <div class=" modal-content">
                <div class="modal_login_show modal-body">
                    <nav>
                        <div class="nav modal_title nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active popup_login_title"
                                id="nav-login-tab" data-toggle="tab" href="#nav-login"
                                role="tab" aria-controls="nav-login"
                                aria-selected="true">LOGIN</a>
                            <a class="nav-item nav-link popup_login_title" id="nav-register-tab"
                                data-toggle="tab" href="#nav-register" role="tab"
                                aria-controls="nav-register" aria-selected="false">REGISTER</a>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-login" role="tabpanel"
                            aria-labelledby="nav-login-tab">
                            <div class="modal_left">
                                <img src="img/login.png" alt=""></div>
                            <div class="modal_right">
                                <form id="loginForm" class="login_form">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email" required>
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" name="password" placeholder="Password" required>
                                    </div>
                                    <div class="forgot_pass">
                                        <a href="" data-toggle="modal" data-target="#modal_forgot_password" data-dismiss="modal">Forgot your password?</a>
                                    </div>
                                    <button onclick="view.login(event)" id ="loginBtn" type="submit" class="btn btn-primary">SIGN IN</button>
                                    <div class="login_api">
                                        <ul>
                                            <li>
                                                <a onclick="model.loginWithFacebook()" ><i class="fab fa-facebook-square"></i></a>
                                            </li>
                                            <li>
                                                <a onclick="model.loginGoogleAccount()" ><i class="fab fa-google"></i></a>
                                            </li>
                                            <li>
                                                <a href=""><i class="fab fa-github"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="register tab-pane fade" id="nav-register" role="tabpanel"
                            aria-labelledby="nav-register-tab">
                            <div class="modal_left_register">
                                <img src="img/login.png" alt="">
                            </div>
                            <form id="registerForm">
                                <div class="modal_right_register">
                                    <div class="input-group mb-3">
                                        <span>Full Name :</span>
                                        <input name="name" type="text" class="form-control" placeholder="Fullname" aria-label="Fullname" aria-describedby="basic-addon1">
                                        <div class="error" id="name-error"></div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span>Phone :</span>
                                        <input name="phone" type="text" class="form-control" placeholder="Numberphone" aria-label="Numberphone"aria-describedby="basic-addon1">
                                        <div class="error" id="phone-error"></div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span>Email :</span>
                                        <input name="email" type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">
                                        <div class="error" id="email-error"></div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span>Address:</span>
                                        <input name="address" type="text" class="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon1">
                                        <div class="error" id="address-error"></div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span>Date Of Birth:</span>
                                        <input name="dob" type="date" class="form-control" aria-describedby="basic-addon1">
                                        <div class="error" id="dob-error"></div>
                                    </div>
                                    <div class=" input-group mb-3">
                                        <span>Gender:</span>
                                        <select>
                                            <option value=""></option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        <div class="error" id="gender-error"></div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span>Password:</span>
                                        <input name="password" type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
                                        <div class="error" id="password-error"></div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span>Retype Password:</span>
                                        <input name="confirmPw" type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
                                        <div class="error" id="confirmPw-error"></div>
                                    </div>
                                    <button id="registerBtn" class="btn btn-warning" onclick="view.register(event)" type="button" >REGISTER</button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal forgot password-->
    <div class="modal fade" id="modal_forgot_password" tabindex="-1" role="dialog" aria-labelledby="forgot_password" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content edit_modal_forgot_password">
                <div class="modal-body">
                    <form>
                        <div class="form-group forgot_pass_body">
                            <img src="img/fgpass.jpg" alt="">
                            <p>Confirm email to change password</p>
                            <input id="confirmEmail" type="email" class="form-control"  placeholder="Enter your email...">
                        </div>
                </div>
                </form>
                <div class="modal-footer footer_modal_update_addrs">
                    <button id="confirmBtn" class="btn btn-warning btn_forgot_password type="button" onclick="view.sendResetPassword()">CONFIRM</button>
                </div>
            </div>
        </div>
    </div>
    <!-- end modal forgot password --> 
    <!-- end modal login -->

    <div id='mainContainer'>
    
    </div>


    <footer class="footer">
    <div class="footer_title">
        <div class="row">
            <div class="col-sm-6 ">
                <h1>BTEC STORE</h1>
                <ul>
                    <li>
                        <a href=""><i class="fas fa-map-marker-alt"></i><span>107 Nguyen Phong Sac, Dich Vong Hau,
                                Cau Giay, Ha Noi.</span></a>
                    </li>
                    <li>
                        <a href=""><i class="fas fa-mobile-alt"></i><span>0387798072</span></a>
                    </li>
                    <li>
                        <a href=""><i class="far fa-envelope"></i><span>BTECSTORE@GMAIL.COM</span></a>
                    </li>
                </ul>

            </div>
            <div class="col-sm-3 ">
                <h1>Customer Support</h1>
                <ul>
                    <li>
                        <a href=""><i class="far fa-question-circle"></i><span> Shopping Guide</span></a>
                    </li>
                    <li>
                        <a href=""><i class="far fa-question-circle"></i><span> Payment Guide</span></a>
                    </li>
                    <li>
                        <a href=""><i class="far fa-question-circle"></i><span> Return Policy</span></a>
                    </li>
                </ul>
            </div>
            <div class="col-sm-3 ">
                <h1>Payment Methods</h1>
                <ul>
                    <li>
                        <a href=""><i class="fas fa-money-bill"></i><span> Cash On Delivery</span></a>
                    </li>
                    <li>
                        <a href=""><i class="fab fa-cc-paypal"></i><span> Payment Via Paypal</span></a>
                    </li>
                    <li>
                        <a href=""><img src="https://goccuaphu.com/wp-content/uploads/2017/10/huong-dan-tao-tai-khoan-paypal-cho-nguoi-moi-tu-a-z.png" alt=""></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="socialNetwork">
            <div class="row d-flex justify-content-center">
                <div class="col d-flex justify-content-center my-5 pt-1">
                    <a class="fb-ic" href="">
                        <i class="fab fa-facebook-f fa-lg white-text mx-3 mx-md-4 fa-2x"> </i>
                    </a>
                    <a class="tw-ic" href="">
                        <i class="fab fa-twitter fa-lg white-text mx-3 mx-md-4 fa-2x"> </i>
                    </a>
                    <a class="gplus-ic" href="">
                        <i class="fab fa-google-plus-g fa-lg white-text mx-3 mx-md-4 fa-2x"> </i>
                    </a>
                    <a class="li-ic" href="">
                        <i class="fab fa-linkedin-in fa-lg white-text mx-3 mx-md-4 fa-2x"> </i>
                    </a>
                    <a class="ins-ic" href="">
                        <i class="fab fa-instagram fa-lg white-text mx-3 mx-md-4 fa-2x"> </i>
                    </a>
                    <a class="pin-ic" href="">
                        <i class="fab fa-pinterest fa-lg white-text mx-3 mx-md-4 fa-2x"> </i>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</div>

`;

component.homePage = `
<section class="main_page">
        <!--banner-->
        <div id="banner" class="carousel slide" data-ride="carousel">
            <ul class="carousel-indicators">
                <li data-target="#banner" data-slide-to="0" class="active"></li>
                <li data-target="#banner" data-slide-to="1"></li>
                <li data-target="#banner" data-slide-to="2"></li>
                <li data-target="#banner" data-slide-to="3"></li>
            </ul>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="img/banner1.png" alt="1">
                </div>
                <div class="carousel-item">
                    <img src="img/banner2.png" alt="2">
                </div>
                <div class="carousel-item">
                    <img src="img/banner3.png" alt="3">
                </div>
                <div class="carousel-item">
                    <img src="img/banner4.png" alt="4">
                </div>
            </div>
            <a class="carousel-control-prev" href="#banner" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#banner" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
        <!--end banner-->
        <!--service-->
        <div class="service">
            <div class="row">
                <div class="col-sm-3">
                    <div class="title_service">
                        <img src="img/handholdingmoney.png" alt="">
                        <div>
                            <span>30 Days Return Policy</span>
                            <p>Sure money back</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="title_service">
                        <img src="img/box.png" alt="">
                        <div>
                            <span>Exclusive Products</span>
                            <p>Premium Products</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="title_service">
                        <img src="img/deliver.png" alt="">
                        <div>
                            <span>Express Delivery</span>
                            <p>Fast Delivery</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="title_service">
                        <p class="secure"><img src="img/sercurecheckout.png" alt=""></p>
                        <div class="sercurecheckout">
                            <span>Secure Checkout</span>
                            <p>Safe Checkout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--end service-->
        <div class="show_products">
            <div class="hot_products">
                <div class="title">
                    <h1>New products</h1>
                    <span>New products launched during the month.</span>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <div class="item newItem">
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="item newItem">
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="item newItem">
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="item newItem">
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <div class="item newItem">
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="item newItem">
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="item newItem">
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="item newItem">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="top_sell">
                <div class="title">
                    <h1>TOP SELL</h1>
                    <span>Top selling products this month.</span>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <div class="item topItem">
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="item topItem">
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="item topItem">
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="item topItem">
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <div class="item topItem">
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="item topItem">
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="item topItem">
                            
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="item topItem">
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>

        </div>
    </section>
`;

component.detailProduct = `
<section class="main_page">
    <!--bath-->
    <nav class="bath" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="bath_edit breadcrumb-item"><a onclick ="view.setScreenBtn('homePage')" >Home</a></li>
            <li class="breadcrumb-item"><a href="#">Products</a></li>
            <li class="breadcrumb-item active" aria-current="page"></li>
        </ol>
    </nav>
    <!--end bath-->
    <div class="show_products">
        <div class="detail_product">
            <div class="container-fliud">
                <div id="wrapperDetail" class="wrapper row">
                    
                </div>
            </div>
        </div>
    </div>
    <!--decripsion of product-->
    <div id="descriptionDetail" class="description_product">
        <h3>DESCRIPTION OF PRODUCT</h3>
        <div class="description_infor">
            
        </div>
    </div>

    <!--end decripsion of product-->
    <!--relate product-->
    <div class="relate_product">
        <h3>RELATE PRODUCT</h3>
        <div id="relateItem" class="row">
            <div class="col-sm-3">
                <div class="item itemRelate">
                     
                </div>
            </div>
            <div class="col-sm-3">
                <div class="item itemRelate">
                    
                </div>
            </div>
            <div class="col-sm-3">
                <div class="item itemRelate">
                    
                </div>
            </div>
            <div class="col-sm-3">
                <div class="item itemRelate">
                    
                </div>
            </div>
        </div>
    </div>
    <!-- end relate product-->
    </div>
    </div>
</section>
`;

component.productPage = `
<section class="main_page">
    <!--bath-->
    <nav class="bath" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="bath_edit breadcrumb-item"><a onclick ="view.setScreenBtn('homePage')" href="">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Products</a></li>
            <li class="breadcrumb-item active" aria-current="page">Brand</li>
        </ol>
    </nav>
    <!--banner-->
    <div id="banner" class="carousel slide" data-ride="carousel">
        <ul class="carousel-indicators">
            <li data-target="#banner" data-slide-to="0" class="active"></li>
            <li data-target="#banner" data-slide-to="1"></li>
            <li data-target="#banner" data-slide-to="2"></li>
            <li data-target="#banner" data-slide-to="3"></li>
        </ul>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="img/banner1.png" alt="1">
            </div>
            <div class="carousel-item">
                <img src="img/banner2.png" alt="2">
            </div>
            <div class="carousel-item">
                <img src="img/banner3.png" alt="3">
            </div>
            <div class="carousel-item">
                <img src="img/banner4.png" alt="4">
            </div>
        </div>
        <a class="carousel-control-prev" href="#banner" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#banner" data-slide="next">
            <span class="carousel-control-next-icon"></span>
        </a>
    </div>
    <!--end banner-->

    <div class="show_brand">
        <div class="row">
            <div class="col-sm-3">
                <div class="filter_categories">
                    <h1>CATEGORIES</h1>
                    <form id="categoryName">
                        
                        
                    </form>
                    <h1>PRICE</h1>
                    <form>
                        <input type="radio" id="50-100$" name="price" value="iphone">
                        <label for="50-100$">50-100$</label><br>
                        <input type="radio" id="100-500$" name="price" value="100-500$">
                        <label for="100-500$">100-500$</label><br>
                        <input type="radio" id="500-1000$" name="price" value="500-1000$">
                        <label for="500-1000$">500-1000$</label><br>
                        <input type="radio" id="1000-1500$" name="price" value="1000-1500$">
                        <label for="1000-1500$">1000-1500$</label><br>
                        <input type="radio" id="over" name="price" value="over">
                        <label for="over">Over 1500$</label>
                    </form>
                    <!-- <h1>TOP SELLING</h1>
                    <div class="top_selling_brand">
                        <ul>
                            <li><a href=""></a></li>
                            <li><a href=""></a></li>
                            <li><a href=""></a></li>
                        </ul>
                    </div> -->
                </div>
            </div>
            <div class="col-sm-9">
                <div class="filter_right">
                    <h1>BRAND</h1>
                    <div  class="select_img_brand">
                        <ul id="categoryLogo">
                        </ul>
                    </div>
                </div>
                <div class="show_br">
                    <div id="productList" class="show_product_brand">
                        
                    </div>
                </div>
                <div id="viewMoreBtn" class="pagination_page">
                    <button type="button" class="btn btn-outline-secondary">View More<i class="fas fa-sort-down"></i></button>
                </div>
            </div>
        </div>
    </div>
</section>`;

component.checkoutPage = `
<!-- Modal_suggested_login-->
    <div class="modal fade" id="modal_suggessted_login" tabindex="-1" role="dialog" aria-labelledby="suggesstedLoginLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content suggessted_edit">
                <div class="suggessted modal-body">
                    <div class="main_suggessted">
                        <img src="img/planet_4x.png" alt="">
                        <p>You can log in to be able to make purchases with our store membership deals or skip this step!</p>
                    </div>
                    <div class="function_suggessted">
                        <button type="button" class="btn btn-success btn_fct btn_login" data-toggle="modal" data-target="#modal_login" data-dismiss="modal">LOGIN</button>
                        <button onclick="view.removeSuggestLogin()" type="button" class="btn btn-warning btn_fct btn_skip" data-dismiss="modal">SKIP</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
<section class="main_page">
    <!--bath-->
    <nav class="bath" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="bath_edit breadcrumb-item"><a onclick ="view.setScreenBtn('homePage')" href="">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Cart</li>
        </ol>
    </nav>
    <div class="checkout">
        <div class="row">
            <div class="col span-3-of-6">
                <div class="billing_details">
                    <form id="defaultAddress" class="chooseAddress" value="default">
                        
                    </form>
                    <div class="shiping_details">
                        <div class="section_title">
                            <h3 class="title">SHIPING ADDRESS</h3>
                        </div>
                        <div class="input_checkbox">
                            <a class="shipTo" onclick="otherAddress()">Ship to a diffrent address?</a>
                            <form class="caption" id="otherAddress" value="other">
                                <div class="form_group">
                                    <input class="input" type="text" name="name" placeholder="Name">
                                    <div id="name-error"></div>
                                </div>
                                <div class="form_group">
                                    <input class="input" type="email" name="email" placeholder="Email">
                                    <div id="email-error"></div>
                                </div>
                                <div class="form_group">
                                    <input class="input" type="text" name="address" placeholder="Address">
                                    <div id="address-error"></div>
                                </div>
                                <div class="form_group">
                                    <input class="input" type="tel" name="phone" placeholder="Telephone">
                                    <div id="phone-error"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="bill_notes">
                        <input id="noteBill" class="input" placeholder="Notes"></input required>
                    </div>
                </div>
            </div>
            <div class="col span-3-of-6">
                <div class="order_detail">
                    <div class="section_title">
                        <h3 class="title">ORDER DETAIL</h3>
                    </div>
                    <table class="order_detail_table">
                        <tbody>
                            <tr>
                                <td class="product_title_order">Product</td>
                                <td class="quantity_title_order">Quantity</td>
                                <td class="total_title_order">Total</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="scroll_table">
                        <table>
                            <tbody id="tbodyCartItem">
                                <!-- JS CODE -->
                            </tbody>
                        </table>
                    </div>
                    <div class="shipping_order">
                        <p>Shipping : <span>$ 0</span></p>
                    </div>
                    <div class="total_order">
                        <p>Grand Total :<span class="cartTotal">$ 0</span></p>
                    </div>
                    <div class="distotal_order total_order">
                        <p>Discount Total :<span id="discountPercent"></span><span id="discountTotal">$ 0</span></p>
                    </div>
                    <div class="payment">
                        <ul>
                            <li><button data-toggle="modal" data-target="#modal_suggessted_login" id="cashPayment" class="btn btn-warning" onclick="view.paymentBtn('cash')" type="button">PAYMENT IN CASH</button></li>
                            <li><button data-toggle="modal" data-target="#modal_suggessted_login" id="paypalPayment" class="btn btn-primary" onclick="view.paymentBtn('paypal')" type="button">PAYMENT VIA PAYPAL</button></li>
                        </ul>
                    </div>
                    <div class="order_checkout">
                        <div id="paypalBtn" class="" style="display:none;width: 86.5%;margin-left: 5%;height: 4rem;font-weight: 600;font-size: 20px;border: 1px solid red;"></div>
                        <button id="cashBtn" onclick="view.createBill('cash')" style="display:none" class="btn btn-danger type="button" onclick="view.getAddressForm()">CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
`;

component.profilePage = `
<section class="main_page  ">
        <!--bath-->
        <nav class="bath" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="bath_edit breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">My Account</li>
            </ol>
        </nav>
        <div class="infor_account ">
            <div class="row">
                <div class="funtion_account col-3">
                    <div class="funtion_account_header">
                        <div class="funtion_account_header-img">
                            <img src="https://scontent.fhan5-6.fna.fbcdn.net/v/t1.0-9/45268829_2092077554367432_2119947624822865920_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=0diHxc9LNuAAX8MdE-o&_nc_ht=scontent.fhan5-6.fna&oh=578e8becc9a246ebd8a5074aa2414cd1&oe=607847E2" alt="">
                        </div>
                        <div class="funtion_account_header-title">
                            <h5 id="username">Tung Tran</h5>
                            <span><i class="fas fa-user-edit"></i>EDIT INFORMATION</span>
                        </div>
                    </div>
                    <div class="nav_funtion nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a class="color_nav_link nav-link active" id="v-pills-account-tab" data-toggle="pill" href="#v-pills-account" role="tab" aria-controls="v-pills-account" aria-selected="true"><i class="fas fa-user-circle"></i>MY ACCOUNT</a>
                        <a class="color_nav_link nav-link" id="v-pills-address-tab" data-toggle="pill" href="#v-pills-address" role="tab" aria-controls="v-pills-address" aria-selected="false"><i class="fas fa-address-card"></i>MY ADDRESS</a>
                        <a class="color_nav_link nav-link" id="v-pills-order-tab" data-toggle="pill" href="#v-pills-order" role="tab" aria-controls="v-pills-order" aria-selected="false"><i class="fas fa-archive"></i>MY ORDERS</a>
                    </div>
                </div>
                <div class="show_funtion_account col-9">
                    <div class="tab-content" id="v-pills-tabContent">

                        <div class="tab-pane fade show active" id="v-pills-account" role="tabpanel" aria-labelledby="v-pills-account-tab">
                            <div class="show_funtion_header">
                                <h3>MY ACCOUNT</h3>
                                <h5>Manage profile information for account security.</h5>
                            </div>
                            <div class="avatar_account">
                                <img id="userAvt" src="" />
                                <input id="file" type="file">
                                <input type="file" id="profile_img" name="profile_img" accept=".jpg,.jpeg,.png">
                            </div>
                            <div class="show_infor_account mt-3 ">
                                <div class="input-group mb-3 ">
                                    <div class="input-group-prepend ">
                                        <span class="input-group">Username:</span>
                                    </div>
                                    <input type="text" class="form-control " placeholder="Username " id="usr " name="username ">
                                </div>
                                <div class="input-group mb-3 ">
                                    <div class="input-group-prepend ">
                                        <span class="input-group">Phonenumber:</span>
                                    </div>
                                    <input type="text" class="form-control " placeholder="Phonenumber " id="phone " name="Phonenumber">
                                </div>
                                <div class="input-group mb-3 ">
                                    <div class="input-group-prepend ">
                                        <span class="input-group">Email:</span>
                                    </div>
                                    <input type="text " class="form-control " placeholder="Email " id="email " name="Email ">
                                </div>
                                <div class="input-group mb-3 ">
                                    <div class="input-group-prepend ">
                                        <span class="input-group">Date Of Birth:</span>
                                    </div>
                                    <input type="date" class="form-control " placeholder="Date Of Birth " id="dateOfBirth" name="birth ">
                                </div>
                                <div class="input-group mb-3 ">
                                    <div class="input-group-prepend ">
                                        <span class="input-group">Gender:</span>
                                    </div>
                                    <form id="gender">
                                        <input type="radio" id="male" name="gender" value="male">
                                        <label for="male">Male</label>
                                        <input type="radio" id="female" name="gender" value="female">
                                        <label for="female">Female</label>
                                        <input type="radio" id="other" name="gender" value="other">
                                        <label for="other">Other</label>
                                    </form>
                                </div>
                                <div class="changePass">
                                <a href="" data-toggle="modal" data-target="#changePassModal" onclick="changePassWord">Change Password!</a>
                                <!-- Modal change pass-->
                                <div class="modal fade" id="changePassModal" tabindex="-1" role="dialog" aria-labelledby="changePassModalLabel" aria-hidden="true">
                                    <div class="modal-dialog " role="document">
                                        <div class="modal-content modal_change_edit">
                                            <div class="modal-header header_changePass">
                                                <h5 class="modal-title" id="changePassModalLabel">Change Your Account Password</h5>
                                            </div>
                                            <div class="modal-body body_changePass">
                                                <div class="form-group">
                                                    <input type="password" class="form-control" id="oldPass" placeholder="ENTER OLD PASSWORD!">
                                                </div>
                                                <div class="form-group">
                                                    <input type="password" class="form-control" id="newPass" placeholder="ENTER NEW PASSWORD!">
                                                </div>
                                                <div class="form-group">
                                                    <input type="password" class="form-control" id="retypePass" placeholder="RETYPE NEW PASSWORD!">
                                                </div>
                                            </div>
                                            <div class="modal-footer footer_changePass">
                                                <button type="button" class="btn btn-danger btn_change">CHANGE</button>
                                                <button type="button" class="btn btn-warning btn_clsCh" data-dismiss="modal">CLOSE</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                <button type="submit" class="btn btn-secondary">SUBMIT</button>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="v-pills-address" role="tabpanel" aria-labelledby="v-pills-address-tab">
                            <ul class="address_account ">
                                <div class="show_funtion_header ">
                                    <h3>MY ADDRESS</h3>
                                    <h5>Manage address information for shipping.</h5>
                                </div>
                                <li class="add_new_address" data-toggle="modal" data-target="#add_newAddress"><i class="far fa-plus-square"></i><span>ADD NEW ADDRESS</span></li>
                                <div class="modal fade" id="add_newAddress" tabindex="-1 " role="dialog" aria-labelledby="addNew_address" aria-hidden="true ">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="update_addressLabel">ADD NEW ADDRESS</h5>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" id="addName" placeholder="Enter your name">
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" id="addNumberphone" placeholder="Enter your phonenumber">
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" id="addAddress" placeholder="Enter your address">
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer footer_modal_addnew_addrs">
                                                <button type="button" class="btn btn-secondary btn_cancel_add_adrs" data-dismiss="modal">CANCEL</button>
                                                <button type="button" class="btn btn-primary btn_add_adrs">CONFIRM</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <li class="default_address list_address ">
                                    <div class="infor_address ">
                                        <h1>TRAN THANH TUNG <span><i class="far fa-check-circle "></i>DEFAULT ADDRESS</span></h1>
                                        <table>
                                            <tbody>
                                                <tr class="title_infor ">
                                                    <th>Address:</th>
                                                    <td>107 Nguyen Phong Sac, Dich Vong Hau, Cau Giay, Ha Noi.</td>
                                                </tr>
                                                <tr class="title_infor ">
                                                    <th>Phonenumber:</th>
                                                    <td>0123456789</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="function_address ">
                                        <button type="button" class="btn btn-warning " data-toggle="modal" data-target="#modal_update_address">UPDATE</button>
                                        <!-- Modal update address-->
                                        <div class="modal fade" id="modal_update_address" tabindex="-1" role="dialog" aria-labelledby="update_addressLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="update_addressLabel">UPDATE ADDRESS</h5>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form>
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="inputName" placeholder="Enter your name">
                                                            </div>
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="inputNumberphone" placeholder="Enter your phonenumber">
                                                            </div>
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="inputAddress" placeholder="Enter your address">
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div class="modal-footer footer_modal_update_addrs">
                                                        <button type="button" class="btn btn-secondary btn_cls_addrs" data-dismiss="modal">CANCEL</button>
                                                        <button type="button" class="btn btn-primary btn_update_addrs">UPDATE</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button " class="btn btn-danger ">DELETE</button>
                                    </div>
                                </li>
                                <li class="list_address ">
                                    <div class="infor_address ">
                                        <h1>TRAN THANH TUNG</h1>
                                        <table>
                                            <tbody>
                                                <tr class="title_infor ">
                                                    <th>Address:</th>
                                                    <td>107 Nguyen Phong Sac, Dich Vong Hau, Cau Giay, Ha Noi.</td>
                                                </tr>
                                                <tr class="title_infor ">
                                                    <th>Phonenumber:</th>
                                                    <td>0123456789</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="function_address ">
                                        <button type="button" class="btn btn-warning " data-toggle="modal" data-target="#modal_update_address">UPDATE</button>
                                        <!-- Modal update address-->
                                        <div class="modal fade" id="modal_update_address" tabindex="-1" role="dialog" aria-labelledby="update_addressLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="update_addressLabel">UPDATE ADDRESS</h5>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form>
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="inputName" placeholder="Enter your name">
                                                            </div>
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="inputNumberphone" placeholder="Enter your phonenumber">
                                                            </div>
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="inputAddress" placeholder="Enter your address">
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div class="modal-footer footer_modal_update_addrs">
                                                        <button type="button" class="btn btn-secondary btn_cls_addrs" data-dismiss="modal">CANCEL</button>
                                                        <button type="button" class="btn btn-primary btn_update_addrs">UPDATE</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button " class="btn btn-danger ">DELETE</button>
                                    </div>
                                </li>
                                <li class="list_address ">
                                    <div class="infor_address ">
                                        <h1>TRAN THANH TUNG</h1>
                                        <table>
                                            <tbody>
                                                <tr class="title_infor ">
                                                    <th>Address:</th>
                                                    <td>107 Nguyen Phong Sac, Dich Vong Hau, Cau Giay, Ha Noi.</td>
                                                </tr>
                                                <tr class="title_infor ">
                                                    <th>Phonenumber:</th>
                                                    <td>0123456789</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="function_address ">
                                        <button type="button" class="btn btn-warning " data-toggle="modal" data-target="#modal_update_address">UPDATE</button>
                                        <!-- Modal update address-->
                                        <div class="modal fade" id="modal_update_address" tabindex="-1" role="dialog" aria-labelledby="update_addressLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="update_addressLabel">UPDATE ADDRESS</h5>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form>
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="inputName" placeholder="Enter your name">
                                                            </div>
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="inputNumberphone" placeholder="Enter your phonenumber">
                                                            </div>
                                                            <div class="form-group">
                                                                <input type="text" class="form-control" id="inputAddress" placeholder="Enter your address">
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div class="modal-footer footer_modal_update_addrs">
                                                        <button type="button" class="btn btn-secondary btn_cls_addrs" data-dismiss="modal">CANCEL</button>
                                                        <button type="button" class="btn btn-primary btn_update_addrs">UPDATE</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button " class="btn btn-danger ">DELETE</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-pane fade" id="v-pills-order" role="tabpanel" aria-labelledby="v-pills-order-tab">
                            <div class="show_funtion_header">
                                <h3>MY ORDER <small id="numberOrder" >(0 ORDERS)</small></h3>
                                <h5>Manage order information for account customer.</h5>
                            </div>
                            <table class="infor_orders table ">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date Of Purchase</th>
                                        <th class="list_product_orders ">Products</th>
                                        <th>Grand Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="listOrders" class="list_orders ">
                                    <!-- JS CODE-->
                                    <div class="modal fade " id="show_detail_order" tabindex="-1 " aria-labelledby="detail_order" aria-hidden="true ">
                                        <!-- JS CODE-->
                                    </div>        
                                </tbody>
                            </table>
                            <div id="viewMoreBtn" class="pagination_page">
                                <button type="button" class="btn btn-outline-secondary">View More<i class="fas fa-sort-down"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

component.billPage = `
<div class="bill">
    <div class="show_bill">
        <div class="bill_header">
            <img src="img/logoshop.png" alt="">
        </div>
        <div class="main_bill row">
            <div class="main_bill_infor col-8">
                <div class="bill_title">
                    <div class="main_bill-icon">
                        <i class="far fa-check-circle"></i>
                    </div>
                    <div class="main_bill-title">
                        <h4>THANK YOU FOR YOUR ORDERS</h4>
                        <span id="confirmEmail">A confirmation email has been sent</span>
                        <span>Please check your email!</span>
                    </div>
                </div>
                <div class="infor_order_bill">
                    <div class="row">
                        <div id="inforOrder" class="col infor-customer">
                            
                        </div>
                        <div id="inforAddress" class="col infor-customer">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col infor-customer">
                            <h5>PAYMENT MEDTHOD</h5>
                            <span id="paymentMethod">Payment by </span>
                        </div>
                        <div class="col infor-customer">
                            <h5>SHIPPING METHOD</h5>
                            <span>Cash On Delivery</span>
                        </div>
                    </div>
                </div>
                <div class="bill_function">
                    <button onclick="view.setScreenBtn('homePage')" type="button" class="btn btn-success">Continue shopping</button>
                    <button type="button" class="btn btn-warning" onclick="window.print()"><i class="fas fa-print"></i>PRINT</button>
                </div>
            </div>
            <div class="infor_bill col-4">
                <div class="infor_bill_header" id="billId"><span>ORDER: #</span></div>
                <div class="infor_bill_show">
                    <ul id="listItem">
                        
                    </ul>
                </div>
                <div class="infor_bill_grandTotal">
                    <div class="total_all_pr">
                        <p  class="title_grand">Total :<span id="total">$ 0</span></p>
                    </div>
                    <div class="shipping_bill">
                        <p class="title_grand">Shipping :<span>FREESHIP</span></p>
                    </div>
                    <div class="grandTotal_bill">
                        <p class="title_grand">Grand total :<span id="grandTotal">$ 0</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>  
`;


component.aboutUs = `
<section class="main_page">
<!--bath-->
<nav class="bath" aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="bath_edit breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Abouts Us</li>
    </ol>
</nav>
<div class="about_us_infor">
    <div class="about_us_title">
        <h5>WHO ARE WE</h5>
        <h3>WELCOME TO BTEC STORE</h3>
        <h6>With the motto "All for customers", BTEC STORE always strives to improve the quality of services and products, thereby providing a complete shopping experience for customers with fast delivery service in 2 hours and the next day BTECNOW
            for the first time in Southeast Asia, together with a commitment to provide genuine goods with a 111% refund policy if found counterfeit goods.</h6>
    </div>
</div>
<div class="about_product">
    <div class="container">
        <div class="list_brand row">
            <div class="about_brand col">
                <div class="brand_img"> <img src="/IMG/iphonebrand.png" alt="">
                </div>
                <div class="title_brand"><span><h1>IPHONE</h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, magni. Quam molestias labore sequi deserunt quae aliquid? Maxime consectetur natus necessitatibus laudantium quo eum, officia accusantium architecto blanditiis voluptatibus vel.</span>
                </div>
            </div>
            <div class="about_brand col">
                <div class="brand_img"> <img src="/IMG/samsungbrand.png" alt="">
                </div>
                <div class="title_brand"><span><h1>SAMSUNG</h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, magni. Quam molestias labore sequi deserunt quae aliquid? Maxime consectetur natus necessitatibus laudantium quo eum, officia accusantium architecto blanditiis voluptatibus vel.</span>
                </div>
            </div>
            <div class="about_brand col">
                <div class="brand_img"> <img src="/IMG/vsmartbrand.png" alt="">
                </div>
                <div class="title_brand"><span><h1>VSMART</h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, magni. Quam molestias labore sequi deserunt quae aliquid? Maxime consectetur natus necessitatibus laudantium quo eum, officia accusantium architecto blanditiis voluptatibus vel.</span>
                </div>
            </div>
        </div>
    </div>
</div>

</section>
`;

component.contact = `
<section class="main_page">
        <!--bath-->
        <nav class="bath" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="bath_edit breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Contact</a></li>
            </ol>
        </nav>
        <!--end bath-->
        <div class="contact">
            <h1>OUR BRANCHES IN VIETNAM</h1>
            <table class="infor_contact table">
                <thead>
                    <tr>
                        <th>BTEC STORE HA NOI</th>
                        <th>BTEC STORE DA NANG</th>
                        <th>BTEC STORE HO CHI MINH</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0981 090 513</td>
                        <td>0905 888 535</td>
                        <td>0931 31 33 29</td>
                    </tr>
                    <tr>
                        <td>BTECSTORE.HN@FPT.EDU.VN</td>
                        <td>BTECSTORE.DN@FPT.EDU.VN</td>
                        <td>BTECSTORE.HCM@FPT.EDU.VN</td>
                    </tr>
                    <tr>
                        <td><a href="">107 Nguyen Phong Sac, Dich Vong Hau, Cau Giay, Ha Noi.</a></td>
                        <td><a href="">66 Vo Van Tan, Chinh Gian, Thanh Khe, Da Nang.</a></td>
                        <td><a href="">275 Nguyen Van Dau,Phuong 11, Binh Thanh, Thanh Pho Ho Chi Minh.</a></td>
                    </tr>
                </tbody>
            </table>
            <img src="./img/maps.png" alt="">
        </div>
    </section>
`;