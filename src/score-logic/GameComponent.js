import { useState } from 'react';
import { Game } from "./score-logic";

export default function GameComponent() {
    const [game, setGame] = useState(new Game());
}