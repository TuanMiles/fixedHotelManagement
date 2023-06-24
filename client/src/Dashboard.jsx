import Liveclock from "./Liveclock";


export default function Dashboard() {
    const DashboardCards = [
        { title: "Current in house", value:"value", total:"Total Pax"},
        { title: "Expected Arrivals", value:"value", total:"Total Pax"},
        { title: "Expected of Departures", value:"value", total:"Total Pax"},
        { title: "Rental Receipt", value:"value", total:"Total Pax"},
      ];

      
    return (
        <div className="">
            {/* <Liveclock/> */}
            <div className="cards flex">
                {DashboardCards.map((card,index) => (
                    <div 
                    key={index}
                    className={'flex flex-col gap-y-20 text-center rounded-md p-2 bg-[#ffffff] w-[200px] h-[300px] relative top-36 mr-8'}
                        
                    >
                    <div>{card.title}</div>
                    <div>{card.value}</div>
                    <div>{card.total}</div>
                    
                    
                        
                    </div>
                ))

                }
            </div>

        </div>


    )
}