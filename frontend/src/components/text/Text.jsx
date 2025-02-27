import DOMPurify from "dompurify";

import './Text.css'

export default function Text({ value }) {
    return (
        <p 
            className="text-component"
            tabIndex="0"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
        ></p>
    );
}
