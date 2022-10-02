import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from '../../../services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private productsService: ProductsService) { }

  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.productsService.listAllProducts();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('data') data: CreateProductInput,
  ) {
    return this.productsService.createProduct(data);
  }
}
