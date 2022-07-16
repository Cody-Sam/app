import ShopIndex from "./ShopIndex";
import ShopItemPage from "./ShopItemPage";

function Shop (){
  return <ShopIndex />;
}

Shop.Index = ShopIndex;
Shop.Item = ShopItemPage;

export default Shop;