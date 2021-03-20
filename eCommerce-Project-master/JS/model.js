const model = {};
// biến này để lưu ng dùng hiện tại là ai?
model.currentUser = undefined;


// array này lưu tất cả dữ liệu của toàn bộ sp
model.productData = undefined;

// array này lưu tất cả category của toàn bộ sp
model.categoryData = undefined;
// array này chức Data vừa lọc đc
model.filterProductData = [];

//LOGIN--------------------------------------------------------------------------------------------------------------------------------
// function này tạo tài khoản cho ng dùng mới
model.register = async (data) => {
    let flag = true;
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
        firebase.auth().currentUser.updateProfile({
            displayName: data.name,
        });
        firebase.auth().currentUser.sendEmailVerification();

    } catch (err) {
        alert(err)
        flag = false
    }
    if (flag) {
        //đoạn này nếu register thành công thì mới thêm user trong db.
        model.newUser(data);
    }
};
// function này thêm mới user trong db, 
model.newUser = (data) => {
    dataToAdd = {
        avatar: 'https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png',
        address: data.address,
        createdOrders: 0,
        dob: data.gender,
        email: data.email,
        gender: data.gender,
        memberShip: 0,
        name: data.firstName + ' ' + data.lastName,
        phone: data.phone,
        password: data.password,
        status: true,
        role: 'user'
    }
    firebase.firestore().collection('users').doc(data.email).set(dataToAdd);
};


model.getCurrentUserData = async (email) => {
    const response = await firebase.firestore().collection("users").doc(email).get()
     model.currentUser = await response.data();
    return model.currentUser
}

// function này check login bằng email và pw
model.login = async (data) => {
    let flag = true;
    try {
        await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    } catch (err) {
        alert(err);
        flag = false
    }
    if (flag) {
        userData = await model.getCurrentUserData(data.email);
        console.log(userData);
        if (userData) {
            if (!userData.status) {
                alert('Your account is temporarily locked!');
                firebase.auth().signOut();
            }
        } else {
            alert('This account does not exist.');
            firebase.auth().signOut();

        }
    }
    location.reload();
};
model.loginWithFacebook = () => {
    baseProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(baseProvider).then(function (result) {
        console.log(result);

    }).catch(function (error) {
        console.log(error);
    })
}

// function này check login bằng tk liên kết với google
model.loginGoogleAccount = async () => {
    let flag = true;
    baseProvider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(baseProvider).then(function (result) {
        console.log(result);

    }).catch(function (error) {
        console.log(error);

    })
    location.reload();
}




//function này lấy Product data về từ firebase
model.getProductsData = async () => {
    //đoạn này bóc tách dữ liệu từ db trả về
    const response = await firebase.firestore().collection("products").where("status", "==", true).get();
    model.productData = getDataFromDocs(response.docs);
    //đoạn này lấy categories cho  vào 1 biến, các catogorries có thể giống nhau nên phải cho và o1 biến để lọc ra unique
    return model.productData;
};

model.getProductsDataByCategory = async (category) => {
    
    const response = await firebase.firestore().collection("products").where("category", "==", category).get();
    let data = model.productData = getDataFromDocs(response.docs);
    console.log(data);
    return data
}

model.getCollectionData = async (collection) => {
    const response = await firebase.firestore().collection(collection).get()
    return getDataFromDocs(response.docs).sort((a, b) => (a.createAt < b.createAt) ? 1 : ((b.createAt < a.createAt) ? -1 : 0));
};

//func này lấy ra 1 product bằng id.
model.getProductDataById = async (id) => {
    const response = await firebase.firestore().collection("products").where("id", "==", id).get();
    return getDataFromDocs(response.docs);
}

//func này lấy ra tòan bộ order của current user.
model.getOrdersDatabyId = async (id) => {
    const response = await firebase.firestore().collection("orders").where("email", "==", id).get()
    model.Orderdata = getDataFromDocs(response.docs).sort((a, b) => (a.createAt < b.createAt) ? 1 : ((b.createAt < a.createAt) ? -1 : 0));
    return model.Orderdata
};

// function này lưu product vừa đc chọn để lưu lên local, sau đó gọi lại để load ra màn hình detail.
model.tickProduct = async (id) => {
    let data = await model.getProductDataById(id);
    console.log(data);
    // đoạn này update location screen.
    localStorage.setItem('currentLocationScreen', 'detailProduct');
    parseData = JSON.stringify(data[0]);
    localStorage.setItem('detailProduct', parseData);
    location.reload();
};

// function này lưu order vafo db
model.newBill = async (data) => {
    console.log(data);
    dataItem = data.items
    try {
        await firebase.firestore().collection('orders').doc(data.id).set(data);
        for (let item of dataItem) {
            await model.updateProductAvailable(item.id, item.inCart);
        }
    } catch (err) {
        console.log(err);
    }
};

model.updateProductAvailable = async (id, inCart) => {
    let data = await model.getProductDataById(id);
    await firebase.firestore().collection('products').doc(id).update({
        availableQuantity: Number(data[0].availableQuantity) - inCart
    });
};



//function này cập nhật thông tin memberShip cho thành viên.
model.updateUserData = async (email, total) => {
    let userData = model.currentUser;
    await firebase.firestore().collection('users').doc(email).update({
        createdOrders: userData.createdOrders + 1,
        memberShip: userData.memberShip + total
    });
};


model.signOutButton = () => {
    firebase.auth().signOut();
    model.currentUser = {};
    localStorage.removeItem('currentLocationScreen');
    model.productData = [];
};

//đoạn này lấy Data từ doc
getDataFromDocs = (docs) => {
    return docs.map(item => getDataFromDoc(item))
};

getDataFromDoc = (doc) => {
    let data = doc.data()
    data.id = doc.id
    return data
}