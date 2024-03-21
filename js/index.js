var bookName = document.getElementById("bookName");
var websiteUrl = document.getElementById("websiteUrl");
var addbookk = document.getElementById("addbookk");
var updatebookk = document.getElementById("updatebookk");
var boxinfo = document.getElementById("boxinfo");
var closeBtn = document.getElementById("closeBtn");
var updatebookIndex;
var bookmarks;
var nameRegex = /^[a-z]{3,}$/;
var urlRegex = /^(https?:\/\/)?(www\.)?[a-z]{3,}\.(com|co|net|dev)(\/)?$/;

if(localStorage.getItem("markbook")!==null)
{
    bookmarks=JSON.parse(localStorage.getItem("markbook"))
    displaybook()
}
else
{
    bookmarks=[];
}

function addbook()
{
    if(validate(bookName,nameRegex)&&validate(websiteUrl,urlRegex)!== false)
    {
        var markbook = 
        {
            bookName : bookName.value,
            websiteUrl : websiteUrl.value
        }
        bookmarks.push(markbook);
        localStorage.setItem("markbook", JSON.stringify(bookmarks));
        displaybook()
        resetinputs()
    }
    else
    {
        boxinfo.classList.replace("d-none", "d-block");
    }

}

function resetinputs()
{
    bookName.value=null;
    bookName.classList.remove("is-valid","is-invalid");
    websiteUrl.value=null;
    websiteUrl.classList.remove("is-valid","is-invalid");
}

function displaybook()
{
    var containerElement= ``;
    for(var i=0;i<bookmarks.length;i++)
    {
        containerElement+= `<tr>
        <td>${i+1}</td>
        <td>${bookmarks[i].bookName}</td>
        <td><button onclick="visit(${i})" class="btn btn-visit">
        <i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick="movebook(${i})" class="btn btn-update">
        <i class="fa-solid fa-pen-to-square"></i> Update</button></td>
        <td><button onclick="deletebook(${i})" class="btn btn-delete pe-2">
        <i class="fa-solid fa-trash-can"></i> Delete</button></td>
      </tr>`;
   }
tableContent.innerHTML = containerElement;
}

function movebook(index)
{
    bookName.value=bookmarks[index].bookName;
    websiteUrl.value=bookmarks[index].websiteUrl;
    addbookk.classList.replace("d-block","d-none");
    updatebookk.classList.replace("d-none","d-block");
    updatebookIndex = index;
}

function updatebook()
{
    if(validate(bookName,nameRegex)&&validate(websiteUrl,urlRegex)!== false)
    {
        bookmarks[updatebookIndex].bookName=bookName.value;
        localStorage.setItem("markbook", JSON.stringify(bookmarks));
        bookmarks[updatebookIndex].websiteUrl=websiteUrl.value;
        localStorage.setItem("markbook", JSON.stringify(bookmarks));
        displaybook()
        addbookk.classList.replace("d-none", "d-block");
        updatebookk.classList.replace("d-block", "d-none");
        resetinputs()
    }
    else
    {
        boxinfo.classList.replace("d-none", "d-block");
    }
    
}

function deletebook(i)
{
    bookmarks.splice(i,1);
    localStorage.setItem("markbook", JSON.stringify(bookmarks));
    displaybook()
}
function visit(i)
{
    var  httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[i].websiteUrl)) {
        open(bookmarks[i].websiteUrl);
      } else {
        open(`https://${bookmarks[i].websiteUrl}`);
      }
}
function validate(element,regex)
{
    if(regex.test(element.value))
    {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }
}
function closebox()
{
    boxinfo.classList.replace("d-block", "d-none");
}
closeBtn.addEventListener("click",closebox)

document.addEventListener("keydown", function (word) {
    if (word.key == "Escape") {
        closebox();
    }
  });

  document.addEventListener("click", function (word) {
    if (word.target.classList.contains("box-info")) {
        closebox();
    }
  });