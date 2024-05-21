import { useGlobals } from "../Globals";
import TableRow from "./TableRow";

export default function GameArea() {
    const { games } = useGlobals();
    
    return (
        <div>
            {games?.map((game, index) => {
                console.log(`Generating table ${index}`);
                return <TableRow key={`${game.name}-${index}`} index={index}/>
            })}
        </div>
    );
}