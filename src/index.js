function appendData(data){
    var mainContainer = document.getElementById("myData");
    data.forEach((element) => {
        let img = document.createElement("img");
        img.src = element.art;
        img.width = "225";
        img.height = "225";
        mainContainer.appendChild(img);
        })
}
fetch("http://localhost:3000/cards")
    .then((resp) => resp.json())
    .then((data) => appendData(data));