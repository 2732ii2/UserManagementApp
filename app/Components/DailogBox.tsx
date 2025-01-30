import FormDataType from "./Interfaces";

const DailogBox=(props:any)=>{
    const {showDialogBox,DeleteUser,editData,AddAndUpdateUser,FormData,setFormData,setShowDialogBox}=props;
    return <div className={` absolute !w-[100%] h-[100vh] bg-[transparent] backdrop-blur-sm  flex items-center justify-center gap-[20px]  `}>
           {  
           showDialogBox?.Delete ? <div className={` sm:w-[40%] w-[80%] h-[auto] bg-[white] relative rounded-[20px] flex flex-col p-[20px] items-center gap-[20px]`}>
               <h1>Do you want to delete it</h1>
               <button   onClick={()=>{
                    DeleteUser(editData)
               }} className={`bg-black text-white py-2 px-3 rounded-[10px] mt-[40px]`}>Submit</button> 
           </div> :
           <form onSubmit={e=>{
              e?.preventDefault();
              console.log(FormData);
              AddAndUpdateUser(FormData);
            }}  className={` sm:w-[40%] w-[80%] h-[auto] bg-[white] relative rounded-[20px] flex flex-col p-[20px] items-center gap-[20px] `}>
            <h1 className={` text-black sm:text-[20px] text-[14px] font-bold text-center `}>  { showDialogBox?.Add ? "Add New User" : " Edit User"}  </h1>
             <div className={` flex flex-wrap w-[100%] justify-center h-auto `}>
  
             {
              Object.keys(FormData).map((e,i)=>{
                // e instanceOf
                const key=e as keyof FormDataType;
                return <div key={i} className={`text-black gap-2 flex mr-5 flex-col w-[40%] mt-[20px] capitalize tracking-wide font-medium sm:text-[20px] text-[12px] `}>{e}
                <input value={  FormData[key] } onChange={(ele)=>{
                      setFormData({
                        ...FormData,[e]:ele.target.value
                      })
                }} required={true} type={e=="email"?"email":"text"} className={` border-[2px] border-black sm:h-[40px] h-[30px]  sm:px-[20px] `}/>
                </div>
              })
             }
             </div>
            
            <div>
            { showDialogBox?.Add ?  <button type="submit" className={`bg-black text-white py-2 px-3 rounded-[10px] mt-[40px] sm:text-[16px] text-[12px]`}>Submit</button>  :  <button type={"submit"}  className={`bg-black text-white py-2 px-3 rounded-[10px] mt-[40px]`} >Update</button>}
  
            </div>
              
              <p className={` absolute cursor-pointer font-bold sm:text-[16px] text-[12px] right-[30px] text-black`} onClick={()=>{
                 setShowDialogBox({
                  Add:false,
                  Edit:false,
                  Delete:false
                })
              }}>X</p>
  
  
            </form>}
            
      </div> 
  }

  export default DailogBox;