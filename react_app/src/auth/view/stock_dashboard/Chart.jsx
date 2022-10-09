import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';



const Chart =({chartData})=>{


    return(
        <div>
            
  <LineChart width={600} height={300} data={chartData}>
    <Line type="monotone" dataKey="close" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="date" />
    <YAxis />
  </LineChart>

        </div>
    )

}

export default Chart