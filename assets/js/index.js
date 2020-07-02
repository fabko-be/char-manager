//      async function testDiv() {
//      const test = await dataConsult();
//      const template = await document.querySelector("#tpl-test").content;
//      for (const element of test) {
//          const clone = template.cloneNode(true);

//          clone.querySelector("#name").innerHTML = await element.name;
//         clone.querySelector("#desc").innerHTML = await md.render(element.description);

//         document.querySelector("#target").appendChild(clone);
//     }
//  }

// testDiv();




 let body = document.querySelector('body');
 console.log(body);
 



  body.addEventListener("click", function (e) {
   if (e.target.id == "save") {
    // function result(){
    //   let name = document.getElementById('formGroupExampleInput').value;
    //   let shortDescription = document.getElementById('formGroupExampleInput2').value;
    //   let description = document.getElementById('exampleFormControlTextarea1').value;
       window.addEventListener('load',function(){
        document.querySelector('input[type= "file"]').addEventListener('change', function(){
          if (this.files && this.files[0]){
            var img = document.querySelector('img');
            img.src= URL.createObjectURL(this.files[0]);
          }
          
        });
      });
    }
  // }

    
        
   });
   function imageIsLoaded(){
    alert(this.src);
  }
  imageIsLoaded();
  result();
        
// function readerHandler(e2) 
// { 
//   var store = document.getElementById('exampleFormControlFile1');
//   store.innerHTML=e2.target.result.split("\n").join("<br>"); 
// }

// function readfile(e1)
// {
//   var fileobj = e1.target.files[0]; 
//   var fr = new FileReader();
//   fr.onload = readerHandler;  
//   fr.readAsText(fileobj); 
// }

// window.onload=function()
// {
//   var x = document.getElementById("filebrowsed");
//   x.addEventListener('change', readfile, false);
// }








            // function loadImage(url) {
//       return new Promise((resolve, reject) => {
//       let img = new Image();
//       img.addEventListener('load', e => resolve(img));
//       img.addEventListener('error', () => {
//       reject(new Error(`Failed to load image's URL: ${url}`));
//     });
//     img.src = url;
//   });
// }

// loadImage('https://i.imgur.com/3tU4Vig.jpg')
//   .then(img => document.getElementById('image-holder').appendChild(img))
//   .catch(error => console.error(error));
    
//     }

      //  sessionStorage.setItem("nom", name);
      //  sessionStorage.setItem("shortDescription",shortDescription);
      //  sessionStrorage.setItem("description", description);
      
//       function loadImage(url) {
//       return new Promise((resolve, reject) => {
//       let img = new Image();
//       img.addEventListener('load', e => resolve(img));
//       img.addEventListener('error', () => {
//       reject(new Error(`Failed to load image's URL: ${url}`));
//     });
//     img.src = url;
//   });
// }

// loadImage('https://i.imgur.com/3tU4Vig.jpg')
//   .then(img => document.getElementById('image-holder').appendChild(img))
//   .catch(error => console.error(error));
    
//     }
      
  
       

      
 
 
//  });






