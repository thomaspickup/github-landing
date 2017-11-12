$(function setupLastUpdatedRepo(){   
    var username = 'thomaspickup';
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/thomaspickup/repos?sort=pushed';
    
    requestJSON(requri, function(json) {
        
        var outhtml = '';
        
        var repositories;
        $.getJSON(repouri, function(json){
          repositories = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
          else {
           // outhtml = outhtml + '<div class="row">'
            outhtml = repositories[0].name + '<br>' + repositories[0].description + '<br>' + '<a href="' + repositories[0].html_url + '">Repository Link</a>'; 
          }
          $('#gh_lastupdatedrepo').html(outhtml);
        } // end outputPageContent()
    }); // end requestJSON Ajax call
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});