import "./Bowling-Table.css";

export default function ScrollableContainer({children}) {
    return (
        <div className="scrollable-container">
            <div className="inner-container">
                {children}
            </div>
        </div>
    );
}