
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
const TableComp=(props:any)=>{
    var {data}=(props);  
    console.log(props.data.length,"updated");
    data=[{"Serial ID":"Serial ID",Name:"Name",Email:"Email",Department:"Department",Actions:"Actions"},...data];
    console.log(data);
    return <div className={`relative w-[80%] sm:mt-[5%] mt-[18%] min-h-[50%] mx-auto h-[auto]  py-5 sm:block flex flex-col    rounded-[20px] `}>
          <div className={`sm:overflow-hidden overflow-scroll `}>
          {
           data?.map((e:any,i:any)=>{
 
    const obj:any={id:e.id,name:e?.name,Email:e?.email,department:e?.company?.name,Action:["Edit","Delete"]};
           // console.log(e);
           if(i!=0)
            return  <div  key={i}>
             <div className={`w-[100%] rounded-[20px] sm:flex hidden  min-h-[45px] border-b-[1px] border-white `} key={i}>
             
             {
              Object.keys(obj).map((element:any,ind)=>{
                 if(element=="Action")
                   return <div  className={`min-w-[20%]   text-white  flex items-center gap-[10px] justify-center `} key={ind}>
                     <button onClick={()=>{
                       props?.onClick(e,"edit")
                     }} className={` px-[10px] py-[2px] bg-white text-black rounded-[5px]`}>Edit</button>
                     <button onClick={()=>{
                       props?.onClick(e,"delete")
                     }} className={` px-[10px] py-[2px] bg-white text-black rounded-[5px]`}>Delete</button>
 
                   </div>
                 return <div  className={`min-w-[20%] text-white   flex items-center justify-center `} key={ind}>{obj[`${element}`]}</div>
               })
             }
            </div>
            <div className={`w-[95%] h-[120px] border-[1px] text-white my-2 border-white sm:hidden flex  justify-center  `}> 
              <div className={`w-[10%] pt-5 `}>
                {obj.id}
               </div>
               <div className={`w-[60%]     flex flex-col justify-evenly pl-4`}>
               <h4 className={`text-[16px]`} >{obj.name}</h4>

               <div className={`text-[14px] text-[rgba(255,255,255,.7)]`}>
               <p className={``}>{obj.Email}</p>
               <p>{obj.department}</p>
                </div>

               </div>
               <div className={`w-[20%] flex gap-[10px]  justify-evenly pt-[20px] `}>
                <ModeIcon className={` !text-[14px]`} onClick={()=>{
                       props?.onClick(e,"edit")
                     }}/>
                <DeleteIcon onClick={()=>{
                       props?.onClick(e,"delete")
                     }}  className={` !text-[14px]`}/>
                
               </div>

               </div>
            </div>
            else{
               // console.log("--",Object.keys(e));
               return <div className={`w-[100%] rounded-[10px] backdrop-blue-lg bg-[rgba(255,255,255,.8)] text-black sm:flex hidden  min-h-[40px] border-b-[1px] border-white `} key={i}>{
               Object.keys(e).map((element,ind)=>{
                 return <div  className={`min-w-[20%]     flex items-center justify-center `} key={ind}>{element}</div>
               })
             }</div>
            }
           })
          }
          </div>
 
          <div className={` absolute w-[100%] min-h-[40px] gap-[20px] flex justify-end items-center pt-5  sm:top-[95%] -top-[40px]   text-white  sm:!text-[20px] !text-[14px]  `}>                                                                                                                
             <KeyboardArrowLeftIcon  onClick={props?.prevPageHandler} className={`  sm:!text-[20px] !text-[14px] ${props.page>0 ?" !text-white ":"text-[rgba(255,255,255,.1)]" }`} /> {props?.page+1} <KeyboardArrowRightIcon className={`  sm:!text-[20px] !text-[14px] ${props.page< Math.floor((data.length)/9)?"":"text-[rgba(255,255,255,.1)]" }`} onClick={props?.nextPageHandler}/>
          </div>
    </div>
 }
 export default TableComp;