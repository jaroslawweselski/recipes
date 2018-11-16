import {Recipe} from './recipe.model';
import {EventEmitter, Output} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            'Name',
            'Description',
            'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=350',
            [
                new Ingredient('nameOfIngredient1', 2),
                new Ingredient('nameOfIngredient2', 1)
            ]
        ),
        new Recipe(
            'Name2',
            'Description2',
            'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=350',
            [
                new Ingredient('nameOfIngredient3', 2),
                new Ingredient('nameOfIngredient4', 1)
            ]
        )
    ];
    @Output() recipeSelected = new EventEmitter<Recipe>();

    constructor() {
    }

    getRecipes() {
        return this.recipes.slice();
    }
}
