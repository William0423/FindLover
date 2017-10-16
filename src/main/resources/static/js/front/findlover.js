
// 会员和星级用户logo toolbar
function initToolBar(){
    $('img[data-toolbar="vip-toolbar"]').toolbar({
        content: '#vip-deadline',
        position: 'top',
        adjustment: 25
    });
    $('img[data-toolbar="star-toolbar"]').toolbar({
        content: '#star-deadline',
        position: 'top',
        adjustment: 25
    });
}
//初始化Dropdown为hover事件
function initDropdown(){
    $(".dropdown").hover(
        function () {
            $('.dropdown-menu', this).stop(true, true).slideDown(100);
            $(this).toggleClass('open');
        },
        function () {
            $('.dropdown-menu', this).stop(true, true).slideUp(100);
            $(this).toggleClass('open');
        }
    );
}

//初始化年龄下拉列表
function initAgeDropdown(dropdownBtnId) {
    for (var x = age_low_limit; x <= age_high_limit; x++) {
        $("select[id*=age-select-]").append($("<option value='" + x + "'>" + x + "</option>"));
    }
    // 年龄条件控制
    $("#age-select-low").change(function () {
        var low_age = this.value;
        var pre_selected = parseInt($("#age-select-high").val());
        $("#age-select-high").find("option:gt('0')").remove();
        for (var x = low_age == '-1' ? age_low_limit : low_age; x <= age_high_limit; x++) {
            $("#age-select-high").append($("<option value='" + x + "' " + (x == pre_selected ? "selected" : "") + ">" + x + "</option>"));
        }
        if (dropdownBtnId != undefined)
            updateAgeDropdown(dropdownBtnId);
    });
    $("#age-select-high").change(function () {
        var high_age = this.value;
        var pre_selected = parseInt($("#age-select-low").val());
        $("#age-select-low").find("option:gt('0')").remove();
        for (var x = age_low_limit; x <= (high_age == '-1' ? age_high_limit : high_age); x++) {
            $("#age-select-low").append($("<option value='" + x + "' " + (x == pre_selected ? "selected" : "") + ">" + x + "</option>"));
        }
        if (dropdownBtnId != undefined)
            updateAgeDropdown(dropdownBtnId);
    });
}

//初始化身高的下拉列表
function initHeightDropdown(dropdownBtnId) {
    for (var x = height_low_limit; x <= height_high_limit; x++) {
        $("select[id*=height-select-]").append($("<option value='" + x + "'>" + x + "</option>"));
    }
    // 身高条件控制
    $("#height-select-low").change(function () {
        var low_age = this.value;
        var pre_selected = parseInt($("#height-select-high").val());
        $("#height-select-high").find("option:gt('0')").remove();
        for (var x = low_age == '-1' ? height_low_limit : low_age; x <= height_high_limit; x++) {
            $("#height-select-high").append($("<option value='" + x + "' " + (x == pre_selected ? "selected" : "") + ">" + x + "</option>"));
        }
        if (dropdownBtnId != undefined)
            updateHeightDropdown(dropdownBtnId);
    });
    $("#height-select-high").change(function () {
        var high_age = this.value;
        var pre_selected = parseInt($("#height-select-low").val());
        $("#height-select-low").find("option:gt('0')").remove();
        for (var x = height_low_limit; x <= (high_age == '-1' ? height_high_limit : high_age); x++) {
            $("#height-select-low").append($("<option value='" + x + "' " + (x == pre_selected ? "selected" : "") + ">" + x + "</option>"));
        }
        if (dropdownBtnId != undefined)
            updateHeightDropdown(dropdownBtnId);
    });
}

//初始化地区下拉列表
function initWorkplaceDropdown(spanId, provinceId, cityId) {
    $.getJSON(contextPath + "json/cities.json", function (data) {
        for (var x = 0; x < data.length; x++) {
            $("#" + provinceId).append($("<option value='" + data[x].name + "'>" + data[x].name + "</option>"));
        }
    });
    $("#" + provinceId).change(function () {
        $("#" + cityId).find(":gt('0')").remove();
        $.getJSON(contextPath + "json/cities.json", function (data) {
            for (var x = 0; x < data.length; x++) {
                if (data[x].name == $("#" + provinceId).val()) {
                    for (var y = 1; y < data[x].sub.length; y++) {
                        $("#" + cityId).append($("<option value='" + data[x].sub[y].name + "'>" + data[x].sub[y].name + "</option>"));
                    }
                    break;
                }
            }
        });
        if (spanId != undefined)
            updateWorkplaceDropdown(spanId, provinceId, cityId);
    });
    $("#" + cityId).change(function () {
        if (spanId != undefined)
            updateWorkplaceDropdown(spanId, provinceId, cityId);
    });
}

// 动态更新地区下拉列表
function updateWorkplaceDropdown(spanId, provinceId, cityId) {
    var provinceSel = $("#" + provinceId);
    var citySel = $("#" + cityId);
    var result;
    if (provinceSel.val() == "-1") {
        result = "地区不限";
    } else {
        if (citySel.val() == "-1")
            result = provinceSel.val();
        else
            result = provinceSel.val() + "&nbsp;" + citySel.val();
    }
    $("#" + spanId).html(result);
}