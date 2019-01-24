import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {Ingredient} from '../../shared/ingredient.model';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    id: number;

    constructor(private recipeService: RecipeService,
                private route: ActivatedRoute,
                private router: Router,
                private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {
    }

    ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                    this.recipe = this.recipeService.getRecipeById(this.id);
                }
            );
    }

    onAddToShoppingList() {
        this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))
    }

    onEditRecipe() {
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    onRemoveRecipe() {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['/recipes']);
    }

}
