var config = {
    apiKey: "AIzaSyARzWISbV9aYGaU4pDQw00ArZvducKvuQU",
    authDomain: "web-upei.firebaseapp.com",
    databaseURL: "https://web-upei.firebaseio.com",
    projectId: "web-upei",
    storageBucket: "web-upei.appspot.com",
    messagingSenderId: "96917865889"
};
firebase.initializeApp(config);

class Atividade {
    constructor(key, nome, descricao, filhx, responsavel, estado) {
        this.key = key;
        this.nome = nome;
        this.descricao = descricao;
        this.filhx = filhx;
        this.responsavel = responsavel;
        this.estado = estado;
    }
}

class Responsavel {
    constructor(key, nome) {
        this.key = key;
        this.nome = nome;
    }
}

class Filhx{
    constructor(key, nome, levelName, points, path) {
        this.key = key;
        this.nome = nome;
        this.levelName = levelName;
        this.points = points;
        this.path = path;
    }
}

function salvarFilhx(filhx, callback) {
    if (filhx.key == "0") {
        filhx.key = newKey("/filhx/");
    }
    update("/filhx/", filhx, callback);
}

function salvarResponsavel(responsavel, callback) {
    if (responsavel.key == "0") {
        responsavel.key = newKey("/responsavel/");
    }
    update("/responsavel/", responsavel, callback);
}

function salvarAtividade(atividade, callback) {
    if (atividade.key == "0") {
        atividade.key = newKey("/atividade/");
    }
    update("/atividade/", atividade, callback);
}

function salvarComentario(comentario, callback){
    if (comentario.key == "0") {
        comentario.key = newKey("/comentario/");
    }
    update("/comentario/", comentario, callback);
}

function findAtividadesDoUsuario(filhx, callback){
    firebase.database().ref("/atividade/").orderByChild("filhx").equalTo(filhx).once("value", callback);
}

function newKey(path) {
    return firebase.database().ref().child(path).push().key;
}

function update(path, data, callback) {
    firebase.database().ref(path + data.key).update(data).then(function(){
        if(callback)
            callback(data);
    });
}

function removeRota(id) {
    firebase.database().ref("/rotas/" + id).remove();
}

function loadAllPosts(callback) {
    firebase.database().ref("/posts/").once('value', callback);
}

function buscarPosts(limite, callback) {
    firebase.database().ref("/posts/").limitToLast(limite).once("value", callback);
}

function findFilhx(key, callback){
    firebase.database().ref("/filhx/" + key ).once("value").then(callback);
}

function findAtividade(key, callback){
    firebase.database().ref("/atividade/" + key ).once("value").then(callback);
}

function findSprintFilhx(key, callback){
    var sprint = {
        state: 0,
        timer: "14:10:22"
    };
    callback(sprint);
}

function loadRotas(zoom, renderFunction) {
    var a;
    if (zoom > 16) {
        firebase.database().ref('/rotas/').once('value', renderFunction);
    } else if (zoom == 16) {
        firebase.database().ref('/rotas/').orderByChild("periculosidade").endAt(1).once('value', renderFunction);
    } else {
        firebase.database().ref('/rotas/').orderByChild("periculosidade").endAt(-1).once('value', renderFunction);
    }
}

function startSprint(key){
    
}

function stopSprint(key){
    
}

function buscarTodasRotasNaRua(c) {
    firebase.database().ref("/rotas/").orderByChild("rua").equalTo(c.rua).once("value", function (snapshot) {
        calcNovaRota(snapshot, c);
    });
}
