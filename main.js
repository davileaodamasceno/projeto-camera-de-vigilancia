objects = [];

status = "";

function preload() {
    video = createVideo('video.mp4');
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'detectando objetos';
}

function modelLoaded() {
    console.log('modeloCarregado');
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function getResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {


        objectDetector.detect(video, getResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objetos detectados";
            document.getElementById("numeroDeObjetos").innerHTML = "Quantidade de Objetos Detectados" + objects.length;
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}