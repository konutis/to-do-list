var toDoList = function(){

    // query selector
    function $(x){
        return document.querySelector(x);
    }

    // toggle
    function toggle(el) {
        el.style.display = (el.style.display != 'none' ? 'none' : '' );
    }


    // every button needs this $('.app-body').toggleClass("task-details-open");

    // Search button
    $(".search-btn").onclick = function() {
        this.classList.toggle("selected");
    };


    // Add-task button
    $(".add-btn").onclick = function() {
        this.classList.toggle("selected");
    };


    // Task-details button
    $(".task-text").onclick = function() {
        $(".task-details").classList.toggle("active");
    };

    // Calendar button
    $(".calendar").onclick = function() {
        $(".calendar-box").classList.toggle("active");
    };

    // when task done
    $(".styled-check").closest("input") = function() {
        this.closest(".task").classList.toggle("task-done");
    };


    //$('.styled-check input').change(function(){
    //    $(this).closest('.task').toggleClass('task-done');
    //});






    //function xxx() {
    //    console.log($(this).val());
    //}
    //
    //$taskText.on("click", switchToInput);
    //
    //
    //
    //$taskText.text(localStorage.text);









    //$taskText.text(JSON.parse(localStorage.getItem('taskText'))[1]);
    //
    //function populateStorage() {
    //    $array = [];
    //
    //    $taskText.each(function() {
    //
    //        $array.push($(this).text());
    //
    //    });
    //
    //    localStorage.setItem('taskText', JSON.stringify($array));
    //
    //    $a = JSON.parse(localStorage.getItem('taskText'));
    //
    //    for(i = 0; i < $taskText.length; i++){
    //
    //
    //
    //    }
    //
    //}




};
toDoList();
