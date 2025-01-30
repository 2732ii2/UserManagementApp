"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import TableComp from "./Components/TableComp";
import Header from "./Components/Header";
import DailogBox from "./Components/DailogBox";
import FormDataType from "./Components/Interfaces";

export default function Home() {
  const [data,setData]=useState<any[]>([]);
  const [err,setErr]=useState<string>("");
  const [loading,setLoading]=useState<boolean>(true);
  const [showDialogBox,setShowDialogBox]=useState({
    Add:false,
    Edit:false,
    Delete:false,
  })
  const [page,setPage]=useState<number>(0);
  const [searchedValue,setSearchedValue]=useState<string>("");
  const fetchData=async(val:string,page:number)=>{
    try{
      console.log("fetched data get called");
        const resp=await fetch('https://jsonplaceholder.typicode.com/users');
        const jsonRes =await resp.json();
      const FilteredData = jsonRes.filter((e:any)=>{
      if(e.name.includes(val)){
          return e
      }
     })
    console.log("---",FilteredData,FilteredData.slice(page*8,(page+1)*8),page);
     setData(FilteredData);
     setLoading(false);
    }
    catch(e:any){
      setLoading(false);
     console.log(e?.message);
     setErr(e?.message);
    }
   }
  useEffect(()=>{
    if(searchedValue){
    fetchData(searchedValue,page)
    ;}
    else
    fetchData("",page);

  },[searchedValue,page])
  const ChangeHandler=(e:any)=>{
    console.log(e.target.value);    setTimeout(()=>{
      console.log("called",e.target.value);
      setSearchedValue(e.target.value);
    },2000)
  }
 
  const [FormData,setFormData]=useState<FormDataType>({
    firstName:"",
    lastName:"",
    email:"",
    department:"",

  })
  console.log(FormData);
  const prevPageHandler=()=>{
    console.log("prevpage handler");
    if(page>0)
      setPage(page-1);
  }
  const nextPageHandler=()=>{
    console.log("nextpage handler",(data.length/8));
    if(page< Math.floor((data.length)/7))
    setPage(page+1);
  }
  const AddAndUpdateUser=async(objData:any)=>{
   try{
    const resp=await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        name:objData.firstName+objData.lastName,
        email:objData.email,
        company:{name:objData.department}
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
   const newUser=(await resp.json());
   setData([newUser,...data]);
    
   }
   catch(e:any){
    console.log(e?.message);
   }
   setShowDialogBox({
    Add:false,
    Edit:false,
    Delete:false,
   })
  }
  const DeleteUser=async(objData:any)=>{
    const id=(objData.id);
    try{
     const resp=await fetch(`${`https://jsonplaceholder.typicode.com/posts/${id}`}`, {
      method: 'DELETE',
    });
    
    const newUser=(await resp.json());
    console.log(newUser);
    const index:number[]= data.map((e:any,i:any)=>{if(e.id==id) return i;  }).filter((e:any)=>{if(e)return e});
    console.log("index");
    data.splice(index[0],1);
    setData([...data]);
    }
    catch(e:any){
     console.log(e?.message);
    }
    setShowDialogBox({
     Add:false,
     Edit:false,
     Delete:false
    })
   }
  const [editData,setEditData]=useState<any>({});
  useEffect(() => {
    if(showDialogBox.Add)
      setFormData({
        firstName:   "",
        lastName:  "",
        email:   "",
        department:   "",
      });
      else
    setFormData({
      firstName: editData?.name?.split(" ")[0] || "",
      lastName: editData?.name?.split(" ")[1] || "",
      email: editData?.email || "",
      department: editData?.company?.name || "",
    });
  }, [editData,showDialogBox]);
  return (
    <div className="flex flex-col w-[100%] overflow-hidden relative  h-[100vh] bg-[black]">
      <Header onChange={ChangeHandler} ClickHandler={()=>{
        setShowDialogBox({
          Add:true,
          Edit:false,
          Delete:false
        })
      }} />       
      {/* .slice(page*8,(page+1)*8) */}
      {loading?
      <div className={` w-[80%] mt-[20px] mx-auto h-[auto]  flex items-center justify-center overflow-hidden rounded-[20px]`}>...loading</div>
      : 
      err?<div className={` bg-[red] w-[80%] mx-auto  mt-5 px-3 text-white`}>{err}{" : Check your internet connection"}</div>:
      <TableComp prevPageHandler={()=>{
        prevPageHandler()
      }} nextPageHandler={()=>{
        nextPageHandler()
      }} page={page} data={data.slice(page*8,(page+1)*8)} onClick={(data:any,name:string)=>{
        console.log(data,name);
        setEditData(data);
        if(name=="delete")
          setShowDialogBox({
            Add:false,
            Edit:false,
            Delete:true
          })
          else
        setShowDialogBox({
          Add:false,
          Edit:true,
          Delete:false
        })
      }}/>}

   {  showDialogBox?.Add || showDialogBox?.Edit || showDialogBox?.Delete  ?  <DailogBox  showDialogBox={showDialogBox} DeleteUser={DeleteUser} editData={editData} AddAndUpdateUser={AddAndUpdateUser} FormData={FormData} setFormData={setFormData}setShowDialogBox={setShowDialogBox} />
     : null
      
    }
    </div>
  );
}




