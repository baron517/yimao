var bestPrice = (function () {
    var Return = {
        init: function () {
            initRealtimePrice();
            initBtnSet();
            emaiBase.FixedTitle.initFixWidth();    
        }
    }
    var initRealtimePrice = function () {
        $(".btnRealTimePrice").click(function () {
            $("#modal-dialog-mask").show();
            $("#modalRealtimePrice").show();
            emaiBase.FixedTitle.resizeFixWidth($("#modalRealtimePrice"));//异步的情况需加载完数据执行       
        });
    }

    var initBtnSet = function () {
        $("#btnSet").click(function () {
            $("#modal-dialog-mask").show();
            $("#modalSet").show();
        });
        $("#modalSet").on("click", ".whiteOrangeBtn,.whiteBlueBtn,.whiteGreenBtn", function () {
            var cssName = $(this).attr("class");
            $(this).removeClass(cssName).addClass(cssName + "Ok").append('<i class="iconfont icon-xuanzejiaobiao"></i>');
        });

        $("#modalSet").on("click", ".whiteOrangeBtnOk,.whiteBlueBtnOk,.whiteGreenBtnOk", function () {
            var cssName = $(this).attr("class");
            $(this).removeClass(cssName).addClass(cssName.replace("Ok", "")).text($(this).text());
        });

    }
    return Return;
})();

; (function () {
    bestPrice.init();
})();