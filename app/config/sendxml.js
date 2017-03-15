function insertuser() {
    var user = [];
    user.push(document.getElementById('fname').value);
    user.push(document.getElementById("lname").value);
    user.push(document.getElementById("email").value);
    user.push(document.getElementById("gender").value);
    user.push(document.getElementById("mobile").value);
    user.push(document.getElementById("password").value);
    user.push(document.getElementById("bod").value);
    user.push('insertuser');

    var ok = checksignup(user);
    if (ok == 0) {
        document.getElementById('error').innerHTML = "check your crodentials";
      }
      else {
        utils.request({
                method: 'POST',
                url: '/allposts',
                params: user
            }, function(err, data) {
                if (err) {
                    utils.handleError('Error:');
                    cb(err, undefined);
                    return;
                }
              });

                getprofile();
                setprofile();
            }



    user = [];

}

function getprofile() {
    var user = [];
    user.push(document.getElementById("email").value);
    user.push(document.getElementById("password").value);
    user.push('selectuser');
    utils.request({
        method: 'POST',
        url: '/allposts',
        params: user
    }, function(err, data) {
        if (err) {
            utils.handleError('Error:');
            cb(err, undefined);
            return;
        }
        try {

            data = JSON.parse(data);

            localStorage.setItem("fname", data.fname);
            localStorage.setItem("lname", data.lname);
            localStorage.setItem("email", data.email);
            localStorage.setItem("gend", data.gend);
            localStorage.setItem("mobile", data.mobile);
            localStorage.setItem("id", data.id);
            window.location = "/profile";
        } catch (e) {
            console.log(data);
            document.getElementById('error').innerHTML = "check your crodentials";
        }


    });
    user = [];

}





function setprofile() {
    user = [];

    document.getElementById("fname").innerHTML = localStorage.getItem("fname") + ' ' + localStorage.getItem("lname");
    document.getElementById("email").innerHTML = localStorage.getItem("email");
    document.getElementById("gend").innerHTML = localStorage.getItem("gend");
    document.getElementById("mobile").innerHTML = localStorage.getItem("mobile");

    getallposts();

}

function addpost() {
    console.log("inside add post");
    var post = [];
    post.push(document.getElementById("post").value);
    post.push(localStorage.getItem("id"));
    post.push("insertpost");
    utils.request({
        method: 'POST',
        url: '/allposts',
        params: post
    }, function(err, data) {
        console.log('data', data);
        getallposts();

        if (err) {
            utils.handleError('Error:');
            cb(err, undefined);
            return;
        }
    });
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}


function getallposts() {
    var getposts = [];
    getposts.push(localStorage.getItem("id"));
    getposts.push("allpost");
    utils.request({
        method: 'POST',
        url: '/allposts',
        params: getposts
    }, function(err, data) {
        data = JSON.parse(data);
        addElement(data);

        if (err) {
            utils.handleError('Error:');
            cb(err, undefined);
            return;
        }
    });
}

function addElement(data) {
    document.getElementById('div').innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var newDiv = document.createElement("div");
        newDiv.className = "post";
        var newp = document.createElement("p");
        var newContent = document.createTextNode(data[i].text);
        newp.appendChild(newContent);
        newDiv.appendChild(newp);
        document.getElementById('div').appendChild(newDiv);
    }
}

function checksignup(arr) {
    var ok = 1;
    arr.forEach((elem) => {
      console.log(ok);
        if (elem == "") {
            ok = 0
        }
    });
    return ok;
}


function wait() {
    setTimeout(getallposts(), 2000);

}
