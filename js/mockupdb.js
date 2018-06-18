class Atividade {
    constructor(id, nome, descricao, usuario, estado) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.usuario = usuario;
        this.estado = estado;
    }
}

class Usuario {
    constructor(id, name, levelName, points, path) {
        this.id = id;
        this.name = name;
        this.levelName = levelName;
        this.points = points;
        this.path = path;
    }
}

var $MDB = new Object();
$MDB.tableAtividade = {};
$MDB.tableAtividade.itens = [];
$MDB.tableAtividade.idGlobal = 0;
$MDB.tableUsuario = {};
$MDB.tableUsuario.idGlobal = 0;
$MDB.tableUsuario.itens = [];

$MDB.findUser = function (idUsuario) {
    return $MDB.tableUsuario.find(function (usuario) {
        return usuario.id == idUsuario;
    });
}

$MDB.findAtividadesDoUsuario = function (usuario) {
    return $MDB.tableAtividade.itens.filter(atividade => atividade.usuario.id == usuario.id);
}

$MDB.iniciarSprint = function (idUsuario) {

}

$MDB.sendAtividade = function (atividade) {

}

$MDB.createAtividade = function (atividade) {
    $MDB.tableAtividade.idGlobal = $MDB.tableAtividade.idGlobal + 1;
    atividade.id = $MDB.tableAtividade.idGlobal;
    $MDB.tableAtividade.itens.push(atividade);
    return true;
}

$MDB.removerMotor = function (idMotor) {
    $MDB.tableMotor = $MDB.tableMotor.filter(motor => motor.id !== idMotor);
    return true;
}

$MDB.find = function (idMotor) {
    return $MDB.tableMotor.find(function (motor) {
        return motor.id == idMotor;
    });
}
