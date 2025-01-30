const Header=(props:any)=>{
    const onChange= props?.onChange;
    const ClickHandler=props?.ClickHandler;
     return <div className={`Header relative flex justify-between text-white  px-[40px] py-[20px] mt-[20px] `}>
       <h1 className={` font-medium serial sm:text-3xl `}> User Management</h1>
   
       <div className={` flex justify-between w-[40%]  `}>
       <div className={` flex items-center  gap-[20px]  px-[20px] py-[5px] rounded-[20px]  `}>
         <input onChange={onChange} className={` sm:w-[250px] w-[80%] sm:relative absolute sm:-bottom-0 sm:-left-none left-[10%] -bottom-[40px] outline-none py-[5px] px-[5px] bg-transparent     border-b-[1px]   border-[white] `} placeholder={"... type a Name"} />
         {/* <button className={` bg-[white] text-black px-[10px] py-[2px] rounded-[10px]`}>Search </button> */}
       </div>
       <div onClick={ClickHandler} className={` flex items-center w-[auto] border-[1px] border-white sm:px-[20px] px-[10px] sm:rounded-[20px] sm:py-[10px] py-[2px] text-[16px] flex gap-[20px] `}>
       <p>+</p> <span className="sm:block hidden">Active User </span>
        
       </div>
       </div>
        </div>
   }
export default Header;