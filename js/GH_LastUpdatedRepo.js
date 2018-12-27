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
            for (i = 0; i < 6; i++) {
                    // FINDS MILISECONDS FOR JSON OBJECT
                    var milisecs = Date.parse(repositories[i].pushed_at);
                    var lastUpdate = new Date(milisecs);

                    // FINDS THE DATE TIME NOW
                    var now = new Date(Date.now());

                    // GETS THE TIME DIFFERENCE AND WORKS OUT DIFFERENCE IN DAYS
                    var timeDiff = Math.abs(now.getTime() - lastUpdate.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    // SETS DIFFERENCE TO 0 READY FOR IF STATEMENT BELOW
                    var difference = 0;
                    var multiplier = "Days";

                    // CONVERTS TO DAY(S) OR MONTH(S)
                    if (diffDays >= 30) {
                      difference = Math.ceil(diffDays / 30);
                      multiplier = "Month";
                      if (difference >= 2) {
                        multiplier = "Months";
                      }
                    } else {
                      difference = diffDays;
                      if (diffDays == 1) {
                        multiplier = "Day";
                      }
                    }

                    // CREATES CARD FOR OUTPUTTING TO SCREEN
                    outhtml = outhtml + '<div class="col-sm-6" height="100%"><div class="card" style="background-color:rgba(0, 0, 0, 0); border-color:rgba(0, 0, 0, 0)"><div class="card-body">';
                    outhtml = outhtml + '<h4 class="card-title">';
                    outhtml = outhtml + repositories[i].name;
                    outhtml = outhtml + '</h4>';
                    outhtml = outhtml + '<h6 class="card-subtitle mb-2 text-muted">';
                    outhtml = outhtml + repositories[i].language + " | ";
                    outhtml = outhtml + difference + " " + multiplier + " Ago.";
                    outhtml = outhtml + '</h6>';
                    outhtml = outhtml + '<p class="card-text lead">';
                    outhtml = outhtml + repositories[i].description;
                    outhtml = outhtml + '</p>';
                    outhtml = outhtml + '<a href="'+ repositories[i].html_url + '" class="btn">Repository</a>';
                    outhtml = outhtml + '</div></div></div>';
                }
            outhtml = outhtml + '</div></div>';
            }

          $('#gh_lastupdatedrepo').html(outhtml);
        }
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
