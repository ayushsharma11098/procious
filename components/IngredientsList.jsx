import React from "react";

export default function IngredientsList(props) {
    const { ingredients, onRemoveIngredient, getRecipe, isLoading } = props;

    // Determine the message based on the number of ingredients
    let message = "";
    const remaining = 4 - ingredients.length; // Calculate how many more are needed

    if (remaining > 0 && remaining < 4) {
        message = `*Add at least ${remaining} more item${remaining > 1 ? 's' : ''}.`;
    }

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
                {ingredients.map(ingredient => (
                    <li key={ingredient} className="ingredient-item">
                        {ingredient}
                        <button 
                            onClick={() => onRemoveIngredient(ingredient)} 
                            aria-label={`Remove ${ingredient}`}
                            className="remove-ingredient-btn"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>

            {/* Display the message if applicable */}
            {message && <p className="ingredient-message">{message}</p>}

            {ingredients.length > 3 && (
                <div className="get-recipe-container">
                    <h3>Ready for a high protein recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                    <button 
                        onClick={getRecipe} 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Generating...' : 'Get a recipe'}
                    </button>
                </div>
            )}
        </section>
    );
}