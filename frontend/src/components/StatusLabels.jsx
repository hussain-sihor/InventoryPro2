import React from 'react'

const StatusLabels = ({name,value,total,color}) => {
  const str = value.toLocaleString('en-IN');

  let finalVal = (value/total)*100

  return (
    <div className='w-full pl-2 pr-2 pt-1 pb-1 flex flex-col justify-center items-start '>
      <div className='w-full flex flex-col rounded-lg'>
        <h1 className={`text-md font-bold ${color}`}>{name} STOCK </h1>
      {/* <Progress value={finalVal} className="w-[85%] h-3  mt-2 bg-optional"/> */}
      <div className="w-[85%] h-3 mt-2 bg-secondary rounded-full relative">
        <div className={`absolute left-0 bg-optional h-3 rounded-full`} style={{ width: `${finalVal}%` }}></div>
      </div>
      <h1 className='text-sm font-semibold text-white'>{str} products</h1>
      </div>
    </div>
  )
}

export default StatusLabels
