const UserCard = ({ data }) => {
    const { firstName, lastName, about,  age, gender } = data;
  
    return (
      <div className="card bg-white w-72 max-w-xs shadow-md shadow-white rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1507499036636-f716246c2c23?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="profile"
            className="w-full h-40 object-cover"
          />
        </figure>
        <div className="p-4">
          <h2 className="text-3xl font-semibold text-gray-800">{firstName} {lastName}</h2>
          <p className="text-md text-gray-600 mt-2">{about}</p>
          <p className="text-xs font-medium text-gray-500 mt-2">Age: {age} | Gender: {gender}</p>
          <div className="mt-4 flex gap-2">
            <button className="  bg-gradient-to-r from-black to-blue-600 p-2 mr-2 rounded-md text-slate-200 w-22">Interested</button>
            <button className="  bg-gradient-to-r from-black to-red-500 p-2 rounded-md text-slate-200 w-20">Ignore</button>
          </div>
          
        </div>
      </div>
    );
  };
  
  export default UserCard;
  