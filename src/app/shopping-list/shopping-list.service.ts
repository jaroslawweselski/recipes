import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class ShoppingListService {
    public static ENDPOINT_URL: string = 'https://recipes-8b730.firebaseio.com/shoppingList.json';

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Ingredient', 1),
        new Ingredient('Ingredient2', 2)
    ];

    constructor(private httpClient: HttpClient, private authService: AuthService) {
    }

    getIngredient(index: number) {
        return this.ingredients[index];
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
        return this.httpClient.put(
            ShoppingListService.ENDPOINT_URL,
            this.ingredients
        );
    }

    setRecipes(ingredinets: Ingredient[]) {
        this.ingredients = ingredinets;
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    attachIngredients() {
        return this.httpClient.get<Ingredient[]>(ShoppingListService.ENDPOINT_URL)
            .subscribe(
                (ingredients) => {
                    this.setRecipes(ingredients);
                }
            );
    }
}
