import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "@/Components/CardComponent";


interface User{
    id: number;
    name: string;
    email: string;
}


export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({name: "", email: ""});
  const [updateUser, setUpdateUser] = useState({id: '', name: "", email: ""});

  //fetching users
  useEffect(()=>{
    const fetchData = async () => {
      try {
          const response = await axios.get(`${apiUrl}/users`, {
              headers: {
                  "Content-Type": "application/json",
              },
               // Ensure credentials are sent if needed
          });
          setUsers(response.data.reverse());
      } catch (error) {
          console.log("Error fetching data-", error);
      }
  };
  fetchData();  
  }, []);


  //creating the user via frontend okay!! 
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${apiUrl}/users`, newUser);
        setUsers([response.data, ...users]);
        setNewUser({name: "", email: ""});
    } catch (error) {
        console.log("Error creating user", error);
    }
  };
  //also im updating user via frontend
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await axios.put(`${apiUrl}/users/${updateUser.id}`, {name: updateUser.name, email: updateUser.email});

        setUpdateUser({id: '', name: "", email: ""});
        setUsers
        (users.map((user)=> {
          if(user.id === parseInt(updateUser.id)){
             return {...user, name: updateUser.name, email: updateUser.email};
          }
          return user;
        }));
        }catch (error) {
        console.log("Error updating user", error);
    }
  };

  //deleting user via frontend
  const deleteUser = async (id: number) => {
    try {
        await axios.delete(`${apiUrl}/users/${id}`);
        setUsers(users.filter((user)=> user.id !== id));
    } catch (error) {
        console.log("Error deleting user", error);
    }
  };
  

  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-gray-100">

      <div className="space-y-4 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center">User Management App</h1>
        {/* creating users via frontend */}
        <form onSubmit={createUser} className="p-4 bg-blue-100 rounded shadow">
            <input
              placeholder="Name"
              value={newUser.name}
              onChange={(e)=> setNewUser({...newUser, name: e.target.value})}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e)=> setNewUser({...newUser, email: e.target.value})}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />

            <button type="submit" className="w-full p-2 text-white bg-gray-800 rounded">Add User</button>
        </form>
        {/* updating users via frontend */}
        <form onSubmit={handleUpdateUser} className="p-4 bg-green-400 rounded shadow">
          <input 
          placeholder="User ID"
          value={updateUser.id}
          onChange={(e)=> setUpdateUser({...updateUser, id: e.target.value})}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
          placeholder="New Name"
          value={updateUser.name}
          onChange={(e)=> setUpdateUser({...updateUser, name: e.target.value})}
          className="w-full p-2 mb-2 border border-gray-300 rounded"          
          />
          <input
          placeholder="New Email"
          value={updateUser.email}
          onChange={(e)=> setUpdateUser({...updateUser, email: e.target.value})}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          />

          <button type="submit" className="w-full p-2 text-white bg-gray-800 rounded">
            Update User
          </button>
        </form>
        {/* deleting users via frontend */}
        <div className="p-4 bg-red-400 rounded shadow">
          <input 
          placeholder="User ID"
          value={updateUser.id}
          onChange={(e)=> setUpdateUser({...updateUser, id: e.target.value})}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button onClick={()=> deleteUser(parseInt(updateUser.id))} className="w-full p-2 text-white bg-gray-800 rounded">
            Delete User
          </button>
        </div>
        {/* displaying the user on frontend */}
        <div  className="space-y-2">
          {users.map((user)=>(
            <div key={user.id} className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
              <CardComponent card={user}/>
            </div>
          ))}
        </div>
      </div>

      

      


    </main>
    
  )
}