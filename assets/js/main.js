const error = new Error(
    "Une erreur s'est produite pendant le traitement des données",
);
const md = new Remarkable();

md.set({
    html: true,
    breaks: true,
});

axios.defaults.baseURL = "https://character-database.becode.xyz";

// function charUpdate() {
//     const charEdit = {
//         // TODO: Change params to InnerHTML & check for the image upload
//         name: "Fabito",
//         shortDescription: "Axios rox ou p'tetre pas",
//         description: "Juste pour rire",
//         image: "",
//     };
//     return charEdit;
// }

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
    const nameSearched = "Fabito";
    try {
        const recup = await axios.get(`/characters?name=${nameSearched}`);
        const data = recup.data;
        return data;
    } catch (e) {
        console.error(e);
    }
}

async function dataSearchByID() {
    const selectedId = "72c93fa7-e118-4ae7-a95e-fa8fe23eea6b";
    try {
        const recup = await axios.get(`/characters/${selectedId}`);
        const data = recup.data;
        return data;
    } catch (e) {
        console.error(e);
    }
}

async function dataPush() {
    try {
        await axios.post("/characters", charUpdate());
    } catch (e) {
        console.error(e);
    }
}

async function dataDelete() {
    try {
        // TODO: Change const selectedID to innerHTML input
        const selectedId = "7586f983-f92c-4673-8352-8f7852ea0b9b";
        await axios.delete(`/characters/${selectedId}`);
    } catch (e) {
        console.error(e);
    }
}

async function dataUpdate() {
    try {
        const selectedID = "72c93fa7-e118-4ae7-a95e-fa8fe23eea6b";
        await axios.put(`/characters/${selectedID}`, charUpdate());
    } catch (e) {
        console.error(e);
    }
}

// dataConsult();
// dataSearchByName();
// dataSearchByID();
// dataPush()
// dataDelete()
// dataUpdate();