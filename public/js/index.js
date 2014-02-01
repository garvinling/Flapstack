
$(document).ready(function(){
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
         $("#title").text('Welcome, '+response.name);
     
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
          console.log(response);
          $("#location").text(': ' + response.location.name);
        }
    });


    FB.api('/me/picture',{width:"400",redirect:"false"},function(response){

        //$("#profile_image").attr('src',response.data.url);
        $("div#profile_image").css("background-image","url("+response.data.url+")");  

        console.log(response.data.url);


    });


  } else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook, 
    // but has not authenticated your app
    window.console&&console.log('Not Authorized');

  } else {
    // the user isn't logged in to Facebook.
    window.console&&console.log('Not logged in to facebook');

  }

 });



/*
GET graph.facebook.com
  /{node-id}?
    fields={first-level}.fields({second-level})

/me?
    fields=albums.limit(5),posts.limit(5)

*/


    function getUserInfoCallback(response)
    {

        if(response && !response.error)
        {
          console.log("SUCCESS");

          console.log(response);
        }


    }






  });
});




	
