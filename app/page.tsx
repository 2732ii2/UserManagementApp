"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
interface Err{
  message:String;
}
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
    //  if()
    console.log("---",FilteredData,FilteredData.slice(page*8,(page+1)*8),page);
     setData(FilteredData.slice(page*8,(page+1)*8));
     setLoading(false);
    //  setPage(FilteredData.slice(page*8,(page+1)*8).length);
    }
    catch(e:any){
      setLoading(false);
     console.log(e?.message);
     setErr(e?.message);
    }
   }
  //  useEffect(()=>{
  //   setPage(data.length);
  //  },[data])
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
  interface FormDataType{
    firstName:string;
    lastName:string;
    email:string;
    department:string;
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
    if(page< Math.floor((data.length)/8))
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
   setData([newUser,...data].slice(page*8,(page+1)*8));
    
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
    setData([...data].slice(page*8,(page+1)*8));
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
    <div className="flex flex-col w-[100%] relative  h-[100vh] bg-[black]">
      <Header onChange={ChangeHandler} ClickHandler={()=>{
        setShowDialogBox({
          Add:true,
          Edit:false,
          Delete:false
        })
      }} />       
      {loading?<div className={` w-[80%] mt-[20px] mx-auto h-[auto]  flex items-center justify-center overflow-hidden rounded-[20px]`}>...loading</div>: <TableComp prevPageHandler={()=>{
        prevPageHandler()
      }} nextPageHandler={()=>{
        nextPageHandler()
      }} page={page} data={data} onClick={(data:any,name:string)=>{
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

   {  showDialogBox?.Add || showDialogBox?.Edit || showDialogBox?.Delete  ? 
    <div className={` absolute w-[100%] h-[100vh] bg-[transparent] backdrop-blur-sm  flex items-center justify-center gap-[20px]  `}>
         {  
         showDialogBox?.Delete ? <div className={` w-[40%] h-[auto] bg-[white] relative rounded-[20px] flex flex-col p-[20px] items-center gap-[20px]`}>
             <h1>Do you want to delete it</h1>
             <button   onClick={()=>{
                  DeleteUser(editData)
             }} className={`bg-black text-white py-2 px-3 rounded-[10px] mt-[40px]`}>Submit</button> 
         </div> :
         <form onSubmit={e=>{
            e?.preventDefault();
            console.log(FormData);
            AddAndUpdateUser(FormData);
          }}  className={` w-[40%] h-[auto] bg-[white] relative rounded-[20px] flex flex-col p-[20px] items-center gap-[20px]`}>
          <h1 className={` text-black text-[20px] font-bold text-center `}>  { showDialogBox?.Add ? "Add New User" : " Edit User"}  </h1>
           <div className={` flex flex-wrap w-[100%] justify-center h-auto `}>

           {
            Object.keys(FormData).map((e,i)=>{
              // e instanceOf
              const key=e as keyof FormDataType;
              return <div key={i} className={`text-black gap-2 flex mr-5 flex-col w-[40%] mt-[20px] capitalize tracking-wide font-medium`}>{e}
              <input value={  FormData[key] } onChange={(ele)=>{
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
                Delete:false
              })
            }}>X</p>


          </form>}
          
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
   console.log(props.data.length,"updated");
   data=[{"Serial ID":"Serial ID",Name:"Name",Email:"Email",Department:"Department",Actions:"Actions"},...data];
   console.log(data);
   return <div className={` relative w-[80%] mt-[5%] min-h-[50%] mx-auto h-[auto]    rounded-[20px] `}>
         {
          data?.map((e:any,i:any)=>{
   const obj:any={id:e.id,name:e?.name,Email:e?.email,department:e?.company?.name,Action:["Edit","Delete"]};
          // console.log(e);
          if(i!=0)
           return <div className={`w-[100%] rounded-[20px] flex  min-h-[70px] border-b-[1px] border-white `} key={i}>
            
            {
             Object.keys(obj).map((element:any,ind)=>{
                // console.log(obj[`${element}`]);
                if(element=="Action")
                  return <div  className={`min-w-[20%]   text-white  flex items-center gap-[10px] justify-center `} key={ind}>
                    <button onClick={()=>{
                      props?.onClick(e,"edit")
                    }} className={` px-[20px] py-[5px] bg-white text-black rounded-[5px]`}>Edit</button>
                    <button onClick={()=>{
                      props?.onClick(e,"delete")
                    }} className={` px-[20px] py-[5px] bg-white text-black rounded-[5px]`}>Delete</button>

                  </div>
                return <div  className={`min-w-[20%] text-white   flex items-center justify-center `} key={ind}>{obj[`${element}`]}</div>
              })
            }
           </div>
           else{
              // console.log("--",Object.keys(e));
            return <div className={`w-[100%] rounded-[10px] backdrop-blue-lg bg-[rgba(255,255,255,.8)] text-black flex  min-h-[60px] border-b-[1px] border-white `} key={i}>{
              Object.keys(e).map((element,ind)=>{
                return <div  className={`min-w-[20%]     flex items-center justify-center `} key={ind}>{element}</div>
              })
            }</div>
           }
          })
         }

         <div className={` absolute w-[100%] min-h-[60px] gap-[20px] flex justify-end items-center -bottom-[60px] text-white  text-[20px]  `}>                                                          
            <KeyboardArrowLeftIcon  onClick={props?.prevPageHandler} className={` ${props.page>0 ?"":"text-[rgba(255,255,255,.1)]" }`} /> {props?.page+1} <KeyboardArrowRightIcon className={`${props.page< Math.floor((data.length)/9)?"":"text-[rgba(255,255,255,.1)]" }`} onClick={props?.nextPageHandler}/>
         </div>
   </div>
}