async function testDiv() {
    const test = await dataConsult();
    const template = await document.querySelector("#tpl-test").content;
    for (const element of test) {
        const clone = template.cloneNode(true);

        clone.querySelector("#name").innerHTML = await element.name;
        clone.querySelector("#desc").innerHTML = await md.render(element.description);

        document.querySelector("#target").appendChild(clone);
    }
}

testDiv();
