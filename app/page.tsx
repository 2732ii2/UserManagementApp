"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Err{
  message:String;
}
export default function Home() {
  const [data,setData]=useState<Object []>([]);
  const [err,setErr]=useState<String>("");
  const [loading,setLoading]=useState<boolean>(true);
  const [searchedValue,setSearchedValue]=useState<String>("");
  const fetchData=async(val:String)=>{
    try{
     const resp=await fetch('https://jsonplaceholder.typicode.com/users');
     const data=await resp.json();
     const FilteredData= data.filter((e:any)=>{
      console.log(e?.name.includes(val));
      if(e.name.includes(val)){
          return e
      }
     })
     console.log(FilteredData);
     setData(FilteredData);
    //  setData(data);
     setLoading(false);
     console.log(data);
    }
    catch(e:any){
      setLoading(false);
     console.log(e?.message);
     setErr(e?.message);
    }
   }

  useEffect(()=>{
    if(searchedValue){
    fetchData(searchedValue)
    ;}
    else
    fetchData("");

  },[searchedValue])
  const ChangeHandler=(e:any)=>{
    console.log(e.target.value);    setTimeout(()=>{
      console.log("called",e.target.value);
      setSearchedValue(e.target.value);
    },2000)
  }
  return (
    <div className="flex flex-col w-[100%]   h-[100vh] bg-[black]">
      <Header onChange={ChangeHandler}/>       
     {loading?<div className={` w-[80%] mt-[20px] mx-auto h-[auto]  flex items-center justify-center overflow-hidden rounded-[20px]`}>...loading</div>: <TableComp data={data}/>}
    </div>
  );
}

const Header=(props:any)=>{
 const onChange= props?.onChange;
  return <div className={`Header flex justify-between text-white  px-[40px] py-[20px]  mt-[20px] `}>
    <h1 className={` font-medium serial text-3xl `}> User Management</h1>

    <div className={` flex justify-between w-[40%]  `}>
    <div className={` flex items-center  gap-[20px]  px-[20px] py-[5px] rounded-[20px]  `}>
      <input onChange={onChange} className={` w-[250px] outline-none py-[5px] px-[5px] bg-transparent border-b-[1px] border-[white] `} placeholder={"... type a Name"} />
      {/* <button className={` bg-[white] text-black px-[10px] py-[2px] rounded-[10px]`}>Search </button> */}
    </div>
    <div className={` flex items-center w-[auto] border-[1px] border-white px-[20px] rounded-[20px] py-[10px] text-[16px] flex gap-[20px] `}>
    <p>+</p> Active User 
     
    </div>
    </div>
     </div>
}
type dataInterface={
  address:Object;
  company:Object;
  email:String;
  id:Number;
  name:String;
}
type DataInterface=dataInterface[];

type ObjectInterface={
  id:String,
  name:String,
  Email:String,
  department:String,
  Action:["Edit","Delete"]
}

const TableComp=(props:any)=>{
   var {data}=(props);  
   return <div className={` w-[80%] mt-[20px] mx-auto h-[auto] border-[1px] border-[white] overflow-hidden rounded-[20px] `}>
         {
          data?.map((e:any,i:any)=>{
   const obj:any={id:e.id,name:e?.name,Email:e?.email,department:e?.company?.name,Action:["Edit","Delete"]};
          console.log(e);
           return <div className={`w-[100%] flex  min-h-[60px] border-b-[1px] border-white `} key={i}>
            
            {
             Object.keys(obj).map((element:any,ind)=>{
                console.log(obj[`${element}`]);
                if(element=="Action")
                  return <div  className={`min-w-[20%]   flex items-center gap-[10px] justify-center `} key={ind}>
                    <button className={` px-[20px] py-[5px] bg-white text-black rounded-[5px]`}>Edit</button>
                    <button className={` px-[20px] py-[5px] bg-white text-black rounded-[5px]`}>Delete</button>

                  </div>
                return <div  className={`min-w-[20%]   flex items-center justify-center `} key={ind}>{obj[`${element}`]}</div>
              })
            }
           </div>
          })
         }
   </div>
}