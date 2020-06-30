// Affichage du tableau entier
tableDisplay();

async function tableDisplay() {
    const test = await dataConsult();
    const template = await document.querySelector("#tpl-test").content;

    for (const element of test) {
        const clone = template.cloneNode(true);

        clone.querySelector(".card-title").innerHTML = await element.name;
        clone.querySelector(".card-text",).innerHTML = await element.shortDescription;
        clone.querySelector(".card-img-top",).src = `data:image/JPEG;base64,${await element.image}`;
        clone.querySelector(".viewButton").id = await element.id;
        document.querySelector("#target").appendChild(clone);
    }

    document.querySelector("#searchbar").addEventListener("keyup", async () => {
        document.querySelector("#target").innerHTML = "";
        let persoArray = [];
        const test = await dataConsult();
        persoArray = await test;

        const template = await document.querySelector("#tpl-test").content;
        const searched = document.querySelector("#searchbar").value;
        for (const element of persoArray) {
            const nameRecup = element.name;

            if (nameRecup.toLowerCase().includes(searched.toLowerCase())) {
                const clone = template.cloneNode(true);

                clone.querySelector(".card-title").innerHTML = await element.name;
                clone.querySelector(".card-text").innerHTML = await element.shortDescription;
                clone.querySelector(".card-img-top",).src = `data:image/JPEG;base64,${await element.image}`;
                clone.querySelector(".viewButton").id = element.id;
                document.querySelector("#target").appendChild(clone);
            }
        }
    });
    Array.from(document.querySelectorAll(".viewButton")).forEach($btn =>
        $btn.addEventListener("click", async () => {
            const test = await dataSearchByID($btn.id);
            document.querySelector("#viewCharName").innerHTML = await test.name;
            document.querySelector(
                "#viewCharImg",
            ).src = `data:image/JPEG;base64,${await test.image}`;
            document.querySelector("#viewCharSDesc").innerHTML = `<strong>Short description :</strong><br> ${await test.shortDescription}`
            document.querySelector("#viewCharDesc").innerHTML = `<strong>Complete description :</strong> ${await md.render(
                test.description,
            )}`;
            document.querySelector(
                "#delCharName",
            ).innerHTML = `Delete ${test.name} ?`;
            document.querySelector(
                "#confirmDel",
            ).innerHTML = `Please enter ${test.id} to confirm`;
            console.log($btn.id);
            document
                .querySelector(".delButton").addEventListener("click", () => {
                    document.getElementById("delInputCheck").value = "";
                })
            document
                .querySelector("#delConfirm").addEventListener("click", () => {
                    // console.log("test");
                    const closeModal = document.querySelector("#delConfirm");
                    closeModal.removeAttribute("data-dismiss");
                    const delCheck = document.querySelector("#delInputCheck").value;
                    const confirmId = test.id;
                    if (delCheck == confirmId) {
                        dataDelete(test.id);
                        document.querySelector("#confirmDel", ).innerHTML = `${test.name} has been deleted`;
                        document.querySelector("#delConfirm").innerHTML = "Close";
                        document.querySelector("#delConfirm").addEventListener("click", () => {
                            const closeModal = document.querySelector("#delConfirm");
                            closeModal.setAttribute("data-dismiss", "modal");
                        })

                        document.querySelector("#delConfirm").addEventListener("click", () => {
                            document.querySelector("#target").innerHTML = "";
                            document.querySelector("#delConfirm").innerHTML = "Delete";
                            tableDisplay()
                            // document.location.reload(true);
                        });

                    } else {
                        document.querySelector("#confirmDel").innerHTML = `Please enter ${test.id} to confirm. Try again or cancel.`;
                    }
                });
        }),
    );
}

// const viewButtonInt = setInterval(() => {
//     if ($(".viewButton").length) {
//         clearInterval(viewButtonInt);
//     }
//     500;
// });