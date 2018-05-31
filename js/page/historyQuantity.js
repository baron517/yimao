var historyQuantity = (function () {
    var Return = {
        init: function () {
            initDom();
            initChart();
        }
    }
    var initDom = function () {
        $(".ulSearchTab li").click(function () {
            $(".ulSearchTab .active").removeClass("active");
            $(this).addClass("active");
        });
        $(".ulTab li").click(function () {
            $(".ulTab .active").removeClass("active");
            $(this).addClass("active");
            $(".tbTab").hide();
            $(".tbTab[data-type='"+$(this).attr("data-type")+"']").show();
        });
         $(".divTbTab .divSelect").click(function (event) {
            event.stopPropagation();
            $(this).find("ul").show();
            $(".divTbTab .divSelect span").hide();
        });
        $(".divTbTab .divSelect li").click(function (event) {
            event.stopPropagation();
            $(".divTbTab .divSelect .active").removeClass("active");
            $(this).addClass("active");
            $(this).closest("ul").hide();
            $(".divTbTab .divSelect span").text($(".divTbTab .divSelect .active").text());
            $(".divTbTab .divSelect span").show();
        });
        $(".divMonth .month ul li").click(function () {
            $(".divMonth .month .active").removeClass("active");
            $(this).addClass("active");
        });

        $(".divMonth .currency").click(function (event) {
            event.stopPropagation();
            $(this).find("ul").show();
            $(".divMonth .currency span").hide();
        });
        $(".divMonth .currency li").click(function (event) {
            event.stopPropagation();
            $(".divMonth .currency .active").removeClass("active");
            $(this).addClass("active");
            $(this).closest("ul").hide();
            $(".divMonth .currency span").text($(".divMonth .currency .active").text());
            $(".divMonth .currency span").show();
        });
        $(".divMonth .spanRight").click(function () {
            if ($(".divMonth .month ul li:visible").length > 8) {
                $(".divMonth .month ul li:visible").first().hide();
            }
        });
        $(".divMonth .spanLeft").click(function () {
            if ($(".divMonth .month ul li:hidden").length > 0) {
                $(".divMonth .month ul li:hidden").last().show();
            }
        });
    }
    var initChart = function () {
        var myChart = echarts.init(document.getElementById('main1'));
        option1 = {
            tooltip: {
                trigger: 'axis'
            },

            xAxis: [{
                type: 'category',
                show: false,
                data: ['3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07',
                    '3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07',
                    '3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07',
                    '3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07'],
                axisLine: {
                    lineStyle: {
                        color: '#a79b9b',
                    }
                }
            }],
            grid: {
                x: 60,
                y: 20,
                x2: 1,
                y2: 10
            },
            yAxis: {
                type: 'value',
                min: 11000,
                splitNumber: 5,
                axisLine: {
                    lineStyle: {
                        color: '#a79b9b',
                    }
                }
            },
            series: [
                {
                    data: [12500, 13000, 12000, 13500, 11500, 13000, 13500,
                        12500, 13000, 12000, 13500, 11500, 13000, 13500,
                        12500, 13000, 12000, 13500, 11500, 13000, 13500,
                        12500, 13000, 12000, 13500, 11500, 13000, 13500],
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#0178e0'
                        }
                    }
                }]
        };
        myChart.setOption(option1);

        var myChart2 = echarts.init(document.getElementById('main2'));
        option2 = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                type: 'category',
                data: ['3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07',
                    '3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07',
                    '3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07',
                    '3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07'],
                axisLine: {
                    lineStyle: {
                        color: '#a79b9b',
                    }
                }
            },
            {
                type: 'category',
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitArea: { show: false },
                splitLine: { show: false },
                data: ['3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07',
                    '3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07',
                    '3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07',
                    '3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07'],
            }
            ],
            grid: {
                x: 60,
                y: 20,
                x2: 1,
                y2: 20,
                borderColor: '#fff'
            },
            yAxis: {
                type: 'value',
                splitNumber: 5,
                axisLine: {
                    lineStyle: {
                        color: '#a79b9b',
                    }
                }
            },
            series: [{
                name: ' ',
                data: [8, 9, 7, 6, 5, 7, 9,
                    8, 9, 7, 6, 5, 7, 9,
                    8, 9, 7, 6, 5, 7, 9,
                    8, 9, 7, 6, 5, 7, 9],
                type: 'bar',
                barWidth: '14',
                itemStyle: {
                    normal: {
                        color: '#0178e0'
                    }
                },
            },
            {
                name: ' ',
                data: [10, 10, 10, 10, 10, 10, 10,
                    10, 10, 10, 10, 10, 10, 10,
                    10, 10, 10, 10, 10, 10, 10,
                    10, 10, 10, 10, 10, 10, 10,],
                type: 'bar',
                barWidth: '14',
                xAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: 'rgba(155, 155, 155,0.1)'
                    }
                },
            }]
        };

        myChart2.setOption(option2);
    }
    return Return;
})();

; (function () {
    historyQuantity.init();
})();