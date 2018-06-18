var responsavel;
$(document).ready(function () {
    findResponsavel("-LFF6Znj7Bh3sR9h5gnh", function (snapshot) {
        responsavel = snapshot.val();
        loadInfoSprint();
        renderTasks();
    });
});

function avaliar(key, star) {
    findAtividade(key, function (snapshot) {
        var atividade = snapshot.val();
        atividade.avaliacao = star;
        $("#task_" + key + " .fa-star").each(function (index) {
            if (index + 1 <= star)
                $(this).attr("class", "fa fa-star fa-2x checked");
            else
                $(this).attr("class", "fa fa-star fa-2x");
        });
        salvarAtividade(atividade);
    })
}

function changeStateSprint() {
    if ($("#change-state-sprint i").hasClass("fa-play")) {
        $("#change-state-sprint").attr("class", "top-button pattern-color-red");
        $("#change-state-sprint i").attr("class", "fa fa-stop");
    } else {
        $("#change-state-sprint").attr("class", "top-button pattern-color-green");
        $("#change-state-sprint i").attr("class", "fa fa-play");
    }
}

function openModalSprint(){
    findSprintReponsavel(responsavel.key, function(snapshot){
       if(snapshot){
           var sprint = snapshot.val();
           $("#key-sprint").val(sprint.key);
           $("#tempo-sprint").val(sprint.tempo);
           $("#descricao-sprint").val(sprint.descricao);
           $("#xp-sprint").val(sprint.xp);
       }else{
           $("#key-sprint").val("0");
           $("#tempo-sprint").val("3");
           $("#descricao-sprint").val("");
           $("#xp-sprint").val("10");
       }
    });
}

function salvarSprint(){
    var sprint = {
        key: $("#key-sprint").val(),
        tempo: $("#tempo-sprint").val(),
        descricao: $("#descricao-sprint").val(),
        responsavel: responsavel.key,
        xp: $("#xp-sprint").val(),
        state: 1
    };
    saveSprint(sprint, changeStateSprint);
}

function removeTask() {
    removerAtividade($("#confirm-remove-atividade").val(), renderTasks);
}

function openModalConfirmRemove(key) {
    $("#confirm-remove-atividade").val(key);
    $("#confirm-remove").modal("show");
}

function openModalEditAtividade(key) {
    findAtividade(key, function (snapshot) {
        var atividade = snapshot.val();
        $("#nome-atividade").val(atividade.nome);
        $("#descricao-atividade").val(atividade.descricao);
        $("#key-atividade").val(key);
        $("#salvar-atividade").modal("show");
    });
}

function selectFilhx(key, avatar) {
    $("#filhx-selecionado").val(key);
    $("#avatar_" + avatar).attr("class", "avatar-user-task-selecionado");
}

function openModalSalvarAtividade(key) {
    findFilhxResponsavel(responsavel.key, function (snapshot) {
        var tr1 = $("<tr></tr>");
        var tr2 = $("<tr></tr>");
        var i = 0;
        snapshot.forEach(function (child) {
            var filhx = child.val();
            var td = $("<td></td>").css("text-align", "center");
            td.append($("<a></a>").attr("href", "javascript:selectFilhx('" + filhx.key + "', '" + i + "');").append($("<img></img>").attr("src", filhx.path).addClass("avatar-user-task").attr("id", "avatar_" + i)));
            tr1.append(td);

            td = $("<td></td>").css("text-align", "center");
            td.append($("<span></span>").text(filhx.nome).addClass("nickname-user-task"));
            tr2.append(td);
            i++;
        });
        $("#select-filhx").html("");
        $("#select-filhx").append(tr1).append(tr2);
    });
    if (key) {
        findAtividade(key, function (snapshot) {
            var atividade = snapshot.val();
            $("#nome-atividade").val(atividade.nome);
            $("#descricao-atividade").val(atividade.descricao);
            $("#avaliacao-atividade").val(atividade.avaliacao);
            $("#key-atividade").val(key);
            $("#salvar-atividade").modal("show");
            $("#filhx-selecionado").val(atividade.filhx);
        });
    } else {
        $("#nome-atividade").val("");
        $("#descricao-atividade").val("");
         $("#avaliacao-atividade").val("0");
        $("#key-atividade").val("0");
        $("#salvar-atividade").modal("show");
        $("#filhx-selecionado").val("0");
    }
}

function savetask() {
    var key = $("#key-atividade").val();
    var nome = $("#nome-atividade").val();
    var descricao = $("#descricao-atividade").val();
    var filhx = $("#filhx-selecionado").val();
    var atividade = new Atividade(key, nome, descricao, filhx, responsavel.key, 0);
    atividade.avaliacao = $("#avaliacao-atividade").val();
    salvarAtividade(atividade, renderTasks);
}

function openModalConfirmSendTask(key) {
    $("#confirm-send-task-atividade").val(key);
    $("#confirm-send-task").modal("show");
}


function loadInfoSprint() {
    findSprintReponsavel(responsavel.key, function (snapshot) {
        var sprint = snapshot.val();
        if (sprint.state == 0) {
            $("#change-state-sprint").addClass("pattern-color-green");
            $("#change-state-sprint i").attr("class", "fa fa-play");
        } else {
            $("#change-state-sprint").addClass("pattern-color-red");
            $("#change-state-sprint i").attr("class", "fa fa-stop");
        }
    });
}

function renderTasks() {
    $("#list-task").html("");
    findAtividadesDoResponsavel(responsavel.key, function (atividades) {
        atividades.forEach(function (child) {
            var atividade = child.val();
            var at = $("<div></div>").addClass("_2hEQd _1E3L7").attr("id", "task_" + atividade.key);
            var table = $("<table></table>").addClass("table-task");

            var tr = $("<tr></tr>").addClass("header-task");
            tr.append($("<td></td>").addClass("column1").append($("<span></span>").addClass("title-task").text(atividade.nome)));
            var td = $("<td></td>").addClass("column2");
            var optiontask = $("<a></a>").addClass("option-task").append($("<i></i>").addClass("fa fa-pencil fa-2x"));
            optiontask.attr("href", "javascript:openModalSalvarAtividade('" + atividade.key + "')");
            td.append(optiontask);
            optiontask = $("<a></a>").addClass("option-task").append($("<i></i>").addClass("fa fa-trash fa-2x"));
            optiontask.attr("href", "javascript:openModalConfirmRemove('" + atividade.key + "')");
            td.append(optiontask);
            tr.append(td);
            table.append(tr);

            tr = $("<tr></tr>").addClass("content-task");
            td = $("<td></td>").addClass("column1");
            td.append($("<div></div>").append($("<span></span>").addClass("title-description").text("Descrição")).append($("<br/>")).append($("<span></span>").addClass("description-task").text(atividade.descricao)));
            tr.append(td);

            findFilhx(atividade.filhx, function (snapshot) {
                var filhx = snapshot.val();
                td = $("<td></td>").addClass("column2");
                td.append($("<img></img>").addClass("avatar-user-task").attr("src", filhx.path));
                tr.append(td);
                table.append(tr);

                tr = $("<tr></tr>").addClass("footer-task");
                td = $("<td></td>").addClass("column1").css("color", "gray");
                for (var i = 1; i <= 5; i++) {
                    var star = $("<a></a>").attr("href", "javascript:avaliar('" + atividade.key + "', '" + i + "')");
                    if (i <= atividade.avaliacao)
                        star.append($("<span></span>").addClass("fa fa-star fa-2x checked"));
                    else
                        star.append($("<span></span>").addClass("fa fa-star fa-2x"));
                    td.append(star);
                }
                tr.append(td);
                td = $("<td></td>").addClass("column2");
                td.append($("<span></span>").addClass("nickname-user-task").text(filhx.nome));
                tr.append(td);
                table.append(tr);

                at.append(table);
                $("#list-task").append(at);
            });
        });
    });
}
