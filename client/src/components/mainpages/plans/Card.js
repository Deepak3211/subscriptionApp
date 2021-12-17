import {AiOutlineGithub} from 'react-icons/ai'
const Card = ({image,githubLink,demo,name}) => {
  return (
    <div className = 'flex justify-evenly items-center  bg-blue-50 shadow-xl m-8 rounded-lg '>
<div className="flex justify-center items-center max-w-sm rounded overflow-hidden shadow-lg flex-col border bg-gray-50 border-red-600 m-4 h-96">
<h2 className="mt-4 text-2xl font-mono text">{name}</h2>
        <img src={image} className="object-contain w-2/4 h-full shadow-lg rounded-md m-4" alt={name } />
<div className="flex justify-center items-center  rounded overflow-hidden  gap-2 w-full m-4 ">
<a href = {githubLink} className = 'bg-gray-600 hover:bg-blue-400 text-white font-bold py-4 px-4 border-b-4 border-yello-700 hover:border-blue-500 rounded w-full ml-4 text-2xl flex justify-center items-center ' target = '_blank' rel="noopener noreferrer "><AiOutlineGithub /></a>
<a href = { demo } className = 'bg-yellow-500 hover:bg-blue-400 text-white font-bold p-6 border-b-4 border-yello-700 hover:border-blue-500 rounded-lg w-full mr-4 text-center ' target = '_blank' rel="noopener noreferrer">Live Demo</a>
</div>
</div>
      
    </div>
  )
}

export default Card
