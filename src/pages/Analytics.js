import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
collection,
getDocs
}
from "firebase/firestore";

import { Bar } from "react-chartjs-2";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Legend,
Tooltip
}
from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Legend,
Tooltip
);

function Analytics(){

const [completed,setCompleted] =
useState(0);

const [pending,setPending] =
useState(0);

useEffect(()=>{

getAnalytics();

},[]);

const getAnalytics =
async()=>{

const data =
await getDocs(
collection(
db,
"habits"
)
);

const habits =
data.docs.map(
(doc)=>doc.data()
);

const completedCount =
habits.filter(
item=>
item.completed
).length;

const pendingCount =
habits.filter(
item=>
!item.completed
).length;

setCompleted(
completedCount
);

setPending(
pendingCount
);

};

const chartData = {

labels:[
"Completed",
"Pending"
],

datasets:[
{
label:
"Habit Status",

data:[
completed,
pending
]
}
]

};

return(

<div>

<h2>
Analytics Dashboard
</h2>

<Bar
data={chartData}
/>

</div>

);

}

export default Analytics;