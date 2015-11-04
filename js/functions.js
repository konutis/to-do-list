$(function(){

    autosize(document.querySelectorAll('textarea'));

    // -------  Search button

    $('.search-btn').click(function(){
        $('.search-section').toggle();
        $(this).toggleClass("selected");
        $('.app-body').toggleClass("task-details-open");
    });
    $(document).mouseup(function (e)
    {
        var container = $(".search-section");
        var button = $(".search-btn");
        var shadowContainer = $(".app-body");

        if (!container.is(e.target) && !$(e.target).closest(".search-btn").is(".search-btn")
            && container.has(e.target).length === 0)
        {
            container.hide();
            button.removeClass("selected");
            shadowContainer.removeClass("task-details-open");
        }
    });


    // -------  Add task button

    $('.add-btn').click(function(event){
        $('.new-task-container').toggle();
        $(this).toggleClass("selected");
        $('.app-body').toggleClass("task-details-open");
    });

    //$(document).mouseup(function (e)
    //{
    //    var container = $(".new-task-container");
    //    var button = $(".add-btn");
    //    var shadowContainer = $(".app-body");
    //
    //    if (!container.is(e.target) && !$(e.target).closest(".add-btn").is(".add-btn")
    //        && container.has(e.target).length === 0)
    //    {
    //        container.hide();
    //        shadowContainer.removeClass(".task-details-open");
    //    }
    //});

    // -------  Task details button

    $('.task-text').click(function(event){
        $('.task-details').toggleClass("active");
        $('.app-body').toggleClass("task-details-open");
    });

    //$(document).mouseup(function (e)
    //{
    //    var container = $(".task-details");
    //    var shadowContainer = $(".app-body");
    //
    //    if (!container.is(e.target) && !$(e.target).closest(".task-text").is(".task-text")
    //        && !$(e.target).closest(".calendar-box").is(".calendar-box")
    //        && container.has(e.target).length === 0)
    //    {
    //        container.removeClass("active");
    //
    //    }
    //});


    // -------  Calendar button

    $('.calendar').click(function(event){
        $('.calendar-box').toggle();
    });

    //$(document).mouseup(function (e)
    //{
    //    var container = $(".calendar-box");
    //
    //    if (!container.is(e.target) && !$(e.target).closest(".task-text").is(".task-text")
    //        && container.has(e.target).length === 0)
    //    {
    //        container.hide();
    //    }
    //});
});

