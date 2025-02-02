import React, { useEffect, useState } from 'react'
import Category from './Category'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/lib/axiosInstance';

const CategoriesList = () => {
  const navigate = useNavigate();
  const [categories,setCategories] = useState([]);
  const [flag,setFlag] = useState(false);

 
 useEffect(()=>{

  const handleRequest = async() =>{
    try{
      const token = localStorage.getItem("token");
     await axiosInstance.get("/categories/getcategories",{headers: {
      Authorization: `Bearer ${token}`,
    },}).then((response) => {
        setCategories(response.data);
     });

    }catch(error){
     console.log(error) ;   
    }
  }
  handleRequest();
  
},[flag])

 const handleDelete = async(data)=>{
  const url = `/categories/deletecategory/${data}`;
  const token = localStorage.getItem("token");

  await axiosInstance.delete(url,{headers:{
    Authorization: `Bearer ${token}`,
  }}).then((response)=>{
    if(response.status == 200){
      setFlag(!flag)
    }
  })

}
  return (
    <div className=' flex flex-col  h-[90%] w-full border-[2px] border-tertiary  rounded-xl  overflow-y-scroll scrollbar-hidden pl-2 pr-2 gap-3'>
      {categories.map((item)=>(
        <Category data ={item} onclick = {handleDelete} key={item.createdAt}/>
      ))}
    </div>
  )
}

export default CategoriesList
