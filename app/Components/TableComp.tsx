
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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
 export default TableComp;