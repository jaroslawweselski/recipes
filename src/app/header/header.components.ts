import {Component} from '@angular/core';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {RecipeService} from '../recipes/recipe.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(
        private shoppingListService: ShoppingListService,
        private recipeService: RecipeService
    ) {}

    onSaveData() {
        this.shoppingListService.storeIngredients()
            .subscribe();
        this.recipeService.storeRecipes()
            .subscribe();

        alert('Data has been saved.');
    }

    onGetData() {
        this.shoppingListService.attachIngredients();
        this.recipeService.attachRecipes();
    }
}
