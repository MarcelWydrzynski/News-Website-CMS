import { useState } from "react";
import { Card, Checkbox } from "flowbite-react";
import UseFetchCategories from "../../hooks/UseFetchCategories";
import CategoryButtonsCMS from "../../components/CMS/CategoryButtonsCMS";
import AddCategoryForm from "../../components/CMS/AddCategoryForm";

const CategoriesCMS = () => {
  const { categories, fetchingCategoriesError, fetchingCategoriesLoading } = UseFetchCategories();
  const [modal, setModal] = useState(false);

  const handleModal = () => setModal(true);

  return (
    <div className="flex gap-y-10 flex-col w-full">
      <CategoryButtonsCMS handleModal={handleModal} />
      <AddCategoryForm openModal={modal} setOpenModal={setModal} />
      <div className="flex gap-y-8 gap-x-6 flex-wrap max-[450px]:justify-center">
        {categories.length === 0 ? (
          <p className="text-2xl text-white">No categories stored in database</p>
        ) : (
          categories.map((category) => (
            <Card key={category.id} className="max-w-sm relative hover:scale-105 transition-all p-8">
              <Checkbox className="absolute top-3 left-3 w-6 h-6" />
              <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h4>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesCMS;
