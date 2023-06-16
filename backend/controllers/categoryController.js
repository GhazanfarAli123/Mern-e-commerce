import categoryModal from "../modals/categoryModal.js"
import slugify from "slugify"

export const createCategory = async (req, res) => {
    try {

        const { name } = req.body
        if (!name) {
            console.log("name is required")
        }
        const categoryExist = await categoryModal.findOne({ name })
        if (categoryExist) {
            console.log("category already exists")
        }
        const categorySave = await new categoryModal({ name, slug: slugify(name) }).save()
        res.send(categorySave)
    } catch (err) {
        console.log(err)
    }

}

export const updateCategory = async (req, res) => {
    try {

        const { name } = req.body
        const { id } = req.params

        const category = await categoryModal.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.send(category)

    } catch (err) {
        console.log(err)
    }
}
export const getCategories = async (req, res) => {
    console.log('getCategories function called');
    try {
      const getCategories = await categoryModal.find({});
      res.send(getCategories);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  };
  

export const getCategory = async (req, res) => {
    try {
                
        const getCategory = await categoryModal.findOne({slug:req.params.slug})
        
        res.send({ categories: getCategories })

    } catch (err) {
        console.log(err)
    }
}


export const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params
        const deleteCategory = await categoryModal.findByIdAndDelete(id)
        
        res.send(deleteCategory)

    } catch (err) {
        console.log(err)
    }
}