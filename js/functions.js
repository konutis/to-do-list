$(function(){

    autosize(document.querySelectorAll('textarea'));

    $('.add-btn').click(function(event){
        $('.new-task-container').toggle();
        $(this).toggleClass("selected");
    });

    $('.search-btn').click(function(event){
        $('.search-section').toggle();
        $(this).toggleClass("selected");
    });

    $('.task-text').click(function(event){
        $('.task-details').toggleClass("active");
    });

    $('.calendar').click(function(event){
        $('.calendar-box').toggle();
    });
});
