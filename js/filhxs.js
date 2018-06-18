var filhx;
$(document).ready(function () {
    findFilhx("-LFF6YTtcLBrb3kzHNuH", function (snapshot) {
        filhx = snapshot.val();
        loadInfoUser();
        renderTasks();
    });
});

function iniciarSprint() {
    
}

function salvarComentario() {

}

function sendTask(key) {
    findAtividade(key, function(snapshot){
       var atividade = snapshot.val();
        atividade.estado = 1;
        salvarAtividade(atividade, function(result){
           $("#task_" + key + " button.btn.sendButton").attr("disabled", "disabled");
        });
    });
}

function loadInfoUser() {
    $("#img-avatar").attr("src", filhx.path);
    $("#user-name").text(filhx.levelName);
    $("#user-points").append($("<span></span>").text(" " + filhx.points + " ")).append($("<i></i>").addClass("fa fa-diamond icon-points"));
}

function renderTasks() {
    $("#list-task").html("");
    findAtividadesDoUsuario(filhx.key, function (atividades) {
        atividades.forEach(function (child) {
            var atividade = child.val();
            var at = $("<div></div>").addClass("_2hEQd _1E3L7").attr("id", "task_" + atividade.key);

            var table = $("<table></table>").addClass("table-task");

            var tr = $("<tr></tr>").addClass("header-task");
            tr.append($("<td></td>").addClass("column1").append($("<span></span>").addClass("title-task").text(atividade.nome)));

            var td = $("<td></td>").addClass("column2");
            td.append($("<a></a>").addClass("option-task").append($("<i></i>").addClass("fa fa-camera fa-2x")));
            td.append($("<a></a>").addClass("option-task").append($("<i></i>").addClass("fa fa-comment-o fa-2x")));
            tr.append(td);
            table.append(tr);

            tr = $("<tr></tr>").addClass("content-task");
            td = $("<td></td>").addClass("column1");
            td.append($("<div></div>").append($("<span></span>").addClass("title-description").text("Descrição")).append($("<br/>")).append($("<span></span>").addClass("description-task").text(atividade.descricao)));
            tr.append(td);
            td = $("<td></td>").addClass("column2");
            var btn = $("<button></button>").addClass("btn sendButton").text("Enviar ").append($("<i></i>").addClass("fa fa fa-send"));
            btn.attr("onclick", "javascript:sendTask('" + atividade.key + "');");
            if(atividade.estado == 1)
                btn.attr("disabled", "disabled");
            td.append(btn);
            tr.append(td);
            table.append(tr);
            at.append(table);

            console.log(at);
            $("#list-task").append(at);
        });
    });
}
