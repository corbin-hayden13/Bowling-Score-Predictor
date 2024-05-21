import { useGlobals } from "../Globals";

export default function Header() {
    const { games, addGame } = useGlobals();

    return (
        <div className="header">
            <button onClick={addGame}>Add A New Game</button>
            <span>{games.length}</span>
        </div>
    );
}