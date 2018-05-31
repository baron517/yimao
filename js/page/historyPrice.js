var historyPrice = (function () {
    var cssColor = ["red", "green", "blue", "orange", "purple"];
    var Return = {
        init: function () {
            $('#divLeftColor').scrollBar();
            initLeftMouse();
            initLeftSelectRow();
            initLeftDel();
            initLeftAddPair();
            initDivSelect();
            initChart();
        }
    }
    var initLeftMouse = function () {
        $('#divLeftColor').on("mouseover", "ul", function () {
            $(this).find(".icon-icon7").show();
        });
        $('#divLeftColor').on("mouseout", "ul", function () {
            $(this).find(".icon-icon7").hide();
        });
    }
    var initLeftSelectRow = function () {
        $('#divLeftColor').on("click", "ul", function () {
            var $ul = $(this);
            var cssName = cssColor[$ul.index() % cssColor.length];
            if ($ul.hasClass("grey")) {
                if ($('#divLeftColor .color').length == 5) {
                    layer.tips('配对设置不能超过5个', $ul);
                }
                else {
                    $ul.removeClass("grey").addClass(cssName).addClass("color");
                }
            }
            else {
                $ul.removeClass(cssName).removeClass("color").addClass("grey");
            }
        });
        if($('#divLeftColor ul .color').length==0){
            $('#divLeftColor ul:lt(5)').click();
        }
    }
    var initLeftDel = function () {
        $('#divLeftColor').on("click", ".btnDel", function (event) {
            event.stopPropagation();
            var $btnDel = $(this);
            var $ul = $btnDel.closest("ul");

            layer.confirm('您确定要删除以下配对吗？<br><br>'+$ul.find("p").html(), {
                btn: ['确定', '取消'] //按钮
            }, function (index) {
                $ul.remove();
                layer.close(index);
            });
        });
    }
    var initLeftAddPair = function () {
        $("#btnAddPair").click(function () {
            $("#modal-dialog-mask").show();
            $("#modalAddPair").show();
        });
        $("#modalAddPair .btnSave").click(function(){
            var divBlue=$("#modalAddPair .divTipBlue");
            var divOrange=$("#modalAddPair .divTipOrange");
            var pairBlueText=divBlue.find(".selCurrency option:selected").text()+" "+divBlue.find(".selItem option:selected").text()+" "+divBlue.find(".selDate option:selected").text();
            var pairOrangeText=divOrange.find(".selCurrency option:selected").text()+" "+divOrange.find(".selItem option:selected").text()+" "+divOrange.find(".selDate option:selected").text();
            

        });
    }
    var initDivSelect = function () {
        $(".divDefaultSelect").click(function (event) {
            event.stopPropagation();
            $(this).find("ul").show();
         //   $(this).find("span").css("visibility","hidden");
        });
        $(".divDefaultSelect li").click(function (event) {
            event.stopPropagation();
            // var $root=$(this).closest(".divDefaultSelect");
            // $root.find(".active").removeClass("active");
            // $(this).addClass("active");
            // $(this).closest("ul").hide();
            // $root.find("span").text($root.find(".active").text());
            // $root.find("span").show();
        });
    }
    var initChart=function(){
         var myChart = echarts.init(document.getElementById('main1'));
            option= {
                xAxis: {
                    type: 'category',
                    data:['3.01','3.02','3.03','3.04','3.05','3.06','3.07',
                        '3.08','3.09','3.10','3.11','3.12','3.13','3.14'],
                        axisLine:{
                            lineStyle:{
                                color:'#a79b9b',
                            }
                        }
                },
                
                grid:{
                    x:80,
                    y:10,
                    x2:80,
                    y2:60
                },
                
                yAxis: {
                    type: 'value',
                    min:11500,
                    splitNumber:5,
                    axisLine:{
                        lineStyle:{
                            color:'#a79b9b',
                        }
                    }
                },
                series: [{
                    name:' ',
                    data: [12400, 12500, 12700, 13000,12600, 12800, 12500, 12200, 12400, 12600, 12800,
                    13000, 12800, 13000 ],
                    type: 'line',
                },{
                    name:'  ',
                    data: [12800, 13200, 12900, 13000,  12600, 12800, 12700, 12900, 13000, 13200,
                       13500, 12700, 12500, 13000],
                    type: 'line',
                },{
                    name:'   ',
                    data: [12000,  11900, 12300, 12500, 12800, 13000, 12800
                        ,13000, 13200, 13000, 12800,12600, 12800, 13400],
                    type: 'line',
                    },
            ]
            };
        myChart.setOption(option);

         $('.charts_main1>.guides > span').click(function(){
           console.log(1)
           $(this).addClass('guides_active')
           $(this).siblings().removeClass('guides_active')
       })
        $('.guides span:nth-child(1)').click(function(){
            
                $('.guides95').show()
                $('.guides95').siblings('.guides_bottom').hide()
            
        })
        $('.guides span:nth-child(2)').click(function(){
            
                $('.guides80').show()
                $('.guides80').siblings('.guides_bottom').hide()
            
        })
        $('.guides span:nth-child(3)').click(function(){
            console.log(1)
                $('.guides65').show()
                $('.guides65').siblings('.guides_bottom').hide()
            
        })
    }
    return Return;
})();

; (function () {
    historyPrice.init();
})();