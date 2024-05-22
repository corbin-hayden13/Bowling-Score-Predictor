import { useGlobals } from "../Globals";
import TableRow from "./TableRow";

export default function GameArea() {
    const { games } = useGlobals();
    
    return (
        <div>
            {games.map((game, _) => {
                return <TableRow game={game}/>
            })}
        </div>
    );
}