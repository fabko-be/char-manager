// Affichage du tableau entier
tableDisplay();


async function tableDisplay() {
    const allChar = await dataConsult();
    const template = await document.querySelector("#tpl-test").content;

    for (const element of allChar) {
        const clone = template.cloneNode(true);

        clone.querySelector(".card-title").innerHTML = await element.name;
        clone.querySelector(".card-text",).innerHTML = await element.shortDescription;
        clone.querySelector(".card-img-top",).src = `data:image/JPEG;base64,${await element.image}`;
        clone.querySelector(".viewButtonIndex").id = await element.id;
        document.querySelector("#target").appendChild(clone);
        refreshViewButton()
    }

    document.querySelector("#searchbar").addEventListener("keyup", async () => {
        document.querySelector("#target").innerHTML = "";
        let persoArray = [];
        const recupData = await dataConsult();
        persoArray = await recupData;

        const template = await document.querySelector("#tpl-test").content;
        const searched = document.querySelector("#searchbar").value;
        for (const element of persoArray) {
               const nameRecup = element.name;

            if (nameRecup.toLowerCase().includes(searched.toLowerCase())) {
                const clone = template.cloneNode(true);

                clone.querySelector(".card-title").innerHTML = await element.name;
                clone.querySelector(".card-text").innerHTML = await element.shortDescription;
                clone.querySelector(".card-img-top",).src = `data:image/JPEG;base64,${await element.image}`;
                clone.querySelector(".viewButtonIndex").id = await element.id;
                document.querySelector("#target").appendChild(clone);
                refreshViewButton()
            }
        }
    });
}
function refreshViewButton(){
Array.from(document.querySelectorAll(".viewButtonIndex")).forEach($btn =>
    $btn.addEventListener("click", async () => {
        const selectChar = await dataSearchByID($btn.id);

        document.querySelector("#viewCharName").innerHTML = await selectChar.name;
        document.querySelector("#viewCharImg").src = `data:image/JPEG;base64,${await selectChar.image}`;
        document.querySelector("#viewCharSDesc").innerHTML = `<strong>Short description :</strong><br> ${await selectChar.shortDescription}`
        document.querySelector("#viewCharDesc").innerHTML = `<strong>Complete description :</strong> ${await md.render(selectChar.description)}`;
        document.querySelector("#delCharName",).innerHTML = `Delete ${selectChar.name} ?`;
        document.querySelector("#confirmDel",).innerHTML = `Please enter ${selectChar.id} to confirm`;
        document.querySelector(".delButton").addEventListener("click", () => {document.getElementById("delInputCheck").value = "";})
        document.querySelector("#delConfirm").addEventListener("click", () => {
                const closeModal = document.querySelector("#delConfirm");
                closeModal.removeAttribute("data-dismiss");
                const delCheck = document.querySelector("#delInputCheck").value;
                const confirmId = selectChar.id;
                if (delCheck == confirmId) {
                    dataDelete(selectChar.id);
                    document.querySelector("#confirmDel", ).innerHTML = `${selectChar.name} has been deleted`;
                    document.querySelector("#delConfirm").innerHTML = "Close";
                    document.querySelector("#delConfirm").addEventListener("click", () => {
                        const closeModal = document.querySelector("#delConfirm");
                        closeModal.setAttribute("data-dismiss", "modal");
                    })

                    document.querySelector("#delConfirm").addEventListener("click", () => {
                        document.querySelector("#target").innerHTML = "";
                        document.querySelector("#delConfirm").innerHTML = "Delete";
                        tableDisplay()
                        document.location.reload(true);
                    });
                } else {
                    document.querySelector("#confirmDel").innerHTML = `Please enter ${selectChar.id} to confirm. Try again or cancel.`;
                }
            });
    }),
);
}
document.getElementById("addCharConfirm").addEventListener("click", async () => {
    const addChar = await charUpdate();
    console.log(addChar)
    addChar.name = await document.getElementById("addCharName").value;
    addChar.shortDescription = await document.getElementById("addCharSDesc").value
    addChar.description = await document.getElementById("addCharDescription").value
    addChar.image = searchSrc()
    
    function searchSrc() {
        imgSrc = document.getElementById("previewAddCharImg").src
        let xp = /^data:.+\/(.+);base64,(.*)$/;
        let matches = imgSrc.match(xp);
        let data = matches[2];
        return data;
        
    };
    document.location.reload(true);
    dataPush(addChar);
    
})


let openFile = function(event) {
    let xp = /^data:.+\/(.+);base64,(.*)$/;
    let input = event.target;
    let reader = new FileReader();

    reader.onload = function(){
    
        let dataURL = reader.result;
        let matches = dataURL.match(xp);
        let ext = matches[1];
        let data = matches[2];
        console.log(data)
        console.log(dataURL.match(xp))
        let output = document.getElementById('previewAddCharImg');
        output.src = `data:image/JPEG;base64,${data}`;
        return data;
        
    };

    reader.readAsDataURL(input.files[0]);
    
};