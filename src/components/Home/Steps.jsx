import Card from "../Reusable/Card";
import icon1 from "../../assets/svgs/icon-1.svg";
import icon2 from "../../assets/svgs/icon-2.svg";
import icon3 from "../../assets/svgs/icon-3.svg";
const cardsData=[
    {
        id: 1,
        backgroundColor: "accent",
        icon: icon1,
        number: 1,
        title: "Optogenetics",
        description: "We harness light to control biology with unmatched precision."
    },
    {
        id: 2,
        backgroundColor: "#222f30",
        textColor: "white",
        icon: icon2,
        number: 2,
        title: "Chemistry",
        description: "We apply the latest chemistry tools to optimize our drug discovery."
    },
    {
        id: 3,
        backgroundColor: "neutral-light",
        icon: icon3,
        number: 3,
        title: "AI",
        description: "We power our platform with an AI engine fueled by differentiated datasets."
    },
]
export default function Steps() {
  return (
    <div className="grid grid-cols-3 bg-[#f7f7f5] w-full relative z-10">
        {cardsData.map((card) => (
            <Card
              key={card.id}
              backgroundColor={card.backgroundColor}
              textColor={card.textColor}
              icon={card.icon}
              number={card.number}
              title={card.title}
              description={card.description}
            />
        ))}
      
    </div>
  );
}
