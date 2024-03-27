$(document).ready(() => {
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "data.json",
        success: (data) => {
            $.each(data, (key, value) => {
                $("pre").append(key + "<span class='copy'></span>" + "\n" + value + "\n\n");
            });
            // AJAXコールバックの成功後にGoogle Code Prettifyを動的にロード
            setTimeout(() => {
                $.getScript("https://cdn.jsdelivr.net/gh/google/code-prettify/loader/run_prettify.js?skin=sons-of-obsidian");
                $(".copy").each((index, elem) => {
                    $(elem).on("click", function() {
                        let copiedText = $(this).closest("li").text();
                        console.log(copiedText);
                        navigator.clipboard.writeText(copiedText);
                        $(elem).addClass("on").delay(1000).queue(next => {
                            $(elem).removeClass("on")
                            next();
                        })
                    })
                })
            }, 10);
        }
    });
});