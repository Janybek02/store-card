import { useEffect, useState } from "react";
import Items from "./items/Items";
import Loanding from "../loanding/Loanding";
import Categories from "./Categories/Categories";
export default function Start() {
  const [state, setState] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [basket, setBasket] = useState([]);
  const [massage, setMassage] = useState(false);
  const [categoryMassage, setCategoryMassage] = useState(false);

  useEffect(() => {
    let urlData = "https://fakestoreapi.com/products/";
    const fetchCategories = async () => {
      try {
        const url = await fetch(urlData + "categories");
        const categoriesData = await url.json();
        setCategories(categoriesData);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchData = async () => {
      try {
        const url = await fetch(urlData);
        const data = await url.json();
        setState(data);
        setMassage(true);
      } catch (e) {
        console.log(e);
      }
    };
    setTimeout(() => {
      fetchCategories();
      fetchData();
    }, 2000);
  }, []);

  const handleOnSubmit = async (e) => {
    const value = e.target.value;
    const Url = "https://fakestoreapi.com/products/category/";
    const categoryUrl = await fetch(Url + value);
    const data = await categoryUrl.json();

    if (value === "all") setCategoryMassage(!categoryMassage);
    setCategory(data);
  };

  const onAddBasket = (basketItem, id) => {
    const find = basket.map((el) => el.id === id);
    if (find) {
      setBasket((current) =>
        current.filter((filBasket) => filBasket.id !== id)
      );
    } else setBasket((current) => [...current, basketItem]);
  };
  return (
    <>
      <div className=" bg-slate-200">
        {<Categories categories={categories} handleOnSubmit={handleOnSubmit} />}
      </div>
      <div className=" flex flex-wrap justify-center bg-[#E5E4E9]">
        {massage ? (
          (categoryMassage ? category : state).map((item) => (
            <Items item={item} onAddBasket={onAddBasket} />
          ))
        ) : (
          <Loanding />
        )}
      </div>
    </>
  );
}
