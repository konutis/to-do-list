var toDoList = function(){

    // query selector
    var $ = function(x) {
            return document.querySelector(x);
        },
        $$ = function(x) {
            return document.querySelectorAll(x);
        },

        // every button needs this $('.app-body').toggleClass("task-details-open");

        // variables
        radioCheck = document.getElementsByClassName("checker"),

        // get the class that contains some word
        getThatClass = function(element, contains) {
            var elementClasses = element.getAttribute("class").split(" ");
            var currentClass = '';
            for (i = 0; i < elementClasses.length; i++) {
                function getClass(){
                    if (elementClasses[i].indexOf(contains) > -1) {
                        currentClass = elementClasses[i];
                        return false;
                    }
                }
                getClass();
            }
            return currentClass;
        };



    // Search button
    $(".search-btn").onclick = function() {
        this.classList.toggle("selected");
    };


    // Add-task button
    $(".add-btn").onclick = function() {
        this.classList.toggle("selected");
    };


    // Task-details  /  edit task

    var taskEdit = function() {
        var $appBody = $(".app-body"),
            appLayer = "task-details-open",
            $detailTextContainer = $(".selected-text"),
            $taskDetails = $(".task-details"),
            $saveButton = $(".save-edited"),
            $cancelButton = $(".cancel-edited"),
            $taskInner = document.getElementsByClassName("task-inner"),
            $categoryButton = $taskDetails.getElementsByClassName("category")[0],
            $reminderButton = $taskDetails.getElementsByClassName("reminder")[0];

        for (i = 0; i < $taskInner.length; i++) {
            $taskInner[i].onclick = function() {
                var that = this,

                    dataId = this.parentElement.getAttribute("id");
                    //$taskDetails.setAttribute("data-id", this.parentElement.getAttribute("id"));
                    $selectedTask = this.parentElement,

                    // for text
                    $selectedText = this.getElementsByClassName("task-text")[0].firstElementChild,
                    $detailText = $detailTextContainer.firstElementChild,

                    // for reminder
                    $reminderBox = $(".edit-reminder"),

                    // for category
                    categoryClass = getThatClass($selectedTask, "palette"),
                    $categoryBox = $(".edit-category"),
                    $categoryButtons = $taskDetails.querySelector(".categories").children,

                    // for note
                    $taskNote = this.getElementsByClassName("task-note")[0],
                    $editNote = $taskDetails.getElementsByClassName("note")[0],

                    // for radio button
                    $taskStatus = this.previousElementSibling.firstElementChild,
                    $editStatus = $taskDetails.getElementsByClassName("styled-check")[0].firstElementChild;

                    $taskDetails.setAttribute("data-id", this.parentElement.getAttribute("id"));
                // task inner click
                // 1. set layer
                $appBody.classList.add(appLayer);
                // 2. show details block
                $taskDetails.classList.add("active");
                // 3. set text
                $detailText.innerHTML = $selectedText.textContent;
                // 4. set reminder
                $reminderButton.onclick = function() {
                    $reminderBox.classList.add("active");
                    var $saveReminder = $(".reminder-controls").getElementsByClassName("save")[0],
                        $cancelReminder = $(".reminder-controls").getElementsByClassName("cancel")[0];
                    console.log($saveReminder);

                    $saveReminder.onclick = function() {
                        $reminderBox.classList.remove("active");
                    };
                    $cancelReminder.onclick = function() {
                        $reminderBox.classList.remove("active");
                    };
                };
                // 5.1 set category
                $taskDetails.classList.add(categoryClass);
                // 5.2 change category
                $categoryButton.onclick = function() {

                    $categoryBox.classList.add("active");

                    for (i = 0; i < $categoryButtons.length; i++) {
                        $categoryButtons[i].onclick = function () {
                            $taskDetails.classList.remove(categoryClass);

                            categoryClass = this.getAttribute("class");

                            $taskDetails.classList.add(categoryClass);

                            $categoryBox.classList.remove("active");
                        }
                    }
                };

                // 5. set note
                $editNote.value = $taskNote.textContent;


                // save button click
                // $saveButton.onclick = function() {
                //
                //     $appBody.classList.remove(appLayer);
                //     $taskDetails.classList.remove("active");
                //     $selectedText.innerHTML = $detailText.textContent;
                //
                //     var taskCategoryClass = getThatClass($selectedTask, "palette");
                //     $selectedTask.classList.remove(taskCategoryClass);
                //     $selectedTask.classList.add(categoryClass);
                //
                //     setTimeout(function(){
                //         $taskDetails.classList.remove(categoryClass);
                //     }, 200);
                //     $taskNote.innerHTML = $editNote.value;
                //
                //
                //     $taskStatus.checked = $editStatus.checked;
                //     function checkstatus() {
                //         if ($taskStatus.checked) {
                //             that.closest(".task").classList.add("task-done");
                //         }
                //     }
                //     checkstatus();
                //     $editStatus.checked = false;
                // };


                //cancel button click
                $cancelButton.onclick = function() {
                    $taskDetails.classList.remove("active");

                    $appBody.classList.remove(appLayer);

                    setTimeout(function(){
                        $taskDetails.classList.remove(categoryClass);
                    }, 200);
                    $editStatus.checked = false;
                };
            }
        }
        $saveButton.onclick = function() {

            $appBody.classList.remove(appLayer);
            $taskDetails.classList.remove("active");
            $selectedText.innerHTML = $detailText.textContent;

            var taskCategoryClass = getThatClass($selectedTask, "palette");
            $selectedTask.classList.remove(taskCategoryClass);
            $selectedTask.classList.add(categoryClass);

            setTimeout(function(){
                $taskDetails.classList.remove(categoryClass);
            }, 200);
            $taskNote.innerHTML = $editNote.value;


            $taskStatus.checked = $editStatus.checked;
            function checkstatus() {
                if ($taskStatus.checked) {
                    that.closest(".task").classList.add("task-done");
                }
            }
            checkstatus();
            $editStatus.checked = false;
        };
    }
    taskEdit();

    //function filterByCategory() {
    //    var navButtons = $(".navbar").children,
    //        activeIndex = 0;
    //    function addActive() {
    //        navButtons[activeIndex].classList.add("active");
    //    }
    //    addActive();
    //    for (i = 0; i < navButtons.length; i++) {
    //        navButtons[i].onclick = function() {
    //            navButtons[activeIndex].classList.remove("active");
    //            this.classList.add("active");
    //            activeIndex = i;
    //
    //        }
    //    }
    //}
    //filterByCategory();

    //var filterByCategory = function() {
    //    'activeIndex' : 0,
    //
    //};


    //var advandedTaskEdit = {
    //    'init': function() {
    //
    //    },
    //    'saveText': function() {
    //        console.log("hi");
    //    },
    //    'cancelEdit': function() {
    //
    //    }
    //};




    // Calendar button
    $(".calendar").onclick = function() {
        $(".calendar-box").classList.toggle("active");
    };


    // Radio button
    var taskStatus = function() {
        for (i = 0; i < radioCheck.length; i++){
            if (radioCheck[i].checked) {
                radioCheck[i].closest(".task").classList.add("task-done");
            } else {
                radioCheck[i].closest(".task").classList.remove("task-done");
            }
            radioCheck[i].onchange = function() {
                this.closest(".task").classList.toggle("task-done");
            }
        }
    }

    taskStatus();






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
