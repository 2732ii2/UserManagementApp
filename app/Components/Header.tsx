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
export default Header;