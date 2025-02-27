import './Title.css';

export default function TitleTeam({ value, align }) {
    // Costruisci la classe dinamica basata sul valore di `align`
    const alignmentClass = align ? `title-align-${align}` : '';

    return (
        <div tabIndex="0" className={`title-component p-3 p-sm-4 mb-3 ${alignmentClass}`}>
            {value}
        </div>
    );
}
