var filhx;
$(document).ready(function () {
    findFilhx("-LFF6YTtcLBrb3kzHNuH", function (snapshot) {
        filhx = snapshot.val();
        loadInfoUser();
        loadInfoSprint();
        renderTasks();
    });
});

function changeStateSprint() {
    if ($("#change-state-sprint i").hasClass("fa-play")) {
        startSprint(filhx.key);
        $("#change-state-sprint").attr("class", "btn-sprint pattern-color-red");
        $("#change-state-sprint i").attr("class", "fa fa-stop fa-2x");
    } else {
        stopSprint(filhx.key);
        $("#change-state-sprint").attr("class", "btn-sprint pattern-color-green");
        $("#change-state-sprint i").attr("class", "fa fa-play fa-2x");
    }
}

function addComentario() {
    var atividade = $("#atividade-key").val();
    var description = $("#comentario").val();
    var comentario = {
        key: 0,
        comentario: description,
        atividade: atividade
    }
    salvarComentario(comentario);
}

function sendTask() {
    var key = $("#confirm-send-task-atividade").val();
    findAtividade(key, function (snapshot) {
        var atividade = snapshot.val();
        atividade.estado = 1;
        salvarAtividade(atividade, function (result) {
            $("#task_" + key + " button.btn.sendButton").attr("disabled", "disabled");
            $("#task_" + key + " .option-task").attr("disabled", "disabled");
            $("#task_" + key).css("background-color", "#f9f9f9");
        });
    });
}



function openModalComentario(key) {
    $("#atividade-key").val(key);
    $("#modal-comentario").modal("show");
}

function openModalConfirmSendTask(key) {
    $("#confirm-send-task-atividade").val(key);
    $("#confirm-send-task").modal("show");
}


function loadInfoSprint() {
    findSprintFilhx(filhx.key, function (sprint) {
        if (sprint.state == 0) {
            $("#change-state-sprint").addClass("pattern-color-green");
            $("#change-state-sprint i").attr("class", "fa fa-play fa-2x");
        } else {
            $("#change-state-sprint").addClass("pattern-color-red");
            $("#change-state-sprint i").attr("class", "fa fa-stop fa-2x");
        }
        $("#timer").text(sprint.timer);
    });
}

function loadInfoUser() {
    $("#img-avatar").attr("src", filhx.path);
    $("#user-name").text(filhx.levelName);
    $("#user-points").append($("<span></span>").text(" " + filhx.points + " ")).append($("<i></i>").addClass("fa fa-diamond icon-points"));
}

function renderTasks() {
    $("#list-task").html("");
    findAtividadesDoFilhx(filhx.key, function (atividades) {
        atividades.forEach(function (child) { 
            var atividade = child.val();
            var at = $("<div></div>").addClass("_2hEQd _1E3L7").attr("id", "task_" + atividade.key);
            if (atividade.estado == 1)
                at.css("background-color", "#f9f9f9");
            var table = $("<table></table>").addClass("table-task");

            var tr = $("<tr></tr>").addClass("header-task");
            tr.append($("<td></td>").addClass("column1").append($("<span></span>").addClass("title-task").text(atividade.nome)));

            var td = $("<td></td>").addClass("column2");
            var optiontask = $("<a></a>").addClass("option-task").append($("<i></i>").addClass("fa fa-camera fa-2x"));
            if (atividade.estado == 1)
                optiontask.attr("disabled", "disabled");
            td.append(optiontask);

            optiontask = $("<a></a>").addClass("option-task");
            if (atividade.estado == 1)
                optiontask.attr("disabled", "disabled").attr("href", "#");
            else
                optiontask.attr("href", "javascript:openModalComentario('" + atividade.key + "');");
            td.append(optiontask.append($("<i></i>").addClass("fa fa-comment-o fa-2x")));
            tr.append(td);
            table.append(tr);

            tr = $("<tr></tr>").addClass("content-task");
            td = $("<td></td>").addClass("column1");
            td.append($("<div></div>").append($("<span></span>").addClass("title-description").text("Descrição")).append($("<br/>")).append($("<span></span>").addClass("description-task").text(atividade.descricao)));
            tr.append(td);
            td = $("<td></td>").addClass("column2");
            var btn = $("<button></button>").addClass("btn sendButton").text("Enviar ").append($("<i></i>").addClass("fa fa fa-send"));
            btn.attr("onclick", "javascript:openModalConfirmSendTask('" + atividade.key + "');");
            if (atividade.estado == 1)
                btn.attr("disabled", "disabled");
            td.append(btn);
            tr.append(td);
            table.append(tr);
            at.append(table);
            $("#list-task").append(at);
            
        });
    });
}
