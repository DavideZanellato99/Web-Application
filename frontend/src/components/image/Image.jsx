export default function Image({ value, alt, height, width }) {
    return (
        <img
            className="img-fluid"
            src={value}
            alt={alt}
            style={{ height: height, width: width}}
            tabIndex="0"
        />
    );
}
