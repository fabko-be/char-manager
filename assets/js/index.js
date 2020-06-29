async function testDiv() {
    const test = await dataConsult();
    const template = await document.querySelector("#tpl-test").content;
    for (const element of test) {
        const clone = template.cloneNode(true);

        clone.querySelector(".card-title").innerHTML = await element.name;
        clone.querySelector(".card-text").innerHTML = await md.render(
            element.description,
        );
        clone.querySelector(
            ".card-img-top",
        ).src = `data:image/JPEG;base64,${await element.image}`;

        document.querySelector("#target").appendChild(clone);
    }
}

testDiv();

document.querySelector("#searchbar").addEventListener("keyup", async () => {
    document.querySelector("#target").innerHTML = "";
    let persoArray = []
    const test = await dataConsult();
    persoArray = await test;
    console.log("persoArray", persoArray)
    
    const template = await document.querySelector("#tpl-test").content;
    const searched = document.querySelector("#searchbar").value
    
    console.log(searched);

    for (const element of persoArray) {
        const nameRecup = element.name
        // console.log("nameRecup", nameRecup)

        // const testString = nameRecup.includes(searched)

            if(nameRecup.toLowerCase().indexOf(searched.toLowerCase()) != -1){

            const clone = template.cloneNode(true);

            clone.querySelector(".card-title").innerHTML = await element.name;
            clone.querySelector(".card-text").innerHTML = await md.render(
                element.description,
            );
            clone.querySelector(
                ".card-img-top",
            ).src = `data:image/JPEG;base64,${await element.image}`;

            document.querySelector("#target").appendChild(clone);
        }
    }});
