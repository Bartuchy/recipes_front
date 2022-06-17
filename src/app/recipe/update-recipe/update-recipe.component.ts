import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { RecipeModel } from 'src/app/shared/recipe-model';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css']
})
export class UpdateRecipeComponent implements OnInit {

  recipeId!: number;
  recipe: RecipeModel = new RecipeModel();
  updateRecipeForm!: FormGroup;

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.recipeId = this.activatedRoute.snapshot.params['id'];
    this.recipeService.getRecipeById(this.recipeId).subscribe((data: RecipeModel) => {
      this.recipe = data;
    }, (error: any) => {
      throwError(error);
    })
  }

  ngOnInit(): void {
    this.updateRecipeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: new FormControl('', Validators.required),
      directions: new FormControl('', Validators.required)
    });
  }

  updateRecipe() {
    this.recipe.name = this.updateRecipeForm.get('name')!.value;
    this.recipe.category = this.updateRecipeForm.get('category')!.value;
    this.recipe.description = this.updateRecipeForm.get('description')!.value;
    this.recipe.ingredients = this.updateRecipeForm.get('ingredients')!.value;
    this.recipe.directions = this.updateRecipeForm.get('directions')!.value;

    this.recipeService.updateRecipe(this.recipe.id!, this.recipe).subscribe(() => {
      this.router.navigateByUrl('/user-profile/' + this.recipe.userName);
    }, (error: any) => {
      throwError(error);
    })
  }

  discardRecipe() {
    this.router.navigateByUrl('/user-profile/' + this.recipe.userName);
  }
}
