$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};


    $(document).ready(function() {

        var click = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';

        var $winW = $(window).width();
        if($winW>1200) {
            $('body').removeClass('menu-collapsed')
        }

        $('.hamburger').on(click,function(e) {
            $('body').toggleClass('menu-collapsed')
        });

        $('.aside').delegate('.link',click,function() {
            if($('body').hasClass('menu-collapsed')) {
                $('body').removeClass('menu-collapsed')
            }

        });

        $('.feed-message-body').on(click,function() {
            var p = $(this).parent().parent();
            var t = $(this).text().trim();
            if(p.hasClass('expanded')) {
                $(this).text(t.slice(0,150))
            }

            p.toggleClass('expanded')
        });

        $('table tr').on(click,function() {
            $('.mail-panel_right').toggleClass('hide')
        });
        $('.jquery_click').on(click,function() {
            $('.mail-panel_right').toggleClass('hide')
        });
    });
	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});
