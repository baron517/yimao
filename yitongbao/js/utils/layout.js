var layout = (function() {
    var Return = {
        init: function() {
            $(window).resize(resizeHeight);
            $(window).resize(); $("body").click(function() {
                $(".ulSelect").hide();
                $(".selected").show();
            });
            initModalDialog();
            initColorBtn();
            initBtnGroup();
        }
      
    }
    var resizeHeight = function() {
        var hBody = $(window).height();
        var hHeader = $(".divHead").height();
        var hHeaderSecond = $(".divHeadSecond").length > 0 ? $(".divHeadSecond").height() + 1 : 0;
        var hFootMenu = $(".divFootMenu").height();
        var hFoot = $(".divFoot").height();
        var minHeight = hBody - hHeader - hHeaderSecond - hFootMenu - hFoot - 1;

        if (minHeight < 480) {
            minHeight = 480;
        }
        $(".divMain,.divMain .divFixedWidth").css("min-height", minHeight);
        if ($(".divLogin").length > 0) {
            $(".divLogin").css("margin-top", ($(".divMain").height() - $(".divLogin").height()) / 2);
        }
    }
    var initModalDialog = function() {
        $(".modal-dialog .icon-guanbi,.modal-dialog .cancel").click(function() {
            $("#modal-dialog-mask").hide();
            $(this).closest(".modal-dialog").hide();
        });
    }
    var initColorBtn = function() {
        $("body").on("click", ".whiteOrangeBtn,.whiteBlueBtn,.whiteGreenBtn", function() {
            var cssName = $(this).attr("class");
            $(this).removeClass(cssName).addClass(cssName + "Ok").append('<i class="iconfont icon-xuanzejiaobiao"></i>');
        });

        $("body").on("click", ".whiteOrangeBtnOk,.whiteBlueBtnOk,.whiteGreenBtnOk", function() {
            var cssName = $(this).attr("class");
            $(this).removeClass(cssName).addClass(cssName.replace("Ok", "")).text($(this).text());
        });
    }
    var initBtnGroup=function(){
        $("body").on("click",".btnGroup span",function(){
            var $btn=$(this);
            $btn.closest(".btnGroup").find(".active").removeClass("active");
            $btn.addClass("active");
        });
    }
    return Return;
})();

; (function() {
    layout.init();
})();