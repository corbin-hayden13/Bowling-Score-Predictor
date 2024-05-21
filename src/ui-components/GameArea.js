import { useGlobals } from "../Globals";
import TableRow from "./TableRow";

export default function GameArea() {
    const { games } = useGlobals();
    
    return (
        <div>
            {games.map((index) => {
                return <TableRow index={index}/>
            })}
        </div>
    );
}