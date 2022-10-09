import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip } from 'recharts';



const Chart =({chartData})=>{


    return(
        <div>
            
  <LineChart width={600} height={300} data={chartData}>
    <Line type="monotone" dataKey="close" stroke="#8884d8" />
    <Line type="monotone" dataKey="lucro" stroke="black" />
    <CartesianGrid stroke="#ccc" />
    <Tooltip/>
    <XAxis dataKey="date" />
    <YAxis dataKey="date"/>
  </LineChart>

        </div>
    )

}

export default Chart