import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

const ListAlbum = () => {

  const [data,setData] = useState([]);

  const fetchAlbum = async() =>{

    try {

      const response = await axios.get(`${url}/api/album/list`);

        if(response.data.success){

          setData(response.data.albums)

        }
      
    } catch (error) {

      toast.error("Error Occured")
      
    }

  }

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }

  const removeAlbum = async (id) =>{

    try {

      const response = await axios.post(`${url}/api/album/remove`,{id});

      if(response.data.success){

        toast.success(capitalizeWords(response.data.message));
        await fetchAlbum();

      }
      
    } catch (error) {

      toast.error("Error Occured");
      
    }

  }

  useEffect(()=>{
    fetchAlbum();
},[])

  return (
    <div className='overflow-y-auto'>
      <p>All Albums List</p>
      <br/>
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>

        </div>
        {data.map((item,index)=>{
            return(
              <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                <img className='w-12' src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.desc}</p>
                <input type="color" value={item.bgColor} />
                <p onClick={()=>removeAlbum(item._id)} className='cursor-pointer font-extrabold font-comic text-red-700'>X</p>
              </div>
            )
        })}
      </div>
        
    </div>
  )
}

export default ListAlbum