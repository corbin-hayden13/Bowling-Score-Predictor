import { useGlobals } from "../Globals";

export default function Header() {
    const { addGame } = useGlobals();

    return (
        <div className="header">
            <button onClick={addGame()}>Add A New Game</button>
        </div>
    );
}