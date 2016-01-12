this.Element && function(ElementPrototype) {
    ElementPrototype.closest = ElementPrototype.closest ||
        function(selector) {
            var el = this;
            while (el.matches && !el.matches(selector)) el = el.parentNode;
            return el.matches ? el : null;
        }
}(Element.prototype);

var toDoList = function () {

    var $ = function (x) {
            return document.querySelector(x);
        },
        $$ = function (x) {
            return document.querySelectorAll(x);
        },
        localstorage = {
            set: function (key, value) {
                window.localStorage.setItem( key, JSON.stringify(value) );
            },
            get: function (key) {
                try {
                    return JSON.parse( window.localStorage.getItem(key) );
                } catch (e) {
                    return null;
                }
            }
        },
        getThatClass = function (element, contains) {
            var elementClasses = element.getAttribute("class").split(" "),
                currentClass = '';
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
        pad = function (num, size) {
            var s = num+"";
            while (s.length < size) s = "0" + s;
            return s;
        },
        hasClass = function (element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        },
        removeActive = function (el) {
            for ( i = 0; i < el.length; i++) {
                el[i].classList.remove("active");
            }
        },
        lookForId = function (array, id) {
            var lookup = {};
            for (i = 0; i < array.length; i++) {
                lookup[array[i].id] = array[i];
            }
            return lookup[id];
        },
        tasks = [
            {
                'id': 0,
                'category': "red-palette-helper",
                'important': true,
                'done': false,
                'date': "Next monday",
                'hour': 9,
                'minute': 0,
                'place': "At Tesco",
                'text': "Buy a new better toothbrush",
                'note': "This note is for task with id 0",
                'visible': "true"
            },
            {
                'id': 1,
                'category': "yellow-palette-helper",
                'important': false,
                'done': false,
                'place': "",
                'date': "Tomorrow",
                'hour': 21,
                'minute': 30,
                'text': "Clean my room",
                'note': "This note is for task with id 1",
                'visible': "true"
            },
            {
                'id': 2,
                'category': "green-palette-helper",
                'important': false,
                'done': false,
                'place': "",
                'date': "14. September 2013",
                'hour': 13,
                'minute': 25,
                'text': "Clean the house and mauris pretium purus id sapien consectetur",
                'note': "This note is for task with id 2",
                'visible': "true"
            },
            {
                'id': 3,
                'category': "violet-palette-helper",
                'important': false,
                'done': false,
                'place': "",
                'date': "19. September 2013",
                'hour': 12,
                'minute': 0,
                'text': "Do a homework from ipsum dolor amet, consectetur adipiscing",
                'note': "This note is for task with id 3",
                'visible': "true"
            },
            {
                'id': 4,
                'category': "violet-palette-helper",
                'important': false,
                'done': true,
                'place': "",
                'date': "5. October 2013",
                'hour': 9,
                'minute': 0,
                'text': "Gift for Petra",
                'note': "This note is for task with id 4",
                'visible': "true"
            },
            {
                'id': 5,
                'category': "green-palette-helper",
                'important': false,
                'done': true,
                'place': "",
                'date': "Yesterday",
                'hour': 10,
                'minute': 40,
                'text': "Buy a milk",
                'note': "This note is for task with id 5",
                'visible': "true"
            },
            {
                'id': 6,
                'category': "yellow-palette-helper",
                'important': false,
                'done': true,
                'place': "",
                'date': "Last week",
                'hour': 17,
                'minute': 20,
                'text': "Call to Jakub Antalik",
                'note': "This note is for task with id 6",
                'visible': "true"
            }
        ];

    if (localStorage.getItem("localTasks") === null) {
        localstorage.set("localTasks", tasks);
    }

    var storedTasks = localstorage.get("localTasks"),

        addTask = function (tasks) {
            var newTask = document.createElement("div"),
                taskId = tasks[i].id,
                taskCategory = tasks[i].category,
                $smallTaskBoxes = $$(".col-6"),
                $importantTaskBox = $(".important-wrap");

            newTask.innerHTML = '<div class="styled-check"><input type="checkbox" class="checker" name="status"><label><span></span></label></div><div class="task-inner"><header class="task-header"><div class="info"><span class="place"></span><time></time></div></header><div class="task-text"><span></span></div></div>'
            newTask.setAttribute("id", "task" + taskId);
            newTask.setAttribute("class", "task " + taskCategory);

            if (tasks[i].important) {
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
                $checkbox = $thisTask.querySelector(".checker"),
                $label = $checkbox.nextElementSibling,
                $text = $thisTask.querySelector(".task-text").firstElementChild,
                $date = $thisTask.querySelector("time"),
                $place = $thisTask.querySelector(".place");

            $checkbox.setAttribute("id", "check" + taskId);
            $label.setAttribute("for", "check" + taskId);
            $text.innerHTML = tasks[i].text;
            $date.innerHTML = tasks[i].date;

            if (tasks[i].done) {
                $thisTask.classList.add("task-done");
                $checkbox.checked = true;
            }

            if (tasks[i].place === "") {
                $place.classList.add("hidden");
            } else {
                $place.innerHTML = tasks[i].place;
            }

            if (tasks[i].visible) {
                $thisTask.classList.remove("hidden");
            } else {
                $thisTask.classList.add("hidden");
            }
        },

        clearTasks = function() {
            var $smallTaskBoxes = $$(".col-6"),
                $importantTaskBox = $(".important-wrap");

            $smallTaskBoxes[0].innerHTML = "";
            $smallTaskBoxes[1].innerHTML = "";
            $importantTaskBox.innerHTML = "";
        },

        addAllTasks = function (tasks) {
            for (i = 0; i < tasks.length; i++) {
                addTask(tasks);
            }
        },

        newTask = function () {
            var $headerButtons = $(".header-controls").querySelectorAll(".header-controls > button"),
                $newTaskBox = $(".new-task-container"),
                $addTaskBtn = $(".add-btn"),
                $addedText = $(".add-text").firstElementChild,
                $categoryList = $(".category-list").children,
                $selectedCategory = $(".task-options").querySelector(".category"),
                $priorityCheck = $(".priority"),
                $appBody = $(".app-body"),
                appLayer = "task-details-open",
                $detailButtons = $(".task-options").querySelectorAll("button"),
                $newTaskPanels = $(".new-task-container").querySelectorAll(".panel"),

                addNewTask = function () {
                    var storedTasks = localstorage.get("localTasks"),
                        $task = $$(".task"),
                        taskId = $task.length,
                        taskCategory = getThatClass($selectedCategory, "palette"),
                        $addedText = $(".add-text").firstElementChild,

                        newTask = {
                                'id': taskId,
                                'category': taskCategory + "-helper",
                                'important': $priorityCheck.checked,
                                'done': false,
                                'place': "",
                                'date': "Unknown",
                                'hour': 9,
                                'minute': 0,
                                'text': $addedText.textContent,
                                'note': "",
                                'visible': true
                        };
                    storedTasks.push(newTask);

                    localstorage.set("localTasks", storedTasks);
                    clearTasks();
                    addAllTasks(storedTasks);
                };

            for ( var i = 0; i < $headerButtons.length; i++) {
                $headerButtons[i].onclick = function () {
                    var selectedCategoryClass = getThatClass($selectedCategory, "palette"),
                        panelClass = this.getAttribute("data-panel");

                    if (this.classList.contains("active")) {
                        $appBody.classList.remove(appLayer);
                        removeActive($(".header-controls").children);
                        document.removeEventListener("keyup", listenKey, true);


                    } else {
                        $appBody.classList.add(appLayer);
                        removeActive($(".header-controls").children);
                        this.classList.add("active");
                        $("." + panelClass).classList.add("active");
                        window.addEventListener('mouseup', closeBar, true);
                    }

                    if (this.classList.contains("add-btn") && this.classList.contains("active")) {
                        $categoryList[0].classList.add("active");
                        $selectedCategory.classList.add("red-palette");
                        document.addEventListener("keyup", listenKey, true);
                    } else if (this.classList.contains("add-btn")) {
                        removeActive($categoryList);
                        $selectedCategory.classList.remove(selectedCategoryClass);
                        $priorityCheck.checked = false;
                    }
                }
            }

            var closeBar = function(event) {
                var $activePanel = $(".header-controls").querySelector(".header-controls > div.active"),
                    inside = searchParentAdvanced(event.target, $activePanel),
                    selectedCategoryClass = getThatClass($selectedCategory, "palette");
                if(!inside) {
                    if ($addTaskBtn.classList.contains("active")) {
                        removeActive($categoryList);
                        $selectedCategory.classList.remove(selectedCategoryClass);
                        $priorityCheck.checked = false;
                    }
                    $appBody.classList.remove(appLayer);
                    window.removeEventListener('mouseup', closeBar, true);
                    removeActive($(".header-controls").children);
                    document.removeEventListener("keyup", listenKey, true);
                }
            };

            for ( var i = 0; i < $categoryList.length; i++) {
                $categoryList[i].onclick = function () {
                    removeActive($categoryList);
                    this.classList.add("active");

                    var categoryClass = getThatClass(this, "palette"),
                        changingClass = getThatClass($selectedCategory, "palette");

                    $selectedCategory.classList.remove(changingClass);
                    $selectedCategory.classList.add(categoryClass);
                }
            }

            for ( var i = 0; i < $detailButtons.length; i++) {
                $detailButtons[i].onclick = function () {
                    var thisPanel = document.querySelector("." + this.getAttribute("data-panel-button"));

                    if ( !(this.classList.contains("active"))) {
                        removeActive($detailButtons);
                        removeActive($newTaskPanels);
                        this.classList.add("active");
                        thisPanel.classList.add("active");
                    }
                }
            }

            var listenKey = function (e) {

                var code = (e.keyCode ? e.keyCode : e.which),
                    defaultText = "Add a new task";
                if (code === 13) {
                    addNewTask();
                    $addTaskBtn.classList.remove("active");
                    $newTaskBox.classList.remove("active");
                    $addedText.innerHTML = defaultText;
                    removeActive($categoryList);
                    $selectedCategory.classList.remove(getThatClass($selectedCategory, "palette"));
                    $priorityCheck.checked = false;
                    $appBody.classList.remove(appLayer);
                    editTask();
                    checkStatus();
                    filterByCategory();
                    document.removeEventListener("keyup", listenKey, true);
                }
            };
        },

        checkStatus = function () {
            var storedTasks = localstorage.get("localTasks"),
                checkBox = $$(".checker");
            for (i = 0; i < checkBox.length; i++){
                checkBox[i].onchange = function () {
                    var $taskInHtml = this.parentElement.parentElement,
                        selectedTaskId = $taskInHtml.getAttribute("id").substring(4, 5),
                        $selectedTask = lookForId(storedTasks, selectedTaskId);

                    if ($selectedTask.done) {
                        $taskInHtml.classList.remove("task-done");
                        $selectedTask.done = false;
                    } else {
                        $taskInHtml.classList.add("task-done");
                        $selectedTask.done = true;
                    }

                    localstorage.set("localTasks", storedTasks);
                }
            }
        },

        editTask = function () {

            var storedTasks = localstorage.get("localTasks"),
                $appBody = $(".app-body"),
                appLayer = "task-details-open",
                $detailTextContainer = $(".selected-text"),
                $detailText = $detailTextContainer.firstElementChild,
                $taskDetails = $(".task-details"),
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
                $hourInput = $(".hours").firstElementChild,
                $minuteInput = $(".minutes").firstElementChild,

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


                saveTask = function () {

                    var storedTasks = localstorage.get("localTasks"),

                        selectedTaskId = $taskDetails.getAttribute("data-id").substring(4, 5),
                        $selectedTask = lookForId(storedTasks, selectedTaskId),
                        categoryClass = getThatClass($taskDetails, "palette"),
                        $editNote = $taskDetails.querySelector(".note");

                    $appBody.classList.remove(appLayer);
                    $taskDetails.classList.remove("active");

                    closeEditableElements();

                    $selectedTask.text = $detailText.textContent;

                    $selectedTask.category = categoryClass;

                    $selectedTask.hour = $hourInput.value;

                    $selectedTask.minute = $minuteInput.value;

                    $selectedTask.note = $editNote.value;

                    $selectedTask.done = $editStatus.checked;

                    $selectedTask.important = $importantCheck.checked;

                    localstorage.set("localTasks", storedTasks);
                    clearTasks();
                    addAllTasks(storedTasks);

                    editTask();
                    checkStatus();
                    filterByCategory();

                    setTimeout(function (){
                        $taskDetails.classList.remove(categoryClass);
                    }, 200);
                    $editStatus.checked = false;
                },
                setReminder = function () {
                    var $hourControls = $(".hours").querySelectorAll("button"),
                        $minuteControls = $(".minutes").querySelectorAll("button");

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

            for (i = 0; i < $taskInner.length; i++) {
                $taskInner[i].onclick = function () {

                    $taskDetails.setAttribute("data-id", this.parentElement.getAttribute("id"));

                    var $selectedTaskId = $taskDetails.getAttribute("data-id").replace(/\D/g,''),
                        $selectedTask = lookForId(storedTasks, $selectedTaskId),
                        $editNote = $taskDetails.querySelector(".note");

                    $appBody.classList.add(appLayer);
                    $taskDetails.classList.add("active");

                    $detailText.innerHTML = $selectedTask.text;
                    if ($selectedTask.important) {
                        $importantCheck.checked = true;
                    } else {
                        $importantCheck.checked = false;
                    }
                    $taskDetails.classList.add($selectedTask.category);

                    $editNote.value = $selectedTask.note;

                    $hourInput.value = pad($selectedTask.hour, 2);
                    $minuteInput.value = pad($selectedTask.minute, 2);
                    setReminder();

                    window.addEventListener('mouseup', closeBar, true);
                }
            }

            var closeBar = function(event) {
                var inside = searchParent(event.target, $taskDetails);
                if(!inside) {
                    saveTask();
                    window.removeEventListener('mouseup', closeBar, true);
                }
            };

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


            $saveReminder.onclick = function () {
                $reminderBox.classList.remove("active");
            };


        },

        filterByCategory = function () {
            var navButtons = $(".navbar").children,
                $filterTitle = $(".header-title");

            for ( var i = 0; i < navButtons.length; i++) {
                navButtons[i].onclick = function() {

                    var storedTasks = localstorage.get("localTasks"),
                        filterClass = getThatClass(this, "palette") + "-helper",
                        categoryColor = filterClass.substring(0, filterClass.length - 15),
                        filterTitles = {
                            'grey': "All tasks",
                            'red': "Home",
                            'yellow': "Work",
                            'violet': "Computer",
                            'green': "Friends"
                        };

                    $filterTitle.innerHTML = filterTitles[categoryColor];

                    removeActive(navButtons);
                    this.classList.add("active");

                    for ( var i = 0; i < storedTasks.length; i++) {
                        storedTasks[i].visible = false;
                        if (storedTasks[i].category === filterClass) {
                            storedTasks[i].visible = true;
                        }
                    }
                    if (filterClass === "grey-palette-helper") {
                        for ( var i = 0; i < storedTasks.length; i++) {
                            storedTasks[i].visible = true;
                        }
                    }
                    clearTasks();
                    addAllTasks(storedTasks);
                    editTask();
                    checkStatus();
                    filterByCategory();
                };
            }
        },

        searchParentAdvanced = function (clickEl, closeEl) {
            var $addBtn = $(".add-btn"),
                $searchBtn = $(".search-btn");

            if (clickEl.parentNode === closeEl || clickEl === $addBtn || clickEl === $searchBtn) {
                return true;
            } else if ( clickEl.parentNode === document.body) {
                return false;
            } else {
                return searchParent(clickEl.parentNode, closeEl);
            }
        },

        searchParent = function (clickEl, closeEl) {
            if (clickEl.parentNode === closeEl) {
                return true;
            } else if ( clickEl.parentNode === document.body) {
                return false;
            } else {
                return searchParent(clickEl.parentNode, closeEl);
            }
        },

        search = function () {

        },

        resetTasks = function() {
            var resetBtn = $(".reset-tasks");
            resetBtn.onclick = function () {
                localstorage.set("localTasks", tasks);
                clearTasks();
                addAllTasks(tasks);
                checkStatus();
                editTask();
                filterByCategory();
                newTask();
            }
        };

    resetTasks();
    addAllTasks(storedTasks);
    checkStatus();
    editTask();
    filterByCategory();
    search();
    newTask();
};
toDoList();