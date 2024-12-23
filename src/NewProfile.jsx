

const NewProfile = ({data}) => {

  const {firstName,lastName,age,gender,about,skill,profile}=data;

  return (
    <div className="card bg-white h-[373px] max-w-xs  rounded-lg overflow-hidden transform transition duration-300">
        <figure>
          <img
            src={profile}
            alt="profile"
            className="w-full h-40 object-cover"
          />
        </figure>
        
        <div className="p-4">
          <h2 className="text-3xl font-semibold text-gray-800">{firstName} {lastName}</h2>
         
           <div className="flex gap-2">
             {skill.map((li,index)=>{
                return(
                    <ul key={index} className="text-gray-800 flex flex-row">
                        <li className="">{li}</li>
                    </ul>
                )
             })}
             </div>
          
          <p className="text-md text-gray-600 mt-2">{about}</p>
          <p className="text-xs font-medium text-gray-500 mt-2">Age: {age} | Gender: {gender}</p>
          
          
        </div>
      </div>
  )
}

export default NewProfile