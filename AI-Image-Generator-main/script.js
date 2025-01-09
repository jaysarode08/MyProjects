const promptBar = document.querySelector("#prompt_bar");
const imageresult = document.querySelector("#image_result");
const downloadBtn =  document.querySelector(".download-btn");
const openaiAPIKey = "API_KEY";
let isImgGen = false;

const updateImgBoxes = (imgBoxArray) => {
    imgBoxArray.forEach((imgObject, index) => {
        const imgBox = imageresult.querySelectorAll(".img_box")[index];              
        const imgElement = imgBox.querySelector("img");
        const downloadBtn = imgBox.querySelector(".download-btn");

        const aiImgGenerate = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiImgGenerate;

        imgElement.onload = () => {
            imgBox.classList.remove("loading");
            downloadBtn.setAttribute("href", aiImgGenerate);
            downloadBtn.setAttribute("download", `Cosas_Learning_${new Date().getTime()}.jpg`);
        }
    })
}

const  generateAIImages = async (userPrompt, imgQuntity, imgSize) => {
     try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${openaiAPIKey}`
            },
            body:JSON.stringify({
                prompt : userPrompt,
                n: parseInt(imgQuntity),
                size : imgSize,
                response_format :"b64_json"
            })
        });

        if(!response.ok) throw new Error("API Not Working.")

        const { data } = await response.json();
        console.log(data);
        updateImgBoxes([...data]);
     } catch (error) {
        alert(error.message);
        imageresult.style.display = "none";
     } finally {
        isImgGen = false;
     }
}
const handlePrompt = (e) => {
    e.preventDefault();
    if(isImgGen) return;
    isImgGen = true;

    imageresult.style.display = "flex";
    
    const userPrompt = e.srcElement[0].value;
    const imgQuntity = e.srcElement[1].value;
    const imgSize = e.srcElement[2].value;

    const imgBoxes = Array.from({length: imgQuntity}, () => 
     `<div class="img_box loading">
        <img src="images/loader.gif">
        <a href="#" class="download-btn">
        <i class="fa-solid fa-download"></i>
        </a>
     </div>`
    ).join("");

    imageresult.innerHTML = imgBoxes;
    generateAIImages(userPrompt, imgQuntity, imgSize);
    
}
promptBar.addEventListener("submit", handlePrompt);