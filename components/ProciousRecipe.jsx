import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function ProciousRecipe(props) {
    const recipeRef = useRef(null); // Create a ref for the recipe section

    useEffect(() => {
        if (props.recipe) {
            recipeRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [props.recipe]); 

    return (
        <section ref={recipeRef} className="suggested-recipe-container" aria-live="polite">
            <h2 className="recipe-heading">Procious chef recommends:</h2>
            <div className="heading-divider"></div>
            <ReactMarkdown className="recipe-content">{props.recipe}</ReactMarkdown>
        </section>
    );
}