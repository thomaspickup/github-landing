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
          if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p>'; }
          else {  
            outhtml = '<div class="card-deck">';
            outhtml = outhtml + '<div class="row">';
            for (i = 0; i < 2; i++) {
                    outhtml = outhtml + '<div class="col-sm-10" height="100%"><div class="card" style="background-color:rgba(0, 0, 0, 0); border-color:rgba(0, 0, 0, 0)"><div class="card-body">';
                    outhtml = outhtml + '<h4 class="card-title">';
                    outhtml = outhtml + repositories[i].name;
                    outhtml = outhtml + '</h4>';
                    outhtml = outhtml + '<h6 class="card-subtitle mb-2 text-muted">';
                    outhtml = outhtml + repositories[i].language;
                    outhtml = outhtml + '</h6>';
                    outhtml = outhtml + '<p class="card-text">';
                    outhtml = outhtml + repositories[i].description;
                    outhtml = outhtml + '</p>';
                    outhtml = outhtml + '<a href="'+ repositories[i].html_url + '" class="btn">Repository</a>';
                    outhtml = outhtml + '</div></div></div>';
                }
            outhtml = outhtml + '</div></div>';
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