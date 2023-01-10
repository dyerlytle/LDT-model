import React from 'react';



function Canvas({ forwardedRef }) {

    return (
        <div >
            <canvas
                width={1000}
                height={800}
                rdata-paper-resize="true"
                ref={forwardedRef} >
            </canvas>
        </div>
    )
}

export default Canvas;