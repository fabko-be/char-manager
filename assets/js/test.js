Array.from(document.querySelectorAll(".viewButton")).forEach($btn =>
    $btn.addEventListener(
        "click", (() => { 
        console.log($btn.id)
        return $btn.id}),
    ),
);

// const test = () =>
// {    console.log(("truc"));
// }