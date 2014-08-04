(function($) {
        
    var feedURL = 'https://feeds.pinboard.in/json/v1/u:penrose/';
    
    // get the feed
    $.getJSON(feedURL+'?cb=?', queueRender);
    
    function queueRender(data) {
        // wait until after the document is ready to render the data
        console.log('data!',data);
        $(document).ready(function() {
            // add the items to the container
            var $container = $('.grambleContainer2');
            $(data).each(function(i, item) {
                var title = item.d,
                    url = item.u,
                    fileExtension = url.substring(url.lastIndexOf('.')),
                    description = item.n,
                    timestamp = item.dt,
                    isImage = ['.jpg','.png','.gif'].indexOf(fileExtension) !== -1,
                    itemContent = isImage ? '<div class="item"><img src="'+url+'" alt="'+title+'"></div>' : '<div class="item article"><a href="'+url+'" title="'+title+'">'+title+'</a><p>'+description+'</p></div>'
                $container.append(itemContent);
            });
            // activate Masonry
            var msnry = new Masonry($container.get(0), {
                itemSelector: '.item'
            });
        });
    }

}(jQuery));