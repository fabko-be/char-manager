/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const error = new Error(
    "Une erreur s'est produite pendant le traitement des données",
);

const md = new Remarkable();

md.set({
    html: true,
    breaks: true,
});

axios.defaults.baseURL = "https://character-database.becode.xyz";

function charUpdate() {
    const charEdit = {
        // TODO: Change params to InnerHTML & check for the image upload
        name: "",
        shortDescription: "",
        description: "",
        image: "",
    };
    return charEdit;
}

async function dataConsult() {
    try {
        const recup = await axios.get("/characters");
        const data = recup.data;
        return data;
    } catch (e) {
        console.error(e);
    }
}

async function dataSearchByName() {
    const nameSearched = document.querySelector("#searchbar").value;
    try {
        const recup = await axios.get(`/characters?name=${nameSearched}`);
        const data = recup.data;
        return data;
    } catch (e) {
        console.error(e);
    }
}

async function dataSearchByID(charId) {
    const selectedId = charId;
    try {
        const recup = await axios.get(`/characters/${selectedId}`);
        const data = recup.data;
        return data;
    } catch (e) {
        console.error(e);
    }
}

async function dataPush(char) {
    try {
        await axios.post("/characters", await char);
    } catch (e) {
        console.error(e);
    }
}

async function dataDelete(id) {
    try {
        // TODO: Change const selectedID to innerHTML input
        const selectedId = id;
        await axios.delete(`/characters/${selectedId}`);
    } catch (e) {
        console.error(e);
    }
}

async function dataUpdate(id, char) {
    try {
        const selectedID = id;
        await axios.put(`/characters/${selectedID}`, char);
    } catch (e) {
        console.error(e);
    }
}

function cleanModal() {
    document.querySelector("#addCharName").value = "";
    document.querySelector("#addCharSDesc").value = "";
    document.querySelector("#addCharDescription").value = "";
    document.querySelector("#previewAddCharImg").src = "";
    document.querySelector("#editCharName").value = "";
    document.querySelector("#editCharSDesc").value = "";
    document.querySelector("#editCharDescription").value = "";
    document.querySelector("#previewEditCharImg").src = "";
}

function eraseImage() {
    document.querySelector("#previewEditCharImg").src = "";
    document.querySelector("#previewAddCharImg").src = "";
}
// dataConsult();
// dataSearchByName();
// dataSearchByID();
// dataPush()
// dataDelete()
// dataUpdate();
