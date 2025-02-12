import {
  mapToCanActivate,
  mapToCanActivateChild,
  mapToCanDeactivate,
  mapToResolve,
  RouterModule,
  Routes
} from "@angular/router";
import { FormComponent } from "./core/form.component";
import { TableComponent } from "./core/table.component";
import {NotFoundComponent} from "./core/notFound.component";
import {ProductCountComponent} from "./core/productCount.component";
import {CategoryCountComponent} from "./core/categoryCount.component";
import {ModelResolver} from "./model/model.resolver";
import {TermsGuard} from "./terms.guard";
import {UnsavedGuard} from "./core/unsaved.guard";

// const childRoutes: Routes = [
//   { path: "products", component: ProductCountComponent },
//   { path: "categories", component: CategoryCountComponent },
//   { path: "", component: ProductCountComponent }
// ];

const childRoutes: Routes = [
  {
    path: "",
    children: [
      { path: "products", component: ProductCountComponent },
      { path: "categories", component: CategoryCountComponent },
      { path: "", component: ProductCountComponent }
    ],
    resolve: { model: mapToResolve(ModelResolver) },
    canActivateChild: mapToCanActivateChild([TermsGuard])
  }
];

const routes: Routes = [
  // { path: "form/edit", component: FormComponent },
  // { path: "form/create", component: FormComponent },
  {
    path: "form/:mode/:id",
    component: FormComponent,
    resolve: { model: mapToResolve(ModelResolver) },
    canDeactivate: mapToCanDeactivate([UnsavedGuard])
  },
  {
    path: "form/:mode",
    component: FormComponent,
    resolve: { model: mapToResolve(ModelResolver) },
    canActivate: mapToCanActivate([TermsGuard])
  },
  { path: "table", component: TableComponent, children: childRoutes },
  { path: "table/:category", component: TableComponent, children: childRoutes },
  { path: "", redirectTo: "/table", pathMatch: "full" },
  { path: "**", component: NotFoundComponent, pathMatch: "full" },
];

export const routing = RouterModule.forRoot(routes, { bindToComponentInputs: true });
