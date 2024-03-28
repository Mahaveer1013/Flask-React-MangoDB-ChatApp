import React from "react"
import FadeLoader from "react-spinners/FadeLoader";

export default function Loading() {
    return (
        <><FadeLoader
        color='#fff'
        // loading={loading}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    /></>
    )
}