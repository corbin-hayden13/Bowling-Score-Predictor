import { useGlobals } from "../Globals";

export default function Header() {
    const { games, addGame, setFrame } = useGlobals();

    const handleOnClick = () => {
        addGame(0, "Test Game");
        setFrame(0, 1, [0, 7]);
        setFrame(0, 2, [0, 0]);
        setFrame(0, 3, [1, 5]);
        setFrame(0, 10, [7, 3, 0]);
    };

    return (
        <div className="header">
            <button onClick={handleOnClick}>Add A New Game</button>
            <span>{games.length}</span>
        </div>
    );
}