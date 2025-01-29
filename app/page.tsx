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
  const [showDialogBox,setShowDialogBox]=useState({
    Add:false,
    Edit:false,
  })
  const [searchedValue,setSearchedValue]=useState<String>("");
  const fetchData=async(val:String)=>{
    try{
      var  jsonRes;
      if( !searchedValue ){
        // This logic when you have an array then we don't need to hit api again  , 
        // As well as we actually able to save our recently added user into a list
        const resp=await fetch('https://jsonplaceholder.typicode.com/users');
        jsonRes =await resp.json();
      }
      else{
        jsonRes=data;
      }
     const FilteredData = jsonRes.filter((e:any)=>{
      // console.log(e?.name.includes(val));
      if(e.name.includes(val)){
          return e
      }
     })
    //  console.log(FilteredData);
     setData(FilteredData.splice(0,8));
     setLoading(false);
     console.log(data.splice(0,8));
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
  const [FormData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    department:"",

  })
  console.log(FormData);
  const AddUser=async(objData:any)=>{
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
   setData([newUser,...data].splice(0,8));
    
   }
   catch(e:any){
    console.log(e?.message);
   }
   setShowDialogBox({
    Add:false,
    Edit:false,
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
    <div className="flex flex-col w-[100%] relative  h-[100vh] bg-[black]">
      <Header onChange={ChangeHandler} ClickHandler={()=>{
        setShowDialogBox({
          Add:true,
          Edit:false,
        })
      }} />       
      {loading?<div className={` w-[80%] mt-[20px] mx-auto h-[auto]  flex items-center justify-center overflow-hidden rounded-[20px]`}>...loading</div>: <TableComp data={data} onClick={(data:any)=>{
        console.log(data);
        setEditData(data);
        setShowDialogBox({
          Add:false,
          Edit:true,
        })
      }}/>}

   {  showDialogBox?.Add || showDialogBox?.Edit  ? 
    <div className={` absolute w-[100%] h-[100vh] bg-[transparent] backdrop-blur-sm  flex items-center justify-center gap-[20px]  `}>
         
         <form onSubmit={e=>{
            e?.preventDefault();
            console.log(FormData);
            AddUser(FormData);
          }}  className={` w-[40%] h-[auto] bg-[white] relative rounded-[20px] flex flex-col p-[20px] items-center gap-[20px]`}>
          <h1 className={` text-black text-[20px] font-bold text-center `}>  { showDialogBox?.Add ? "Add New User" : " Edit User"}  </h1>
           <div className={` flex flex-wrap w-[100%] justify-center h-auto `}>

           {
            Object.keys(FormData).map((e,i)=>{
              return <div key={i} className={`text-black gap-2 flex mr-5 flex-col w-[40%] mt-[20px] capitalize tracking-wide font-medium`}>{e}
              <input value={  FormData[e] } onChange={(ele)=>{
                    setFormData({
                      ...FormData,[e]:ele.target.value
                    })
              }} required={true} type={e=="email"?"email":"text"} className={` border-[2px] border-black h-[40px]  px-[20px] `}/>
              </div>
            })
           }
           </div>
          
          <div>
          { showDialogBox?.Add ?  <button type="submit" className={`bg-black text-white py-2 px-3 rounded-[10px] mt-[40px]`}>Submit</button>  :  <button type={"submit"}  className={`bg-black text-white py-2 px-3 rounded-[10px] mt-[40px]`} >Update</button>}

          </div>
            
            <p className={` absolute cursor-pointer font-bold text-[16px] right-[30px] text-black`} onClick={()=>{
               setShowDialogBox({
                Add:false,
                Edit:false,
              })
            }}>X</p>


          </form>
          
    </div>  : null
      
    }


    </div>
  );
}

const Header=(props:any)=>{
 const onChange= props?.onChange;
 const ClickHandler=props?.ClickHandler;
  return <div className={`Header flex justify-between text-white  px-[40px] py-[20px]  mt-[20px] `}>
    <h1 className={` font-medium serial text-3xl `}> User Management</h1>

    <div className={` flex justify-between w-[40%]  `}>
    <div className={` flex items-center  gap-[20px]  px-[20px] py-[5px] rounded-[20px]  `}>
      <input onChange={onChange} className={` w-[250px] outline-none py-[5px] px-[5px] bg-transparent border-b-[1px] border-[white] `} placeholder={"... type a Name"} />
      {/* <button className={` bg-[white] text-black px-[10px] py-[2px] rounded-[10px]`}>Search </button> */}
    </div>
    <div onClick={ClickHandler} className={` flex items-center w-[auto] border-[1px] border-white px-[20px] rounded-[20px] py-[10px] text-[16px] flex gap-[20px] `}>
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
          // console.log(e);
           return <div className={`w-[100%] flex  min-h-[60px] border-b-[1px] border-white `} key={i}>
            
            {
             Object.keys(obj).map((element:any,ind)=>{
                // console.log(obj[`${element}`]);
                if(element=="Action")
                  return <div  className={`min-w-[20%]   flex items-center gap-[10px] justify-center `} key={ind}>
                    <button onClick={()=>{
                      props?.onClick(e)
                    }} className={` px-[20px] py-[5px] bg-white text-black rounded-[5px]`}>Edit</button>
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