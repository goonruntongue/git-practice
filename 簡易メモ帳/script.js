$.ajax({
    type: "POST",
    dataType: "JSON",
    url: "data.json",
    success: function(data) {
        $.getScript("https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?skin=sons-of-obsidian", () => {
            $.each(data, function(key, val) {
                $pre = $("<pre>");
                $pre.addClass("prettyprint linenums").addClass(`lang-${key}`);
                $pre.append(val);
                $pre.prependTo(".content");
                $h1 = $("<h1>");
                $h1.html(key + "<span class='ofCode'>のコード</span>");
                $(".prettyprint").each((index, elem) => {
                    if (!$(elem).parent().hasClass("code")) {
                        $(elem).wrap("<div class='code'>");
                        $(elem).closest(".code").prepend($h1);
                    }
                });
            })
            $(".code").append('<i class="fa-solid fa-copy"></i>')
        });
    }
});
$(document).ready(function() {
    $.get("server.php", function(data) {
        $("#result").append(data);
    })
});

$("form").on("submit", function(e) {
    e.preventDefault();
    let formData = $(this).serialize();
    $.ajax({
        type: "POST",
        data: formData,
        url: "server.php",
        success: function(data) {
            $("#result").empty().append(data);
            $("textarea").val("").focus();
        }
    })
})

$(document).on("click", "i", function() {
    $siblingsPre = $(this).siblings("pre");
    let arr = [];
    $siblingsPre.find("li").each(function() {
        arr.push($(this).text());
    });
    console.log(arr.join("\n"));
    navigator.clipboard.writeText(arr.join("\n"));
    $(this).prepend("<span class='copied'>Copied!</span>").find(".copied").css({
        "position": "absolute",
        "top": 0,
        "left": "50%",
        "transform": "translate(-50%,-100%)"
    }).fadeOut(2000);
})