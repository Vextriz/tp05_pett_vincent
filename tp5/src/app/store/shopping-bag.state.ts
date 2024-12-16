import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddToCart, RemoveFromCart } from './shopping-bag.actions';
import { Product } from '../models/product';

export interface ShoppingBagStateModel {
  items: { product: Product; quantity: number }[];
}

@State<ShoppingBagStateModel>({
  name: 'shoppingBag',
  defaults: {
    items: []
  }
})
export class ShoppingBagState {
  @Selector()
  static getItems(state: ShoppingBagStateModel) {
    return state.items;
  }
  @Selector()
  static getCount(state: ShoppingBagStateModel){
    return state.items.length;
  }

  @Action(AddToCart)
  addToCart(ctx: StateContext<ShoppingBagStateModel>, action: AddToCart) {
    const state = ctx.getState();
    const existingItem = state.items.find(item => item.product.id === action.payload.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      state.items.push({ product: action.payload, quantity: 1 });
    }

    ctx.setState({
      ...state,
      items: [...state.items]
    });
  }

  @Action(RemoveFromCart)
  removeFromCart(ctx: StateContext<ShoppingBagStateModel>, action: RemoveFromCart) {
    const state = ctx.getState();

    const updatedItems = state.items
      .map(item => {
        if (item.product.id === action.payload.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter(item => item.quantity > 0);

    ctx.setState({
      ...state,
      items: updatedItems
    });
  }
}
