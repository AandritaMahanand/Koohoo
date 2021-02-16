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

  userName = localStorage.getItem("user_name")
  console.log(userName)
  document.getElementById("user_name").innerHTML = "Welcome " + userName + "! 😀😀😀"

  function getData() {
      firebase.database().ref("/").on('value', function(snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function(childSnapshot) {
              childKey = childSnapshot.key;
              Room_names = childKey;
              //Start code
              console.log(Room_names)
              row = "<div class='room_name' id=" + Room_names + "onclick='redirectToRoomName(this.id)'> #" + Room_names + "</div> <hr>"
              document.getElementById("output").innerHTML += row

              //End code
          });
      });
  }
  getData();

  function addRoom() {
      RoomNAME = document.getElementById("room_name").value
      firebase.database().ref("/").child(RoomNAME).update({
          purpose: "adding room name"
      })
      localStorage.setItem("room_name", RoomNAME)
      window.location = "kwitter_page.html"
  }

  function redirectToRoomName(name) {
      console.log(name)
      localStorage.setItem("room_name", name)
      window.location = "kwitter.html"
  }

  function logout() {
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location.replace("index.html")
  }