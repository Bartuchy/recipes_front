import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddRecipePayload } from '../recipe/add-recipe/add-recipe.payload';
import { RecipeModel } from './recipe-model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<Array<RecipeModel>> {
    return this.http.get<Array<RecipeModel>>('http://localhost:8080/api/recipe/all')
  }

  addRecipe(recipePayload: AddRecipePayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/recipe/add', recipePayload)
  }

  getRecipeById(id: number): Observable<RecipeModel> {
    return this.http.get<RecipeModel>('http://localhost:8080/api/recipe/' + id)
  }

  getAllRecipesAddedByUser(username: string): Observable<Array<RecipeModel>> {
    return this.http.get<Array<RecipeModel>>('http://localhost:8080/api/recipe/profile/' + username);
  }

  deleteRecipeById(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/api/recipe/remove/' + id);
  }

  updateRecipe(id: number, recipePayload: RecipeModel): Observable<any> {
    return this.http.put<RecipeModel>('http://localhost:8080/api/recipe/update/' + id, recipePayload);
  }
}
