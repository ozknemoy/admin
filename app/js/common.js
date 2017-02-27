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

        /*  comp-email.html  */
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
        /*  comp-email.html end   */

        /*  tabs-admin  tabs.html */
        $('.jq-tabs-admin').delegate('.a_jq-tabs-admin',click,function(e) {
            //console.log(e.target.id,e);

            var parent = $(e.delegateTarget);
            parent.children().removeClass('active');
            var target = $(e.target);
            if(target.hasClass('sub_jq-tabs')) {
                target.parent().parent().parent().addClass('active');
            } else {
                target.parent().addClass('active');
            }
            // ищу в следущем/предыдущем элементе контент для скрытия/показа
            var sibling = parent.next()[0]? parent.next() : parent.prev();
            sibling.find('._jq-tabs-admin').addClass('hide');
            sibling.find('#_' + e.target.id).removeClass('hide');
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
