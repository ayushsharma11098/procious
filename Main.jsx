import React, { useState } from "react"
import IngredientsList from "./components/IngredientsList"
import ProciouseRecipe from "./components/ProciousRecipe"
import { getRecipeFromMistral } from "./ai"

export default function Main() {
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    async function getRecipe() {
        setIsLoading(true)
        setError(null)
        try {
            const recipeMarkdown = await getRecipeFromMistral(ingredients)
            if (!recipeMarkdown) {
                throw new Error("No recipe generated")
            }
            setRecipe(recipeMarkdown)
        } catch (err) {
            setError("Failed to generate recipe. Please try again.")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    function addIngredient(event) {
        event.preventDefault()
        const form = event.target
        const newIngredient = form.ingredient.value.trim()
        
        // Input validation
        if (!newIngredient) {
            alert("Please enter an ingredient")
            return
        }
        
        if (ingredients.some(ing => ing.toLowerCase() === newIngredient.toLowerCase())) {
            alert("This ingredient is already in the list")
            return
        }
        
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        form.reset()
    }

    function removeIngredient(ingredientToRemove) {
        setIngredients(prevIngredients => 
            prevIngredients.filter(ingredient => ingredient !== ingredientToRemove)
        )
    }
    function clearAllIngredients() {
        setIngredients([])
        setRecipe("")
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button type="submit">Add ingredient</button>
                <button 
                    onClick={clearAllIngredients} 
                    className="clear-ingredients-btn"
                    disabled={ingredients.length === 0}
                >
                    Clear All
                </button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    onRemoveIngredient={removeIngredient}
                    isLoading={isLoading}
                />
            }
            

            {isLoading && <RecipeShimmer />}
            {error && <div className="error-message">{error}</div>}
            {recipe && <ProciouseRecipe recipe={recipe} />}
        </main>
    )
}

// Shimmer Component
function RecipeShimmer() {
    return (
        <div className="recipe-shimmer">
            <div className="shimmer-header"></div>
            <div className="shimmer-line"></div>
            <div className="shimmer-line"></div>
            <div className="shimmer-line"></div>
            <div className="shimmer-line"></div>
            <div className="shimmer-line"></div>
        </div>
    )
}

