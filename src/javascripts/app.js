(function($) {
        
    var feedURL = 'https://feeds.pinboard.in/json/v1/u:penrose/';
    
    // get the feed
    $.getJSON(feedURL+'?cb=?', queueRender);
    
    function queueRender(data) {
        // wait until after the document is ready to render the data
        console.log('data!',data);
        $(document).ready(function() {
            // add the items to the container
            var $container = $('.grambleContainer').eq(1);
            $(data).each(function(i, item) {
                var title = item.d,
                    url = item.u,
                    fileExtension = url.substring(url.lastIndexOf('.')),
                    description = item.n,
                    timestamp = item.dt,
                    isImage = ['.jpg','.png','.gif'].indexOf(fileExtension) !== -1,
                    itemContent = isImage ? '<a class="item image" href="'+url+' target="_blank"> \
                        <img src="'+url+'" alt="'+title+'"> \
                        <span class="cover"><span class="openLink">open link</span></span> \
                    </a>' : '<a class="item article" href="'+url+'" title="'+title+'"> \
                        <p class="title">'+title+'</p> \
                        <p class="body">'+description+'</p> \
                        <span class="cover"><span class="openLink">open link</span></span> \
                    </a>';
                $container.append(itemContent);
            });
            // activate Packery
            var pckry = new Packery($container.get(0), {
                itemSelector: '.item',
                columnWidth: '.item'
            });
        });
    }

}(jQuery));