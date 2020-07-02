/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-undefined */
/* eslint-disable no-undef */
// Affichage du tableau entier
tableDisplay();

async function tableDisplay() {
    
    const allChar = await dataConsult();
    const template = await document.querySelector("#tpl-test").content;
    const charDisplay = await allChar.sort(nameSort);

    function nameSort(a, b) {

        const persoA = a.name.toUpperCase();
        const persoB = b.name.toUpperCase();
        let comparison = 0;

        if (persoA > persoB) {
            comparison = 1;
        } else if (persoA < persoB) {
            comparison = -1;
        }

        return comparison;

    }

    for (const element of charDisplay) {
        const clone = template.cloneNode(true);

        clone.querySelector(".card-title").innerHTML = element.name;
        clone.querySelector(".card-text").innerHTML = element.shortDescription;
        
        if(element.image === ""){
            clone.querySelector(".card-img-top",).src = `./assets/images/noimage.png`;
        } else {
            clone.querySelector(".card-img-top",).src = `data:image/JPEG;base64,${element.image}`;
        }

        clone.querySelector(".viewButtonIndex").id = element.id;
        document.querySelector("#target").appendChild(clone);
        refreshViewButton();

    }

    document.querySelector("#searchbar").addEventListener("keyup", async () => {

        document.querySelector("#target").innerHTML = "";
        const template = await document.querySelector("#tpl-test").content;
        const searched = document.querySelector("#searchbar").value;

        for (const element of charDisplay) {
            const nameRecup = element.name;

            if (nameRecup.toLowerCase().includes(searched.toLowerCase())) {
                const clone = template.cloneNode(true);

                clone.querySelector(".card-title").innerHTML = element.name;
                clone.querySelector(".card-text").innerHTML =element.shortDescription;
                clone.querySelector(".card-img-top",).src = `data:image/JPEG;base64,${element.image}`;
                clone.querySelector(".viewButtonIndex").id = element.id;
                document.querySelector("#target").appendChild(clone);
                refreshViewButton();

            }

        }
    });
}

function refreshViewButton() {
    Array.from(document.querySelectorAll(".viewButtonIndex")).forEach($btn =>
        $btn.addEventListener("click", async () => {
            const selectChar = await dataSearchByID($btn.id);

            document.querySelector("#viewCharName").innerHTML = selectChar.name;
            if(selectChar.image === ""){
                document.querySelector("#viewCharImg",).src = `./assets/images/noimage.png`;
            } else {
                document.querySelector("#viewCharImg",).src = `data:image/JPEG;base64,${selectChar.image}`;
            }
            document.querySelector("#viewCharSDesc",).innerHTML = `${selectChar.shortDescription}`;
            document.querySelector("#viewCharDesc").innerHTML = `${md.render(selectChar.description,)}`;
            document.querySelector("#delCharName",).innerHTML = `Delete ${selectChar.name} ?`;
            document.querySelector("#confirmDel",).innerHTML = `Please enter ${selectChar.id} to confirm`;
            
            document.querySelector(".delButton").addEventListener("click", () => {

                    document.querySelector("#delInputCheck").value = "";

                });

            document.querySelector("#editCharName").value = selectChar.name;
            document.querySelector("#editCharSDesc").value = selectChar.shortDescription;
            document.querySelector("#editCharDescription").value = selectChar.description;
            document.querySelector(".divIdEdit").id = selectChar.id;
            
            if(selectChar.image === ""){
                document.querySelector("#previewEditCharImg",).src = `./assets/images/noimage.png`;
            } else {
                document.querySelector("#previewEditCharImg",).src = `data:image/JPEG;base64,${selectChar.image}`;
            }

            document.querySelector("#delConfirm").addEventListener("click", () => {

                const closeModal = document.querySelector("#delConfirm");
                closeModal.removeAttribute("data-dismiss");
                const delCheck = document.querySelector("#delInputCheck").value;
                const confirmId = selectChar.id;

                    if (delCheck === confirmId) {
                        dataDelete(selectChar.id);
                        document.querySelector("#confirmDel",).innerHTML = `${selectChar.name} has been deleted`;
                        document.querySelector("#delConfirm").innerHTML ="Close";

                        document.querySelector("#delConfirm").addEventListener("click", () => {

                            closeModal.setAttribute("data-dismiss","modal",);

                        });

                        document.querySelector("#delConfirm").addEventListener("click", () => {

                            document.querySelector("#target").innerHTML ="";
                            document.querySelector("#delConfirm",).innerHTML = "Delete";
                            document.location.reload(true);

                            });
                    } else {
                        document.querySelector("#confirmDel",).innerHTML = `Please enter ${selectChar.id} to confirm. <strong>Try again or cancel.</strong>`;
                    }

                });
        }),
    );
}
document.querySelector("#addCharConfirm").addEventListener("click", async () => {

    const addChar = await charUpdate();
    addChar.name = document.querySelector("#addCharName").value;
    addChar.shortDescription = document.querySelector("#addCharSDesc",).value;
    addChar.description = document.querySelector("#addCharDescription",).value;
    addChar.image = searchSrc();

    function searchSrc() {
        
        imgSrc = document.querySelector("#previewAddCharImg").src;
        const xp = /^data:.+\/(.+);base64,(.*)$/;
        const matches = imgSrc.match(xp);
        if (matches != null) {
            const data = matches[2];
            return data;
        }
        const data = "";
        return data;
    }

    dataPush(await addChar);
    setTimeout(() => {

        window.location.reload(1);
        cleanModal();

    }, 1500);

});

document.querySelector("#editCharConfirm").addEventListener("click", async () => {

    function searchSrc() {

        imgSrc = document.querySelector("#previewEditCharImg").src;
        const xp = /^data:.+\/(.+);base64,(.*)$/;
        const matches = imgSrc.match(xp);

        if (matches != null) {
            const data = matches[2];
            return data;
        }

        const data = "";
        return data;

    }

    const addChar = await charUpdate();
    const charId = document.querySelector(".divIdEdit").id;
    addChar.name = document.querySelector("#editCharName").value;
    addChar.shortDescription = document.querySelector("#editCharSDesc").value;
    addChar.description = document.querySelector("#editCharDescription").value;
    addChar.image = searchSrc();
    dataUpdate(charId, addChar);

    setTimeout(() => {

        window.location.reload(1);
        cleanModal();

    }, 1500);

});

const openFile = function (event) {
    const xp = /^data:.+\/(.+);base64,(.*)$/;
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function () {

        let dataURL;
        dataURL = reader.result;

        if (dataURL !== undefined) {
            const matches = dataURL.match(xp);
            const data = matches[2];
            const output = document.querySelector("#previewAddCharImg");
            document.querySelector(
                "#previewEditCharImg",
            ).src = `data:image/JPEG;base64,${data}`;
            output.src = `data:image/JPEG;base64,${data}`;
            return data;
        }

        document.querySelector("#previewEditCharImg").src = "";
        document.querySelector("#previewAddCharImg").src = "";

    };

    reader.readAsDataURL(input.files[0]);

};