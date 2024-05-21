import { useGlobals } from "../Globals";

export default function Header() {
    const { games, addGame } = useGlobals();

    const handleOnClick = () => {
        addGame(0, "Test Game");
    };

    return (
        <div className="header">
            <button onClick={handleOnClick}>Add A New Game</button>
            <span>{games.length}</span>
        </div>
    );
}