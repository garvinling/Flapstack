
$(document).ready(function(){





    $( "#data_content_1" ).draggable();
    $( "#data_content_2").draggable();
    $( "#status_content").draggable();

  $.ajaxSetup({ cache: true });
  
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    

    FB.init({
      appId: '212393902290177',
    });     
    

    $('#loginbutton,#feedbutton').removeAttr('disabled');
  




 FB.login(function(response) {
   if (response.authResponse) 
   {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
     
         console.log('Good to see you, ' + response.name + '.');
         $("#title").text(response.name);
     
     });
   } 
   else 
   {
     console.log('User cancelled login or did not fully authorize.');
   }
 });





FB.getLoginStatus(function(response) {
  
  if (response.status === 'connected') {
    // the user is logged in and has authenticated your
    // app, and response.authResponse supplies
    // the user's ID, a valid access token, a signed
    // request, and the time the access token 
    // and signed request each expire
    window.console&&console.log('Connected');
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
    var date = Math.round(new Date().getTime() / 1000);


    /*
    FB.api('/me/feed',{since:'1375315200',until:date,limit:'100'},function(response) {
      console.log(response);
    });
    */

    FB.api('/me','GET',function(response){


        if(!response.error && response)
        {
          $("#location").text(response.location.name);
        }
    });


    FB.api('/me/picture',{width:"400",redirect:"false"},function(response){

        //$("#profile_image").attr('src',response.data.url);
        $("div#profile_image").css("background-image","url("+response.data.url+")");  

        //console.log(response.data.url);
    });

    FB.api('me/notifications',{limit:'9',include_read:'true'},function(response){
        //console.log(response.data[0]);
        console.log(response);
        sendNotification(response);
        //$("#header ul").append("<li>"+)
    });


    FB.api('me/home',function(response){

      getPostsFromNewsFeed(response);
      console.log(response);

    });



    FB.api('me/friends',function(response){
      console.log(response.data.length + "friends exist.");
      $("#friend_count").text(response.data.length + " connections");
    });


    FB.api('me/notifications',function(response){

        $("#new_notifications").text(response.data.length +" new notifications");


    });


 


  } 
  else if (response.status === 'not_authorized')
   {
    // the user is logged in to Facebook, 
    // but has not authenticated your app
    window.console&&console.log('Not Authorized');

  } 
  else {
    // the user isn't logged in to Facebook.
    window.console&&console.log('Not logged in to facebook');

  }

 });  //End FB.getLoginStatus

  $("#post_status").click(function(){
  
      var post_message = $("textarea#status_content_text").val();
      FB.api("/me/feed","POST",{"message": post_message},
        function (response) {
          if (response && !response.error) {
            alert("Posted: " +post_message);
            $("textarea#status_content_text").text("");
            console.log(response);
          }
        }
      );
  });

  $("#test").click(function(){

        $("#data_content_1").offset({left:22,top:0});


  });

});

  function sendNotification(response){

    for (var i=0;i<response.data.length;i++){
        
        var from = response.data[i].from.name;
        //console.log("FOUND:"+response.data[i].title);
        $("#notify_feed").append("<li id=\"notification"+i+"\"> <code>"+from+"</code> "+response.data[i].title+"</li><br>");
        $("#notification"+i).hide().fadeIn(1300+(500*i));
    }
  }//end sendNotification

  function getPostsFromNewsFeed(response){

      for(var i=0; i<response.data.length;i++){

          var post_message = response.data[i].story;
          var from = "";
          //console.log(post_title);
          if(!post_message){
              //news item is a status update.
              var post_message = response.data[i].message;
              var from = response.data[i].from.name;
              $("#news_feed").append("<li id=\"post"+i+"\"> <code>"+from+"</code> "+post_message+"</li><br>");

          }
          else
          {
         
          $("#news_feed").append("<li id=\"post"+i+"\">"+post_message+"</li><br>");



          }

          $("#post"+i).hide().fadeIn(1300+(100*i));

      }



  }



});




	
