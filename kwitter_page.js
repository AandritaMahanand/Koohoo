// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCfwOvUKaMJSGN3f08BOk_2BTQFIyG6Sjk",
    authDomain: "koohoo-c09cc.firebaseapp.com",
    databaseURL: "https://koohoo-c09cc-default-rtdb.firebaseio.com",
    projectId: "koohoo-c09cc",
    storageBucket: "koohoo-c09cc.appspot.com",
    messagingSenderId: "213220202290",
    appId: "1:213220202290:web:c7e251764b8b8683ed692b",
    measurementId: "G-DHZFB07VCP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function send() {
    msg = document.getElementById("msg").value
    firebase.database().ref(room_name).push({
        Name: user_name,
        Message: msg,
        Like: 0
    })
    document.getElementById("msg").value = ""
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                Name = message_data['Name'];
                Message = message_data['Message'];
                Like = message_data['Like'];
                name_with_tag = "<h4> " + Name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + Message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + Like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + Like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    Likes = document.getElementById(button_id).value;
    updated_likes = Number(Likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        Like: updated_likes
    });

}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("kwitter.html");
}