import jsPDF from "jspdf";
import {
useState,
useEffect
}
from "react";
import "../styles/Home.css";


import { db } from "../firebase";

import {
collection,
addDoc,
getDocs,
doc,
updateDoc,
deleteDoc
}
from "firebase/firestore";

function Home(){
const exportPDF = ()=>{

const doc = new jsPDF();

doc.text(
"Habit Tracker Report",
20,
20
);

let y = 40;

habitList.forEach(
(item)=>{

doc.text(
`Habit: ${item.habitName}`,
20,
y
);

doc.text(
`Streak: ${item.streak}`,
20,
y+10
);

doc.text(
`Status: ${
item.completed
?
"Completed"
:
"Pending"
}`,
20,
y+20
);

doc.text(
`Reminder: ${item.reminder}`,
20,
y+30
);

doc.text(
`Date: ${item.date}`,
20,
y+40
);

y += 60;

}
);

doc.save(
"Habit_Report.pdf"
);

};

const [habit,setHabit] =
useState("");

const [reminder,setReminder] =
useState("");

const [date,setDate] =
useState("");

const [habitList,setHabitList] =
useState([]);

const habitCollection =
collection(
db,
"habits"
);

const getHabits =
async()=>{

const data =
await getDocs(
habitCollection
);

setHabitList(
data.docs.map(
(doc)=>(
{
...doc.data(),
id:doc.id
}
)
)
);

};

useEffect(()=>{

getHabits();

Notification.requestPermission();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

const addHabit =
async()=>{

if(!habit) return;

await addDoc(
habitCollection,
{
habitName:habit,
streak:0,
completed:false,
reminder:reminder,
date:date
}
);

setHabit("");
setReminder("");
setDate("");

getHabits();

};

const completeHabit =
async(id,streak)=>{

await updateDoc(
doc(
db,
"habits",
id
),
{
completed:true,
streak:streak+1
}
);

getHabits();

};

const showReminder = (habitName)=>{

if(
Notification.permission ===
"granted"
){

new Notification(
"Habit Reminder",
{
body:
`Complete ${habitName}`
}
);

}

};

const deleteHabit =
async(id)=>{

await deleteDoc(
doc(
db,
"habits",
id
)
);

getHabits();

};

const totalHabits =
habitList.length;

const completedHabits =
habitList.filter(
item=>
item.completed
).length;

const pendingHabits =
totalHabits -
completedHabits;

const highestStreak =
habitList.length>0
?
Math.max(
...habitList.map(
item=>
item.streak
)
)
:0;
const progress =
totalHabits > 0
?
(
completedHabits /
totalHabits
) * 100
:0;

return(

<div className="card">

<h1>
Habit Tracker Dashboard
</h1>

<div
style={{
display:"flex",
gap:"20px",
marginBottom:"20px"
}}
>

<div
style={{
border:"1px solid black",
padding:"15px"
}}
>

Total Habits

<h2>
{totalHabits}
</h2>

</div>

<div
style={{
border:"1px solid black",
padding:"15px"
}}
>

Completed

<h2>
{completedHabits}
</h2>

</div>

<div
style={{
border:"1px solid black",
padding:"15px"
}}
>

Pending

<h2>
{pendingHabits}
</h2>

</div>

<div
style={{
border:"1px solid black",
padding:"15px"
}}
>

Best Streak

<h2>
{highestStreak}
</h2>

</div>

</div>

<input
className="inputBox"
type="text"
placeholder="Add Habit"
value={habit}
onChange={(e)=>
setHabit(
e.target.value
)
}
/>
<input
type="time"
value={reminder}
onChange={(e)=>
setReminder(
e.target.value
)
}
/>
<input
type="date"
value={date}
onChange={(e)=>
setDate(
e.target.value
)
}
/>

<button
className="addButton"
onClick={addHabit}
>

Add

</button>

<button
onClick={exportPDF}
>

Export PDF

</button>

<hr/>
<h3>
Daily Progress:
{progress.toFixed(0)}%
</h3>

<div
style={{
width:"100%",
background:"#333",
height:"20px",
borderRadius:"10px",
marginBottom:"20px"
}}
>

<div
style={{
width:`${progress}%`,
background:"limegreen",
height:"20px",
borderRadius:"10px"
}}
>

</div>

</div>

{
habitList.map(
(item)=>(

<div
key={item.id}
style={{
border:"1px solid black",
padding:"15px",
margin:"10px"
}}
>

<h3>
{item.habitName}
</h3>
<p>
Reminder:
{item.reminder}
</p>
<p>
Date:
{item.date}
</p>
<p>
Streak:
{item.streak}
</p>
<p>

Badge:

{
item.streak >= 10
? "👑 Legend"

: item.streak >= 5
? "🥇 Gold"

: item.streak >= 3
? "🥈 Silver"

: item.streak >= 1
? "🏅 Beginner"

: "No Badge"
}

</p>
<p>
Status:
{
item.completed
?
"Completed"
:
"Pending"
}
</p>

<button
onClick={()=>
completeHabit(
item.id,
item.streak
)
}
>

Complete

</button>

<button
onClick={()=>
showReminder(
item.habitName
)
}
>

Notify

</button>
<button
onClick={()=>
deleteHabit(
item.id
)
}
>

Delete

</button>

</div>

)
)
}

</div>

);

}

export default Home;