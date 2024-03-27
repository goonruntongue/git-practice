$(document).ready(() => {
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "data.json",
        success: (data) => {
            $.each(data, (key, value) => {
                $("pre").append(key + "\n" + value + "\n\n");
            });
            // AJAXコールバックの成功後にGoogle Code Prettifyを動的にロード
            setTimeout(() => {
                $.getScript("https://cdn.jsdelivr.net/gh/google/code-prettify/loader/run_prettify.js?skin=sons-of-obsidian");
            }, 10);
        }
    });
});