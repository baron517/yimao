var realtimeQuotes = (function() {
    var Return = {
        init: function() {
            initScrollbar();
            emaiBase.FixedTitle.initFixWidth();
            $(".divBlock").each(function() {
                emaiBase.FixedTitle.resizeFixWidth($(this));
            });
            initWindowBtn();
            initDrag();
            initBtnSetQuotes();
            initBtnFilterQuotes();
            initBtnAddPair();
            initBtnAddBlockPrice();
            initBlockPrice();
        }
    }
    var initWindowBtn = function() {
        $("#divBlockRoot").on("click", ".icon-minimum", function(event) {
            minBlock($(this).closest(".divBlock"));
            event.stopPropagation();
        });
        $("#divBlockRoot").on("click", ".icon-zuidahua1", function(event) {
            maxBlock($(this).closest(".divBlock"));
            event.stopPropagation();
        });
        $("#divBlockRoot").on("click", ".icon-zhankai2", function(event) {
            spreadBlock($(this).closest(".divBlock"));
            event.stopPropagation();
        });
        $("#divBlockRoot").on("click", ".icon-zuidahua2", function(event) {
            restoreBlock($(this).closest(".divBlock"));
            event.stopPropagation();
        });
        $("#divBlockRoot").on("click", ".icon-guanbi", function(event) {
            removeBlock($(this).closest(".divBlock"));
            event.stopPropagation();
        });
        $("#btnRestoreAll").click(function() {
            $(".divBlock").each(function() {
                restoreBlock($(this));
            });
        });
        $("#btnMaxAll").click(function() {
            $(".divBlock").each(function() {
                maxBlock($(this));
            });
        });
        $("#btnMinAll").click(function() {
            $(".divBlock").each(function() {
                minBlock($(this));
            });
        });
        $("#btnSpreadAll").click(function() {
            $(".divBlock").each(function() {
                spreadBlock($(this));
            });
        });
    }
    var initScrollbar = function() {
        $('.divBlock .content').scrollBar({ position: "y" });
    }


    var initDrag = function() {
        Sortable.create(document.getElementById("divBlockRoot"), {
            handle: '.sortable',
            filter: ".ignore-elements",
            ghostClass: "sortable-ghost",  // Class name for the drop placeholder
            chosenClass: "sortable-chosen",  // Class name for the chosen item
            dragClass: "sortable-drag"  // 
        });
    }
    var maxBlock = function($divBlock) {
        var $btn = $divBlock.find(".icon-zuidahua1");
        if ($btn.length > 0) {
            $divBlock.css("width", "99.2%");
            $btn.removeClass("icon-zuidahua1").addClass("icon-zuidahua2");
            $btn.attr("title", "还原");
            emaiBase.FixedTitle.resizeFixWidth($btn.closest(".divBlock"));
        }
    }
    var restoreBlock = function($divBlock) {
        var $btn = $divBlock.find(".icon-zuidahua2");
        if ($btn.length > 0) {
            $divBlock.css("width", "49.2%");
            $btn.removeClass("icon-zuidahua2").addClass("icon-zuidahua1");
            $btn.attr("title", "最大化");
            emaiBase.FixedTitle.resizeFixWidth($btn.closest(".divBlock"));
        }
    }
    var minBlock = function($divBlock) {
        var $btn = $divBlock.find(".icon-minimum");
        if ($btn.length > 0) {
            $divBlock.find(".divFixedTitle,.content").hide();
            $btn.removeClass("icon-minimum").addClass("icon-zhankai2");
            $btn.attr("title", "展开");
        }
    }
    var spreadBlock = function($divBlock) {
        var $btn = $divBlock.find(".icon-zhankai2");
        if ($btn.length > 0) {
            $divBlock.find(".divFixedTitle,.content").show();
            $btn.removeClass("icon-zhankai2").addClass("icon-minimum");
            $btn.attr("title", "最小化");
        }
    }
    var removeBlock = function($divBlock) {
        layer.confirm('您确定要删除 【' + $divBlock.find(".spanTitle").text() + '】 该窗口吗？', {
            btn: ['确定', '取消'] //按钮
        }, function(index) {
            $divBlock.remove();
            layer.close(index);
        });

    }
    var initBtnSetQuotes = function() {
        $("#btnSetQuotes").click(function() {
            $("#modal-dialog-mask").show();
            $("#modalSetQuotes").show();
        });

    }
    var initBtnFilterQuotes = function() {
        $("#divBlockRoot").on("click", ".divBlockQuotes .icon-shezhi", function(event) {
            var $btn = $(this);
            var $modal = $("#modalFilterQuotes");
            $("#modal-dialog-mask").show();
            $modal.show();
            $modal.find(".modal-header span").text($btn.next(".spanTitle").text());
            event.stopPropagation();
        });

    }
    var initBlockPrice = function() {
        $("#divBlockRoot").on("mouseover", ".divBlockColor tr", function() {
            $(this).find(".icon-icon7").css("visibility", "visible");
        });
        $("#divBlockRoot").on("mouseout", ".divBlockColor tr", function() {
            $(this).find(".icon-icon7").css("visibility", "hidden");
        });
        $("#divBlockRoot").on("click", ".divBlockColor .icon-icon7", function() {
            var $btn = $(this);
            var $tr = $btn.closest("tr");
            layer.confirm('您确定要删除以下配对吗？<br> 【' + $tr.find("td:first").text() + '】 ', {
                btn: ['确定', '取消'] //按钮
            }, function(index) {
                $tr.remove();
                layer.close(index);
            });
        });
    }

    var initBtnAddPair = function() {
        $("#divBlockRoot").on("click", ".divBlockColor .icon-shezhi", function() {
            $("#modal-dialog-mask").show();
            $("#modalAddPair").show();
        });
    }

    var initBtnAddBlockPrice = function() {
        $("#btnAddBlockPrice").click(function() {
            $("#divBlockRoot").append($("#templateBlockColor").html());
            emaiBase.FixedTitle.initFixWidthOnce($("#divBlockRoot").find(".divBlock:last"));
        });
    }
    return Return;
})();

; (function() {
    realtimeQuotes.init();

})();