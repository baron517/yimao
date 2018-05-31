/**
 * Created by chenshanfang on 2018/5/25.
 */
var emaiBase = {};
//常量
emaiBase.Consts = {
    successCode: "MSG00000",
    javaSuccess: "00000",
    javaSuccessTwo: "INFO0000"
}
emaiBase.Convert = (function($) {
    var Return = {
        toDate: function(strCSharpDate) {
            var strCSharpDate = strCSharpDate.replace(/-/g, "/");
            if (strCSharpDate.indexOf('.') > 0) {
                strCSharpDate = strCSharpDate.split('.')[0];
            }
            return new Date(Date.parse(strCSharpDate));
        },
        filterNull: function(data) {
            if (data == null || data == undefined) {
                return "";
            }
            else {
                return data;
            }
        },
        blurName: function(name, nullShowName) {
            if (name != undefined && name != null && name != "") {
                var arrName = name.split("");
                for (var i = 1; i < arrName.length; i++) {
                    arrName[i] = "*";
                }
                return arrName.join("");
            }
            else {
                return nullShowName;
            }
        }
    }
    return Return;
})(jQuery);
//网址相关
emaiBase.Url = (function($) {
    var Return = {
        //得到当前网址参数
        queryString: function(item) {
            var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
            return svalue ? svalue[1] : svalue;
        },
        //得到当前页面网址
        getCurrentUrl: function() {
            return document.URL;
        },
        getCurrentDomain: function() {
            return window.location.host;
        },
        //跳转页面
        goToUrl: function(url) {
            url = url.replace("#this", "");
            window.location = url;
        },
        //修改Url参数值
        modifyUrlParam: function(url, paramName, paramValue) {
            var result = url;
            if (url.indexOf(paramName) > 0) {
                result = emaiBase.Url.DelUrlParam(result, paramName);
            }
            result = emaiBase.Url.AddUrlParam(result, paramName, paramValue);
            return result;
        },
        //给Url添加参数
        addUrlParam: function(url, paramName, paramValue) {
            var result = url;
            if (url.indexOf("?") > 0) {
                result += "&";
            }
            else {
                result += "?";
            }
            result += paramName + "=" + paramValue;
            return result;
        },
        //删除链接中所有参数
        delAllParams: function(url) {
            var result = "";
            if (url.indexOf("?") > 0) {
                result = url.split("?")[0];
            }
            return result;
        },
        //删除url参数
        delUrlParam: function(url, paramName) {
            var result = url;
            if (url.indexOf(paramName) > 0) {
                var url1 = url.split(paramName + "=");
                result = url1[0];
                if (url1.length > 1) {
                    var lastIndex = url1[0].lastIndexOf('&');
                    if (lastIndex >= 0) {
                        result = result.substring(0, url1[0].lastIndexOf('&'));
                    }
                    var index = url1[1].indexOf('&');
                    if (index >= 0) {
                        if (lastIndex < 0) {
                            index = index + 1;
                        }
                        result = result + url1[1].substring(index);
                    }
                }
            }
            return result.trimEnd('?');
        },
        getLocationOrigin: function() {
            if (window["context"] == undefined) {
                if (!window.location.origin) {
                    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                }
                window["context"] = location.origin + "/V6.0";
            }
            return document.location.origin;
        }
    }
    return Return;
})(jQuery);
//浮点计算相关
emaiBase.FloatMath = (function($) {
    var Return = {
        //计算两个浮点数相除
        floatDivide: function(arg1, arg2) {
            var t1 = 0, t2 = 0, r1, r2;
            try { t1 = arg1.toString().split(".")[1].length; } catch (e) { }
            try { t2 = arg2.toString().split(".")[1].length; } catch (e) { }
            with (Math) {
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return (r1 / r2) * pow(10, t2 - t1);
            }
        },
        //计算两个浮点数相乘
        floatMultiply: function(arg1, arg2) {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try { m += s1.split(".")[1].length; } catch (e) { }
            try { m += s2.split(".")[1].length; } catch (e) { }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },
        //计算两个浮点数相加
        floatAdd: function(arg1, arg2) {
            var r1, r2, m, c;
            try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
            try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
            c = Math.abs(r1 - r2);
            m = Math.pow(10, Math.max(r1, r2));
            if (c > 0) {
                var cm = Math.pow(10, c);
                if (r1 > r2) {
                    arg1 = Number(arg1.toString().replace(".", ""));
                    arg2 = Number(arg2.toString().replace(".", "")) * cm;
                } else {
                    arg1 = Number(arg1.toString().replace(".", "")) * cm;
                    arg2 = Number(arg2.toString().replace(".", ""));
                }
            } else {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", ""));
            }
            return (arg1 + arg2) / m;
        },
        //计算两个浮点数相减
        floatSubtract: function(arg1, arg2) {
            var r1, r2, m, n;
            try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
            try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
            m = Math.pow(10, Math.max(r1, r2));
            // 动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        }
    }
    return Return;
})(jQuery);
//验证相关
emaiBase.Validator = (function($) {
    var Return = {
        doValidate: function($txt) {
            return _getRegStr($txt.attr("data-validate")).test($txt.val().trim());
        },
        getRegStr: function(key) {
            return _getRegStr(key);
        },
        testKey: function(key, value) {
            return _getRegStr(key).test(value);
        },
        isNaN: function(str) {
            if (str == null || str === '') {
                return true;
            }
            return isNaN(str);
        },
        isNullOrEmpty: function(str) {
            if (str == undefined || str == null || str == "") {
                return true;
            }
            else {
                return false;
            }
        },
        showMsg: function(obj, msg, exp, isShow) {
            if (exp) {
                obj.html(msg).show();
                return true;
            }
            else {
                obj.html("");
                return isShow;
            }
        }
    }
    var _getRegStr = function(key) {
        switch (key) {
            case "idcard"://身份证
                return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                break;
            case "email"://邮箱
                return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/;
                break;
            case "date"://2014-01-01
                break;
            case "zipcode"://邮编
                return /^[1-9][0-9]{5}$/;
                break;
            case "tel"://固定电话
                return /\(0\d{2}\)[- ]?\d{8}|0\d{2}[- ]?\d{8}|\(0\d{3}\)[- ]?\d{7}|0\d{3}[- ]?\d{7}/;
                break;
            case "mobile"://手机
                return /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
                break;
            case "real"://实数
                return /^[-+]?\d+(\.\d+)?$/;
                break;
            case "positiveInteger"://正整数(0012也能通过，已用于区号判断)
                return /^[0-9]*[1-9][0-9]*$/;
                break;
            case "hjPrice": //单价（6位整数）
                return /^[1-9]\d{0,5}$/;
                break;
            case "hjPriceLiner":
                return /^(0|[+-]?(1000|[1-9]\d{0,2})?)$/;
                break;
            case "hjUnitNumber": //单位（3位整数，6位小数）
                return /(^[1-9]\d{0,2}([.]\d{1,6})?$)|(^[0][.]\d{1,6}$)/;
                break;
            case "hjInOutMoney":
                return /^([1-9]\d{0,20}|[0])([.]\d{1,2})?$/;
                break;
            case "hjQuantity": //数量（4位整数）
                return /^[1-9]\d{0,3}$/;
                break;
            case "quizPrice": //竞猜价格数量（5位整数）
                return /^[1-9]\d{0,4}$/;
                break;
            case "carNumber": //车牌号
                return /^[\u4e00-\u9fa5]{1}[A-Z_0-9]{6}$/;
                break;
            case "loginPwd": //登录密码 6-18位字母数字下划线和~#^$@%&!*
                return /^[\w~#^$@%&!*]{6,18}$/;
                break;
            case "bankAccount"://银行/开票账号
                return /^[a-z_A-Z_0-9]*$/;
                break;
            case "paymentPsd": //支付密码 6位数字
                return /^\d{6}$/;
                break;
            case "TelMobile"://手机+电话（可输入数字减号混合）
                return /^([0-9-]+)$/;
                break;
            case "hjTakenWeight": //吨数（5位整数，6位小数）
                return /(^[1-9]\d{0,9}([.]\d{1,6})?$)|(^[0][.]\d{1,6}$)/;
                break;
            case "positiveIntegerAndZero"://正整数和0
                return /^([1-9][0-9]*|0)$/
                break;
            case "positiveIntegerNoZero"://正整数 不以0开头
                return /^([1-9][0-9]*)$/
                break;
        }
    }
    return Return;
})(jQuery);
//Cookie相关
emaiBase.Cookie = (function($) {
    var Return = {
        setCookie: function(name, value, hours) {
            var exp = new Date();
            exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/" + ";domain=" + cookieInfo;
        },
        getCookie: function(name) {
            if (name != null) {
                var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
                return value ? decodeURIComponent(value[1]) : null;
            }
        },
        getCookieOfJsonObj: function(name) {
            var result = emaiBase.Cookie.getCookie(name);
            if (result != null) {
                return emaiBase.Json.toJsonObject(result);
            }
            else {
                return null;
            }
        },
        clearCookie: function(name) {
            emaiBase.Cookie.setCookie(name, "", -1);
        }
    }
    return Return;
})(jQuery);
//Ajax相关
emaiBase.Ajax = (function($) {
    var centerServiceErrorCode = "100";
    var mustLoginErrorCode = "MSG20013";
    var mustBindFirmErrorCode = "MSG20012";
    var tradeTemplateErrorCode = "MSG20016";
    var mustInTradeTime = "MSG20014";
    var exceptionErrorCode = "MSG44444";
    var refuseFrozen = "MSG20017";
    var mustBuyer = "MSG20018";
    var mustSeller = "MSG20019";
    var Return = {
        operate: function($btn, className, methodName, jsonParams, callBack, failCallBack, areaName) {
            var requestAsync = true;
            if (jsonParams != null && jsonParams.async != undefined) {
                requestAsync = jsonParams.async;
            }
            if ($btn == null || $btn.attr("disabled") != "disabled") {
                $.ajax({
                    url: getHandlerUrl(className, methodName, areaName),
                    type: "post",
                    data: jsonParams,
                    dataType: 'json',
                    async: requestAsync,
                    cache: false,
                    traditional: true,
                    success: function(result) {
                        if (isResponseData(result)) {
                            var resultData = convertResultDataToObject(result.Data);
                            if (!hasErr(result, resultData, className, methodName, 0, failCallBack)) {
                                callBack(resultData, result.Code, result.Info);
                            }
                        } else {
                            if (!result.IsSuccess) {
                                if (failCallBack != null && failCallBack != undefined) {
                                    failCallBack(result);
                                }
                                else if (result.Message != undefined) {
                                    //comm.Dialog.alert(result.Message);
                                    //alert(result.Message);
                                    layer.alert(result.Message);
                                }
                            }
                            else {
                                callBack(result);
                            }
                        }
                        hideDivLoad($btn);
                        if ($btn) {
                            $btn.removeAttr("disabled");
                        }
                    },
                    complete: function(XMLHttpRequest, textStatus) {
                        checkSessionTimeout(XMLHttpRequest);
                        hideDivLoad($btn);
                        if ($btn) {
                            $btn.removeAttr("disabled");
                        }
                    },
                    error: function(er) {
                        hideDivLoad($btn);
                        if ($btn) {
                            $btn.removeAttr("disabled");
                        }
                        writeAjaxErr(er, className, methodName);
                    },
                    beforeSend: function() {
                        if ($btn) {
                            $btn.attr("disabled", "disabled");
                        }
                        divLoading($btn);
                    }
                });
            }
        },
        read: function($div, className, methodName, jsonParams, callBack, areaName) {
            var requestAsync = true;
            if (jsonParams != null && jsonParams.async != undefined) {
                requestAsync = jsonParams.async;
            }
            $.ajax({
                url: getHandlerUrl(className, methodName, areaName),
                type: "post",
                data: jsonParams,
                dataType: 'json',
                async: requestAsync,
                cache: false,
                traditional: true,
                success: function(result) {
                    if (isResponseData(result)) {
                        var resultData = convertResultDataToObject(result.Data);
                        if (!hasErr(result, resultData, className, methodName, 1)) {
                            hideDivLoad($div);
                            callBack(resultData, result.Code, result.Info);
                        }
                    } else {
                        hideDivLoad($div);
                        callBack(result);
                    }
                },
                complete: function(XMLHttpRequest, textStatus) {
                    checkSessionTimeout(XMLHttpRequest);
                    hideDivLoad($div);
                },
                error: function(er) {
                    hideDivLoad($div);
                    writeAjaxErr(er, className, methodName);
                },
                beforeSend: function() {
                    divLoading($div);
                }
            });
        },
        load: function($div, className, methodName, jsonParams, callBack, areaName) {
            var requestAsync = true;
            if (jsonParams != null && jsonParams.async != undefined) {
                requestAsync = jsonParams.async;
            }
            $.ajax({
                url: getHandlerUrl(className, methodName, areaName),
                async: requestAsync,
                data: jsonParams,
                type: "post",
                cache: false,
                traditional: true,
                success: function(result) {
                    if (isResponseData(result)) {
                        hideDivLoad($div);
                        callBack(result);
                    } else {
                        hideDivLoad($div);
                        callBack(result);
                    }
                },
                complete: function(XMLHttpRequest, textStatus) {
                    checkSessionTimeout(XMLHttpRequest);
                    hideDivLoad($div);
                },
                error: function(er) {
                    hideDivLoad($div);
                    writeAjaxErr(er, className, methodName);
                },
                beforeSend: function() {
                    divLoading($div);
                }

            });
        },
        loadHtml: function($div, className, methodName, jsonParams, callBack, areaName) {
            var requestAsync = true;
            if (jsonParams != null && jsonParams.async != undefined) {
                requestAsync = jsonParams.async;
            }
            $.ajax({
                url: getHandlerUrl(className, methodName, areaName),
                async: requestAsync,
                data: jsonParams,
                type: "post",
                cache: false,
                traditional: true,
                success: function(result) {
                    if (isResponseData(result)) {
                        var resultData = convertResultDataToObject(result.Data);
                        if (!hasErr(result, resultData, className, methodName, 0)) {
                            //callBack(resultData, result.Code, result.Info);
                        }
                    } else {
                        callBack(result);
                    }
                },
                complete: function(XMLHttpRequest, textStatus) {
                    checkSessionTimeout(XMLHttpRequest);
                    hideDivLoad($div);
                },
                error: function(er) {
                    hideDivLoad($div);
                    writeAjaxErr(er, className, methodName);
                },
                beforeSend: function() {
                    divLoading($div);
                }

            });
        },
        bindList: function($div, className, methodName, jsonParams, callBack, thisfun, PageSize, PageIndex) {
            emaiBase.Ajax.read($div, className, methodName, jsonParams, function(data) {
                _pageindex = PageIndex;
                if (data.IsSuccess) {
                    if (data.RowCount == 0) {
                        $div.find("#pageMain").hide();
                    }
                    else {
                        $div.find("#pageMain").show();
                        $div.find("#Pagination").pagination(data.RowCount, {
                            callback: function(page, jq) {
                                PageIndex = page + 1;
                                _pageindex = PageIndex;
                                thisfun();
                            },
                            items_per_page: PageSize,
                            current_page: PageIndex - 1
                        });
                    }

                    callBack(data.Data);
                }
                else {
                    layer.alert(data.Message);
                }
                return _pageindex;
            });
        },
        isSuccess: function(code) {
            return code == emaiBase.Consts.successCode;
        }
    }
    var convertResultDataToObject = function(strResultData) {
        return (emaiBase.Json.isJsonStr(strResultData)) ? emaiBase.Json.toJsonObject(strResultData) : strResultData;
    }
    var isResponseData = function(result) {
        if (result.Code != undefined && result.IsSuccess == undefined) {
            return true;
        }
        else {
            return false;
        }
    }
    //type:0operate 1read
    var hasErr = function(result, resultData, className, methodName, type, failCallBack) {
        var checkResult = false;
        if (result.Code != undefined) {
            if (result.Code.substr(0, 3) == centerServiceErrorCode) {
                checkResult = true;
                window.console.log("Service Error:" + className + " " + methodName + " " + result.Code + " " + result.Info);
                if (failCallBack != undefined && failCallBack != null) {
                    failCallBack(resultData, result.Code, result.Info);
                }
                else {
                    layer.alert("系统服务异常，请稍后再试。");
                }
            }
            else if (result.Code == mustLoginErrorCode) {
                checkResult = true;
                layer.confirm('<div>' + result.Info + '</div>', {
                    btn: ['我要登录', '我要注册'] //按钮
                    , cancel: function(index, layero) {
                        var url = emaiBase.Url.addUrlParam(resultData.LoginUrl, "url", encodeURIComponent(emaiBase.Url.getCurrentUrl()));
                        emaiBase.Url.goToUrl(url);
                    }

                }, function() {
                    var url = emaiBase.Url.addUrlParam(resultData.LoginUrl, "url", encodeURIComponent(emaiBase.Url.getCurrentUrl()));
                    emaiBase.Url.goToUrl(url);
                }, function() {
                    emaiBase.Url.goToUrl(resultData.RegisterUrl);
                    return false;

                });
            }
            else if (result.Code == mustBindFirmErrorCode) {
                checkResult = true;
                layer.confirm('<div>您尚未绑定企业，不能进行相关操作！</div><div>如您已获取企业验证码，请立刻绑定！</div>', {
                    btn: ['我要申请认证', '我要绑定验证码'] //按钮
                }, function() {
                    emaiBase.Url.goToUrl(resultData.CorpAuthUrl);
                }, function() {
                    emaiBase.Url.goToUrl(resultData.BindInviteCodeUrl);
                    return false;
                });
            }
            else if (result.Code == tradeTemplateErrorCode || result.Code == mustInTradeTime || result.Code == refuseFrozen || result.Code == mustBuyer || result.Code == mustSeller) {
                checkResult = true;
                layer.alert(result.Info);
            }
            else if (result.Code == exceptionErrorCode) {
                checkResult = true;
                if (type == 0) {
                    layer.alert("系统开小差了，请稍后再试。");
                }
                else if (type == 1) {
                    window.console.log("Error:" + className + " " + methodName + " " + result.Code + " " + result.Info);
                }
            }
            else if (result.Code != emaiBase.Consts.successCode && result.Code != emaiBase.Consts.javaSuccess && result.Code != emaiBase.Consts.javaSuccessTwo && type == 0) {
                checkResult = true;
                if (failCallBack != undefined && failCallBack != null) {
                    failCallBack(resultData, result.Code, result.Info);
                }
                else {
                    layer.alert(result.Info);
                }
            }
        }
        return checkResult;
    }
    var writeAjaxErr = function(er, className, funcName) {
        window.console.log("className:" + className + ",funcName:" + funcName + ",Ajax Error:" + JSON.stringify(er));
    }
    var getHandlerUrl = function(className, methodName, areaName) {
        var domain = currentUrl;
        if (areaName != undefined) {
            return domain + areaName + "/" + className + "/" + methodName;
        }
        else {
            return domain + className + "/" + methodName;
        }
    }
    var hideDivLoad = function($div) {
        if ($div != null && $div.length > 0) {
            $div.hideLoading();
        }
    }
    var divLoading = function($div) {
        if ($div != null && $div.length > 0) {
            $div.showLoading();
        }
    }
    var checkSessionTimeout = function(response) {
        if (response.getResponseHeader) {
            var sessionStatus = response.getResponseHeader("sessionstatus");
            if (sessionStatus == 'timeout') {
                console.log("session过期");
                return;
            }
        }
    }
    return Return;
})(jQuery);
emaiBase.Json = (function($) {
    var Return = {
        toJsonObject: function(strJson) {
            return JSON.parse(strJson);
        },
        toJsonStr: function(objJson) {
            return JSON.stringify(objJson);
        },
        isJsonObject: function(obj) {
            var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
            return isjson;
        },
        isJsonStr: function(strJson) {
            try {
                emaiBase.Json.toJsonObject(strJson);
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
    return Return;
})(jQuery);
emaiBase.DataRule = (function($) {
    var Return = {
        moneyRule: function(money) {
            return money.toFixed(2).formatNumber();
        },
        moneyNotPoint: function(money) {
            var result = money.toFixed(2) + "";
            if (result.indexOf('.') > 0) {
                result = result.trimEnd('0') + "";
                if (result.charAt(result.length - 1) == '.')
                    result = result.trimEnd('.') + "";
            }
            return result.formatNumber();
        },
        weightRule: function(weight) {
            var result = weight.toFixed(6) + "";
            if (result.indexOf('.') > 0) {
                result = result.trimEnd('0') + "";
                if (result.charAt(result.length - 1) == '.')
                    result = result.trimEnd('.') + "";
            }
            return result;
        },
        timeRule: function(time) {
            var time = emaiBase.Convert.toDate(time);
            return time.format("yyyy/MM/dd HH:mm:ss");
        },
        dateRule: function(date, formatType) {
            if (formatType == undefined || formatType == null) {
                formatType = "yyyy/MM/dd";
            }
            if (date.isKong())
                return date;
            var date = emaiBase.Convert.toDate(date);
            return date.format(formatType);
        },
        realTimeRule: function(time) {
            var time = emaiBase.Convert.toDate(time);
            var today = new Date();
            var todayMorning = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            if (time >= todayMorning) {
                return time.format("HH:mm");
            }
            else {
                return time.format("yyyy/MM/dd");
            }
        },
        timeDiffRule: function(time) {
            var result;
            var dateTime = emaiBase.Convert.toDate(time);
            var now = new Date();

            //var timeDiff = now.getTime() - dateTime.getTime();
            //var hourMs = 3600 * 1000;
            //if (timeDiff >= 24 * hourMs) {
            //    //时间差大于1天的情况
            //    var days = Math.floor(timeDiff / (24 * hourMs));
            //    result = days + "天前";
            //} else if (timeDiff >= hourMs) {
            //    //时间差大于1小时的情况
            //    var hours = Math.floor(timeDiff / hourMs);
            //    result = hours + "小时前";
            //} else if (timeDiff >= (hourMs / 60)) {
            //    //时间差大于1分钟的情况
            //    var minutes = Math.floor(timeDiff / (hourMs / 60));
            //    result = minutes + "分钟前";
            //} else {
            //    result = "1分钟前";
            //}

            var diffDays = dateTime.dateDiff("d", now);
            result = diffDays + "天前";
            if (diffDays == 0) {
                result = dateTime.format("HH:mm")
            }

            return result;
        }
    }
    return Return;
})(jQuery);
emaiBase.Layer = (function($) {
    var Return = {
        SuccessMsg: function(msg) {
            if (!msg || msg.isKong()) {
                msg = "操作成功";
            }
            layer.msg(msg, { icon: 1 });
        },
        SuccessMsgAndRedirect: function(msg, url) {
            if (!msg || msg.isKong()) {
                msg = "操作成功";
            }
            layer.msg(msg, { icon: 1 }, function() {
                if (url && url.length > 0) {
                    window.location = url;
                } else {
                    location.reload();
                }
            });
        },
        SuccessMsgAndCallback: function(msg, callback) {
            if (!msg || msg.isKong()) {
                msg = "操作成功";
            }
            layer.msg(msg, { icon: 1 }, callback);
        },
        ErrorMsg: function(msg) {
            if (!msg || msg.isKong()) {
                msg = "操作失败";
            }
            layer.msg(msg, { icon: 2 });
        },
        ErrorAlert: function(msg, callback) {
            var infoHtml = "<div class='status-dialog'><div><i class='icon-no iconfont'></i></div><div class='status-dialog-text'>" + msg + "</div></div>";
            layer.open({
                content: infoHtml,
                area: ['380px', 'auto'],
                title: '提示信息',
                btn: ['确定'],
                yes: function(index) {
                    if (callback && callback != undefined) {
                        callback();
                    }
                    layer.close(index);
                }
            });
        },
        InfoAlert: function(msg) {
            var infoHtml = "<div class='status-dialog'><div class='dialog-body'><i class='icon-info iconfont'></i></div><div class='status-dialog-text'>" + msg + "</div></div>";
            layer.open({
                content: infoHtml,
                area: ['380px', 'auto'],
                title: '提示信息',
                btn: ['确定'],
                yes: function(index) {
                    layer.close(index);
                }
            });
        }
    }
    return Return;
})(jQuery);
emaiBase.Placeholder = function($element, marginValue) {

    //检测是否需要模拟placeholder
    var placeholder = '';
    var element;
    if ($element.length > 0) {
        element = $element[0];
    }
    if (element && !("placeholder" in document.createElement("input")) && (placeholder = element.getAttribute("placeholder"))) {
        //当前文本控件是否有id, 没有则创建
        var idLabel = element.id;
        if (!idLabel) {
            idLabel = "placeholder_" + new Date().getTime();
            element.id = idLabel;
        }

        //创建label元素
        var eleLabel = document.createElement("label");
        eleLabel.htmlFor = idLabel;
        eleLabel.style.position = "absolute";
        //根据文本框实际尺寸修改这里的margin值
        if (marginValue) {
            eleLabel.style.margin = marginValue;
        }
        else {
            eleLabel.style.margin = "20px 0 0 44px";
        }
        eleLabel.style.color = "#999";
        eleLabel.style.cursor = "text";
        eleLabel.style.fontSize = "12px";
        eleLabel.style.textAlign = "left";

        //插入创建的label元素节点
        element.parentNode.insertBefore(eleLabel, element);
        //事件
        element.onfocus = function() {
            eleLabel.innerHTML = "";
        };
        element.onblur = function() {
            if (this.value === "") {
                eleLabel.innerHTML = placeholder;
            }
        };

        //样式初始化
        if (element.value === "") {
            eleLabel.innerHTML = placeholder;
        }
    }
};
emaiBase.GetCheckedValue = function($parent, removeValue) {
    var checkedValues = new Array();
    $parent.find(":checkbox").each(function() {
        if (removeValue) {
            if ($(this).is(':checked') && $(this).val() != removeValue) {
                checkedValues.push($(this).val());
            }
        }
        else {
            if ($(this).is(':checked')) {
                checkedValues.push($(this).val());
            }
        }
    });
    return checkedValues;
};
emaiBase.FixedTitle = (function() {
    var Return = {
        initFixWidth: function() {
            $(".divFixedTitle").each(function() {
                initWidth($(this).closest("div"));
            });
        },
        initFixWidthOnce: function($rootDiv) {
            initWidth($rootDiv);
        },
        resizeFixWidth: function($rootDiv) {
            var $ul = $rootDiv.find(".divFixedTitle ul");
            var $tb = $rootDiv.find(".tbFixedTitle");
            var arrTd = $tb.find("tbody tr:first").find("td");
            var arrLi = $ul.find("li");
            if (arrTd.length > 0) {
                arrLi.each(function(index) {
                    $(this).outerWidth(arrTd.eq(index).outerWidth());
                });
            }
        }
    }
    var initWidth = function($rootDiv) {
        var $ul = $rootDiv.find(".divFixedTitle ul");
        var $tb = $rootDiv.find(".tbFixedTitle");
        var arrTh = $tb.find("thead th");
        var arrLi = $ul.find("li");
        arrTh.each(function(index) {
            $(this).css("min-width", arrLi.eq(index).width());
        });
        arrLi.each(function() {
            $(this).outerWidth($ul.closest(".divFixedTitle").width() / arrLi.length);
        });
    }
    return Return;
})();

String.prototype.len = function() {
    var arr = this.match(/[^\x00-\xff]/ig);
    return this.length + (arr == null ? 0 : arr.length);
}
String.prototype.trim = function() {
    var result = this.replaceAll('　', ' ');
    result = result.replace(/(^\s*)|(\s*$)/g, "");
    return result;
}
String.prototype.trimEnd = function(trimStr) {
    if (!trimStr) { return this; }
    var temp = this;
    while (true) {
        if (temp.substr(temp.length - trimStr.length, trimStr.length) != trimStr) {
            break;
        }
        temp = temp.substr(0, temp.length - trimStr.length);
    }
    return temp;
};
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
String.prototype.isKong = function() {
    if (this.trim() == "")
        return true;
    else
        return false;
}
String.prototype.toNumber = function() {
    if (this.trim() == "")
        return 0;
    else
        return this;
}
String.prototype.toBeginDate = function() {
    if (this.trim() == "")
        return "0001-01-01";
    else
        return this.trim() + " 00:00:00";
}
String.prototype.toEndDate = function() {
    if (this.trim() == "")
        return "9999-01-01";
    else
        return this.trim() + " 23:59:59";
}
//1234to1,234
String.prototype.formatNumber = function() {
    if (!isNaN(this)) {
        return this.replace(/(\d)(?=(\d{3})+\b)/g, "$1,");
    }
    else {
        return this;
    }
}
String.prototype.changeToLink = function(cssName) {
    this.str = this;
    this.str = this.str.replace(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|\&|-)+)/g, "<a href='$1$2' target='_blank'  class='" + cssName + "'>$1$2</a>");
    return this.str;
}
String.prototype.timeFormatter = function() {
    this.str = this;
    var da = new Date(parseInt(this.str.replace("/Date(", "").replace(")/", "").split("+")[0]));
    return da.getFullYear() + "/" + (da.getMonth() + 1) + "/" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();
}
String.prototype.nullableDate = function(nullThenMax) {
    this.str = this;
    if (this.str == "") {
        if (nullThenMax) {
            return "9999-01-01";
        }
        else {
            return "0001-01-01";
        }
    }
    return this.str;
}

Date.prototype.format = function(formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
}
Date.prototype.dateAdd = function(strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's': return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n': return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}
Date.prototype.dateDiff = function(interval, objDate2) {
    var d = this, i = {}, t = d.getTime(), t2 = objDate2.getTime();
    i['y'] = objDate2.getFullYear() - d.getFullYear();
    i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4);
    i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth();
    i['ms'] = objDate2.getTime() - d.getTime();
    i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
    i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
    i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
    i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
    i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
    return i[interval];
}
Date.prototype.datePart = function(interval) {
    var myDate = this;
    var partStr = '';
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    switch (interval) {
        case 'y': partStr = myDate.getFullYear(); break;
        case 'm': partStr = myDate.getMonth() + 1; break;
        case 'd': partStr = myDate.getDate(); break;
        case 'w': partStr = Week[myDate.getDay()]; break;
        case 'ww': partStr = myDate.WeekNumOfYear(); break;
        case 'h': partStr = myDate.getHours(); break;
        case 'n': partStr = myDate.getMinutes(); break;
        case 's': partStr = myDate.getSeconds(); break;
    }
    return partStr;
}
Date.prototype.daysOfMonth = function() {
    var myDate = this;
    var ary = myDate.toArray();
    var date1 = (new Date(ary[0], ary[1] + 1, 1));
    var date2 = date1.dateAdd('m', 1);
    var result = daysDiff(date1.format('yyyy-MM-dd'), date2.format('yyyy-MM-dd'));
    return result;
}
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
Number.prototype.toFixed = function(d) {
    var s = this + "";
    if (!d) d = 0;
    if (s.indexOf(".") == -1) s += ".";
    s += new Array(d + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
        var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
        if (a == d + 2) {
            a = s.match(/\d/g);
            if (parseInt(a[a.length - 1]) > 4) {
                for (var i = a.length - 2; i >= 0; i--) {
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] == 10) {
                        a[i] = 0;
                        b = i != 1;
                    } else break;
                }
            }
            s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");

        } if (b) s = s.substr(1);
        return (pm + s).replace(/\.$/, "");
    } return this + "";

};