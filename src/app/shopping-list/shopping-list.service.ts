import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ShoppingListService {
    public static ENDPOINT_URL: string = 'https://recipes-8b730.firebaseio.com/shoppingList.json';

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Ingredient', 1),
        new Ingredient('Ingredient2', 2)
    ];

    constructor(private http: Http) {
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    removeIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    storeIngredients() {
        return this.http.put(
            ShoppingListService.ENDPOINT_URL,
            this.ingredients
        );
    }

    setRecipes(ingredinets: Ingredient[]) {
        this.ingredients = ingredinets;
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    attachIngredients() {
        return this.http.get(ShoppingListService.ENDPOINT_URL)
            .subscribe(
                (response: Response) => {
                    const ingredients: Ingredient[] = response.json();
                    this.setRecipes(ingredients);
                }
            );
    }
}
