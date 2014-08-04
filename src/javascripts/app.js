(function($) {
        
    var feedURL = 'https://feeds.pinboard.in/json/v1/u:penrose/';
    
    // get the feed
    $.getJSON(feedURL+'?cb=?', queueRender);
    
    function queueRender(data) {
        // wait until after the document is ready to render the data
        console.log('data!',data);
        $(document).ready(function() {
            var $container = $('.grambleContainer');
            $(data).each(function(i, item) {
                var title = item.d,
                    url = item.u,
                    description = item.n,
                    timestamp = item.dt;
                $container.append('<p>'+title+' - '+url+' - '+description+'</p>');
            });
        });
    }

}(jQuery));