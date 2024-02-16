import EditItem from "@/components/MenuInterFace/EditItem";

const getMenuById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/menu/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export default async function EditMenu({ params }) {
  const {id} = params;
  const EditMenu = await getMenuById(id);
  const {title, desc, prices, category, subcategory, categoryImg, dish} = EditMenu;

  return <EditItem id={id} 
  Title={title} 
  Desc={desc}
  Prices={prices}
  Category={category}
  Subcategory={subcategory}
  CategoryImg={categoryImg}
  Dish={dish}
   />;
}