var indexNumber = (function () {
    var Return = {
        init: function () {
            initDom();
        }
    }
    var initDom = function () {
        $(".divBlueFrame .title p").click(function () {
            var $p = $(this);
            var $content = $p.closest(".divBlueFrame").find(".content");
            if ($content.is(":hidden")) {
                $content.show();
                $p.find("span").text("收缩");
                $p.find("i").removeClass("icon-plus-select-down").addClass("icon-plus-select-up");
            }
            else {
                $content.hide();
                $p.find("span").text("展开");
                $p.find("i").removeClass("icon-plus-select-up").addClass("icon-plus-select-down");
            }
        });
    }

    return Return;
})();

; (function () {
    indexNumber.init();
})();