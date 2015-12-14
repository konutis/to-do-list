this.Element && function(ElementPrototype) {
    ElementPrototype.closest = ElementPrototype.closest ||
        function(selector) {
            var el = this;
            while (el.matches && !el.matches(selector)) el = el.parentNode;
            return el.matches ? el : null;
        }
}(Element.prototype);



var toDoList = function () {

        // query selector
    var $ = function (x) {
            return document.querySelector(x);
        },
        $$ = function (x) {
            return document.querySelectorAll(x);
        },

        // get the class that contains some word
        getThatClass = function (element, contains) {
            var elementClasses = element.getAttribute("class").split(" ");
            var currentClass = '';
            for (i = 0; i < elementClasses.length; i++) {
                function getClass () {
                    if (elementClasses[i].indexOf(contains) > -1) {
                        currentClass = elementClasses[i];
                        return false;
                    }
                }
                getClass();
            }
            return currentClass;
        },
        hasClass = function (element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        },
        removeActive = function (el) {
            for ( i = 0; i < el.length; i++) {
                el[i].classList.remove("active");
            }
        },
        addClass = function (el, className) {
            for ( i = 0; i < el.length; i++) {
                el[i].classList.add(className);
            }
        },

        // Task details  /  edit task

        editTask = function () {

            var $appBody = $(".app-body"),
                appLayer = "task-details-open",
                $detailTextContainer = $(".selected-text"),
                $detailText = $detailTextContainer.firstElementChild,
                $taskDetails = $(".task-details"),
                $saveTaskButton = $(".save-edited"),
                $taskInner = $$(".task-inner"),
                $editStatus = $taskDetails.querySelector(".styled-check").firstElementChild,

                $categoryBox = $(".edit-category"),
                $categoryButtons = $taskDetails.querySelector(".categories").children,

                $reminderBox = $(".edit-reminder"),
                $reminderControls = $(".reminder-controls"),
                $saveReminder = $reminderControls.querySelector(".save"),

                $importantCheck = $taskDetails.querySelector(".star-check").firstElementChild,

                $editableElements = $$(".edit-detail"),
                $editableElementBtns = [],

                $calendarBox = $(".calendar-box"),
                $calendarDates = $(".month-days").querySelectorAll("td"),

                getEditableElement = function () {
                    for ( i = 0; i < $editableElements.length; i++ ) {
                        $editableElementBtns.push($editableElements[i].previousElementSibling);
                    }
                },
                toggleEditableElements = function () {
                    for ( i = 0; i < $editableElementBtns.length; i++) {
                        $editableElementBtns[i].onclick = function () {
                            if (hasClass(this.nextElementSibling, "active")) {
                                this.nextElementSibling.classList.remove("active");
                            } else {
                                removeActive($editableElements);
                                this.nextElementSibling.classList.toggle("active");
                            }
                        }
                    }
                },
                closeEditableElements = function () {
                    for ( i = 0; i < $editableElementBtns.length; i++) {
                        $editableElementBtns[i].nextElementSibling.classList.remove("active");
                    }
                },

                changePriority = function () {
                    var selectedTaskId = $taskDetails.getAttribute("data-id"),
                        $selectedTask = document.getElementById(selectedTaskId),
                        $smallTaskBoxes = $$(".col-6"),
                        $importantTaskBox = $(".important-wrap");

                    if (hasClass($selectedTask, "important")) {
                        if ($importantCheck.checked === false) {
                            $selectedTask.parentNode.removeChild($selectedTask);
                            $selectedTask.classList.remove("important");

                            if ($smallTaskBoxes[0].clientHeight <= $smallTaskBoxes[1].clientHeight) {
                                $smallTaskBoxes[0].appendChild($selectedTask);
                            } else {
                                $smallTaskBoxes[1].appendChild($selectedTask);
                            }
                        }
                    } else {
                        if ($importantCheck.checked) {
                            $selectedTask.parentNode.removeChild($selectedTask);
                            $importantTaskBox.appendChild($selectedTask);
                            $selectedTask.classList.add("important");
                        }
                    }
                },

                saveTask = function () {
                    var selectedTaskId = $taskDetails.getAttribute("data-id"),
                        $selectedTask = document.getElementById(selectedTaskId),
                        $selectedText = $selectedTask.querySelector(".task-text").firstElementChild,
                        categoryClass = getThatClass($taskDetails, "palette"),
                        $taskNote = $selectedTask.querySelector(".task-note"),
                        $editNote = $taskDetails.querySelector(".note"),
                        $taskStatus = $selectedTask.querySelector(".checker"),
                        taskCategoryClass = getThatClass($selectedTask, "palette");

                    $appBody.classList.remove(appLayer);
                    $taskDetails.classList.remove("active");

                    closeEditableElements();

                    $selectedText.innerHTML = $detailText.textContent;

                    $selectedTask.classList.remove(taskCategoryClass);
                    $selectedTask.classList.add(categoryClass);

                    setTimeout(function (){
                        $taskDetails.classList.remove(categoryClass);
                    }, 200);
                    $taskNote.innerHTML = $editNote.value;
                    $taskStatus.checked = $editStatus.checked;

                    function checkstatus () {
                        if ($taskStatus.checked) {
                            $selectedTask.closest(".task").classList.add("task-done");
                        }
                    }
                    checkstatus();
                    $editStatus.checked = false;
                    changePriority();
                },
                setReminder = function () {
                    var $reminderInputs = $(".edit-reminder").querySelectorAll("input"),
                        $hourInput = $(".hours").querySelector("input"),
                        $minuteInput = $(".minutes").querySelector("input"),
                        $hourControls = $(".hours").querySelectorAll("button"),
                        $minuteControls = $(".minutes").querySelectorAll("button"),
                        pad = function (num, size) {
                            var s = num+"";
                            while (s.length < size) s = "0" + s;
                            return s;
                        },
                        hourStartVal = pad(9, 2),
                        minStartVal = pad(0, 2);

                    $hourInput.value = hourStartVal;
                    $minuteInput.value = minStartVal;




                    for (i = 0; i < $hourControls.length; i++) {
                        $hourControls[i].onclick = function () {
                            var hourVal = parseInt($hourInput.value);

                            if (hasClass(this, "plus")) {
                                hourVal++;
                            } else {
                                hourVal--;
                            }
                            if(hourVal > 23){
                                hourVal = 0;
                            } else if ( hourVal < 0){
                                hourVal = 23;
                            }
                            hourVal = pad(hourVal, 2);
                            $hourInput.value = hourVal;

                        }
                    }

                    for (i = 0; i < $minuteControls.length; i++) {
                        $minuteControls[i].onclick = function () {
                            var minuteVal = parseInt($minuteInput.value);

                            if (hasClass(this, "plus")) {
                                minuteVal = minuteVal + 5;
                            } else {
                                minuteVal = minuteVal - 5;
                            }
                            if(minuteVal > 55){
                                minuteVal = 0;
                            } else if (minuteVal < 0){
                                minuteVal = 55;
                            }

                            minuteVal = pad(minuteVal, 2);
                            $minuteInput.value = minuteVal;

                        }
                    }



                };



            getEditableElement();
            toggleEditableElements();
            setReminder();

            for (i = 0; i < $taskInner.length; i++) {
                $taskInner[i].onclick = function () {

                    // give selected task id to sidebar as dataId
                    $taskDetails.setAttribute("data-id", this.parentElement.getAttribute("id"));

                    var $selectedTask = this.parentElement,
                        // for text
                        $selectedText = this.querySelector(".task-text").firstElementChild,
                        // for category
                        categoryClass = getThatClass($selectedTask, "palette"),
                        // for note
                        $taskNote = this.querySelector(".task-note"),
                        $editNote = $taskDetails.querySelector(".note");
                        // for important task


                    // 1. set layer
                    $appBody.classList.add(appLayer);
                    // 2. show details block
                    $taskDetails.classList.add("active");
                    // 3. set text
                    $detailText.innerHTML = $selectedText.textContent;
                    // 4. check if task is important / big
                    if (hasClass($selectedTask, "important")) {
                        $importantCheck.checked = true;
                    } else {
                        $importantCheck.checked = false;
                    }
                    // 5.1 set category
                    $taskDetails.classList.add(categoryClass);
                    // 5.2 change category

                    // 6. set note
                    $editNote.value = $taskNote.textContent;
                }
            }



            for (i = 0; i < $categoryButtons.length; i++) {
                $categoryButtons[i].onclick = function () {
                    var categoryClass = getThatClass($taskDetails, "palette");

                    $taskDetails.classList.remove(categoryClass);

                    categoryClass = this.getAttribute("class");

                    $taskDetails.classList.add(categoryClass);

                    $categoryBox.classList.remove("active");
                }
            }

            for (i = 0; i < $calendarDates.length; i++) {
                $calendarDates[i].onclick = function () {
                    removeActive($calendarDates);
                    this.classList.add("active");
                    $calendarBox.classList.remove("active");
                }
            }



            $saveTaskButton.onclick = function () {
                saveTask();
            };
            $saveReminder.onclick = function () {
                $reminderBox.classList.remove("active");
            };
        },

        filterByCategory = function () {

            var navButtons = $(".navbar").children,
                $task = $$(".task");

            for (i = 0; i < navButtons.length; i++) {
                navButtons[i].onclick = function() {
                    removeActive(navButtons);

                    this.classList.add("active");

                    var filterClass = getThatClass(this, "palette") + "-helper";

                    addClass($task, "hidden");

                    for ( i = 0; i < $task.length; i++) {
                        if (hasClass($task[i], filterClass)) {
                            $task[i].classList.remove("hidden");
                        }
                    }
                    if (filterClass === "grey-palette-helper") {
                        for ( i = 0; i < $task.length; i++) {
                            $task[i].classList.remove("hidden");
                        }
                    }

                }
            }
        },
        taskStatus = function () {
            var checkBox = $$(".checker");
            for (i = 0; i < checkBox.length; i++){
                if (checkBox[i].checked) {
                    checkBox[i].closest(".task").classList.add("task-done");
                } else {
                    checkBox[i].closest(".task").classList.remove("task-done");
                }
                checkBox[i].onchange = function () {
                    this.closest(".task").classList.toggle("task-done");
                }
            }
        },
        search = function () {

        },
        newTask = function () {
            var $headerButtons = $(".header-controls").querySelectorAll(".header-controls > button"),
                $newTaskBox = $(".new-task-container"),
                $addTaskBtn = $(".add-btn"),
                $addedText = $(".add-text").firstElementChild,
                $categoryList = $(".category-list").children,
                $selectedCategory = $(".task-options").querySelector(".category"),
                $priorityCheck = $(".priority"),
                $smallTaskBoxes = $$(".col-6"),
                $importantTaskBox = $(".important-wrap"),


                addNewTask = function () {
                    var newTask = document.createElement("div"),
                        $task = $$(".task"),
                        taskId = $task.length,
                        taskCategory = getThatClass($selectedCategory, "palette");


                    newTask.innerHTML = '<div class="styled-check"><input type="checkbox" class="checker" name="status"><label><span></span></label></div><div class="task-inner"><header class="task-header"><div class="info"><time>Unknown</time></div></header><div class="task-text"><span></span></div><p class="task-note"></p></div>';
                    newTask.setAttribute("id", "task" + taskId);
                    newTask.setAttribute("class", "task " + taskCategory + "-helper");

                    if ($priorityCheck.checked) {
                        $importantTaskBox.appendChild(newTask);
                        newTask.classList.add("important");
                    } else {

                        if ($smallTaskBoxes[0].clientHeight <= $smallTaskBoxes[1].clientHeight) {
                            $smallTaskBoxes[0].appendChild(newTask);
                        } else {
                            $smallTaskBoxes[1].appendChild(newTask);
                        }
                    }

                    var $thisTask = document.getElementById("task" + taskId),
                        $thisTaskInput = $thisTask.firstElementChild.firstElementChild,
                        $thisTaskLabel = $thisTaskInput.nextElementSibling,
                        $thisTaskText = $thisTask.querySelector(".task-text").firstElementChild;

                    $thisTaskInput.setAttribute("id", "check" + taskId);
                    $thisTaskLabel.setAttribute("for", "check" + taskId);
                    $thisTaskText.innerHTML = $addedText.textContent;
                };
            for ( i = 0; i < $headerButtons.length; i++) {
                $headerButtons[i].onclick = function () {
                    var selectedCategoryClass = getThatClass($selectedCategory, "palette");

                    if (hasClass(this, "active")) {
                        this.classList.remove("active");
                    } else {
                        removeActive($headerButtons);
                        this.classList.toggle("active");
                    }
                    if (hasClass(this, "add-btn") && hasClass(this, "active")) {
                        $categoryList[0].classList.add("active");
                        $selectedCategory.classList.add("red-palette");
                    } else if (hasClass(this, "add-btn")) {
                        removeActive($categoryList);
                        $selectedCategory.classList.remove(selectedCategoryClass);
                        $priorityCheck.checked = false;
                    }
                }
            }

            for ( i = 0; i < $categoryList.length; i++) {
                $categoryList[i].onclick = function () {
                    removeActive($categoryList);
                    this.classList.add("active");

                    var categoryClass = getThatClass(this, "palette"),
                        changingClass = getThatClass($selectedCategory, "palette");

                    $selectedCategory.classList.remove(changingClass);
                    $selectedCategory.classList.add(categoryClass);
                }
            }

            $newTaskBox.onkeypress = function(e) {
                var code = (e.keyCode ? e.keyCode : e.which),
                    defaultText = "Add a new task";
                if (code === 13) {
                    addNewTask();
                    $addTaskBtn.classList.remove("active");
                    $addedText.innerHTML = defaultText;
                    removeActive($categoryList);
                    $selectedCategory.classList.remove(getThatClass($selectedCategory, "palette"));
                    $priorityCheck.checked = false;

                    editTask();
                    taskStatus();
                    filterByCategory();
                }
            };
        };
        //close = function () {
        //    document.onclick = function (e) {
        //
        //        var sideBar = $(".task-details"),
        //            item = $(".add-detail");
        //
        //        console.log(item.closest(sideBar));
        //
        //        if (e.target === sideBar || e.target === sideBar.closest()) {
        //            console.log("ir")
        //        } else {
        //            console.log("nav")
        //        }
        //    };
        //};






    editTask();
    filterByCategory();
    taskStatus();
    search();
    newTask();




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
