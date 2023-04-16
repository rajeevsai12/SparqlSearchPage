function submitQuery() {
    var query = $('#query').val();
    var endpoint = "https://dbpedia.org/sparql"; //DBpedia endpoint
    var format = "application/sparql-results+json";
    var data = {query: query, format: format};
    //method to send request to the endpoint
    $.ajax({
      type: "GET",
      url: endpoint,
      data: data,
      dataType: "json",//On success dsiplays the reponse in tabular format
      success: function(response) {
        var html = '<table class="table"><thead><tr>';
        for (var i = 0; i < response.head.vars.length; i++) {
          html += '<th>' + response.head.vars[i] + '</th>';
        }
        html += '</tr></thead><tbody>';
        for (var i = 0; i < response.results.bindings.length; i++) {
          html += '<tr>';
          for (var j = 0; j < response.head.vars.length; j++) {
            var variable = response.head.vars[j];
            if (response.results.bindings[i].hasOwnProperty(variable)) {
              html += '<td>' + response.results.bindings[i][variable].value + '</td>';
            } else {
              html += '<td></td>';
            }
          }
          html += '</tr>';
        }
        html += '</tbody></table>';
        $('#results').html(html);
      },
      error: function(xhr, status, error) { //on failure displays the error
        $('#results').html('please check the query that was sbumitted : ' + error);
      }
    });
  }
  
