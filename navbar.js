function validateForm(){
    var name=document.getElementById("name").value;
    var aname=document.getElementById("aname").value;
    var date=document.getElementById("date").value;
    var quantity=document.getElementById("qty").value;
    if(name===""){
        alert("name required:");
        return false;
    }
    if(aname===""){
        alert("author name required:");
        return false;
    }
    if(date===""){
        alert("date required");
        return false;
    }
    if(quantity===""){
        alert("quantity required");
        return false;
    }
    if(quantity<1){
        alert("quantity must be a positive number");
        return false;
    }
   return true;
 }
 function showData(){
    var blist;
    if(localStorage.getItem("blist")==null){
        blist=[];
    }else{
        blist=JSON.parse(localStorage.getItem("blist"));
    }
    var html="";
    blist.forEach(function(element,index){
        html+="<tr>";
        html+="<td>" + element.name +"</td>";
        html+="<td>" + element.aname +"</td>";
        html+="<td>" + element.date +"</td>";
        html+="<td>" + element.quantity +"</td>";
        html+=`<td> <button onclick="deleteData(${index})"class="btn btn-danger">Delete</button>
        <button onclick="updateData(${index})"class="btn btn-warning">Edit</button></td>`;
        html+="</tr>";
    });
    document.querySelector("#crudTable tbody").innerHTML=html;
}
window.onload=showData;
function AddData(){
    if(validateForm()==true){
        var name=document.getElementById("name").value;
        var aname=document.getElementById("aname").value;
        var date=document.getElementById("date").value;
        var quantity=document.getElementById("qty").value;
        var blist;
    if(localStorage.getItem("blist")==null){
        blist=[];
    }else{
        blist=JSON.parse(localStorage.getItem("blist"));
    }
        blist.push({
            name:name,
            aname:aname,
            date:date,
            quantity:quantity,
        });
    
      localStorage.setItem("blist",JSON.stringify(blist));
      showData();
      document.getElementById("name").value="";
      document.getElementById("aname").value="";
      document.getElementById("date").value="";
      document.getElementById("qty").value="";
    }
}
function deleteData(index){
    var blist;
    if(localStorage.getItem("blist")==null){
        blist=[];
    }else{
        blist=JSON.parse(localStorage.getItem("blist"));
    }
    blist.splice(index,1);
    localStorage.setItem("blist",JSON.stringify(blist));
      showData();
}
function updateData(index){
        document.getElementById("submit").style.display="none";
        document.getElementById("Update").style.display="block";
        var blist = JSON.parse(localStorage.getItem("blist")) || [];
    document.getElementById("name").value=blist[index].name;
    document.getElementById("aname").value=blist[index].aname;
    document.getElementById("date").value=blist[index].date;
    document.getElementById("qty").value=blist[index].quantity;
    document.getElementById("Update").onclick=function(){
        if(validateForm()==true){
            blist[index].name=document.getElementById("name").value;
            blist[index].aname=document.getElementById("aname").value;
            blist[index].date=document.getElementById("date").value;
            blist[index].quantity=document.getElementById("qty").value;
            localStorage.setItem("blist",JSON.stringify(blist));
            showData();
            document.getElementById("name").value="";
      document.getElementById("aname").value="";
      document.getElementById("date").value="";
      document.getElementById("qty").value="";
      document.getElementById("submit").style.display="block";
        document.getElementById("Update").style.display="none";
        }
    };
}